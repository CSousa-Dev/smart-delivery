export class DeliveryPlan {
  constructor(
    public readonly planId: string,
    public readonly addressId: string,
    public readonly price: number
  ) {
    if (!planId || !addressId) {
      throw new Error('PlanId and addressId are required for DeliveryPlan.');
    }
    if (price < 0) {
      throw new Error('Delivery price cannot be negative.');
    }
  }
}
