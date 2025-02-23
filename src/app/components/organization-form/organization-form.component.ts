import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationService } from '../../services/organization-service.service'; // Import the service
import { ActivatedRoute, Router } from '@angular/router'; // For handling routes
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PaymentMethodComponent } from '../payment-method/payment-method.component';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import the SnackBar
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.css'],
  imports: [CommonModule, PaymentMethodComponent, MaterialModule, ReactiveFormsModule],
})
export class OrganizationFormComponent implements OnInit {
  @Input() organization: any; // Pass organization data if editing
  orgForm!: FormGroup;
  isEdit: boolean = false;

  insuranceOptions = [
    { value: 'health', viewValue: 'Health Insurance' },
    { value: 'auto', viewValue: 'Auto Insurance' },
    { value: 'life', viewValue: 'Life Insurance' },
    { value: 'property', viewValue: 'Property Insurance' },
  ];

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService, // Inject the service
    private router: Router, // For navigation
    private route: ActivatedRoute, // For route params (if editing)
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.organization;

    this.orgForm = this.fb.group({
      legalName: [this.organization?.legalName || '', Validators.required],
      brelaNumber: [this.organization?.brelaNumber || '', Validators.required],
      tinNumber: [this.organization?.tinNumber || '', Validators.required],
      contactEmail: [
        this.organization?.contactEmail || '',
        [Validators.required, Validators.email],
      ],
      contactPhone: [
        this.organization?.contactPhone || '',
        Validators.required,
      ],
      tiraLicense: [this.organization?.tiraLicense || ''],
      contactPersonFirstName: [
        this.organization?.contactPersonFirstName || '',
        Validators.required,
      ],
      contactPersonLastName: [
        this.organization?.contactPersonLastName || '',
        Validators.required,
      ],
      contactPersonRole: [
        this.organization?.contactPersonRole || '',
        Validators.required,
      ],
      contactPersonEmail: [
        this.organization?.contactPersonEmail || '',
        [Validators.required, Validators.email],
      ],
      contactPersonPhone: [
        this.organization?.contactPersonPhone || '',
        Validators.required,
      ],
      insuranceTypes: [
        this.organization?.insuranceTypes || [],
        Validators.required,
      ],
      paymentMethods: this.fb.array([this.createPaymentMethod()]),
      adminUsername: [
        this.organization?.adminUsername || '',
        Validators.required,
      ],
      adminEmail: [
        this.organization?.adminEmail || '',
        [Validators.required, Validators.email],
      ],
    });
  }

  onSubmit(): void {
    if (this.orgForm.valid) {
      const orgData = this.transformFormToJson(this.orgForm.value);

      if (this.isEdit) {
        console.log('Updating Organization:', orgData);
        // this.updateOrganization(orgData);
      } else {
        console.log('Creating Organization:', orgData);
        this.createOrganization(orgData);
      }
    }
  }

  // Create new organization
  createOrganization(orgData: any): void {
    this.organizationService.createOrganization(orgData).subscribe(
      (response) => {
        console.log('Organization Created:', response);
        
        // Show success dialog
        const dialogRef = this.dialog.open(DialogMessageComponent, {
          data: {
            title: 'Success! Acount Under Review',
            message: 'Your organization has been created successfully. We will send you login details via email while your account is under review.',
            navText: 'Go to Login',
            showCancel: false,  // Hide the cancel button
          }
        });
  
        dialogRef.afterClosed().subscribe(() => {
          // Navigate to the login page after dialog is closed
          this.router.navigate(['/authentication/login']);
        });
      },
      (error) => {
        console.error('Error creating organization:', error);

        const errorMessage = error?.error?.message || 'An unknown error occurred.';

        // Show error dialog
        const dialogRef = this.dialog.open(DialogMessageComponent, {
          data: {
            title: 'Error',
            message: `${errorMessage}. Please try again.`,
            navText: 'Try Again',
            showCancel: false,  // Hide the cancel button
          }
        });
  
        dialogRef.afterClosed().subscribe(() => {});
      }
    );
  }

  createPaymentMethod() {
    return this.fb.group({
      method: ['', Validators.required],
      details: this.fb.group({
        phone_number: ['', Validators.required],
        account_name: ['', Validators.required],
        account_number: [''],
        bank_name: [''],
      }),
    });
  }

  handlePaymentMethodsChange(paymentMethods: any[]) {
    this.orgForm.patchValue({
      paymentMethods: paymentMethods,
    });
  }

  transformFormToJson(formValue: any): any {
    return {
      legal_name: formValue.legalName,
      brela_number: formValue.brelaNumber,
      tin_number: formValue.tinNumber,
      contact_email: formValue.contactEmail,
      contact_phone: formValue.contactPhone,
      tira_license: formValue.tiraLicense,
      contact_person_first_name: formValue.contactPersonFirstName,
      contact_person_last_name: formValue.contactPersonLastName,
      contact_person_role: formValue.contactPersonRole,
      contact_person_email: formValue.contactPersonEmail,
      contact_person_phone: formValue.contactPersonPhone,
      admin_username: formValue.adminUsername,
      admin_email: formValue.adminEmail,
      insurance_types: formValue.insuranceTypes,
      payment_methods: formValue.paymentMethods.map((paymentMethod: any) => ({
        method: paymentMethod.method,
        details: paymentMethod.details,
      })),
    };
  }
}
