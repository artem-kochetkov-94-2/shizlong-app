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
    console.log('GeoStore init');
    if ("permissions" in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        console.log('GeoStore init then');
        this.setPermissionStatus(result.state);
        result.onchange = () => {
          console.log('GeoStore init onchange');
          this.setPermissionStatus(result.state);
        };
      });
    }

    this.getLocation();
  }

  getLocation = () => {
    console.log('GeoStore getLocation');
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('GeoStore getLocation then');
          const { latitude, longitude } = position.coords;
          this.setLocation({ latitude, longitude });
        },
        (error) => {
          console.log('GeoStore getLocation error', error.code);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              this.setError("Пользователь отклонил запрос на геолокацию.");
              break;
            case error.POSITION_UNAVAILABLE:
              this.setError("Информация о местоположении недоступна.");
              break;
            case error.TIMEOUT:
              this.setError("Время ожидания запроса истекло.");
              break;
            default:
              this.setError("Произошла неизвестная ошибка.");
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
