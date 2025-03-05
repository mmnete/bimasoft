import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-help-button',
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.scss'],
  imports: [CommonModule, MaterialModule],
})
export class HelpButtonComponent {
  whatsappNumber: string = '15104248843'; // Replace with your WhatsApp number
  email: string = 'mnetemohamed@gmail.com'; // Replace with your email
  menuOpen: boolean = false; // Add this property

  openWhatsApp() {
    window.open(`https://wa.me/${this.whatsappNumber}`, '_blank');
  }

  sendEmail() {
    window.location.href = `mailto:${this.email}`;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
