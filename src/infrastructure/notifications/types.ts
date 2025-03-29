export interface getTelegramCodeResponse {
  success: boolean;
  code: string;
}

export interface CheckTelegramStatusResponse {
  is_subscribed_to_telegram: boolean;
}
