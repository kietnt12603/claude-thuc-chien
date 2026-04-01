export type PaymentStatus = 'unpaid' | 'paid';

export const PAYMENT_STATUS = {
  UNPAID: 'unpaid',
  PAID: 'paid',
} as const;
