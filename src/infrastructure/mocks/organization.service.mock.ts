import { OrganizationService } from '../../modules/cart/domain/ports/organization.service';

/**
 * Mock implementation of OrganizationService for development/tests.
 * Returns static responses; replace with real API adapter when organization API is available.
 */
export class OrganizationServiceMock implements OrganizationService {
  async isVerticalValidForBusinessUnit(
    _verticalId: string,
    _businessUnitId: string
  ): Promise<boolean> {
    return true;
  }
}
