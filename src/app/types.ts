

export interface UploadedFiles {
  id: File | null;
  license: File | null;
  vehicleRegistration: File | null;
  photo: File | null;
  tin: File | null;
}

export interface CustomerType {
  full_name: string;
  gender: string;
  marital_status: string;
  physical_address: string; // Store as a string or structured object, not JSON string
  national_id: string;
  drivers_license: string;
  passport_number: string;
  email: string;
  phone_number: string;
  organization_id: string; // assuming organizationId is a string
}

