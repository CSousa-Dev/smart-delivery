import {
  CategoryDepthExceededError,
  InvalidCategoryHierarchyError,
  ParentCategoryDifferentVerticalError,
} from '../errors/category.errors';

export interface CategoryHierarchyNode {
  id: string;
  verticalId: string;
  parentCategoryId: string | null;
  depth: number;
}

export class CategoryHierarchyService {
  private static readonly MAX_DEPTH = 5;

  validateParent(parent: CategoryHierarchyNode, verticalId: string): void {
    if (parent.verticalId !== verticalId) {
      throw new ParentCategoryDifferentVerticalError(parent.id, verticalId);
    }
  }

  validateHierarchy(
    parent: CategoryHierarchyNode,
    ancestors: CategoryHierarchyNode[],
    childId?: string
  ): number {
    const nodeIds = new Set<string>(ancestors.map((node) => node.id));
    if (
      nodeIds.has(parent.id) ||
      (childId && (nodeIds.has(childId) || parent.id === childId))
    ) {
      throw new InvalidCategoryHierarchyError();
    }

    const depth = parent.depth + 1;
    if (depth > CategoryHierarchyService.MAX_DEPTH) {
      throw new CategoryDepthExceededError(depth);
    }

    return depth;
  }

  getMaxDepth(): number {
    return CategoryHierarchyService.MAX_DEPTH;
  }
}
