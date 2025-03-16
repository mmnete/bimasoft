

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

export interface UserDetails {
    id: number;
    email: string;
    fullName: string;
    role: string;
    organization_id: string;
    // Add other fields as needed
}

export interface LoginResponse {
    message: string;
    user: UserDetails;
    token: string;
}

// src/app/models/insurance-broker.model.ts

export interface InsuranceBroker {
    id?: number; // Optional because it might not be available when creating a new broker
    legalName: string;
    brelaNumber: string;
    tinNumber: string;
    contactEmail: string;
    contactPhone: string;
    physicalAddress?: string; // Optional field
    accountStatus?: string; // Optional field (e.g., 'active', 'pending', 'suspended')
    companyIds?: number[]; // Optional list of associated company IDs
    createdAt?: Date; // Optional field for tracking creation time
    updatedAt?: Date; // Optional field for tracking last update time
}

export interface InsuranceCompany {
    id?: number; // Optional because it might not be available when creating a new company
    legalName: string;
    brelaNumber: string;
    tinNumber: string;
    contactEmail: string;
    contactPhone: string;
    physicalAddress?: string; // Optional field
    insuranceTypes?: string[]; // Optional list of insurance types (e.g., ['health', 'motor'])
    paymentMethods?: string[]; // Optional list of payment methods (e.g., ['credit_card', 'bank_transfer'])
    accountStatus?: string; // Optional field (e.g., 'active', 'pending', 'suspended')
    companyDetailsUrl?: string; // Optional field for company details URL
    createdAt?: Date; // Optional field for tracking creation time
    updatedAt?: Date; // Optional field for tracking last update time
}

export interface InsuranceEntity {
    id?: string;
    type: string;
    legalName: string;
    brelaNumber: string;
    tinNumber: string;
    contactEmail: string;
    contactPhone: string;
    tiraLicense?: string; // Optional field
    insuranceTypes: string[]; // Array of strings
    paymentMethods: PaymentMethod[]; // Array of payment methods
    adminFirstName: string;
    adminLastName: string;
    adminEmail: string;
    country: string;
    city: string;
    poBox?: string; // Optional field
    floorBuilding?: string; // Optional field
    street: string;
    companyDetailsUrl: string; // Optional field for company details URL
}

export interface PaymentMethod {
    method: string;
    details: {
        phone_number?: string;
        account_name?: string;
        account_number?: string;
        bank_name?: string;
    };
}


// Motor.
export interface MotorDetails {
    make: string;
    model: string;
    vehicleType: string;
};

export interface MotorResponse {
    make: string;
    model: string;
    vehicleType: string;
    iconUrl: string; // URL of the icon based on vehicle type
    isCommercial: boolean;
};

export type VehicleType = 'Car' | 'Bike' | 'Bus' | 'Truck' | 'Van' | 'Unknown';

// Policies.
export type InsurancePolicy = {
    id: string;
    type: string;
    description: string;
    price: number; // Price in USD
    vehicleTypes: VehicleType[]; // Applicable vehicle types
    backgroundImage: string;
};

export const insurancePolicies: InsurancePolicy[] = [
    {
        id: '1',
        type: 'Third-Party Liability',
        description: 'Covers damages or injuries caused to others in an accident. Required by law in Tanzania.',
        price: 150000, // Price in Tanzanian Shillings (TZS)
        vehicleTypes: ['Car', 'Bike', 'Truck', 'Van', 'Bus'],
        backgroundImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '2',
        type: 'Comprehensive Coverage',
        description: 'Covers theft, accidents, and damages to your vehicle. Ideal for personal cars and bikes.',
        price: 500000, // Price in Tanzanian Shillings (TZS)
        vehicleTypes: ['Car', 'Bike'],
        backgroundImage: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '3',
        type: 'Commercial Vehicle Insurance',
        description: 'Designed for daladalas, trucks, and other commercial vehicles operating in Tanzania.',
        price: 1000000, // Price in Tanzanian Shillings (TZS)
        vehicleTypes: ['Bus', 'Truck', 'Van'],
        backgroundImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '4',
        type: 'Bodaboda Insurance',
        description: 'Specialized coverage for motorbikes (bodabodas), including third-party and theft protection.',
        price: 75000, // Price in Tanzanian Shillings (TZS)
        vehicleTypes: ['Bike'],
        backgroundImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '5',
        type: 'Agricultural Vehicle Insurance',
        description: 'Covers tractors and other agricultural vehicles used in farming activities.',
        price: 300000, // Price in Tanzanian Shillings (TZS)
        vehicleTypes: ['Truck', 'Van'],
        backgroundImage: 'https://images.unsplash.com/photo-1581093458799-e8b1c5d7a6f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
];