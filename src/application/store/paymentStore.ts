import { makeAutoObservable } from 'mobx';
import { paymentService } from '@src/infrastructure/payment/paymentService';
import { FormRequestResponse } from '@src/infrastructure/payment/types';

const style = {
    base: {
        fontFamily: 'Roboto',
        fontSize: '16px',
        fontWeight: 400,
        backgroundColor: '#F3F4F6',
        color: '#292C31',
    },
    empty: {
        padding: '6px 15px 15px',
    },
    complete: {
        padding: '6px 15px 15px',
    },
    invalid: {
        padding: '6px 15px 15px',
    }
};

export class PaymentStore {
  static placeholders = {
    cardNumber: '1234 1234 1234 1234',
    expDate: 'MM / YY',
    cvv: '123'
  }
  formElements: any;
  cardNumber: any;
  expiry: any;
  cvv: any;
  userAgreement: any;
  sessionId: string | null = null;

  constructor() {
    makeAutoObservable(this);
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
        const result: FormRequestResponse = await window.PayUSecureFields.createToken(this.cardNumber, {
            additionalData
        });

        if (result.statusCode === 'SUCCESS') {
            await paymentService.addNewCard(result.token, this.sessionId);
        }
    } catch (error) {
        console.error(error);
    }
  }

  makeFormElements() {
    if (!this.formElements) {
        return;
    }

    const cardNumber = this.formElements.create('cardNumber', {
        placeholders: PaymentStore.placeholders,
        style,
    });

    const expiry = this.formElements.create('creditCardExpiry', {
        placeholders: PaymentStore.placeholders,
        style,
    });

    const cvv = this.formElements.create('cvv', {
        placeholder: '',
        style,
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
