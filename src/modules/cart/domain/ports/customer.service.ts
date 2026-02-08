export interface CustomerService {
  existsInBusinessUnit(customerId: string, businessUnitId: string): Promise<boolean>;
  validateCustomerAddressId(customerId: string, customerAddressId: string): Promise<boolean>;
}
