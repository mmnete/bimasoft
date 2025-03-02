import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { OrganizationService } from '../../services/organization-service.service'; // Import the service
import { OrgScraperService } from '../../services/org-scraper.service';
import { ActivatedRoute, Router } from '@angular/router'; // For handling routes
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PaymentMethodComponent } from '../payment-method/payment-method.component';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { Observable } from 'rxjs';
import { debounceTime, switchMap, map } from 'rxjs/operators';


interface Company {
  company_name: string; // company name (assuming this is the field you're filtering by)
  date_of_license: string;
  number_of_license: string;
  status: string;
  country: string;
  phone: string;
  email: string;
  address: string | null;
  profile_url: string;
  type?: string; // Optional type for distinguishing brokers vs companies
  date_of_application?: string; // Optional field, if it exists in some data
  class_of_business?: string; // Optional field, if it exists in some data
}


@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss'],
  imports: [CommonModule, PaymentMethodComponent, MatAutocompleteModule, MaterialModule, ReactiveFormsModule],
})
export class OrganizationFormComponent implements OnInit {
  @Input() organization: any; // Pass organization data if editing
  orgForm!: FormGroup;
  isEdit: boolean = false;
  filteredCompanies$: Observable<any[]>;

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
    private organizationService: OrganizationService, // Inject the service
    private router: Router, // For navigation
    private route: ActivatedRoute, // For route params (if editing)
    private dialog: MatDialog,
    private orgScraperService: OrgScraperService
  ) { }

  ngOnInit(): void {
    this.isEdit = !!this.organization;

    this.orgForm = this.fb.group({
      organizationType: [this.organization?.organizationType || '', Validators.required],
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

      country: [this.organization?.country || 'Tanzania', Validators.required],
      city: [this.organization?.city || '', Validators.required],
      poBox: [this.organization?.poBox || ''],
      floorBuilding: [this.organization?.floorBuilding || ''],
      street: [this.organization?.street || '', Validators.required],
    });

    this.filteredCompanies$ = this.orgForm.get('legalName')!.valueChanges.pipe(
      debounceTime(300),  // Delay before calling the service (300ms)
      switchMap(query => 
        this.orgScraperService.searchCompany(query).pipe(
          map((response) => response.data)  // Extract the 'data' array containing the companies
        )
      )
    );
  }

  onSubmit(): void {
    if (this.orgForm.valid) {
      var geolocation = '';

      // try {
      //    geolocation = await this.getUserGeolocation();
      //   } catch (error) {
      //     console.error('Error fetching geolocation or sending data:', error);
      // }

      const orgData = this.transformFormToJson(this.orgForm.value, geolocation);

      if (this.isEdit) {
        console.log('Updating Organization:', orgData);
        // this.updateOrganization(orgData);
      } else {
        console.log('Creating Organization:', orgData);
        this.createOrganization(orgData);
      }
    }
  }

  getUserGeolocation(): Promise<string> {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    resolve(`Latitude: ${latitude}, Longitude: ${longitude}`);
                },
                (error) => {
                    reject('Error retrieving geolocation');
                }
            );
        } else {
            reject('Geolocation is not supported by this browser.');
        }
    });
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
            message: 'Your company has been created successfully. We will send you login details via email while your account is under review.',
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

        dialogRef.afterClosed().subscribe(() => { });
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

  transformFormToJson(formValue: any, geolocation: string): any {
    // Ensure insuranceTypes is always an array
    const insuranceTypes = Array.isArray(formValue.insuranceTypes)
      ? formValue.insuranceTypes
      : [formValue.insuranceTypes];
  
    return {
      organization_type: formValue.organizationType,
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
  

  onSelectCompany(company: Company) {
    let streetAddress = '';
    let cityName = '';

    if (company.address) {
        const addressParts = company.address.split(',').map(part => part.trim()); // Trim spaces
        
        if (addressParts.length === 3) {
            // Expected format: "123 Main St, Dar es Salaam, Tanzania"
            streetAddress = addressParts[0];  // Street
            cityName = addressParts[1];       // City
        } else if (addressParts.length === 2) {
            // Case: "Dar es Salaam, Tanzania" (No street address)
            cityName = addressParts[0];  // Treat first part as city
        } else {
            // Edge case: Unknown format, assign whole address to street
            streetAddress = company.address;
        }
    }

    this.orgForm.patchValue({
        organizationType: company.type,
        legalName: company.company_name,
        tiraLicense: company.number_of_license,
        contactEmail: company.email,
        contactPhone: company.phone,
        street: streetAddress,  // New field for street
        city: cityName,            // New field for city
    });

    console.log(`Street Address: ${streetAddress}`);
    console.log(`City Name: ${cityName}`);
}


}
