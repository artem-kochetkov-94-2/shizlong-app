import { profileService } from '@src/infrastructure/profile/profileService';
import { ProfileData, UpdateProfile } from '@src/infrastructure/profile/types';
import { makeAutoObservable } from 'mobx';

export class ProfileStore {
  profile: ProfileData = {};

  constructor() {
    makeAutoObservable(this);
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}

export const profileStore = new ProfileStore();
