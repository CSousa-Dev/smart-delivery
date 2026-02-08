/**
 * Resultado de validação: apenas se pode ou não (isValid).
 * Em caso de inválido, reason descreve o motivo.
 */
export type ValidationResult = {
  isValid: boolean;
  reason: string;
};
