import { BusinessUnitVerticalLink } from '../entities/business-unit-vertical-link.entity';
import { VerticalLinkStatusValue } from '../entities/vertical-link-status';

export interface BusinessUnitVerticalRepository {
  saveMany(links: BusinessUnitVerticalLink[]): Promise<void>;
  save(link: BusinessUnitVerticalLink): Promise<void>;
  listByBusinessUnitId(businessUnitId: string): Promise<BusinessUnitVerticalLink[]>;
  findByBusinessUnitAndVerticalCode(
    businessUnitId: string,
    verticalCode: string
  ): Promise<BusinessUnitVerticalLink | null>;
  findActiveByBusinessUnitAndVerticalCode(
    businessUnitId: string,
    verticalCode: string
  ): Promise<BusinessUnitVerticalLink | null>;
  updateStatus(
    businessUnitId: string,
    verticalCode: string,
    status: VerticalLinkStatusValue
  ): Promise<void>;
  countActiveByBusinessUnitId(businessUnitId: string): Promise<number>;
}
