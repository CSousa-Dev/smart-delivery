/**
 * Payload enviado à API de produtos para validar item (catálogo + addons + removals em uma chamada).
 */
export type ProductValidationPayload = {
  sku: string;
  quantity: number;
  addons: { sku: string; quantity: number }[];
  removals: { sku: string; quantity: number }[];
};

/**
 * Erro de validação retornado pela API de produtos (propagado no erro da aplicação).
 */
export type ProductValidationErrorItem = {
  code: string;
  related_sku: string;
};

/**
 * Resposta da API de produtos para validação.
 */
export type ProductValidationResult = {
  isValid: boolean;
  productValidationErrors: ProductValidationErrorItem[];
};
