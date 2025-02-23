import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
  imports: [CommonModule, MaterialModule],
})
export class PaymentMethodComponent {
  @Output() paymentMethodsChanged = new EventEmitter<any>(); // Emits changes

  paymentMethods: FormArray;
  form: FormGroup;

  paymentTypes = [
    { value: 'Bank Transfer', label: 'Bank Transfer' },
    { value: 'Mobile Money', label: 'Mobile Money' },
    { value: 'Other', label: 'Other' },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      paymentMethods: this.fb.array([]),
    });

    this.paymentMethods = this.form.get('paymentMethods') as FormArray;
    this.addPaymentMethod(); // Add initial form group

    // Watch for changes and emit updates
    this.form.valueChanges.subscribe(() => {
      this.emitPaymentMethods();
    });
  }

  createPaymentMethod(): FormGroup {
    return this.fb.group({
      method: ['', Validators.required],
      details: this.fb.group({
        phone_number: ['', Validators.required],
        account_name: ['', Validators.required],
        account_number: [''],
        bank_name: [''],
      }),
    });
  }

  addPaymentMethod() {
    this.paymentMethods.push(this.createPaymentMethod());
    this.emitPaymentMethods();
  }

  removePaymentMethod(index: number) {
    this.paymentMethods.removeAt(index);
    this.emitPaymentMethods();
  }

  emitPaymentMethods() {
    this.paymentMethodsChanged.emit(this.form.value.paymentMethods);
  }

  isBankTransfer(index: number): boolean {
    return this.paymentMethods.at(index).get('method')?.value === 'Bank Transfer';
  }
}

