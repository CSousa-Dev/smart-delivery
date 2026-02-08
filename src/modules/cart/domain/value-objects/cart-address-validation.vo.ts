export class CartAddressValidation {
  constructor(
    public readonly addressId: string,
    public readonly isValid: boolean,
    public readonly reason?: string
  ) {}
}
