import { Component, Input } from '@angular/core';
import { Message } from '../models/message.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-message',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './single-message.component.html',
  styleUrl: './single-message.component.css'
})
export class SingleMessageComponent {
  @Input() message!: Message;

}
