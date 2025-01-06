import { Component, Input } from '@angular/core';
import { Message } from '../models/message.model';
@Component({
  selector: 'app-single-message',
  standalone: true,
  imports: [],
  templateUrl: './single-message.component.html',
  styleUrl: './single-message.component.css'
})
export class SingleMessageComponent {
  @Input() message!: Message;

}
