import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { MatMenuTrigger } from '@angular/material/menu';
import { FullComponent } from '../../layouts/full/full.component';
import { Router } from '@angular/router';
import { AppContactFormComponent } from '../ui-components/contact-form/forms.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [AppContactFormComponent, FullComponent, CommonModule, MaterialModule],
})
export class HomeComponent {
  sliderIndex: number = 0;

  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
  // Track whether the menu is open or closed
  menuOpen = false;

  constructor(private router: Router) {}

  // Method to toggle the menu visibility
  toggleMenu() {
    if (this.menuOpen) {
      this.menuTrigger.closeMenu();
    } else {
      this.menuTrigger.openMenu();
    }
    this.menuOpen = !this.menuOpen;  // Update the menu state
  }

  features = [
    { 
      icon: 'speed', 
      title: 'Instant Service', 
      description: 'Ease of use. We ensure no flow takes longer than it needs to.' 
    },
    { 
      icon: 'computer', 
      title: 'AI-Powered Automation', 
      description: 'We are an AI first platform. This means 90% of our services are automated.' 
    },
    { 
      icon: 'bar_chart', 
      title: 'Data-Driven Analytics', 
      description: 'Through our detailed analytics brokers & companies to make data driven decisions.' 
    },
    { 
      icon: 'visibility', 
      title: 'Complete Transparency', 
      description: 'We ensure you and your customers are well aware of everything going on.' 
    },
    { 
      icon: 'verified', 
      title: 'Accurate & Trusted Partnerships', 
      description: 'We work with government agencies to ensure accurate, reliable details.' 
    },
    { 
      icon: 'headset_mic', 
      title: '24/7 Customer Service', 
      description: 'We are ALWAYS there. Tupo nawe muda wote.' 
    }
  ];
  
  

  steps = [
    { icon: 'business', text: 'Onboard your insurance company' },
    { icon: 'verified_user', text: 'Verify your company details' },
    { icon: 'group_add', text: 'Onboard your team' },
    { icon: 'thumb_up', text: 'Start serving your customers!' }
  ];
  

  onSliderChange() {
    // You can perform additional actions here if needed when the slider changes
    console.log('Slider index changed to: ', this.sliderIndex);
  }

  // Action for "Get Started Now" button
  onGetStartedClick() {
    // Navigate to another route or trigger any specific logic
    this.router.navigate(['/corp-form']);
  }

  // Action for "Login" button
  onLoginClick() {
    // Navigate to login page or open a login modal
    this.router.navigate(['/authentication/login']);
  }
}
