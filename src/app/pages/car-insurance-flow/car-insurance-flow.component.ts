import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/app/material.module';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IndividualInfoFormComponent } from '../../components/individual-info-form/individual-info-form.component'; // <-- Import the standalone component
import { AddressFormComponent } from '../../components/address-form/address-form.component';
import { Location } from '@angular/common';
import { CustomerType } from '../../types';
import { NewCustomerComponent } from '../../components/new-customer/new-customer.component';
import { CustomerSelectorComponent } from '../../components/customer-selector/customer-selector.component';
import { VehicleInfoFormComponent } from '../../components/vehicle-info-form/vehicle-info-form.component';
import { InsuranceDetailsFormComponent } from '../../components/insurance-details-form/insurance-details-form.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service'; // Import the AuthService

@Component({
  selector: 'app-car-insurance-flow',
  templateUrl: './car-insurance-flow.component.html',
  styleUrls: ['./car-insurance-flow.component.scss'],
  imports: [
    CommonModule,
    CustomerSelectorComponent,
    MatIconModule,
    MaterialModule,
    NewCustomerComponent,
    InsuranceDetailsFormComponent,
    IndividualInfoFormComponent,
    AddressFormComponent /* other imports */,
    VehicleInfoFormComponent,
  ],
})
export class CarInsuranceFlowComponent implements OnInit {
  selectedIndex = 0;
  selectedInsuranceType: string = '';
  selectedCustomerType: string = 'existing';
  vehicleData: any;
  insuranceData: any;
  organizationId: string = '';
  selectedCustomer: CustomerType | null = null;

  constructor(
    private location: Location,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    this.organizationId =  this.authService.getUserDetails()?.organization_id || '';
  }

  goBack(): void {
    this.location.back(); // Navigates back to the root or any page you specify
  }

  onInsuranceTypeSelected(type: string): void {
    this.selectedInsuranceType = type;
  }

  changeCustomer() {
    this.selectedCustomer = null;
  }

  onCustomerTypeSelected(type: string): void {
    this.selectedCustomerType = type;
    this.cdr.detectChanges();
    console.log('Updated the customer type');
  }

  onCustomerSelected(customer: any): void {
    // Handle the selected existing customer
    console.log(customer);
  }

  onNewCustomerData(data: any): void {
    // Handle the new customer data (either manual or AI-assisted)
    console.log(data);
  }

  onVehicleData(data: any): void {
    this.vehicleData = data;
  }

  onInsuranceData(data: any): void {
    this.insuranceData = data;
  }

  handleCustomerSelection(currSelectedCustomer: any): void {
    this.selectedCustomer = currSelectedCustomer;
  }

  handleFormSubmission(vehicleInfo: any): void {
    console.log('Submitted Vehicle Info:', vehicleInfo);
    // Handle further processing here, e.g., saving the data, calling AI, etc.
  }

  submitForm(): void {
    // Submit the full form data
    console.log('Submitting form with data: ', {
      customerType: this.selectedCustomerType,
      insuranceType: this.selectedInsuranceType,
      vehicleData: this.vehicleData,
      insuranceData: this.insuranceData
    });
    // Add actual submission logic here
  }
}
