import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(
    private notifierService: NotifierService
  ) { }

  success(message: string) {
    this.notifierService.show({ type: 'success', message })
  }

  error(message: string) {
    this.notifierService.show({ type: 'error', message })
  }

  thankYouMessage() {
    this.notifierService.show({ type: 'success', message: '👍 Thank you for using sql2object!' })
  }

  sqlTypeMessage(sqlType: string) {
    this.notifierService.show({ type: 'default', message: `❌ Please check you have selected the correct SQL Type or that the data you've entered is in the correct format.` })
  }
}
