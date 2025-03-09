import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { bellIcon, menuIcon, SVGIcon } from "@progress/kendo-svg-icons";
import { KENDO_APPBAR } from '@progress/kendo-angular-navigation';
import { KENDO_NAVIGATION } from '@progress/kendo-angular-navigation';
import { KENDO_INDICATORS } from '@progress/kendo-angular-indicators';
import { KENDO_LOADER } from '@progress/kendo-angular-indicators';
import { BrandingComponent } from '../../layouts/full/sidebar/branding.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [BrandingComponent, CommonModule, MaterialModule, KENDO_APPBAR, KENDO_NAVIGATION, KENDO_INDICATORS, KENDO_LOADER]
})
export class NavbarComponent implements OnInit {
  isMenuVisible = false; // Tracks whether the sidebar is open or not
  loggingOut: boolean = false; // Initialize loading state

  user = {
    firstName: 'John',  // Replace with dynamic data
    profileImage: 'https://i.pravatar.cc/150?img=3' // Dummy avatar, replace with real URL
  };

  username = 'Mohamed';
  avatarSrc: string = '';

  public menuIcon: SVGIcon = menuIcon;
  public bellIcon: SVGIcon = bellIcon;
  public kendokaAvatar = "assets/navigation/appbar/kendoka-angular.png";

  constructor(private auth_service: AuthService) {}

  ngOnInit(): void {
    this.setRandomAvatar();
  }

  logout() {
    // Show spinner
    this.loggingOut = true;

    // Call the logout method from auth_service
    this.auth_service.logout().then(
      () => {
        // Successfully logged out, hide spinner
        console.log('User logged out successfully');

        window.location.reload();
      },
      (error) => {
        // Handle error, hide spinner
        console.error('Logout failed:', error);
      }
    ).finally(() => {
      // Hide spinner regardless of success or failure
      this.loggingOut = false;
    });
  }

  setRandomAvatar(): void {
    const randomNum = Math.floor(Math.random() * 10) + 1; // Generates a random number between 1 and 7
    this.avatarSrc = `../../../assets/images/profile/user-${randomNum}.jpg`; // Dynamically set the image path
  }

  toggleSidebar(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }
}
