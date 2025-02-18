import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info-form.component.html',
  styleUrls: ['./vehicle-info-form.component.scss']
})
export class VehicleInfoFormComponent {
  vehicleForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.vehicleForm = this.fb.group({
      ownerName: ['', [Validators.required, Validators.minLength(3)]],
      vehicleMake: ['', Validators.required],
      vehicleModel: ['', Validators.required],
      vehicleYear: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      vehicleVIN: ['', [Validators.required, Validators.pattern('^[A-HJ-NPR-Z0-9]{17}$')]],
      vehicleRegistration: ['', Validators.required],
      insuranceType: ['', Validators.required],
      premiumAmount: ['', [Validators.required, Validators.min(100), Validators.max(5000)]],
      coverageDetails: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.vehicleForm.valid) {
      console.log('Form submitted:', this.vehicleForm.value);
    } else {
      console.log('Form is not valid');
    }
  }
}
