import { VerificationStrategy } from '@src/domain/common/verification/verificationStrategy';
import { makeAutoObservable } from 'mobx';
import {
  VerificationController,
  verificationController,
} from '@src/domain/common/verification/verificationController';
import { CallStrategy, callStrategy } from '@src/domain/common/verification/callStrategy';
import { smsStrategy } from '@src/domain/common/verification/smsStrategy';
import { cacheService } from '@src/application/services/cacheService/cacheService';
import { KEY } from '@src/application/services/cacheService/types';


export class VerificationStore {
  private verificationController: VerificationController;
  private _phoneNumber: string = '';
  private _verificationError: string | null = null;
  private _strategy: VerificationStrategy | null = null;
  private _isFetchingCode: boolean = false;
  private _isSendingCode: boolean = false;
  private _accessToken: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.verificationController = verificationController;
    this._strategy = this.verificationController.getStrategy();

    this._accessToken = cacheService.get(KEY.Token, false) || null;
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

  get isFetchingCode() {
    return this._isFetchingCode;
  }

  get isSendingCode() {
    return this._isSendingCode;
  }

  get accessToken() {
    return this._accessToken;
  }

  get isVerified() {
    return !!this._accessToken;
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

  async run() {
    try {
      this._isFetchingCode = true;
      await this.strategy?.init(this.phoneNumber);
    } catch (error) {
      this._verificationError = 'Ошибка запроса кода';
    } finally {
      this._isFetchingCode = false;
    }
  }

  async sendCode(value: string, successCb: VoidFunction) {
    try {
      this._isSendingCode = true;
      const result = await this.strategy?.sendCode(this.phoneNumber, value);
      this._accessToken = result?.access_token || null;
      cacheService.set(KEY.Token, this._accessToken || '');
      successCb();
    } catch (error) {
      this._verificationError = 'Код неверный';
    } finally {
      this._isSendingCode = false;
    }
  }

  reset() {
    this._verificationError = null;
  }

  clear() {
    this._phoneNumber = '';
    this._verificationError = null;
    this._strategy = null;
    this._isFetchingCode = false;
    this._isSendingCode = false;
    this._accessToken = null;
    cacheService.delete(KEY.Token);
  }
}

export const verificationStore = new VerificationStore();
