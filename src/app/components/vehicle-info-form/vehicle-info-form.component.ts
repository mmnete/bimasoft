import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle-info-form',
  templateUrl: './vehicle-info-form.component.html',
  styleUrls: ['./vehicle-info-form.component.scss'],
  imports: [CommonModule, MaterialModule],
})
export class VehicleInfoFormComponent {
  // Data model for the form
  vehicleInfo = {
    make: '',
    model: '',
    year: '',
    vin: '',
    plateNumber: '',
    uploadedImages: []
  };

  // Show the form to input vehicle details or upload images
  isManualInput = true; // Default is manual input

  // Output event for when form is submitted
  @Output() formSubmitted = new EventEmitter<any>();

  // Handle the image file upload
  onImageUpload(event: any): void {
    const files = event.target.files;
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // this.vehicleInfo.uploadedImages.push(URL.createObjectURL(file));
      }
    }
  }

  // Switch between manual input and AI upload
  toggleInputMethod(): void {
    this.isManualInput = !this.isManualInput;
    if (this.isManualInput) {
      // Reset images if switching to manual input
      this.vehicleInfo.uploadedImages = [];
    }
  }

  // Submit the form data
  submitForm(): void {
    if (this.isManualInput) {
      this.formSubmitted.emit(this.vehicleInfo);
    } else {
      // Handle the AI submission with uploaded images (AI processing logic)
      console.log('Submitting images for AI processing...');
      this.formSubmitted.emit(this.vehicleInfo);
    }
  }
}
