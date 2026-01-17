import {
  ListBusinessUnitsInput,
  ListBusinessUnitsOutput,
} from '../dtos/list-business-units.dto';
import { BusinessUnitRepository } from '../../domain/repositories/business-unit.repository';

export class ListBusinessUnitsService {
  constructor(private readonly businessUnitRepository: BusinessUnitRepository) {}

  async execute(input: ListBusinessUnitsInput): Promise<ListBusinessUnitsOutput> {
    const page = input.page && input.page > 0 ? input.page : 1;
    const pageSize =
      input.pageSize && input.pageSize >= 1 && input.pageSize <= 100 ? input.pageSize : 20;
    const sortDirection =
      input.sortDirection === 'asc' || input.sortDirection === 'desc'
        ? input.sortDirection
        : 'desc';

    const units = await this.businessUnitRepository.list(page, pageSize, sortDirection);
    const totalItems = await this.businessUnitRepository.countAll();
    const totalPages = totalItems === 0 ? 0 : Math.ceil(totalItems / pageSize);

    return {
      items: units.map((unit) => ({
        id: unit.getId().value,
        organizationId: unit.getOrganizationId(),
        publicName: unit.getPublicName(),
        phoneNumber: unit.getPhoneNumber(),
        phoneHasWhatsapp: unit.getPhoneHasWhatsapp(),
        status: unit.getStatus(),
        createdAt: unit.getCreatedAt(),
      })),
      page,
      pageSize,
      totalItems,
      totalPages,
    };
  }
}
