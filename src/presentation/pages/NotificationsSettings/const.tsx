import { ReactNode } from 'react';
import { EmailSettings } from './components/EmailSettings';
import { PushSettings } from './components/PushSettings';
import { SmsSettings } from './components/SmsSettings';
import { TelegramSettings } from './components/TelegramSettings';

const WhatsAppSettings = () => <div>Настройки WhatsApp-уведомлений</div>;

interface Item {
  id: string;
  label: string;
  content: ReactNode;
  statusState: 'error' | 'success';
  status: string;
  disabled: boolean;
}

export const items: Item[] = [
  {
    id: 'option1',
    label: 'Telegram',
    content: <TelegramSettings />,
    statusState: 'error',
    status: 'подключите бота',
    disabled: false,
  },
  {
    id: 'option2',
    label: 'WhatsApp',
    content: <WhatsAppSettings />,
    statusState: 'success',
    status: '',
    disabled: true,
  },
  {
    id: 'option3',
    label: 'Email',
    content: <EmailSettings />,
    statusState: 'error',
    status: 'подвердите e-mail',
    disabled: true,
  },
  {
    id: 'option4',
    label: 'Sms',
    content: <SmsSettings />,
    statusState: 'success',
    status: 'выбрано',
    disabled: true,
  },
  {
    id: 'option5',
    label: 'Push',
    content: <PushSettings />,
    statusState: 'success',
    status: 'выбрано',
    disabled: true,
  },
];
