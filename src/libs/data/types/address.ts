export interface Address {
  _id: string;
  userId: string;
  label: string;
  city: string;
  street: string;
  state: string;
  zipcode: string;
  country: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddressInput {
  userId: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  isDefault?: boolean;
}

export interface AddressUpdateInput {
  _id: string;
  label?: string;
  street?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
  isDefault?: boolean;
}
