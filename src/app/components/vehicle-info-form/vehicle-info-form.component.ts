import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrganizationService } from '../../services/organization-service.service'; // Import the service
import { debounceTime, switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-vehicle-info-form',
  templateUrl: './vehicle-info-form.component.html',
  styleUrls: ['./vehicle-info-form.component.scss'],
  imports: [CommonModule, MaterialModule],
})
export class VehicleInfoFormComponent implements OnInit {
  vehicleForm: FormGroup;
  insuranceStatusMessage: string = ''; // To display the status message

  constructor(private fb: FormBuilder, private organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      plateNumber: ['', [Validators.required], [this.plateNumberAsyncValidator.bind(this)]],
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      vin: ['', Validators.required],
    });
  }

  plateNumberAsyncValidator(control: any) {
    let plateNumber = control.value;
  
    if (!plateNumber) {
      return of(null); // Return null if the plate number is empty
    }
  
    // Remove spaces and convert the plate number to uppercase
    plateNumber = plateNumber.replace(/\s+/g, '').toUpperCase(); 
  
    // Local validation of the plate number (for example, checking length and format)
    const plateNumberRegex = /^[A-Z]{1}\d{3}[A-Z]{3}$/; // Example regex for Tanzanian plates (e.g., T878DGD)
    if (!plateNumberRegex.test(plateNumber)) {
      return of({ invalidPlateNumber: true }); // Plate number format is invalid
    }
  
    // If local validation passes, proceed to check insurance status via API
    return this.organizationService.verifyMotor(plateNumber).pipe(
      debounceTime(500), // Debounce to avoid multiple requests
      switchMap((response: any) => {
        if (response && response.data && response.data.coverNoteNumber) {
          // Vehicle is insured
          this.insuranceStatusMessage = 'Vehicle is insured';
          return of(null); // No errors
        } else {
          // Vehicle is not insured or not found
          this.insuranceStatusMessage = 'Vehicle is not insured or not found';
          return of({ notInsured: true });
        }
      }),
      catchError((error) => {
        // Handle error (for example, network issue)
        this.insuranceStatusMessage = 'Error verifying vehicle insurance';
        return of({ serverError: true });
      })
    );
  }

  submitForm(): void {
    if (this.vehicleForm.valid) {
      console.log('Form Submitted!', this.vehicleForm.value);
    } else {
      console.log('Form is not valid');
    }
  }
}

