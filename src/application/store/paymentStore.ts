import { makeAutoObservable } from 'mobx';
import { paymentService } from '@src/infrastructure/payment/paymentService';
import { FormRequestResponse, Token } from '@src/infrastructure/payment/types';
import { eventService } from '../services/EventService/EventService';
import { EVENT } from '../services/EventService/EventList';

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
  }
}

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
  }
}

export class PaymentStore {
  static placeholders = {}
  formElements: any;
  cardNumber: any;
  expiry: any;
  cvv: any;
  userAgreement: any;
  sessionId: string | null = null;
  tokens: Token[] = [];
  isAddingNewCard = false;
  isLoadingTokens = false;
  isLoadingProcessPayment = false;

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
      this.formElements = new window.PayUSecureFields.Init(auth, { fonts })
      console.log(this.formElements);
      this.makeFormElements();
    } catch (error) {
        console.error(error);
    }
  }

  async addNewCard(additionalData: { holder_name: string }) {
    if (!this.sessionId) {
      return;
    }

    try {
      this.isAddingNewCard = true;
      // @ts-ignore
      const result: FormRequestResponse = await window.PayUSecureFields.createToken(this.cardNumber, {
        additionalData
      });

      if (result.statusCode === 'SUCCESS') {
        await paymentService.addNewCard(result.token, this.sessionId);
        await this.getTokens();
        return;
      }

      const message = Object.values(result.errors);

      eventService.emit(EVENT.MODAL_ERROR, {
        isActive: true,
        message: 'Ошибка при добавлении карты',
        text: message,
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.isAddingNewCard = false;
    }
  }

  async processPayment(bookingId: number) {
    try {
      if (this.tokens.length > 0) {
        this.isLoadingProcessPayment = true;
        await paymentService.processPayment(bookingId, this.tokens[0].id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoadingProcessPayment = false;
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
