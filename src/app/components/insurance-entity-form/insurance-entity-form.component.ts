import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { InsuranceBrokerService } from '../../services/insurance-brokers/insurance-broker.service';
import { InsuranceCompanyService } from '../../services/insurance-companies/insurance-company.service';

import { InsuranceEntity } from '../../types';
import { Router } from '@angular/router'; // For handling routes
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PaymentMethodComponent } from '../payment-method/payment-method.component';
import { HelpButtonComponent } from '../help-button/help-button.component';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, map, retry, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-insurance-entity-form',
  templateUrl: './insurance-entity-form.component.html',
  styleUrls: ['./insurance-entity-form.component.scss'],
  imports: [
    CommonModule,
    HelpButtonComponent,
    PaymentMethodComponent,
    MatAutocompleteModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class InsuranceEntityFormComponent implements OnInit {
  @Input() insuranceEntity: InsuranceEntity; // Pass organization data if editing
  entityForm!: FormGroup;
  isEdit: boolean = false;
  filteredCompanies$: Observable<InsuranceEntity[]>;
  companyDetailsUrl = '';
  insuranceCompanies: InsuranceEntity[] = [];

  insuranceOptions = [
    { value: 'motor', viewValue: 'Motor Insurance' },
    // { value: 'health', viewValue: 'Health Insurance' },
    // { value: 'motor', viewValue: 'Motor Insurance' },
    // { value: 'life', viewValue: 'Life Insurance' },
    // { value: 'property', viewValue: 'Property Insurance' },
  ];

  defaultInsuranceType = this.insuranceOptions[0]?.value;

  constructor(
    private fb: FormBuilder,
    private insuranceBrokerService: InsuranceBrokerService,
    private insuranceCompanyService: InsuranceCompanyService,
    private router: Router, // For navigation
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.isEdit = !!this.insuranceEntity;

    this.entityForm = this.fb.group({
      type: [
        this.insuranceEntity?.type || '',
        Validators.required,
      ],
      legalName: [this.insuranceEntity?.legalName || '', Validators.required],
      brelaNumber: [this.insuranceEntity?.brelaNumber || '', Validators.required],
      tinNumber: [this.insuranceEntity?.tinNumber || '', Validators.required],
      contactEmail: [
        this.insuranceEntity?.contactEmail || '',
        [Validators.required, Validators.email],
      ],
      contactPhone: [
        this.insuranceEntity?.contactPhone || '',
        Validators.required,
      ],
      tiraLicense: [this.insuranceEntity?.tiraLicense || ''],
      insuranceTypes: [
        this.insuranceEntity?.insuranceTypes || [],
        Validators.required,
      ],
      // insuranceCompanies: [this.insuranceEntity?.insuranceCompanies || [], Validators.required],
      paymentMethods: this.fb.array([this.createPaymentMethod()]),
      adminFirstName: [
        this.insuranceEntity?.adminFirstName || '',
        [Validators.required],
      ],
      adminLastName: [
        this.insuranceEntity?.adminLastName || '',
        [Validators.required],
      ],
      adminEmail: [
        this.insuranceEntity?.adminEmail || '',
        [Validators.required, Validators.email],
      ],

      country: [this.insuranceEntity?.country || 'Tanzania', Validators.required],
      city: [this.insuranceEntity?.city || '', Validators.required],
      poBox: [this.insuranceEntity?.poBox || ''],
      floorBuilding: [this.insuranceEntity?.floorBuilding || ''],
      street: [this.insuranceEntity?.street || '', Validators.required],
    });

    this.filteredCompanies$ = this.entityForm.get('legalName')!.valueChanges.pipe(
      debounceTime(300), // Delay before calling the service (300ms)
      switchMap((query) => {
        const entityType = this.entityForm.get('type')?.value;

        if (entityType === 'insurance_broker') {
          return this.insuranceBrokerService.searchBrokerFromWeb(query).pipe(
            map((response) => response.data), // Extract the 'data' array containing the brokers
            catchError((error) => {
              console.error('Error fetching brokers:', error);
              return of([]); // Return an empty array on error
            }),
            retry(2), // Retry the request up to 2 times on error
          );
        } else if (entityType === 'insurance_company') {
          return this.insuranceCompanyService.searchCompanyFromWeb(query).pipe(
            map((response) => response.data), // Extract the 'data' array containing the companies
            catchError((error) => {
              console.error('Error fetching companies:', error);
              return of([]); // Return an empty array on error
            }),
            retry(2), // Retry the request up to 2 times on error
          );
        } else {
          return of([]); // Return an empty array if no entityType is selected
        }
      }),
      catchError((error) => {
        console.error('Error in observable stream:', error);
        return of([]); // Ensure the stream continues even if there's an error
      }),
    );
  }

  async onSubmit(): Promise<void> {
    if (this.entityForm.valid) {
      const geolocation = await this.getUserLocationByIP();
      const entityData = this.transformFormToJson(this.entityForm.value, geolocation);
      const entityType = this.entityForm.get('entityType')?.value;

      if (this.isEdit) {
        console.log('Updating Organization:', entityData);
        // this.updateOrganization(orgData);
      } else {
        console.log('Creating Organization:', entityData);

        if (entityType === 'broker') {
          this.createNewBroker(entityData);
        } else if (entityType === 'company') {
          this.createNewCompany(entityData);
        } else {
          console.error('Invalid entityType:', entityType);
        }
      }
    }
  }

  async getUserLocationByIP(): Promise<string> {
    try {
      const response = await fetch('http://ip-api.com/json/');
      const data = await response.json();
      return `${data}`;
    } catch (error) {
      console.error('Error fetching location:', error);
      return 'Unknown location';
    }
  }

  createNewBroker(entityData: any): void {
    this.insuranceBrokerService.createBroker(entityData).subscribe(
      (response) => {
        console.log('Broker Created:', response);
        this.showSuccessDialog();
      },
      (error) => {
        console.error('Error creating broker:', error);
        this.showErrorDialog(error);
      },
    );
  }

  createNewCompany(entityData: any): void {
    this.insuranceCompanyService.createCompany(entityData).subscribe(
      (response) => {
        console.log('Company Created:', response);
        this.showSuccessDialog();
      },
      (error) => {
        console.error('Error creating company:', error);
        this.showErrorDialog(error);
      },
    );
  }

  // Create new organization
  showSuccessDialog(): void {
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      data: {
        title: 'Success! Karibu! Twende kazi!',
        message:
          'Tumepokea taarifa zako na tumeshakutumia email na sms kwenye anuani na number ya simu ya <b>Account Admin</b> kuhusu taarifa za kuingia kwenye BimaSoft account yako! Kama umekwama popote tafadhali tutumie ujumbe kwa WhatsApp: +15104248843. Otherwise unaweza kuendelea.',
        navText: 'Go to Login',
        showCancel: false, // Hide the cancel button
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      // Navigate to the login page after dialog is closed
      this.router.navigate(['/authentication/login']);
    });
  }

  showErrorDialog(error: any): void {
    const errorMessage = error?.error?.message || 'An unknown error occurred.';

    const dialogRef = this.dialog.open(DialogMessageComponent, {
      data: {
        title: 'Error',
        message: `${errorMessage}. Please try again.`,
        navText: 'Try Again',
        showCancel: false, // Hide the cancel button
      },
    });

    dialogRef.afterClosed().subscribe(() => { });
  }

  createPaymentMethod() {
    return this.fb.group({
      method: ['', Validators.required],
      details: this.fb.group({
        phone_number: [''],
        account_name: [''],
        account_number: [''],
        bank_name: [''],
      }),
    });
  }

  handlePaymentMethodsChange(paymentMethods: any[]) {
    this.entityForm.patchValue({
      paymentMethods: paymentMethods,
    });
  }

  transformFormToJson(formValue: any, geolocation: string): any {
    // Ensure insuranceTypes is always an array
    const insuranceTypes = Array.isArray(formValue.insuranceTypes)
      ? formValue.insuranceTypes
      : [formValue.insuranceTypes];

    return {
      organization_type: formValue.type,
      legal_name: formValue.legalName,
      brela_number: formValue.brelaNumber,
      tin_number: formValue.tinNumber,
      contact_email: formValue.contactEmail,
      contact_phone: formValue.contactPhone,
      company_details_url: this.companyDetailsUrl,
      tira_license: formValue.tiraLicense,
      admin_first_name: formValue.adminFirstName,
      admin_last_name: formValue.adminLastName,
      admin_email: formValue.adminEmail,
      physical_address: {
        country: formValue.country,
        city: formValue.city,
        po_box: formValue.poBox,
        floor_building: formValue.floorBuilding,
        street: formValue.street,
      },
      insurance_types: insuranceTypes, // Ensured to be an array
      payment_methods: formValue.paymentMethods.map((paymentMethod: any) => ({
        method: paymentMethod.method,
        details: paymentMethod.details,
      })),
      geolocation: geolocation,
    };
  }

  onSelectCompany(company: InsuranceEntity) {
    this.companyDetailsUrl = company.companyDetailsUrl;
    let streetAddress = company.street;
    let cityName = company.city;

    this.entityForm.patchValue({
      legalName: company.legalName,
      tiraLicense: company.tiraLicense,
      contactEmail: company.contactEmail,
      contactPhone: company.contactPhone,
      street: streetAddress, // New field for street
      city: cityName, // New field for city
    });

    console.log(`Street Address: ${streetAddress}`);
    console.log(`City Name: ${cityName}`);
  }
}
