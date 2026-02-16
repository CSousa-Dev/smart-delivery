export interface UpdateCategoryInput {
  categoryId: string;
  name: string;
  code: string;
  description: string;
  parentCategoryId?: string | null;
}

export interface UpdateCategoryOutput {
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
