export interface ProductRepository {
  findById(id: string): Promise<{ id: string; businessUnitId: string } | null>;
}
