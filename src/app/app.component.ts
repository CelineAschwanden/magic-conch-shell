import { Component } from '@angular/core';
import { MessagingService } from './core/services/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'magic-conch-shell';

  constructor(private messaging: MessagingService) {
    this.messaging.message.subscribe((msg) => console.log(msg));
  }
}
