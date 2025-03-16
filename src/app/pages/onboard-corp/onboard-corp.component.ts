import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/app/material.module';
import { InsuranceEntityFormComponent } from '../../components/insurance-entity-form/insurance-entity-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { InsuranceEntity } from '../../types'; 

@Component({
  selector: 'app-onboard-corp',
  imports: [MatIconModule, MaterialModule, InsuranceEntityFormComponent],
  templateUrl: './onboard-corp.component.html',
  styleUrl: './onboard-corp.component.scss',
})
export class OnboardCorpComponent {
  pageTitle: string = 'New Company';
  organizationData: InsuranceEntity;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const orgId = params.get('id');

      if (orgId) {
        // Simulate fetching the organization details (Replace with actual API call)
        this.organizationData = {
          id: orgId,
          type: 'insurance-company',
          legalName: 'Example Insurance Company Ltd',
          brelaNumber: '123456789',
          tinNumber: '987654321',
          contactEmail: 'info@exampleinsurance.com',
          contactPhone: '+255712345678',
          tiraLicense: 'TIRA-12345', // Optional field
          insuranceTypes: ['motor', 'health'], // Array of strings
          paymentMethods: [
            {
              method: 'bank',
              details: {
                account_name: 'Example Insurance Company',
                account_number: '1234567890',
                bank_name: 'Example Bank',
              },
            },
            {
              method: 'mobile',
              details: {
                phone_number: '+255712345678',
              },
            },
          ],
          adminFirstName: 'John',
          adminLastName: 'Doe',
          adminEmail: 'john.doe@exampleinsurance.com',
          country: 'Tanzania',
          city: 'Dar es Salaam',
          poBox: '12345', // Optional field
          floorBuilding: '5th Floor, Example Building', // Optional field
          street: '123 Example Street',
          companyDetailsUrl: 'https://exampleinsurance.com/details', // Optional field
        };

        this.pageTitle = 'Edit Organization Details ✏️';
      }
    });
  }

  goBack(): void {
    this.location.back(); // Navigates to the previous page
  }
}
