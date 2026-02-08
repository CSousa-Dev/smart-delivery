import { FulfillmentService, FulfillmentPlanRequest } from '../../modules/cart/domain/ports/fulfillment.service';
import { DeliveryPlan } from '../../modules/cart/domain/entities/delivery-plan.entity';

export class FulfillmentServiceMock implements FulfillmentService {
  async createDeliveryPlan(input: FulfillmentPlanRequest): Promise<DeliveryPlan> {
    return new DeliveryPlan(`plan-${input.addressId}`, input.addressId, 0);
  }
}
