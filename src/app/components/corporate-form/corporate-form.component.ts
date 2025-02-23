import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-corporate-form',
  templateUrl: './corporate-form.component.html',
  styleUrls: ['./corporate-form.component.scss'],
})
export class CorporateFormComponent implements OnInit {
  corporateForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.corporateForm = this.fb.group({
      businessType: ['', Validators.required],
      countryOfRegistration: ['', Validators.required],
      registrationDate: ['', Validators.required],
      contactPerson: ['', [Validators.required, Validators.minLength(3)]],
      vrnOrGst: ['', Validators.required],
      registrationNumber: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.corporateForm.valid) {
      console.log('Corporate Form Submitted:', this.corporateForm.value);
    } else {
      console.log('Corporate Form is invalid!');
    }
  }
}
