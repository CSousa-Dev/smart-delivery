import { OrganizationVerticalLink } from '../../../../src/modules/organization/domain/entities/organization-vertical-link.entity';

describe('OrganizationVerticalLink Entity', () => {
  it('should create organization vertical link', () => {
    const link = OrganizationVerticalLink.create({
      organizationId: 'org-1',
      verticalCode: 'RESTAURANTS',
    });

    expect(link.getOrganizationId()).toBe('org-1');
    expect(link.getVerticalCode()).toBe('RESTAURANTS');
  });
});
