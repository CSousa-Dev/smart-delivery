export interface VerticalRepository {
  existsByIds(ids: string[]): Promise<boolean>;
}
