import { BusinessUnitVerticalLink } from '../entities/business-unit-vertical-link.entity';
import { VerticalLinkStatusValue } from '../entities/vertical-link-status';

export interface BusinessUnitVerticalRepository {
  saveMany(links: BusinessUnitVerticalLink[]): Promise<void>;
  save(link: BusinessUnitVerticalLink): Promise<void>;
  listByBusinessUnitId(businessUnitId: string): Promise<BusinessUnitVerticalLink[]>;
  findByBusinessUnitAndVerticalId(
    businessUnitId: string,
    verticalId: string
  ): Promise<BusinessUnitVerticalLink | null>;
  findActiveByBusinessUnitAndVerticalId(
    businessUnitId: string,
    verticalId: string
  ): Promise<BusinessUnitVerticalLink | null>;
  updateStatus(
    businessUnitId: string,
    verticalId: string,
    status: VerticalLinkStatusValue
  ): Promise<void>;
  countActiveByBusinessUnitId(businessUnitId: string): Promise<number>;
}
