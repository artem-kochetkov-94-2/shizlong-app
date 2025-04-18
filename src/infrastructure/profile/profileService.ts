import { API_URL_V2 } from '@src/const';
import { RestService } from '../restService/restService';
import { ProfileData, UpdateProfile, UpdateProfileResponse } from './types';

const routes = {
  getProfile: '/customer/profile/get',
  updateProfile: '/customer/profile/update',
};

class ProfileService {
  private readonly apiUrl = API_URL_V2;
  private restService: RestService;

  constructor() {
    this.restService = new RestService();
  }

  async getProfile() {
    const { response } = await this.restService.get<ProfileData>({
      url: `${this.apiUrl}${routes.getProfile}`,
    });
    return response;
  }

  async updateProfile(data: UpdateProfile) {
    const formData = new FormData();

    if (data.name) formData.append('name', data.name);
    if (data.last_name) formData.append('last_name', data.last_name);
    if (data.phone) formData.append('phone', data.phone);
    if (data.file) formData.append('file', data.file);

    const { response } = await this.restService.post<UpdateProfileResponse>({
      url: `${this.apiUrl}${routes.updateProfile}`,
      data: formData,
    });
    return response;
  }
}

export const profileService = new ProfileService();
