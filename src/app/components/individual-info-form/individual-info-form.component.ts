import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // <-- Import ReactiveFormsModule

@Component({
  selector: 'app-individual-info-form',
  templateUrl: './individual-info-form.component.html',
  styleUrls: ['./individual-info-form.component.scss'],
  imports: [ReactiveFormsModule],
})
export class IndividualInfoFormComponent implements OnInit {
  @Input() showSubmitButton: boolean = true; // Input to control submit button visibility
  @Output() formData = new EventEmitter<any>(); // Emit form data back to parent
  individualInfoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.individualInfoForm = this.fb.group({
      title: ['', Validators.required],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      dateOfBirth: ['', Validators.required],
      nationality: ['', Validators.required],
      placeOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      occupation: [''],
      disabilityStatus: [''],
      clientSubStatus: [''],
      relatedParty: [false],
    });

    this.individualInfoForm.valueChanges.subscribe(() => {
      if (this.individualInfoForm.valid) {
        this.formData.emit(this.individualInfoForm.value); // Emit form data when form is valid
      }
    });
  }

  onSubmit(): void {
    if (this.individualInfoForm.valid) {
      console.log('Form Submitted:', this.individualInfoForm.value);
    } else {
      console.log('Form is invalid!');
    }
  }
}
