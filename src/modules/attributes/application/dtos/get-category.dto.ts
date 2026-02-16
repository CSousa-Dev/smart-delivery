export interface GetCategoryInput {
  categoryId: string;
}

export interface GetCategoryOutput {
  id: string;
  verticalId: string;
  parentCategoryId: string | null;
  name: string;
  code: string;
  description: string;
  depth: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}
