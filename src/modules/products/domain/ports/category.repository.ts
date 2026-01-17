export interface CategoryRepository {
  findById(id: string): Promise<{
    id: string;
    verticalId: string;
  } | null>;
}
