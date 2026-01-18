
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/edge.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  firstName: 'firstName',
  lastName: 'lastName',
  documentType: 'documentType',
  documentNumber: 'documentNumber',
  email: 'email',
  phoneNumber: 'phoneNumber',
  emailOptIn: 'emailOptIn',
  phoneOptIn: 'phoneOptIn',
  statusId: 'statusId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OrganizationScalarFieldEnum = {
  id: 'id',
  tradeName: 'tradeName',
  legalName: 'legalName',
  documentType: 'documentType',
  documentNumber: 'documentNumber',
  statusId: 'statusId',
  ownerUserId: 'ownerUserId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserOrganizationLinkScalarFieldEnum = {
  userId: 'userId',
  organizationId: 'organizationId',
  isOwner: 'isOwner',
  createdAt: 'createdAt'
};

exports.Prisma.VerticalScalarFieldEnum = {
  id: 'id',
  name: 'name',
  code: 'code',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OrganizationVerticalScalarFieldEnum = {
  organizationId: 'organizationId',
  verticalId: 'verticalId',
  statusId: 'statusId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BusinessUnitScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  publicName: 'publicName',
  phoneNumber: 'phoneNumber',
  phoneHasWhatsapp: 'phoneHasWhatsapp',
  email: 'email',
  instagram: 'instagram',
  website: 'website',
  statusId: 'statusId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BusinessUnitAddressScalarFieldEnum = {
  businessUnitId: 'businessUnitId',
  street: 'street',
  number: 'number',
  complement: 'complement',
  neighborhood: 'neighborhood',
  city: 'city',
  state: 'state',
  postalCode: 'postalCode',
  country: 'country',
  referencePoint: 'referencePoint'
};

exports.Prisma.BusinessUnitVerticalScalarFieldEnum = {
  businessUnitId: 'businessUnitId',
  organizationId: 'organizationId',
  verticalId: 'verticalId',
  statusId: 'statusId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  User: 'User',
  Organization: 'Organization',
  UserOrganizationLink: 'UserOrganizationLink',
  Vertical: 'Vertical',
  OrganizationVertical: 'OrganizationVertical',
  BusinessUnit: 'BusinessUnit',
  BusinessUnitAddress: 'BusinessUnitAddress',
  BusinessUnitVertical: 'BusinessUnitVertical'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/rersousa/Documents/projects/pessoal/smart-chat/smart-delivery-api-modules/src/modules/organization/infrastructure/database/prisma/generated",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin-arm64",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "/Users/rersousa/Documents/projects/pessoal/smart-chat/smart-delivery-api-modules/src/modules/organization/infrastructure/database/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../../../../../.env"
  },
  "relativePath": "..",
  "clientVersion": "5.22.0",
  "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mysql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL_ORGANIZATION",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n  output   = \"./generated\"\n}\n\ndatasource db {\n  provider = \"mysql\"\n  url      = env(\"DATABASE_URL_ORGANIZATION\")\n}\n\nmodel User {\n  id               String                @id @default(uuid()) @db.VarChar(36)\n  firstName        String                @map(\"first_name\") @db.VarChar(60)\n  lastName         String                @map(\"last_name\") @db.VarChar(60)\n  documentType     String                @map(\"document_type\") @db.VarChar(4)\n  documentNumber   String                @unique @map(\"document_number\") @db.VarChar(14)\n  email            String                @unique @db.VarChar(120)\n  phoneNumber      String                @unique @map(\"phone_number\") @db.VarChar(15)\n  emailOptIn       Boolean               @map(\"email_opt_in\")\n  phoneOptIn       Boolean               @map(\"phone_opt_in\")\n  statusId         String                @map(\"status_id\") @db.VarChar(20)\n  createdAt        DateTime              @default(now()) @map(\"created_at\")\n  updatedAt        DateTime?             @updatedAt @map(\"updated_at\")\n  organizationLink UserOrganizationLink?\n\n  @@map(\"users\")\n}\n\nmodel Organization {\n  id                    String                 @id @default(uuid()) @db.VarChar(36)\n  tradeName             String                 @map(\"trade_name\") @db.VarChar(80)\n  legalName             String?                @map(\"legal_name\") @db.VarChar(120)\n  documentType          String                 @map(\"document_type\") @db.VarChar(4)\n  documentNumber        String                 @unique @map(\"document_number\") @db.VarChar(14)\n  statusId              String                 @map(\"status_id\") @db.VarChar(30)\n  ownerUserId           String                 @map(\"owner_user_id\") @db.VarChar(36)\n  createdAt             DateTime               @default(now()) @map(\"created_at\")\n  updatedAt             DateTime?              @updatedAt @map(\"updated_at\")\n  organizationLinks     UserOrganizationLink[]\n  organizationVerticals OrganizationVertical[]\n  businessUnitVerticals BusinessUnitVertical[]\n  businessUnits         BusinessUnit[]\n\n  @@map(\"organizations\")\n}\n\nmodel UserOrganizationLink {\n  userId         String       @id @map(\"user_id\") @db.VarChar(36)\n  organizationId String       @map(\"organization_id\") @db.VarChar(36)\n  isOwner        Boolean      @default(false) @map(\"is_owner\")\n  createdAt      DateTime     @default(now()) @map(\"created_at\")\n  user           User         @relation(fields: [userId], references: [id])\n  organization   Organization @relation(fields: [organizationId], references: [id])\n\n  @@index([organizationId])\n  @@map(\"user_organization_links\")\n}\n\nmodel Vertical {\n  id                    String                 @id @default(uuid()) @db.VarChar(36)\n  name                  String                 @unique @db.VarChar(100)\n  code                  String                 @unique @db.VarChar(60)\n  description           String                 @db.VarChar(255)\n  createdAt             DateTime               @default(now()) @map(\"created_at\")\n  updatedAt             DateTime?              @updatedAt @map(\"updated_at\")\n  organizationVerticals OrganizationVertical[]\n  businessUnitVerticals BusinessUnitVertical[]\n\n  @@map(\"verticals\")\n}\n\nmodel OrganizationVertical {\n  organizationId String       @map(\"organization_id\") @db.VarChar(36)\n  verticalId     String       @map(\"vertical_id\") @db.VarChar(36)\n  statusId       String       @map(\"status_id\") @db.VarChar(20)\n  createdAt      DateTime     @default(now()) @map(\"created_at\")\n  updatedAt      DateTime?    @updatedAt @map(\"updated_at\")\n  organization   Organization @relation(fields: [organizationId], references: [id])\n  vertical       Vertical     @relation(fields: [verticalId], references: [id])\n\n  @@id([organizationId, verticalId])\n  @@index([verticalId])\n  @@map(\"organization_verticals\")\n}\n\nmodel BusinessUnit {\n  id                    String                 @id @default(uuid()) @db.VarChar(36)\n  organizationId        String                 @map(\"organization_id\") @db.VarChar(36)\n  publicName            String                 @map(\"public_name\") @db.VarChar(120)\n  phoneNumber           String                 @map(\"phone_number\") @db.VarChar(15)\n  phoneHasWhatsapp      Boolean                @map(\"phone_has_whatsapp\")\n  email                 String?                @db.VarChar(120)\n  instagram             String?                @db.VarChar(120)\n  website               String?                @db.VarChar(255)\n  statusId              String                 @map(\"status_id\") @db.VarChar(20)\n  createdAt             DateTime               @default(now()) @map(\"created_at\")\n  updatedAt             DateTime?              @updatedAt @map(\"updated_at\")\n  organization          Organization           @relation(fields: [organizationId], references: [id])\n  address               BusinessUnitAddress?\n  businessUnitVerticals BusinessUnitVertical[]\n\n  @@index([organizationId])\n  @@map(\"business_units\")\n}\n\nmodel BusinessUnitAddress {\n  businessUnitId String       @id @map(\"business_unit_id\") @db.VarChar(36)\n  street         String       @db.VarChar(120)\n  number         String       @db.VarChar(20)\n  complement     String?      @db.VarChar(120)\n  neighborhood   String       @db.VarChar(120)\n  city           String       @db.VarChar(120)\n  state          String       @db.VarChar(2)\n  postalCode     String       @map(\"postal_code\") @db.VarChar(8)\n  country        String       @db.VarChar(2)\n  referencePoint String       @map(\"reference_point\") @db.VarChar(120)\n  businessUnit   BusinessUnit @relation(fields: [businessUnitId], references: [id])\n\n  @@map(\"business_unit_addresses\")\n}\n\nmodel BusinessUnitVertical {\n  businessUnitId String       @map(\"business_unit_id\") @db.VarChar(36)\n  organizationId String       @map(\"organization_id\") @db.VarChar(36)\n  verticalId     String       @map(\"vertical_id\") @db.VarChar(36)\n  statusId       String       @map(\"status_id\") @db.VarChar(20)\n  createdAt      DateTime     @default(now()) @map(\"created_at\")\n  updatedAt      DateTime?    @updatedAt @map(\"updated_at\")\n  businessUnit   BusinessUnit @relation(fields: [businessUnitId], references: [id])\n  organization   Organization @relation(fields: [organizationId], references: [id])\n  vertical       Vertical     @relation(fields: [verticalId], references: [id])\n\n  @@id([businessUnitId, verticalId])\n  @@index([organizationId])\n  @@index([verticalId])\n  @@map(\"business_unit_verticals\")\n}\n",
  "inlineSchemaHash": "ce5632ae1138788cc545b44ff8e64549fea257c2356eaef624d144eff0c25361",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"dbName\":\"users\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"firstName\",\"dbName\":\"first_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastName\",\"dbName\":\"last_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"documentType\",\"dbName\":\"document_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"documentNumber\",\"dbName\":\"document_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phoneNumber\",\"dbName\":\"phone_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"emailOptIn\",\"dbName\":\"email_opt_in\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phoneOptIn\",\"dbName\":\"phone_opt_in\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"statusId\",\"dbName\":\"status_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"organizationLink\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserOrganizationLink\",\"relationName\":\"UserToUserOrganizationLink\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Organization\":{\"dbName\":\"organizations\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tradeName\",\"dbName\":\"trade_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"legalName\",\"dbName\":\"legal_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"documentType\",\"dbName\":\"document_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"documentNumber\",\"dbName\":\"document_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"statusId\",\"dbName\":\"status_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ownerUserId\",\"dbName\":\"owner_user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"organizationLinks\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserOrganizationLink\",\"relationName\":\"OrganizationToUserOrganizationLink\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizationVerticals\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"OrganizationVertical\",\"relationName\":\"OrganizationToOrganizationVertical\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"businessUnitVerticals\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BusinessUnitVertical\",\"relationName\":\"BusinessUnitVerticalToOrganization\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"businessUnits\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BusinessUnit\",\"relationName\":\"BusinessUnitToOrganization\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"UserOrganizationLink\":{\"dbName\":\"user_organization_links\",\"fields\":[{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizationId\",\"dbName\":\"organization_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isOwner\",\"dbName\":\"is_owner\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"UserToUserOrganizationLink\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Organization\",\"relationName\":\"OrganizationToUserOrganizationLink\",\"relationFromFields\":[\"organizationId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Vertical\":{\"dbName\":\"verticals\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"organizationVerticals\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"OrganizationVertical\",\"relationName\":\"OrganizationVerticalToVertical\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"businessUnitVerticals\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BusinessUnitVertical\",\"relationName\":\"BusinessUnitVerticalToVertical\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"OrganizationVertical\":{\"dbName\":\"organization_verticals\",\"fields\":[{\"name\":\"organizationId\",\"dbName\":\"organization_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"verticalId\",\"dbName\":\"vertical_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"statusId\",\"dbName\":\"status_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"organization\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Organization\",\"relationName\":\"OrganizationToOrganizationVertical\",\"relationFromFields\":[\"organizationId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"vertical\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Vertical\",\"relationName\":\"OrganizationVerticalToVertical\",\"relationFromFields\":[\"verticalId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"organizationId\",\"verticalId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"BusinessUnit\":{\"dbName\":\"business_units\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizationId\",\"dbName\":\"organization_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"publicName\",\"dbName\":\"public_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phoneNumber\",\"dbName\":\"phone_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phoneHasWhatsapp\",\"dbName\":\"phone_has_whatsapp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"instagram\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"website\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"statusId\",\"dbName\":\"status_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"organization\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Organization\",\"relationName\":\"BusinessUnitToOrganization\",\"relationFromFields\":[\"organizationId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"address\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BusinessUnitAddress\",\"relationName\":\"BusinessUnitToBusinessUnitAddress\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"businessUnitVerticals\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BusinessUnitVertical\",\"relationName\":\"BusinessUnitToBusinessUnitVertical\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"BusinessUnitAddress\":{\"dbName\":\"business_unit_addresses\",\"fields\":[{\"name\":\"businessUnitId\",\"dbName\":\"business_unit_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"street\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"complement\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"neighborhood\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"city\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"state\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"postalCode\",\"dbName\":\"postal_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"country\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"referencePoint\",\"dbName\":\"reference_point\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"businessUnit\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BusinessUnit\",\"relationName\":\"BusinessUnitToBusinessUnitAddress\",\"relationFromFields\":[\"businessUnitId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"BusinessUnitVertical\":{\"dbName\":\"business_unit_verticals\",\"fields\":[{\"name\":\"businessUnitId\",\"dbName\":\"business_unit_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizationId\",\"dbName\":\"organization_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"verticalId\",\"dbName\":\"vertical_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"statusId\",\"dbName\":\"status_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"businessUnit\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BusinessUnit\",\"relationName\":\"BusinessUnitToBusinessUnitVertical\",\"relationFromFields\":[\"businessUnitId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Organization\",\"relationName\":\"BusinessUnitVerticalToOrganization\",\"relationFromFields\":[\"organizationId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"vertical\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Vertical\",\"relationName\":\"BusinessUnitVerticalToVertical\",\"relationFromFields\":[\"verticalId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"businessUnitId\",\"verticalId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL_ORGANIZATION: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL_ORGANIZATION'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL_ORGANIZATION || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

