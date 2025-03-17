import { makeAutoObservable } from 'mobx';

export class GeoStore {
  location: { latitude: number; longitude: number } = { latitude: 0, longitude: 0 };
  error: string | null = null;
  permissionStatus: PermissionState | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setPermissionStatus(status: PermissionState) {
    this.permissionStatus = status;
  }

  setLocation(location: { latitude: number; longitude: number }) {
    this.location = location;
  }

  setError(error: string) {
    this.error = error;
  }

  init = () => {
    if ("permissions" in navigator) {
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            geoStore.setPermissionStatus(result.state);
            result.onchange = () => {
                geoStore.setPermissionStatus(result.state);
            };
        });
    }

    this.getLocation();
  }

  getLocation = () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                geoStore.setLocation({ latitude, longitude });
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        geoStore.setError("Пользователь отклонил запрос на геолокацию.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        geoStore.setError("Информация о местоположении недоступна.");
                        break;
                    case error.TIMEOUT:
                        geoStore.setError("Время ожидания запроса истекло.");
                        break;
                    default:
                        geoStore.setError("Произошла неизвестная ошибка.");
                        break;
                }
            }
        );
    } else {
        this.setError("Геолокация не поддерживается этим браузером.");
    }
  };

  requestLocation = () => {
    if (this.permissionStatus === 'granted' || this.permissionStatus === 'prompt') {
        this.getLocation();
    } else if (this.permissionStatus === 'denied') {
        this.setError("Геолокация была отклонена ранее. Пожалуйста, измените настройки браузера.");
    }
  };
}

export const geoStore = new GeoStore();
