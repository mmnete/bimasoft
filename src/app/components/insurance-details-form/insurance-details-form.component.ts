import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

interface InsuranceDetails {
  policyType: string;
  startDate: string;
  endDate: string;
  vehicleValue: string;
  insuredAmount: string;
  coverageType: string;
  thirdPartyCoverage: boolean;
  passengerCoverage: boolean;
  theftCoverage: boolean;
  deductible: string;
  premiumAmount: string;
  agentName: string;
  agentPhone: string;
  uploadedDocuments: string[]; // Explicitly defined as an array of strings
}

@Component({
  selector: 'app-insurance-details-form',
  templateUrl: './insurance-details-form.component.html',
  styleUrls: ['./insurance-details-form.component.css'],
  imports: [CommonModule, MaterialModule],
})
export class InsuranceDetailsFormComponent {
  // Data model for the form
  insuranceDetails: InsuranceDetails = {
    policyType: '',
    startDate: '',
    endDate: '',
    vehicleValue: '',
    insuredAmount: '',
    coverageType: '',
    thirdPartyCoverage: false,
    passengerCoverage: false,
    theftCoverage: false,
    deductible: '',
    premiumAmount: '',
    agentName: '',
    agentPhone: '',
    uploadedDocuments: []
  };

  // List of policy types for Tanzanian motor insurance
  policyTypes = ['Third Party', 'Comprehensive', 'Third Party, Fire and Theft'];

  // List of coverage options for Tanzanian motor insurance
  coverageTypes = ['Comprehensive', 'Third Party', 'Passenger', 'Theft'];

  // Output event for when form is submitted
  @Output() formSubmitted = new EventEmitter<any>();

  // Handle the image file upload for documents
  onDocumentUpload(event: any): void {
    const files = event.target.files;
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // this.insuranceDetails.uploadedDocuments.push(URL.createObjectURL(file));
      }
    }
  }

  // Submit the form data
  submitForm(): void {
    // Emit the form data to the parent component
    this.formSubmitted.emit(this.insuranceDetails);
  }
}
