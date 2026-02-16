export interface ListVerticalsOutput {
  items: Array<{
    id: string;
    name: string;
    code: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date | null;
  }>;
}
