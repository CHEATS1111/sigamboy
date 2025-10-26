// Глобальная синхронизация между вкладками через BroadcastChannel

export class MessageBroadcaster {
  private channel: BroadcastChannel
  
  constructor() {
    this.channel = new BroadcastChannel('support_messages')
  }

  // Отправка сообщения
  sendMessage(message: any) {
    this.channel.postMessage({
      type: 'new_message',
      data: message
    })
  }

  // Обновление статуса админа
  updateAdminStatus(isOnline: boolean) {
    this.channel.postMessage({
      type: 'admin_status',
      data: { isOnline }
    })
  }

  // Слушаем сообщения
  onMessage(callback: (data: any) => void) {
    this.channel.onmessage = (event) => {
      callback(event.data)
    }
  }

  // Закрываем канал
  close() {
    this.channel.close()
  }
}

