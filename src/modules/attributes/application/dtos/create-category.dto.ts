export interface CreateCategoryInput {
  verticalId: string;
  parentCategoryId?: string | null;
  name: string;
  code: string;
  description: string;
}

export interface CreateCategoryOutput {
  id: string;
  verticalId: string;
  parentCategoryId: string | null;
  name: string;
  code: string;
  description: string;
  depth: number;
  createdAt: Date;
}
