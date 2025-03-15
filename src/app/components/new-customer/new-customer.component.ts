import { MaterialModule } from '../../material.module';
import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressFormComponent } from '../address-form/address-form.component';
import { OrganizationService } from '../../services/organization-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerType } from '../../types';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss'],
  imports: [AddressFormComponent, CommonModule, FormsModule, MaterialModule]
})
export class NewCustomerComponent implements OnInit {
  selectedOption: string = '';
  customerForm: FormGroup;
  isAddingNewCustomer = false;
  @Input() organizationId = '';
  @Output() customerSelected: EventEmitter<CustomerType> = new EventEmitter();

  genders = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
    { value: 'other', viewValue: 'Other' },
  ];

  maritalStatuses = [
    { value: 'single', viewValue: 'Single' },
    { value: 'married', viewValue: 'Married' },
    { value: 'divorced', viewValue: 'Divorced' },
    { value: 'widowed', viewValue: 'Widowed' },
  ];

  customerDetails = {
    fullName: '',
    gender: '',
    maritalStatus: '',
    phoneNumber: '',
    email: '',
    address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      region: '',
      district: '',
      country: '',
    },
    nationalId: '',
    driversLicense: '',
    passportNumber: '',
  };

  documentTypes = [
    {
      key: 'identityProof',
      title: 'Identity Proof',
      instructions: 'Please upload a government-issued identity document (e.g., Passport, National ID).'
    },
    {
      key: 'addressProof',
      title: 'Address Proof',
      instructions: 'Please upload a document showing your current address (e.g., Utility Bill, Lease Agreement).'
    },
    {
      key: 'photo',
      title: 'Recent Photo',
      instructions: 'Please upload a recent passport-size photograph.'
    }
    // Add more document types as required
  ];

  // Store uploaded files
  uploadedFiles: { [key: string]: File | null } = {
    identityProof: null,
    addressProof: null,
    photo: null
  };

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private organization_service: OrganizationService) {}

  ngOnInit(): void {
    // Initialize the form using FormBuilder
    this.customerForm = this.fb.group({
      fullName: ['', Validators.required],
      gender: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      phoneNumber: ['', [Validators.required]],  // Phone number validation
      email: ['', [Validators.required, Validators.email]],  // Email validation
      address: this.fb.group({
        addressLine1: ['', Validators.required],
        addressLine2: [''],
        city: ['', Validators.required],
        region: [''],
        district: ['', Validators.required],
        country: ['Tanzania', Validators.required]  // Default to Tanzania
      }),
      nationalId: [''],
      driversLicense: [''],
      passportNumber: ['']
    });
  }

  // Handle option selection (manual or upload)
  selectOnboardingOption(option: string): void {
    this.selectedOption = option;
  }

  // Handle file selection for upload and preview
  onFileSelected(docKey: string, event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadedFiles[docKey] = file;
    }
  }

  // Generate preview URL for images
  previewUrl(docKey: string): string {
    const file = this.uploadedFiles[docKey];
    return file ? URL.createObjectURL(file) : '';
  }

  // Check if all files are uploaded
  checkFilesUploaded(): boolean {
    return Object.values(this.uploadedFiles).every(file => file !== null);
  }

  onAddressUpdated(addressForm: FormGroup) {
    console.log('Updated Address Form:', addressForm.value);

    // Replace the address form in the parent form
    this.customerForm.setControl('address', addressForm);
  }

  // Handle document upload submission
  submitDocumentUpload(): void {
    if (this.checkFilesUploaded()) {
      // Trigger file submission (this would usually send the files to the server)
      this.formData.emit({
        uploadedFiles: this.uploadedFiles,
        method: 'upload'
      });
    }
  }

  submitManualEntry(): void {
    if (this.customerForm.valid) {
      this.isAddingNewCustomer = true; // Show spinner

      // Getting the form data
      const formData = this.customerForm.value;

      console.log('org id is' + this.organizationId);

      // Transforming physical_address into a JSON string
      const customerData = {
        full_name: formData.fullName,
        gender: formData.gender,
        marital_status: formData.maritalStatus,
        physical_address: JSON.stringify(formData.address), // Convert physical address to JSON string
        national_id: formData.nationalId,
        drivers_license: formData.driversLicense,
        passport_number: formData.passportNumber,
        email: formData.email,
        phone_number: formData.phoneNumber,
        organization_id: this.organizationId
      };

      // Calling the service method to create customer
      this.organization_service.createCustomer(customerData).subscribe(
        (response) => {
          // Handle successful response
          this.snackBar.open('Customer created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });

          this.isAddingNewCustomer = false; // Hide spinner

          this.customerSelected.emit(customerData);
        },
        (error) => {
          // Handle error response
          this.snackBar.open('Error creating customer. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
          this.isAddingNewCustomer = false; // Hide spinner
          console.error('Error creating customer:', error);
        }
      );
    } else {
      this.markAllFieldsTouched();
      console.log('Form is not valid!');
      this.snackBar.open('Form is not valid!', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
      console.log('Invalid fields are ' + this.getInvalidFields());
    }
  }

  markAllFieldsTouched(): void {
    Object.values(this.customerForm.controls).forEach(control => {
      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach(subControl => subControl.markAsTouched());
      } else {
        control.markAsTouched();
      }
    });
  }  

  getInvalidFields(): string {
    const invalidControls: string[] = [];
  
    Object.keys(this.customerForm.controls).forEach(key => {
      const control = this.customerForm.get(key);
      if (control && control.invalid) {
        invalidControls.push(key);
      }
    });
  
    return invalidControls.join(', '); // Returns a comma-separated list of invalid fields
  }


  @Output() formData = new EventEmitter<any>();
}
