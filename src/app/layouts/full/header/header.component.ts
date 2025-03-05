import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatBadgeModule } from '@angular/material/badge';
import { BrandingComponent } from '../sidebar/branding.component';

@Component({
  selector: 'app-header',
  imports: [
    BrandingComponent,
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
    MatBadgeModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  isSmallScreen = false;

  @Input() showProfileMenu = true;
  @Input() showNotifications = true;
  @Input() showHumburgerMenuButton = true;
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();

  constructor() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 768; // Change to match your breakpoint
  }
}
