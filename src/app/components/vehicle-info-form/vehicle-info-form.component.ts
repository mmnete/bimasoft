import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MotorService } from '../../services/motor/motor.service';
import { Observable, of } from 'rxjs';
import { startWith, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MotorResponse, InsurancePolicy, insurancePolicies, VehicleType } from '../../types'; // Import the MotorResponse type

@Component({
  selector: 'app-vehicle-info-form',
  templateUrl: './vehicle-info-form.component.html',
  styleUrls: ['./vehicle-info-form.component.scss'],
  imports: [CommonModule, MaterialModule],
})
export class VehicleInfoFormComponent implements OnInit {
  vehicleForm: FormGroup;
  filteredOptions: Observable<MotorResponse[]> = of([]); // Initialize with an empty observable
  motorOptions: MotorResponse[] = []; // List of motor options
  selectedVehicle: MotorResponse | null = null; // Track the selected vehicle
  insurancePolicies: InsurancePolicy[] = []; // List of filtered insurance policies

  constructor(private fb: FormBuilder, private motorService: MotorService) {
    this.vehicleForm = this.fb.group({
      plateNumber: ['', Validators.required],
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      vin: ['', Validators.required],
      search: [''], // New form control for search input
      selectedPolicy: [''], // Form control for selected insurance policy
    });
  }

  ngOnInit(): void {
    // Watch for changes in the search input
    this.vehicleForm
      .get('search')
      ?.valueChanges.pipe(
        startWith(''), // Start with an empty string
        debounceTime(300), // Wait for 300ms after the user stops typing
        distinctUntilChanged() // Only emit if the value has changed
      )
      .subscribe((value) => {
        console.log('Search Value:', value); // Debugging: Log the search value
        if (value && value.length >= 3) {
          this.motorService.getMotorDetails(value).subscribe((data) => {
            console.log('API Response:', data); // Debugging: Log the API response
            this.motorOptions = data;
          });
        } else {
          this.motorOptions = []; // Clear options if the search term is too short
        }
      });
  
    // Set up filtered options for auto-complete
    const searchControl = this.vehicleForm.get('search');
    if (searchControl) {
      this.filteredOptions = searchControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
    }
  }

  // Filter function for auto-complete
  private _filter(value: string): MotorResponse[] {
    const filterValue = value.toLowerCase();
    return this.motorOptions.filter((option) =>
      `${option.make} ${option.model}`.toLowerCase().includes(filterValue)
    );
  }

  // Handle vehicle selection
  onVehicleSelected(vehicle: MotorResponse) {
    this.selectedVehicle = vehicle;
    this.vehicleForm.patchValue({
      make: vehicle.make,
      model: vehicle.model,
    });

    // Filter insurance policies based on the selected vehicle type
    this.insurancePolicies = insurancePolicies.filter((policy) =>
      true
      // policy.vehicleTypes.includes(this.getVehicleType(vehicle.vehicleType))
    );
  }

  // Determine the vehicle type
  getVehicleType(vehicleType: string): VehicleType {
    if (vehicleType.includes('Car')) return 'Car';
    if (vehicleType.includes('Bike') || vehicleType.includes('Motorcycle')) return 'Bike';
    if (vehicleType.includes('Bus')) return 'Bus';
    if (vehicleType.includes('Truck')) return 'Truck';
    if (vehicleType.includes('Van')) return 'Van';
    return 'Unknown';
  }

  // Handle form submission
  submitForm() {
    if (this.vehicleForm.valid) {
      console.log('Form Submitted:', this.vehicleForm.value);
      // Add your form submission logic here
    }
  }

  // Display function for auto-complete
  displayFn(motor: MotorResponse): string {
    return motor ? `${motor.make} ${motor.model}` : '';
  }
}

