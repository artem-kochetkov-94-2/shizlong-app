import { profileService } from '@src/infrastructure/profile/profileService';
import { ProfileData, UpdateProfile } from '@src/infrastructure/profile/types';
import { makeAutoObservable, runInAction } from 'mobx';

export class ProfileStore {
  profile: ProfileData | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isCashier() {
    // return false;
    return this.profile?.employee?.role.name === 'cashier';
  }

  async init() {}

  async getProfile() {
    try {
      const response = await profileService.getProfile();
      runInAction(() => {
        this.profile = response;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateProfile(data: UpdateProfile) {
    try {
      const response = await profileService.updateProfile(data);
      runInAction(() => {
        this.profile = response;
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  clear() {
    this.profile = null;
  }
}

export const profileStore = new ProfileStore();
