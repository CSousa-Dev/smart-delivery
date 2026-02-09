export type AddCouponInputDTO = {
  cartId: string;
  actorUserId: string;
  coupon: {
    code: string;
  };
};
