import { UserOrganizationLink } from '../../../../src/modules/organization/domain/entities/user-organization-link.entity';

describe('UserOrganizationLink Entity', () => {
  it('should create link with isOwner set to false', () => {
    const link = UserOrganizationLink.create({
      userId: 'user-id-1',
      organizationId: 'org-id-1',
    });

    expect(link.getUserId()).toBe('user-id-1');
    expect(link.getOrganizationId()).toBe('org-id-1');
    expect(link.getIsOwner()).toBe(false);
  });

  it('should create owner link with isOwner set to true', () => {
    const link = UserOrganizationLink.createOwner({
      userId: 'user-id-1',
      organizationId: 'org-id-1',
    });

    expect(link.getIsOwner()).toBe(true);
  });
});
