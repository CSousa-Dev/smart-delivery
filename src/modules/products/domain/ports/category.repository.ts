export interface CategoryRepository {
  findById(id: string): Promise<{
    id: string;
    verticalCode: string;
    verticalId: string;
  } | null>;
}
