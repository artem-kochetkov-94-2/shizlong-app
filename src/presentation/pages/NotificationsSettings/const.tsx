import { EmailSettings } from './components/EmailSettings';
import { TelegramSettings } from './components/TelegramSettings';

const WhatsAppSettings = () => <div>Настройки WhatsApp-уведомлений</div>;
const SmsSettings = () => <div>Настройки Sms-уведомлений</div>;
const PushSettings = () => <div>Настройки Push-уведомлений</div>;

export const items = [
  { id: 'option1', label: 'Telegram', content: <TelegramSettings /> },
  { id: 'option2', label: 'WhatsApp', content: <WhatsAppSettings /> },
  { id: 'option3', label: 'Email', content: <EmailSettings /> },
  { id: 'option4', label: 'Sms', content: <SmsSettings /> },
  { id: 'option5', label: 'Push', content: <PushSettings /> },
];
