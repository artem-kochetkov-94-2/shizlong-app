export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ProfileData {
  name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
}

export interface UpdateProfile {
  name: string;
  last_name: string;
  phone: string;
  file?: File | null;
}

export type UpdateProfileResponse = ProfileData;
