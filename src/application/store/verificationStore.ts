import { VerificationStrategy } from '@src/domain/common/verification/verificationStrategy';
import { makeAutoObservable } from 'mobx';
import { VerificationController, verificationController } from '@src/domain/common/verification/verificationController';
import { CallStrategy, callStrategy } from '@src/domain/common/verification/callStrategy';
import { smsStrategy } from '@src/domain/common/verification/smsStrategy';

class VerificationStore {
  private verificationController: VerificationController;
  private _phoneNumber: string = '';
  private _verificationError: string | null = null;
  private _strategy: VerificationStrategy | null = null;
  
  constructor() {
    makeAutoObservable(this);
    this.verificationController = verificationController;
    this._strategy = this.verificationController.getStrategy();
  }

  get phoneNumber() {
    return this._phoneNumber;
  }

  get verificationError() {
    return this._verificationError;
  }

  get strategy() {
    return this._strategy;
  }

  setStrategy(strategy: VerificationStrategy) {
    this._strategy = strategy;
  }

  setPhoneNumber(value: string) {
    this._phoneNumber = value;
  }

  startVerification() {
    this.setStrategy(callStrategy);
    this.run();
  }

  reinit() {
    if (this.strategy instanceof CallStrategy) {
      this.setStrategy(smsStrategy);
    }
    this.run();
  }

  run() {
    this.strategy?.init();
  }

  sendCode(value: string) {
    try {
      this.strategy?.sendCode(value);
    } catch (error) {
      this._verificationError = 'Код неверный';
      // this.verificationError = 'Код неверный. Вы исчерпали суточный лимит попыток. Повторите завтра.';
      // this.verificationError = error as string;
    }
  }

  reset() {
    this._verificationError = null;
  }
}

export const verificationStore = new VerificationStore();
