import { EVENT } from '@src/application/services/EventService/EventList';
import { eventService } from '@src/application/services/EventService/EventService';
import { verificationStore } from '@src/application/store/verificationStore';
import { API_URL } from '@src/const';
import axios from 'axios';

export const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
  timeout: 1_000 * 60 * 10,
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = verificationStore.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error('Сетевая ошибка или сервер недоступен');
      return Promise.reject(new Error('Network error'));
    }

    if (error.response.status === 401) {
      console.warn('Сессия истекла');
      eventService.emit(EVENT.MODAL_AUTH, { isActive: true });
    }

    return Promise.reject(error);
  }
);
