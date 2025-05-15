export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ProfileData {
  id: number;
  name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  payment_tokens?: unknown[];
  employee?: {
    id: number;
    photo: string;
    role?: {
      name: 'cashier' | string;
      description: string;
    }
  };
}

export interface UpdateProfile {
  name: string;
  last_name: string;
  phone: string;
  file?: File | null;
}

export type UpdateProfileResponse = ProfileData;
