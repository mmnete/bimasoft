import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../services/organization-service.service'; // Import the service
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';  // Add this import
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';  // <-- Import this

@Component({
  selector: 'app-pending-companies',
  templateUrl: './pending-companies.component.html',
  styleUrls: ['./pending-companies.component.scss'],
  imports: [MatInputModule, CommonModule, MaterialModule, FormsModule]
})
export class PendingCompaniesComponent implements OnInit {
  pageTitle: string = 'Approve Companies';
  companies: any[] = []; // Array to store companies
  totalCount:number = 0;
  loading: boolean = true; // Loading state
  password: string = '';

  constructor(private organizationService: OrganizationService, private router: Router) {}

  ngOnInit(): void {
    this.fetchPendingCompanies();
  }

  goBack(): void {
    this.router.navigate(['/']); // Navigates back to the root or any page you specify
  }

  fetchPendingCompanies(): void {
    this.organizationService.fetchPendingCompanies().subscribe(
      (response) => {
        this.totalCount = response.count;
        this.companies = response.companies; // Store the companies
        this.loading = false; // Set loading to false
      },
      (error) => {
        console.error('Error fetching pending companies:', error);
        this.loading = false;
      }
    );
  }

  // This method can be used for approving companies
  approveCompany(companyId: number): void {
    if (!this.password) {
      alert('Please enter your password!');
      return;
    }

    console.log('Approving company with ID:', companyId);

    // Call the approveCompany method from the service
    this.organizationService.approveCompany(companyId, this.password).subscribe(
      (response) => {
        console.log('Company approved:', response);
        
        // Remove the company from the list after approval
        this.companies = this.companies.filter(company => company.id !== companyId);
      },
      (error) => {
        console.error('Error approving company: ', error);
        alert('Failed to approve the company.');
      }
    );
  }

  onPanelOpen(company: any): void {
    console.log('Opening details for:', company.name);
  }
}
