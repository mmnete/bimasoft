import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/app/material.module';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IndividualInfoFormComponent } from '../../components/individual-info-form/individual-info-form.component'; // <-- Import the standalone component
import { AddressFormComponent } from '../../components/address-form/address-form.component';

@Component({
  selector: 'app-car-insurance-flow',
  templateUrl: './car-insurance-flow.component.html',
  styleUrls: ['./car-insurance-flow.component.scss'],
  imports: [
    MatIconModule,
    MaterialModule,
    IndividualInfoFormComponent,
    AddressFormComponent /* other imports */,
  ],
})
export class CarInsuranceFlowComponent {
  personalInfoForm: FormGroup;
  addressForm: FormGroup;
  insuranceDetailsForm: FormGroup;
  selectedInsuranceType: string | null = null; // Tracks the selected insurance type

  title = 'Vihecle Insurance';
  selectedIndex: number = 0; // selected step index.

  constructor(
    private router: Router,
    private fb: FormBuilder,
  ) {
    // Initialize the forms
    this.personalInfoForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
    });

    this.addressForm = this.fb.group({
      street: [''],
      city: [''],
      zipCode: [''],
    });

    this.insuranceDetailsForm = this.fb.group({
      policyType: [''],
      vehicleModel: [''],
      coverageAmount: [''],
    });
  }

  goBack(): void {
    this.router.navigate(['/']); // Navigates back to the root or any page you specify
  }

  onInsuranceTypeSelected(type: string): void {
    this.selectedInsuranceType = type;
  }

  onFormValidityChange(isValid: boolean): void {
    // this.isStepValid = isValid;
  }
}
