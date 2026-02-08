import { DeliveryPlan } from '../entities/delivery-plan.entity';

export type FulfillmentPlanRequest = {
  cartId: string;
  customerId: string;
  businessUnitId: string;
  verticalId: string;
  addressId: string;
};

export interface FulfillmentService {
  createDeliveryPlan(input: FulfillmentPlanRequest): Promise<DeliveryPlan>;
}
