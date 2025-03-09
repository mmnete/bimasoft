import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrandingComponent } from '../../../layouts/full/sidebar/branding.component';
import { AuthService } from '../../../services/auth.service'; // Import the AuthService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-login',
  imports: [CommonModule, BrandingComponent, RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // If the user is already logged in, redirect them to dashboard
    if (this.authService.isLoggedIn()) {
     this.router.navigate(['/dashboard']);
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;  // Show spinner while logging in
    this.error = null;       // Reset error message

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe(
      (response) => {
        // Check if the token is empty or invalid
        if (response.token && response.token.length > 0) {
          // Store token and handle redirection
          this.authService.storeToken(response.token);
          console.log('Login details ' + response.user);
          this.authService.storeUserDetails(response);
          this.router.navigate(['/dashboard']);
        } else {
          // Throw a custom error if the token is invalid or empty
          this.isLoading = false;
          this.error = 'Invalid token received. Please try again.';
          console.error('Invalid token:', response.token);
          throw new Error('Invalid token received.');
        }
      },
      (error) => {
        // Handle error and display message
        this.isLoading = false;
        this.error = 'Invalid email or password. Please try again.';  // Show error
        console.error('Login error:', error);
      }
    );    
  }
}
