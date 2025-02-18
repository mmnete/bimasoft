import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  // <-- Import ReactiveFormsModule

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  imports: [ReactiveFormsModule],
})
export class AddressFormComponent implements OnInit {
  addressForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      addressLine1: ['', [Validators.required, Validators.minLength(5)]],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      country: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      console.log('Address Form Submitted:', this.addressForm.value);
    } else {
      console.log('Address Form is invalid!');
    }
  }
}
