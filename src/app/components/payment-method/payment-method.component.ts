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
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'mobile_money', label: 'Mobile Money' },
  ];

  mobileNetworks = [
    { value: 'mpesa', label: 'M-Pesa' },
    { value: 'tigopesa', label: 'Tigo Pesa' },
    { value: 'airtelmoney', label: 'Airtel Money' },
    { value: 'halopesa', label: 'HaloPesa' },
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
        phone_number: [''],
        mobile_network: [''],
        bank_name: [''],
        account_name: [''],
        account_number: [''],
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

  isMobileMoney(index: number): boolean {
    return (
      this.paymentMethods.at(index).get('method')?.value === 'mobile_money'
    );
  }

  isBankTransfer(index: number): boolean {
    return (
      this.paymentMethods.at(index).get('method')?.value === 'bank_transfer'
    );
  }

  onPaymentMethodChange(index: number) {
    const paymentMethod = this.paymentMethods.at(index);
    const method = paymentMethod.get('method')?.value;
    const details = paymentMethod.get('details');

    if (method === 'mobile_money') {
      details?.patchValue({ phone_number: '', mobile_network: '' });
    } else if (method === 'bank_transfer') {
      details?.patchValue({
        bank_name: '',
        account_name: '',
        account_number: '',
      });
    }
  }
}
