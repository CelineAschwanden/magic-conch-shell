import { Component, OnInit, Input } from '@angular/core';
import { Message } from './message';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.scss']
})

export class MessageCardComponent implements OnInit {

  @Input() message: Message | null = null;

  constructor() {}
  ngOnInit(): void {}
}
