export interface ProductValidationError {
  productId: string;
  status: 'NOT_FOUND' | 'UNAVAILABLE';
}
