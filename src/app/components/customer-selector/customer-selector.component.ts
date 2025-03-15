import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer-service.service';

@Component({
  selector: 'app-customer-selector',
  templateUrl: './customer-selector.component.html',
  styleUrls: ['./customer-selector.component.scss'],
  imports: [CommonModule, MaterialModule]
})
export class CustomerSelectorComponent {
  @Input() customerType: string = 'individual';
  searchTerm: string = '';
  customers: any[] = [];
  filteredCustomers: any[] = [];
  selectedCustomer: any = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
      this.customerService.getCustomers(this.searchTerm, this.customerType).subscribe(customers => {
          this.customers = customers;
          this.filteredCustomers = customers;
      });
  }

  selectCustomer(customer: any) {
      this.selectedCustomer = customer;
  }
}
