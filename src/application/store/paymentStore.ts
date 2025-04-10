import { makeAutoObservable, runInAction } from 'mobx';
import { paymentService } from '@src/infrastructure/payment/paymentService';
import { FormRequestResponse, Token } from '@src/infrastructure/payment/types';
import { eventService } from '../services/EventService/EventService';
import { EVENT } from '../services/EventService/EventList';
import { delay } from '../utils/delay';

const baseStyle = {
  base: {
    fontFamily: 'Arial',
    fontSize: '14px',
    fontWeight: 400,
    backgroundColor: '#F3F4F6',
    color: '#292C31',
  },
  empty: {
    fontFamily: 'Arial',
    padding: '14px 14px 0',

    '::placeholder': {
      color: 'transparent',
    },
  },
  complete: {
    padding: '14px 14px 0',
  },
  invalid: {
    padding: '14px 14px 0',
  },
};

const cardNumberStyle = {
  ...baseStyle,
  empty: {
    ...baseStyle.empty,
    padding: '0',
  },
  complete: {
    ...baseStyle.complete,
    padding: '0',
  },
  invalid: {
    ...baseStyle.invalid,
    padding: '0',
  },
};

export class PaymentStore {
  static placeholders = {};
  formElements: any;
  cardNumber: any;
  expiry: any;
  cvv: any;
  userAgreement: any;
  sessionId: string | null = null;
  tokens: Token[] = [];
  isAddingNewCard = false;
  isLoadingTokens = false;
  isLoadingProcessPayment = new Map<number, boolean>();
  startedProcessPayment = new Set<number>();

  constructor() {
    makeAutoObservable(this);
  }

  async getTokens() {
    try {
      this.isLoadingTokens = true;
      const result = await paymentService.getTokens();
      console.log(result);
      this.tokens = result;
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoadingTokens = false;
    }
  }

  async init() {
    try {
      const session = await paymentService.getSession();
      this.sessionId = session.session_id;

      const auth = {
        merchantCode: session.merchant_id,
        sessionId: session.session_id,
      };
      const fonts = [{ src: 'https://fonts.googleapis.com/css?family=Source+Code+Pro' }];

      // @ts-ignore
      this.formElements = new window.PayUSecureFields.Init(auth, { fonts });
      console.log(this.formElements);
      this.makeFormElements();
    } catch (error) {
      console.error(error);
    }
  }

  async addNewCard(
    additionalData: { holder_name: string },
    successCb?: (tokenId?: number) => void,
    errorCb?: () => void
  ) {
    if (!this.sessionId) {
      return;
    }

    try {
      this.isAddingNewCard = true;
      // @ts-ignore
      const result: FormRequestResponse = await window.PayUSecureFields.createToken(
        this.cardNumber,
        {
          additionalData,
        }
      );

      if (result.statusCode === 'SUCCESS') {
        await paymentService.addNewCard(result.token, this.sessionId);
        await delay(3000);
        await this.getTokens();
        successCb?.();
        return;
      }

      const message = Object.values(result.errors);

      eventService.emit(EVENT.MODAL_ERROR, {
        isActive: true,
        message: 'Ошибка при добавлении карты',
        text: message,
      });

      errorCb?.();
    } catch (error) {
      console.error(error);
      errorCb?.();
    } finally {
      this.isAddingNewCard = false;
    }
  }

  async processPayment(bookingId: number, tokenId?: number) {
    try {
      if (tokenId) {
        await paymentService.processPayment(bookingId, tokenId);
        return;
      }

      if (this.tokens.length > 0) {
        const newLoadingMap = new Map(this.isLoadingProcessPayment);
        newLoadingMap.set(bookingId, true);
        runInAction(() => {
          this.isLoadingProcessPayment = newLoadingMap;
        });

        await paymentService.processPayment(bookingId, this.tokens[0].id);
        runInAction(() => {
          const newSet = new Set(this.startedProcessPayment);
          newSet.add(bookingId);
          this.startedProcessPayment = newSet;
        });
      } else {
        eventService.emit(EVENT.MODAL_ADD_CARD, {
          isActive: true,
          successCb: (tokenId?: number) => this.processPayment(bookingId, tokenId)
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      const newLoadingMap = new Map(this.isLoadingProcessPayment);
      newLoadingMap.set(bookingId, false);
      runInAction(() => {
        this.isLoadingProcessPayment = newLoadingMap;
      });
    }
  }

  clearProcessPayment(bookingId: number) {
    const newSet = new Set(this.startedProcessPayment);
    newSet.delete(bookingId);
    runInAction(() => {
      this.startedProcessPayment = newSet;
    });
  }

  async deleteToken(tokenId: number) {
    try {
      await paymentService.deleteToken(tokenId);
      await this.getTokens();
    } catch (error) {
      console.error(error);
    }
  }

  makeFormElements() {
    if (!this.formElements) {
      return;
    }

    const cardNumber = this.formElements.create('cardNumber', {
      style: cardNumberStyle,
    });

    const expiry = this.formElements.create('creditCardExpiry', {
      style: baseStyle,
    });

    const cvv = this.formElements.create('cvv', {
      style: baseStyle,
    });

    const userAgreement = this.formElements.create('userAgreement', {});

    this.cardNumber = cardNumber;
    this.expiry = expiry;
    this.cvv = cvv;
    this.userAgreement = userAgreement;

    cardNumber.mount('#card-number');
    expiry.mount('#exp-date');
    cvv.mount('#cvv');
    userAgreement.mount('#user-agreement');
  }
}

export const paymentStore = new PaymentStore();
