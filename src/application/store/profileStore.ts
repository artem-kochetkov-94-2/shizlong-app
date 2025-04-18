import { profileService } from '@src/infrastructure/profile/profileService';
import { ProfileData, UpdateProfile } from '@src/infrastructure/profile/types';
import { makeAutoObservable } from 'mobx';

export class ProfileStore {
  profile: ProfileData | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isCashier() {
    // return true;
    return false;
    return this.profile?.employee?.role.name === 'owner';
  }

  async init() {}

  async getProfile() {
    try {
      const response = await profileService.getProfile();
      this.profile = response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProfile(data: UpdateProfile) {
    try {
      const response = await profileService.updateProfile(data);
      this.profile = response;
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
