export interface Payment {
  _id: string;
  userId: string;
  cardName: string;
  cardNumber: string;
  expiryMonth: number;
  expiryYear: number;
  cardCVC: number;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentInput {
  userId?: string;
  cardName?: string;
  cardNumber?: string;
  expiryMonth?: number;
  expiryYear?: number;
  cardCVC: number;
  isDefault?: boolean;
}

export interface PaymentUpdateInput {
  _id?: string;
  userId?: string;
  cardName?: string;
  cardNumber?: string;
  expiryMonth?: number;
  expiryYear?: number;
  cardCVC: number;
  isDefault?: boolean;
}
