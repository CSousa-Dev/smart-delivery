import { getEventBus } from '../../../../shared/events';
import { CartEventPublisherAdapter } from '../events/cart-event-publisher.adapter';
import { CustomerServiceMock } from '../../../../infrastructure/mocks/customer.service.mock';
import { OrganizationServiceMock } from '../../../../infrastructure/mocks/organization.service.mock';
import { ProductServiceMock } from '../../../../infrastructure/mocks/product.service.mock';
import { OperationsServiceMock } from '../../../../infrastructure/mocks/operations.service.mock';
import { AddressValidationServiceMock } from '../../../../infrastructure/mocks/address-validation.service.mock';
import { FulfillmentServiceMock } from '../../../../infrastructure/mocks/fulfillment.service.mock';
import { PaymentServiceMock } from '../../../../infrastructure/mocks/payment.service.mock';
import { OrderServiceMock } from '../../../../infrastructure/mocks/order.service.mock';
import { PricingServiceMock } from '../../../../infrastructure/mocks/pricing.service.mock';

/**
 * Cart adapters: event publisher, customer/organization (open cart), product + operations (add item).
 */
export function createCartAdapters() {
  const eventBus = getEventBus();
  return {
    cartEventPublisher: new CartEventPublisherAdapter(eventBus),
    customerService: new CustomerServiceMock(),
    organizationService: new OrganizationServiceMock(),
    productService: new ProductServiceMock(),
    operationsService: new OperationsServiceMock(),
    addressValidationService: new AddressValidationServiceMock(),
    fulfillmentService: new FulfillmentServiceMock(),
    paymentService: new PaymentServiceMock(),
    orderService: new OrderServiceMock(),
    pricingService: new PricingServiceMock(),
  };
}
