import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
    imports: [CommonModule, MaterialModule, NavbarComponent]
})
export class DashboardComponent implements OnInit {
  username = 'Mohamed';
  showWaveEffect = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Check if the user is logging in for the first time
    // if (localStorage.getItem('firstLogin') !== 'false') {
    //   this.showWaveEffect = true;

    //   // Remove effect after 5 seconds
    //   setTimeout(() => {
    //     this.showWaveEffect = false;
    //     localStorage.setItem('firstLogin', 'false'); // Mark the user as logged in
    //   }, 5000);
    // }
    this.showWaveEffect = true;
    setTimeout(() => {
      this.showWaveEffect = false;
      localStorage.setItem('firstLogin', 'false'); // Mark user as logged in
    }, 4000);
  }


  startMotorInsurance() {
    this.router.navigate(['/car-insurance-flow']);
    // Navigate or open dialog
  }
}
