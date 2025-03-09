import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';


interface Address {
  buildingNumber?: string;
  street?: string;
  ward?: string;
  district?: string;
  city?: string;
  region?: string;
  postcode?: string;
  country: string;
}

interface AddressSuggestion {
  display_name: string;
  lat: string;
  lon: string;
  address: Address;
}


@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class AddressFormComponent implements OnInit {
  @Output() addressUpdated = new EventEmitter<FormGroup>();
  @Input() hideSubmitButton = false; // Input property to hide the submit button
  addressForm!: FormGroup;
  addressSuggestions: AddressSuggestion[] = [];
  private nominatimUrl = 'https://nominatim.openstreetmap.org/search';
  query: string = ''; // Store the user's current input query

  isLoading = false; // For the loading spinner
  private searchSubject = new Subject<string>(); // Debounce subject for input changes

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      addressLine1: ['', [Validators.required, Validators.minLength(5)]],
      addressLine2: [''],
      district: ['', Validators.required],
      city: ['', Validators.required],
      region: ['', Validators.required],
      country: ['Tanzania', Validators.required], // Default country set to Tanzania
    });

    // Debounced search on address input
    this.searchSubject.pipe(
      debounceTime(500), // Wait 500ms after the last keystroke
      distinctUntilChanged(), // Avoid duplicate searches
      filter(query => query.length >= 3), // Only trigger search if 3+ characters are typed
      tap(() => this.isLoading = true), // Show loading spinner
      switchMap(query => {
        // If the query is empty, clear the suggestions
        if (!query) {
          this.addressSuggestions = [];
          return [];
        }

        // Perform the search query
        this.query = query; // Store the current query for substring filtering
        return this.http.get<any[]>(`${this.nominatimUrl}?q=${query}&countrycodes=TZ&format=json&addressdetails=1`);
      })
    ).subscribe(
      response => {
        this.isLoading = false;
        this.addressSuggestions = response
            .filter(item => item.address?.country_code === 'tz') // Ensure only Tanzania
            .filter(item => this.isQueryMatch(this.query, item.display_name))
            .map(item => ({
              display_name: item.display_name,
              lat: item.lat,
              lon: item.lon,
              address: {
                buildingNumber: item.address?.house_number || '',
                street: item.address?.road || '',
                ward: item.address?.ward || '',
                district: item.address?.city_district || '',
                city: item.address?.city || item.address?.town || item.address?.village || '',
                region: item.address?.region || '',
                postcode: item.address?.postcode || '',
                country: item.address?.country || 'Tanzania',
              }
            }));
      },
      error => {
        console.error('Error fetching addresses:', error);
        this.isLoading = false;
      }
    );

    this.addressForm.valueChanges.subscribe(() => {
      this.addressUpdated.emit(this.addressForm);
    });

    // Emit initial state
    this.addressUpdated.emit(this.addressForm);
  }

  isQueryMatch(query: string, displayName: string): boolean {
    if (!query) return false; // If query is empty, no need to match
    return displayName.toLowerCase().includes(query.toLowerCase());
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      console.log('Address Form Submitted:', this.addressForm.value);
    } else {
      console.log('Address Form is invalid!');
    }
  }

  // Called when the user types in the address field
  onAddressSearch(): void {
    const addressLine1 = this.addressForm.get('addressLine1')?.value;
    if (addressLine1) {
      this.searchSubject.next(addressLine1);
    }
  }

  // When user selects an address, populate the fields
  onSelectAddress(selectedAddress: any): void {
    console.log(selectedAddress.address);
  
    if (selectedAddress && selectedAddress.address) {
      const userInput = this.addressForm.get('addressLine1')?.value || ''; // Get the user input
      const addressLine1 =
        selectedAddress.address.street ||
        selectedAddress.address.house_number ||
        selectedAddress.address.road ||
        userInput; // Use the user's input if no value is available
  
      this.addressForm.patchValue({
        addressLine1: addressLine1,
        addressLine2: selectedAddress.address.neighbourhood || '',
        city: selectedAddress.address.city || selectedAddress.address.town || selectedAddress.address.village || '',
        region: selectedAddress.address.region || '',
        district: selectedAddress.address.district || '',
        country: selectedAddress.address.country || 'Tanzania', // Default to Tanzania
      });
  
      // Clear suggestions and loading state
      this.addressSuggestions = [];
      this.isLoading = false;
    }
  }  
}
