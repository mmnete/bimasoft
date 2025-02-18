import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-communication-form',
  templateUrl: './communication-form.component.html',
  styleUrls: ['./communication-form.component.scss']
})
export class CommunicationFormComponent implements OnInit {
  communicationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.communicationForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      email: ['', [Validators.required, Validators.email]],
      alternatePhone: ['', Validators.pattern('^[0-9]{10,15}$')],
      preferredContactMethod: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.communicationForm.valid) {
      console.log('Communication Form Submitted:', this.communicationForm.value);
    } else {
      console.log('Communication Form is invalid!');
    }
  }
}
