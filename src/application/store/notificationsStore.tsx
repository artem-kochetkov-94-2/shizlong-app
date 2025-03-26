import { ReactNode } from 'react';
import { makeAutoObservable } from 'mobx';
import { notificationsService } from '@src/infrastructure/notifications/notificationService';
import { EmailSettings } from '@src/presentation/pages/NotificationsSettings/components/EmailSettings';
import { PushSettings } from '@src/presentation/pages/NotificationsSettings/components/PushSettings';
import { SmsSettings } from '@src/presentation/pages/NotificationsSettings/components/SmsSettings';
import { TelegramSettings } from '@src/presentation/pages/NotificationsSettings/components/TelegramSettings';
import { WhatsAppSettings } from '@src/presentation/pages/NotificationsSettings/components/WhatsAppSettings';

interface Notification {
  id: string;
  label: string;
  caption?: ReactNode;
  content: ReactNode;
  statusText: string;
  status: boolean;
  disabled: boolean;
}

class NotificationsStore {
  private notificationsService = notificationsService;
  isLoading: boolean = false;
  telegramCode: string = '';

  notifications: Notification[] = [
    {
      id: 'option1',
      label: 'Telegram',
      content: <TelegramSettings />,
      status: false,
      statusText: 'подключите бота',
      disabled: false,
    },
    {
      id: 'option2',
      label: 'WhatsApp',
      content: <WhatsAppSettings />,
      statusText: '',
      status: false,
      disabled: true,
      caption: <span>в разработке</span>,
    },
    {
      id: 'option3',
      label: 'Email',
      content: <EmailSettings />,
      statusText: '',
      status: false,
      disabled: true,
      caption: <span>в разработке</span>,
    },
    {
      id: 'option4',
      label: 'Sms',
      content: <SmsSettings />,
      statusText: '',
      status: false,
      disabled: true,
      caption: <span>в разработке</span>,
    },
    {
      id: 'option5',
      label: 'Push',
      content: <PushSettings />,
      statusText: '',
      status: false,
      disabled: true,
      caption: <span>в разработке</span>,
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  async getTelegramCode() {
    try {
      this.isLoading = true;
      const code = await this.notificationsService.getTelegramCode();
      this.telegramCode = code;
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  async checkTelegramStatus() {
    try {
      this.isLoading = true;
      const res = await this.notificationsService.checkTelegramStatus();
      this.notifications[0].status = res.is_subscribed_to_telegram;
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}

export const notificationsStore = new NotificationsStore();
