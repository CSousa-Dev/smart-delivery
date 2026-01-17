export interface CreateVerticalInput {
  name: string;
  code: string;
  description: string;
}

export interface CreateVerticalOutput {
  id: string;
  name: string;
  code: string;
  description: string;
  createdAt: Date;
}
