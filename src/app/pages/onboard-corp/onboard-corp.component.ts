import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/app/material.module';
import { OrganizationFormComponent } from '../../components/organization-form/organization-form.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-onboard-corp',
  imports: [MatIconModule, MaterialModule, OrganizationFormComponent],
  templateUrl: './onboard-corp.component.html',
  styleUrl: './onboard-corp.component.scss',
})
export class OnboardCorpComponent {
  pageTitle: string = 'New Company';
  organizationData: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const orgId = params.get('id');

      if (orgId) {
        // Simulate fetching the organization details (Replace with actual API call)
        this.organizationData = {
          organizationTpe: 'insurance_company',
          legalName: 'Example Corp',
          brelaNumber: '123456',
          tinNumber: '7891011',
          contactEmail: 'info@example.com',
          contactPhone: '+255123456789',
          tiraLicense: 'TIRA-9999',
          contactPersonName: 'John Doe',
          contactPersonRole: 'CEO',
          contactPersonEmail: 'john@example.com',
          contactPersonPhone: '+255987654321',
          insuranceTypes: ['health', 'auto'],
          paymentMethod: 'bank',
          adminUsername: 'admin_example',
          adminEmail: 'admin@example.com',
        };

        this.pageTitle = 'Edit Organization Details ✏️';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']); // Navigates back to the root or any page you specify
  }
}
