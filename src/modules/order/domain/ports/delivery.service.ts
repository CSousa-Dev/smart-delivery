export interface DeliveryService {
  canDeliverToAddress(addressId: string): Promise<boolean>;
}
