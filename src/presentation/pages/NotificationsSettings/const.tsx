import { EmailSettings } from './components/EmailSettings';
import { PushSettings } from './components/PushSettings';
import { SmsSettings } from './components/SmsSettings';
import { TelegramSettings } from './components/TelegramSettings';

const WhatsAppSettings = () => <div>Настройки WhatsApp-уведомлений</div>;

export const items = [
  { id: 'option1', label: 'Telegram', content: <TelegramSettings /> },
  { id: 'option2', label: 'WhatsApp', content: <WhatsAppSettings /> },
  { id: 'option3', label: 'Email', content: <EmailSettings /> },
  { id: 'option4', label: 'Sms', content: <SmsSettings /> },
  { id: 'option5', label: 'Push', content: <PushSettings /> },
];
