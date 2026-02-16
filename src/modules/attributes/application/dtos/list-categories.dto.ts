export interface ListCategoriesInput {
  verticalId?: string;
}

export interface ListCategoriesOutput {
  items: Array<{
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
  }>;
}
