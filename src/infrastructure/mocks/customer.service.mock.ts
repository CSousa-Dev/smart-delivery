import { CustomerService } from '../../modules/cart/domain/ports/customer.service';

/**
 * Mock implementation of CustomerService for development/tests.
 * Returns static responses; replace with real API adapter when customer API is available.
 */
export class CustomerServiceMock implements CustomerService {
  async existsInBusinessUnit(
    _customerId: string,
    _businessUnitId: string
  ): Promise<boolean> {
    return true;
  }

  async validateCustomerAddressId(
    _customerId: string,
    _customerAddressId: string
  ): Promise<boolean> {
    return true;
  }
}
