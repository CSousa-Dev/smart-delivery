
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Organization
 * 
 */
export type Organization = $Result.DefaultSelection<Prisma.$OrganizationPayload>
/**
 * Model UserOrganizationLink
 * 
 */
export type UserOrganizationLink = $Result.DefaultSelection<Prisma.$UserOrganizationLinkPayload>
/**
 * Model OrganizationVertical
 * 
 */
export type OrganizationVertical = $Result.DefaultSelection<Prisma.$OrganizationVerticalPayload>
/**
 * Model BusinessUnit
 * 
 */
export type BusinessUnit = $Result.DefaultSelection<Prisma.$BusinessUnitPayload>
/**
 * Model BusinessUnitAddress
 * 
 */
export type BusinessUnitAddress = $Result.DefaultSelection<Prisma.$BusinessUnitAddressPayload>
/**
 * Model BusinessUnitVertical
 * 
 */
export type BusinessUnitVertical = $Result.DefaultSelection<Prisma.$BusinessUnitVerticalPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.organization`: Exposes CRUD operations for the **Organization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizations
    * const organizations = await prisma.organization.findMany()
    * ```
    */
  get organization(): Prisma.OrganizationDelegate<ExtArgs>;

  /**
   * `prisma.userOrganizationLink`: Exposes CRUD operations for the **UserOrganizationLink** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserOrganizationLinks
    * const userOrganizationLinks = await prisma.userOrganizationLink.findMany()
    * ```
    */
  get userOrganizationLink(): Prisma.UserOrganizationLinkDelegate<ExtArgs>;

  /**
   * `prisma.organizationVertical`: Exposes CRUD operations for the **OrganizationVertical** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrganizationVerticals
    * const organizationVerticals = await prisma.organizationVertical.findMany()
    * ```
    */
  get organizationVertical(): Prisma.OrganizationVerticalDelegate<ExtArgs>;

  /**
   * `prisma.businessUnit`: Exposes CRUD operations for the **BusinessUnit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BusinessUnits
    * const businessUnits = await prisma.businessUnit.findMany()
    * ```
    */
  get businessUnit(): Prisma.BusinessUnitDelegate<ExtArgs>;

  /**
   * `prisma.businessUnitAddress`: Exposes CRUD operations for the **BusinessUnitAddress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BusinessUnitAddresses
    * const businessUnitAddresses = await prisma.businessUnitAddress.findMany()
    * ```
    */
  get businessUnitAddress(): Prisma.BusinessUnitAddressDelegate<ExtArgs>;

  /**
   * `prisma.businessUnitVertical`: Exposes CRUD operations for the **BusinessUnitVertical** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BusinessUnitVerticals
    * const businessUnitVerticals = await prisma.businessUnitVertical.findMany()
    * ```
    */
  get businessUnitVertical(): Prisma.BusinessUnitVerticalDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Organization: 'Organization',
    UserOrganizationLink: 'UserOrganizationLink',
    OrganizationVertical: 'OrganizationVertical',
    BusinessUnit: 'BusinessUnit',
    BusinessUnitAddress: 'BusinessUnitAddress',
    BusinessUnitVertical: 'BusinessUnitVertical'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "organization" | "userOrganizationLink" | "organizationVertical" | "businessUnit" | "businessUnitAddress" | "businessUnitVertical"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Organization: {
        payload: Prisma.$OrganizationPayload<ExtArgs>
        fields: Prisma.OrganizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findFirst: {
            args: Prisma.OrganizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findMany: {
            args: Prisma.OrganizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          create: {
            args: Prisma.OrganizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          createMany: {
            args: Prisma.OrganizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OrganizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          update: {
            args: Prisma.OrganizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrganizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          aggregate: {
            args: Prisma.OrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganization>
          }
          groupBy: {
            args: Prisma.OrganizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationCountAggregateOutputType> | number
          }
        }
      }
      UserOrganizationLink: {
        payload: Prisma.$UserOrganizationLinkPayload<ExtArgs>
        fields: Prisma.UserOrganizationLinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserOrganizationLinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrganizationLinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserOrganizationLinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrganizationLinkPayload>
          }
          findFirst: {
            args: Prisma.UserOrganizationLinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrganizationLinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserOrganizationLinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrganizationLinkPayload>
          }
          findMany: {
            args: Prisma.UserOrganizationLinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrganizationLinkPayload>[]
          }
          create: {
            args: Prisma.UserOrganizationLinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrganizationLinkPayload>
          }
          createMany: {
            args: Prisma.UserOrganizationLinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserOrganizationLinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrganizationLinkPayload>
          }
          update: {
            args: Prisma.UserOrganizationLinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrganizationLinkPayload>
          }
          deleteMany: {
            args: Prisma.UserOrganizationLinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserOrganizationLinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserOrganizationLinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOrganizationLinkPayload>
          }
          aggregate: {
            args: Prisma.UserOrganizationLinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserOrganizationLink>
          }
          groupBy: {
            args: Prisma.UserOrganizationLinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserOrganizationLinkGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserOrganizationLinkCountArgs<ExtArgs>
            result: $Utils.Optional<UserOrganizationLinkCountAggregateOutputType> | number
          }
        }
      }
      OrganizationVertical: {
        payload: Prisma.$OrganizationVerticalPayload<ExtArgs>
        fields: Prisma.OrganizationVerticalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationVerticalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationVerticalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationVerticalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationVerticalPayload>
          }
          findFirst: {
            args: Prisma.OrganizationVerticalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationVerticalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationVerticalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationVerticalPayload>
          }
          findMany: {
            args: Prisma.OrganizationVerticalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationVerticalPayload>[]
          }
          create: {
            args: Prisma.OrganizationVerticalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationVerticalPayload>
          }
          createMany: {
            args: Prisma.OrganizationVerticalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OrganizationVerticalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationVerticalPayload>
          }
          update: {
            args: Prisma.OrganizationVerticalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationVerticalPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationVerticalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationVerticalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrganizationVerticalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationVerticalPayload>
          }
          aggregate: {
            args: Prisma.OrganizationVerticalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganizationVertical>
          }
          groupBy: {
            args: Prisma.OrganizationVerticalGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationVerticalGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationVerticalCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationVerticalCountAggregateOutputType> | number
          }
        }
      }
      BusinessUnit: {
        payload: Prisma.$BusinessUnitPayload<ExtArgs>
        fields: Prisma.BusinessUnitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BusinessUnitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BusinessUnitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitPayload>
          }
          findFirst: {
            args: Prisma.BusinessUnitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BusinessUnitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitPayload>
          }
          findMany: {
            args: Prisma.BusinessUnitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitPayload>[]
          }
          create: {
            args: Prisma.BusinessUnitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitPayload>
          }
          createMany: {
            args: Prisma.BusinessUnitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BusinessUnitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitPayload>
          }
          update: {
            args: Prisma.BusinessUnitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitPayload>
          }
          deleteMany: {
            args: Prisma.BusinessUnitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BusinessUnitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BusinessUnitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitPayload>
          }
          aggregate: {
            args: Prisma.BusinessUnitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBusinessUnit>
          }
          groupBy: {
            args: Prisma.BusinessUnitGroupByArgs<ExtArgs>
            result: $Utils.Optional<BusinessUnitGroupByOutputType>[]
          }
          count: {
            args: Prisma.BusinessUnitCountArgs<ExtArgs>
            result: $Utils.Optional<BusinessUnitCountAggregateOutputType> | number
          }
        }
      }
      BusinessUnitAddress: {
        payload: Prisma.$BusinessUnitAddressPayload<ExtArgs>
        fields: Prisma.BusinessUnitAddressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BusinessUnitAddressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitAddressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BusinessUnitAddressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitAddressPayload>
          }
          findFirst: {
            args: Prisma.BusinessUnitAddressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitAddressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BusinessUnitAddressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitAddressPayload>
          }
          findMany: {
            args: Prisma.BusinessUnitAddressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitAddressPayload>[]
          }
          create: {
            args: Prisma.BusinessUnitAddressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitAddressPayload>
          }
          createMany: {
            args: Prisma.BusinessUnitAddressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BusinessUnitAddressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitAddressPayload>
          }
          update: {
            args: Prisma.BusinessUnitAddressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitAddressPayload>
          }
          deleteMany: {
            args: Prisma.BusinessUnitAddressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BusinessUnitAddressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BusinessUnitAddressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitAddressPayload>
          }
          aggregate: {
            args: Prisma.BusinessUnitAddressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBusinessUnitAddress>
          }
          groupBy: {
            args: Prisma.BusinessUnitAddressGroupByArgs<ExtArgs>
            result: $Utils.Optional<BusinessUnitAddressGroupByOutputType>[]
          }
          count: {
            args: Prisma.BusinessUnitAddressCountArgs<ExtArgs>
            result: $Utils.Optional<BusinessUnitAddressCountAggregateOutputType> | number
          }
        }
      }
      BusinessUnitVertical: {
        payload: Prisma.$BusinessUnitVerticalPayload<ExtArgs>
        fields: Prisma.BusinessUnitVerticalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BusinessUnitVerticalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitVerticalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BusinessUnitVerticalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitVerticalPayload>
          }
          findFirst: {
            args: Prisma.BusinessUnitVerticalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitVerticalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BusinessUnitVerticalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitVerticalPayload>
          }
          findMany: {
            args: Prisma.BusinessUnitVerticalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitVerticalPayload>[]
          }
          create: {
            args: Prisma.BusinessUnitVerticalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitVerticalPayload>
          }
          createMany: {
            args: Prisma.BusinessUnitVerticalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BusinessUnitVerticalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitVerticalPayload>
          }
          update: {
            args: Prisma.BusinessUnitVerticalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitVerticalPayload>
          }
          deleteMany: {
            args: Prisma.BusinessUnitVerticalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BusinessUnitVerticalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BusinessUnitVerticalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUnitVerticalPayload>
          }
          aggregate: {
            args: Prisma.BusinessUnitVerticalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBusinessUnitVertical>
          }
          groupBy: {
            args: Prisma.BusinessUnitVerticalGroupByArgs<ExtArgs>
            result: $Utils.Optional<BusinessUnitVerticalGroupByOutputType>[]
          }
          count: {
            args: Prisma.BusinessUnitVerticalCountArgs<ExtArgs>
            result: $Utils.Optional<BusinessUnitVerticalCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type OrganizationCountOutputType
   */

  export type OrganizationCountOutputType = {
    organizationLinks: number
    organizationVerticals: number
    businessUnitVerticals: number
    businessUnits: number
  }

  export type OrganizationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizationLinks?: boolean | OrganizationCountOutputTypeCountOrganizationLinksArgs
    organizationVerticals?: boolean | OrganizationCountOutputTypeCountOrganizationVerticalsArgs
    businessUnitVerticals?: boolean | OrganizationCountOutputTypeCountBusinessUnitVerticalsArgs
    businessUnits?: boolean | OrganizationCountOutputTypeCountBusinessUnitsArgs
  }

  // Custom InputTypes
  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCountOutputType
     */
    select?: OrganizationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountOrganizationLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserOrganizationLinkWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountOrganizationVerticalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationVerticalWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountBusinessUnitVerticalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessUnitVerticalWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountBusinessUnitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessUnitWhereInput
  }


  /**
   * Count Type BusinessUnitCountOutputType
   */

  export type BusinessUnitCountOutputType = {
    businessUnitVerticals: number
  }

  export type BusinessUnitCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    businessUnitVerticals?: boolean | BusinessUnitCountOutputTypeCountBusinessUnitVerticalsArgs
  }

  // Custom InputTypes
  /**
   * BusinessUnitCountOutputType without action
   */
  export type BusinessUnitCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnitCountOutputType
     */
    select?: BusinessUnitCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BusinessUnitCountOutputType without action
   */
  export type BusinessUnitCountOutputTypeCountBusinessUnitVerticalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessUnitVerticalWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    documentType: string | null
    documentNumber: string | null
    email: string | null
    phoneNumber: string | null
    emailOptIn: boolean | null
    phoneOptIn: boolean | null
    statusId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    documentType: string | null
    documentNumber: string | null
    email: string | null
    phoneNumber: string | null
    emailOptIn: boolean | null
    phoneOptIn: boolean | null
    statusId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    documentType: number
    documentNumber: number
    email: number
    phoneNumber: number
    emailOptIn: number
    phoneOptIn: number
    statusId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    documentType?: true
    documentNumber?: true
    email?: true
    phoneNumber?: true
    emailOptIn?: true
    phoneOptIn?: true
    statusId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    documentType?: true
    documentNumber?: true
    email?: true
    phoneNumber?: true
    emailOptIn?: true
    phoneOptIn?: true
    statusId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    documentType?: true
    documentNumber?: true
    email?: true
    phoneNumber?: true
    emailOptIn?: true
    phoneOptIn?: true
    statusId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    documentType: string
    documentNumber: string
    email: string
    phoneNumber: string
    emailOptIn: boolean
    phoneOptIn: boolean
    statusId: string
    createdAt: Date
    updatedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    documentType?: boolean
    documentNumber?: boolean
    email?: boolean
    phoneNumber?: boolean
    emailOptIn?: boolean
    phoneOptIn?: boolean
    statusId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizationLink?: boolean | User$organizationLinkArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>


  export type UserSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    documentType?: boolean
    documentNumber?: boolean
    email?: boolean
    phoneNumber?: boolean
    emailOptIn?: boolean
    phoneOptIn?: boolean
    statusId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizationLink?: boolean | User$organizationLinkArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      organizationLink: Prisma.$UserOrganizationLinkPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      documentType: string
      documentNumber: string
      email: string
      phoneNumber: string
      emailOptIn: boolean
      phoneOptIn: boolean
      statusId: string
      createdAt: Date
      updatedAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organizationLink<T extends User$organizationLinkArgs<ExtArgs> = {}>(args?: Subset<T, User$organizationLinkArgs<ExtArgs>>): Prisma__UserOrganizationLinkClient<$Result.GetResult<Prisma.$UserOrganizationLinkPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly documentType: FieldRef<"User", 'String'>
    readonly documentNumber: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phoneNumber: FieldRef<"User", 'String'>
    readonly emailOptIn: FieldRef<"User", 'Boolean'>
    readonly phoneOptIn: FieldRef<"User", 'Boolean'>
    readonly statusId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.organizationLink
   */
  export type User$organizationLinkArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganizationLink
     */
    select?: UserOrganizationLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationLinkInclude<ExtArgs> | null
    where?: UserOrganizationLinkWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Organization
   */

  export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  export type OrganizationMinAggregateOutputType = {
    id: string | null
    tradeName: string | null
    legalName: string | null
    documentType: string | null
    documentNumber: string | null
    statusId: string | null
    ownerUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationMaxAggregateOutputType = {
    id: string | null
    tradeName: string | null
    legalName: string | null
    documentType: string | null
    documentNumber: string | null
    statusId: string | null
    ownerUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationCountAggregateOutputType = {
    id: number
    tradeName: number
    legalName: number
    documentType: number
    documentNumber: number
    statusId: number
    ownerUserId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrganizationMinAggregateInputType = {
    id?: true
    tradeName?: true
    legalName?: true
    documentType?: true
    documentNumber?: true
    statusId?: true
    ownerUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationMaxAggregateInputType = {
    id?: true
    tradeName?: true
    legalName?: true
    documentType?: true
    documentNumber?: true
    statusId?: true
    ownerUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationCountAggregateInputType = {
    id?: true
    tradeName?: true
    legalName?: true
    documentType?: true
    documentNumber?: true
    statusId?: true
    ownerUserId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrganizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organization to aggregate.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Organizations
    **/
    _count?: true | OrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationMaxAggregateInputType
  }

  export type GetOrganizationAggregateType<T extends OrganizationAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganization[P]>
      : GetScalarType<T[P], AggregateOrganization[P]>
  }




  export type OrganizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationWhereInput
    orderBy?: OrganizationOrderByWithAggregationInput | OrganizationOrderByWithAggregationInput[]
    by: OrganizationScalarFieldEnum[] | OrganizationScalarFieldEnum
    having?: OrganizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationCountAggregateInputType | true
    _min?: OrganizationMinAggregateInputType
    _max?: OrganizationMaxAggregateInputType
  }

  export type OrganizationGroupByOutputType = {
    id: string
    tradeName: string
    legalName: string | null
    documentType: string
    documentNumber: string
    statusId: string
    ownerUserId: string | null
    createdAt: Date
    updatedAt: Date | null
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  type GetOrganizationGroupByPayload<T extends OrganizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tradeName?: boolean
    legalName?: boolean
    documentType?: boolean
    documentNumber?: boolean
    statusId?: boolean
    ownerUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizationLinks?: boolean | Organization$organizationLinksArgs<ExtArgs>
    organizationVerticals?: boolean | Organization$organizationVerticalsArgs<ExtArgs>
    businessUnitVerticals?: boolean | Organization$businessUnitVerticalsArgs<ExtArgs>
    businessUnits?: boolean | Organization$businessUnitsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>


  export type OrganizationSelectScalar = {
    id?: boolean
    tradeName?: boolean
    legalName?: boolean
    documentType?: boolean
    documentNumber?: boolean
    statusId?: boolean
    ownerUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrganizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizationLinks?: boolean | Organization$organizationLinksArgs<ExtArgs>
    organizationVerticals?: boolean | Organization$organizationVerticalsArgs<ExtArgs>
    businessUnitVerticals?: boolean | Organization$businessUnitVerticalsArgs<ExtArgs>
    businessUnits?: boolean | Organization$businessUnitsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $OrganizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Organization"
    objects: {
      organizationLinks: Prisma.$UserOrganizationLinkPayload<ExtArgs>[]
      organizationVerticals: Prisma.$OrganizationVerticalPayload<ExtArgs>[]
      businessUnitVerticals: Prisma.$BusinessUnitVerticalPayload<ExtArgs>[]
      businessUnits: Prisma.$BusinessUnitPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tradeName: string
      legalName: string | null
      documentType: string
      documentNumber: string
      statusId: string
      ownerUserId: string | null
      createdAt: Date
      updatedAt: Date | null
    }, ExtArgs["result"]["organization"]>
    composites: {}
  }

  type OrganizationGetPayload<S extends boolean | null | undefined | OrganizationDefaultArgs> = $Result.GetResult<Prisma.$OrganizationPayload, S>

  type OrganizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OrganizationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OrganizationCountAggregateInputType | true
    }

  export interface OrganizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Organization'], meta: { name: 'Organization' } }
    /**
     * Find zero or one Organization that matches the filter.
     * @param {OrganizationFindUniqueArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationFindUniqueArgs>(args: SelectSubset<T, OrganizationFindUniqueArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Organization that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OrganizationFindUniqueOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Organization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationFindFirstArgs>(args?: SelectSubset<T, OrganizationFindFirstArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Organization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Organizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizations
     * const organizations = await prisma.organization.findMany()
     * 
     * // Get first 10 Organizations
     * const organizations = await prisma.organization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationWithIdOnly = await prisma.organization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationFindManyArgs>(args?: SelectSubset<T, OrganizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Organization.
     * @param {OrganizationCreateArgs} args - Arguments to create a Organization.
     * @example
     * // Create one Organization
     * const Organization = await prisma.organization.create({
     *   data: {
     *     // ... data to create a Organization
     *   }
     * })
     * 
     */
    create<T extends OrganizationCreateArgs>(args: SelectSubset<T, OrganizationCreateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Organizations.
     * @param {OrganizationCreateManyArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationCreateManyArgs>(args?: SelectSubset<T, OrganizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Organization.
     * @param {OrganizationDeleteArgs} args - Arguments to delete one Organization.
     * @example
     * // Delete one Organization
     * const Organization = await prisma.organization.delete({
     *   where: {
     *     // ... filter to delete one Organization
     *   }
     * })
     * 
     */
    delete<T extends OrganizationDeleteArgs>(args: SelectSubset<T, OrganizationDeleteArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Organization.
     * @param {OrganizationUpdateArgs} args - Arguments to update one Organization.
     * @example
     * // Update one Organization
     * const organization = await prisma.organization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationUpdateArgs>(args: SelectSubset<T, OrganizationUpdateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Organizations.
     * @param {OrganizationDeleteManyArgs} args - Arguments to filter Organizations to delete.
     * @example
     * // Delete a few Organizations
     * const { count } = await prisma.organization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationDeleteManyArgs>(args?: SelectSubset<T, OrganizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationUpdateManyArgs>(args: SelectSubset<T, OrganizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Organization.
     * @param {OrganizationUpsertArgs} args - Arguments to update or create a Organization.
     * @example
     * // Update or create a Organization
     * const organization = await prisma.organization.upsert({
     *   create: {
     *     // ... data to create a Organization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organization we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationUpsertArgs>(args: SelectSubset<T, OrganizationUpsertArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCountArgs} args - Arguments to filter Organizations to count.
     * @example
     * // Count the number of Organizations
     * const count = await prisma.organization.count({
     *   where: {
     *     // ... the filter for the Organizations we want to count
     *   }
     * })
    **/
    count<T extends OrganizationCountArgs>(
      args?: Subset<T, OrganizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizationAggregateArgs>(args: Subset<T, OrganizationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>

    /**
     * Group by Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrganizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrganizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Organization model
   */
  readonly fields: OrganizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Organization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organizationLinks<T extends Organization$organizationLinksArgs<ExtArgs> = {}>(args?: Subset<T, Organization$organizationLinksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserOrganizationLinkPayload<ExtArgs>, T, "findMany"> | Null>
    organizationVerticals<T extends Organization$organizationVerticalsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$organizationVerticalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationVerticalPayload<ExtArgs>, T, "findMany"> | Null>
    businessUnitVerticals<T extends Organization$businessUnitVerticalsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$businessUnitVerticalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessUnitVerticalPayload<ExtArgs>, T, "findMany"> | Null>
    businessUnits<T extends Organization$businessUnitsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$businessUnitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessUnitPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Organization model
   */ 
  interface OrganizationFieldRefs {
    readonly id: FieldRef<"Organization", 'String'>
    readonly tradeName: FieldRef<"Organization", 'String'>
    readonly legalName: FieldRef<"Organization", 'String'>
    readonly documentType: FieldRef<"Organization", 'String'>
    readonly documentNumber: FieldRef<"Organization", 'String'>
    readonly statusId: FieldRef<"Organization", 'String'>
    readonly ownerUserId: FieldRef<"Organization", 'String'>
    readonly createdAt: FieldRef<"Organization", 'DateTime'>
    readonly updatedAt: FieldRef<"Organization", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Organization findUnique
   */
  export type OrganizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findUniqueOrThrow
   */
  export type OrganizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findFirst
   */
  export type OrganizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findFirstOrThrow
   */
  export type OrganizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findMany
   */
  export type OrganizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organizations to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization create
   */
  export type OrganizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to create a Organization.
     */
    data: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
  }

  /**
   * Organization createMany
   */
  export type OrganizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization update
   */
  export type OrganizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to update a Organization.
     */
    data: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
    /**
     * Choose, which Organization to update.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization updateMany
   */
  export type OrganizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
  }

  /**
   * Organization upsert
   */
  export type OrganizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The filter to search for the Organization to update in case it exists.
     */
    where: OrganizationWhereUniqueInput
    /**
     * In case the Organization found by the `where` argument doesn't exist, create a new Organization with this data.
     */
    create: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
    /**
     * In case the Organization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
  }

  /**
   * Organization delete
   */
  export type OrganizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter which Organization to delete.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization deleteMany
   */
  export type OrganizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizations to delete
     */
    where?: OrganizationWhereInput
  }

  /**
   * Organization.organizationLinks
   */
  export type Organization$organizationLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganizationLink
     */
    select?: UserOrganizationLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationLinkInclude<ExtArgs> | null
    where?: UserOrganizationLinkWhereInput
    orderBy?: UserOrganizationLinkOrderByWithRelationInput | UserOrganizationLinkOrderByWithRelationInput[]
    cursor?: UserOrganizationLinkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserOrganizationLinkScalarFieldEnum | UserOrganizationLinkScalarFieldEnum[]
  }

  /**
   * Organization.organizationVerticals
   */
  export type Organization$organizationVerticalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationVertical
     */
    select?: OrganizationVerticalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationVerticalInclude<ExtArgs> | null
    where?: OrganizationVerticalWhereInput
    orderBy?: OrganizationVerticalOrderByWithRelationInput | OrganizationVerticalOrderByWithRelationInput[]
    cursor?: OrganizationVerticalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrganizationVerticalScalarFieldEnum | OrganizationVerticalScalarFieldEnum[]
  }

  /**
   * Organization.businessUnitVerticals
   */
  export type Organization$businessUnitVerticalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnitVertical
     */
    select?: BusinessUnitVerticalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitVerticalInclude<ExtArgs> | null
    where?: BusinessUnitVerticalWhereInput
    orderBy?: BusinessUnitVerticalOrderByWithRelationInput | BusinessUnitVerticalOrderByWithRelationInput[]
    cursor?: BusinessUnitVerticalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BusinessUnitVerticalScalarFieldEnum | BusinessUnitVerticalScalarFieldEnum[]
  }

  /**
   * Organization.businessUnits
   */
  export type Organization$businessUnitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnit
     */
    select?: BusinessUnitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitInclude<ExtArgs> | null
    where?: BusinessUnitWhereInput
    orderBy?: BusinessUnitOrderByWithRelationInput | BusinessUnitOrderByWithRelationInput[]
    cursor?: BusinessUnitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BusinessUnitScalarFieldEnum | BusinessUnitScalarFieldEnum[]
  }

  /**
   * Organization without action
   */
  export type OrganizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
  }


  /**
   * Model UserOrganizationLink
   */

  export type AggregateUserOrganizationLink = {
    _count: UserOrganizationLinkCountAggregateOutputType | null
    _min: UserOrganizationLinkMinAggregateOutputType | null
    _max: UserOrganizationLinkMaxAggregateOutputType | null
  }

  export type UserOrganizationLinkMinAggregateOutputType = {
    userId: string | null
    organizationId: string | null
    isOwner: boolean | null
    createdAt: Date | null
  }

  export type UserOrganizationLinkMaxAggregateOutputType = {
    userId: string | null
    organizationId: string | null
    isOwner: boolean | null
    createdAt: Date | null
  }

  export type UserOrganizationLinkCountAggregateOutputType = {
    userId: number
    organizationId: number
    isOwner: number
    createdAt: number
    _all: number
  }


  export type UserOrganizationLinkMinAggregateInputType = {
    userId?: true
    organizationId?: true
    isOwner?: true
    createdAt?: true
  }

  export type UserOrganizationLinkMaxAggregateInputType = {
    userId?: true
    organizationId?: true
    isOwner?: true
    createdAt?: true
  }

  export type UserOrganizationLinkCountAggregateInputType = {
    userId?: true
    organizationId?: true
    isOwner?: true
    createdAt?: true
    _all?: true
  }

  export type UserOrganizationLinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserOrganizationLink to aggregate.
     */
    where?: UserOrganizationLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOrganizationLinks to fetch.
     */
    orderBy?: UserOrganizationLinkOrderByWithRelationInput | UserOrganizationLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserOrganizationLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOrganizationLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOrganizationLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserOrganizationLinks
    **/
    _count?: true | UserOrganizationLinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserOrganizationLinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserOrganizationLinkMaxAggregateInputType
  }

  export type GetUserOrganizationLinkAggregateType<T extends UserOrganizationLinkAggregateArgs> = {
        [P in keyof T & keyof AggregateUserOrganizationLink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserOrganizationLink[P]>
      : GetScalarType<T[P], AggregateUserOrganizationLink[P]>
  }




  export type UserOrganizationLinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserOrganizationLinkWhereInput
    orderBy?: UserOrganizationLinkOrderByWithAggregationInput | UserOrganizationLinkOrderByWithAggregationInput[]
    by: UserOrganizationLinkScalarFieldEnum[] | UserOrganizationLinkScalarFieldEnum
    having?: UserOrganizationLinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserOrganizationLinkCountAggregateInputType | true
    _min?: UserOrganizationLinkMinAggregateInputType
    _max?: UserOrganizationLinkMaxAggregateInputType
  }

  export type UserOrganizationLinkGroupByOutputType = {
    userId: string
    organizationId: string
    isOwner: boolean
    createdAt: Date
    _count: UserOrganizationLinkCountAggregateOutputType | null
    _min: UserOrganizationLinkMinAggregateOutputType | null
    _max: UserOrganizationLinkMaxAggregateOutputType | null
  }

  type GetUserOrganizationLinkGroupByPayload<T extends UserOrganizationLinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserOrganizationLinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserOrganizationLinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserOrganizationLinkGroupByOutputType[P]>
            : GetScalarType<T[P], UserOrganizationLinkGroupByOutputType[P]>
        }
      >
    >


  export type UserOrganizationLinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    organizationId?: boolean
    isOwner?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userOrganizationLink"]>


  export type UserOrganizationLinkSelectScalar = {
    userId?: boolean
    organizationId?: boolean
    isOwner?: boolean
    createdAt?: boolean
  }

  export type UserOrganizationLinkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $UserOrganizationLinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserOrganizationLink"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      organization: Prisma.$OrganizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      organizationId: string
      isOwner: boolean
      createdAt: Date
    }, ExtArgs["result"]["userOrganizationLink"]>
    composites: {}
  }

  type UserOrganizationLinkGetPayload<S extends boolean | null | undefined | UserOrganizationLinkDefaultArgs> = $Result.GetResult<Prisma.$UserOrganizationLinkPayload, S>

  type UserOrganizationLinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserOrganizationLinkFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserOrganizationLinkCountAggregateInputType | true
    }

  export interface UserOrganizationLinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserOrganizationLink'], meta: { name: 'UserOrganizationLink' } }
    /**
     * Find zero or one UserOrganizationLink that matches the filter.
     * @param {UserOrganizationLinkFindUniqueArgs} args - Arguments to find a UserOrganizationLink
     * @example
     * // Get one UserOrganizationLink
     * const userOrganizationLink = await prisma.userOrganizationLink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserOrganizationLinkFindUniqueArgs>(args: SelectSubset<T, UserOrganizationLinkFindUniqueArgs<ExtArgs>>): Prisma__UserOrganizationLinkClient<$Result.GetResult<Prisma.$UserOrganizationLinkPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UserOrganizationLink that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserOrganizationLinkFindUniqueOrThrowArgs} args - Arguments to find a UserOrganizationLink
     * @example
     * // Get one UserOrganizationLink
     * const userOrganizationLink = await prisma.userOrganizationLink.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserOrganizationLinkFindUniqueOrThrowArgs>(args: SelectSubset<T, UserOrganizationLinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserOrganizationLinkClient<$Result.GetResult<Prisma.$UserOrganizationLinkPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UserOrganizationLink that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOrganizationLinkFindFirstArgs} args - Arguments to find a UserOrganizationLink
     * @example
     * // Get one UserOrganizationLink
     * const userOrganizationLink = await prisma.userOrganizationLink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserOrganizationLinkFindFirstArgs>(args?: SelectSubset<T, UserOrganizationLinkFindFirstArgs<ExtArgs>>): Prisma__UserOrganizationLinkClient<$Result.GetResult<Prisma.$UserOrganizationLinkPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UserOrganizationLink that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOrganizationLinkFindFirstOrThrowArgs} args - Arguments to find a UserOrganizationLink
     * @example
     * // Get one UserOrganizationLink
     * const userOrganizationLink = await prisma.userOrganizationLink.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserOrganizationLinkFindFirstOrThrowArgs>(args?: SelectSubset<T, UserOrganizationLinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserOrganizationLinkClient<$Result.GetResult<Prisma.$UserOrganizationLinkPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UserOrganizationLinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOrganizationLinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserOrganizationLinks
     * const userOrganizationLinks = await prisma.userOrganizationLink.findMany()
     * 
     * // Get first 10 UserOrganizationLinks
     * const userOrganizationLinks = await prisma.userOrganizationLink.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userOrganizationLinkWithUserIdOnly = await prisma.userOrganizationLink.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends UserOrganizationLinkFindManyArgs>(args?: SelectSubset<T, UserOrganizationLinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserOrganizationLinkPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UserOrganizationLink.
     * @param {UserOrganizationLinkCreateArgs} args - Arguments to create a UserOrganizationLink.
     * @example
     * // Create one UserOrganizationLink
     * const UserOrganizationLink = await prisma.userOrganizationLink.create({
     *   data: {
     *     // ... data to create a UserOrganizationLink
     *   }
     * })
     * 
     */
    create<T extends UserOrganizationLinkCreateArgs>(args: SelectSubset<T, UserOrganizationLinkCreateArgs<ExtArgs>>): Prisma__UserOrganizationLinkClient<$Result.GetResult<Prisma.$UserOrganizationLinkPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UserOrganizationLinks.
     * @param {UserOrganizationLinkCreateManyArgs} args - Arguments to create many UserOrganizationLinks.
     * @example
     * // Create many UserOrganizationLinks
     * const userOrganizationLink = await prisma.userOrganizationLink.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserOrganizationLinkCreateManyArgs>(args?: SelectSubset<T, UserOrganizationLinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserOrganizationLink.
     * @param {UserOrganizationLinkDeleteArgs} args - Arguments to delete one UserOrganizationLink.
     * @example
     * // Delete one UserOrganizationLink
     * const UserOrganizationLink = await prisma.userOrganizationLink.delete({
     *   where: {
     *     // ... filter to delete one UserOrganizationLink
     *   }
     * })
     * 
     */
    delete<T extends UserOrganizationLinkDeleteArgs>(args: SelectSubset<T, UserOrganizationLinkDeleteArgs<ExtArgs>>): Prisma__UserOrganizationLinkClient<$Result.GetResult<Prisma.$UserOrganizationLinkPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UserOrganizationLink.
     * @param {UserOrganizationLinkUpdateArgs} args - Arguments to update one UserOrganizationLink.
     * @example
     * // Update one UserOrganizationLink
     * const userOrganizationLink = await prisma.userOrganizationLink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserOrganizationLinkUpdateArgs>(args: SelectSubset<T, UserOrganizationLinkUpdateArgs<ExtArgs>>): Prisma__UserOrganizationLinkClient<$Result.GetResult<Prisma.$UserOrganizationLinkPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UserOrganizationLinks.
     * @param {UserOrganizationLinkDeleteManyArgs} args - Arguments to filter UserOrganizationLinks to delete.
     * @example
     * // Delete a few UserOrganizationLinks
     * const { count } = await prisma.userOrganizationLink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserOrganizationLinkDeleteManyArgs>(args?: SelectSubset<T, UserOrganizationLinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserOrganizationLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOrganizationLinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserOrganizationLinks
     * const userOrganizationLink = await prisma.userOrganizationLink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserOrganizationLinkUpdateManyArgs>(args: SelectSubset<T, UserOrganizationLinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserOrganizationLink.
     * @param {UserOrganizationLinkUpsertArgs} args - Arguments to update or create a UserOrganizationLink.
     * @example
     * // Update or create a UserOrganizationLink
     * const userOrganizationLink = await prisma.userOrganizationLink.upsert({
     *   create: {
     *     // ... data to create a UserOrganizationLink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserOrganizationLink we want to update
     *   }
     * })
     */
    upsert<T extends UserOrganizationLinkUpsertArgs>(args: SelectSubset<T, UserOrganizationLinkUpsertArgs<ExtArgs>>): Prisma__UserOrganizationLinkClient<$Result.GetResult<Prisma.$UserOrganizationLinkPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UserOrganizationLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOrganizationLinkCountArgs} args - Arguments to filter UserOrganizationLinks to count.
     * @example
     * // Count the number of UserOrganizationLinks
     * const count = await prisma.userOrganizationLink.count({
     *   where: {
     *     // ... the filter for the UserOrganizationLinks we want to count
     *   }
     * })
    **/
    count<T extends UserOrganizationLinkCountArgs>(
      args?: Subset<T, UserOrganizationLinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserOrganizationLinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserOrganizationLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOrganizationLinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserOrganizationLinkAggregateArgs>(args: Subset<T, UserOrganizationLinkAggregateArgs>): Prisma.PrismaPromise<GetUserOrganizationLinkAggregateType<T>>

    /**
     * Group by UserOrganizationLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOrganizationLinkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserOrganizationLinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserOrganizationLinkGroupByArgs['orderBy'] }
        : { orderBy?: UserOrganizationLinkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserOrganizationLinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserOrganizationLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserOrganizationLink model
   */
  readonly fields: UserOrganizationLinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserOrganizationLink.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserOrganizationLinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserOrganizationLink model
   */ 
  interface UserOrganizationLinkFieldRefs {
    readonly userId: FieldRef<"UserOrganizationLink", 'String'>
    readonly organizationId: FieldRef<"UserOrganizationLink", 'String'>
    readonly isOwner: FieldRef<"UserOrganizationLink", 'Boolean'>
    readonly createdAt: FieldRef<"UserOrganizationLink", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserOrganizationLink findUnique
   */
  export type UserOrganizationLinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganizationLink
     */
    select?: UserOrganizationLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationLinkInclude<ExtArgs> | null
    /**
     * Filter, which UserOrganizationLink to fetch.
     */
    where: UserOrganizationLinkWhereUniqueInput
  }

  /**
   * UserOrganizationLink findUniqueOrThrow
   */
  export type UserOrganizationLinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganizationLink
     */
    select?: UserOrganizationLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationLinkInclude<ExtArgs> | null
    /**
     * Filter, which UserOrganizationLink to fetch.
     */
    where: UserOrganizationLinkWhereUniqueInput
  }

  /**
   * UserOrganizationLink findFirst
   */
  export type UserOrganizationLinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganizationLink
     */
    select?: UserOrganizationLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationLinkInclude<ExtArgs> | null
    /**
     * Filter, which UserOrganizationLink to fetch.
     */
    where?: UserOrganizationLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOrganizationLinks to fetch.
     */
    orderBy?: UserOrganizationLinkOrderByWithRelationInput | UserOrganizationLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserOrganizationLinks.
     */
    cursor?: UserOrganizationLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOrganizationLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOrganizationLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserOrganizationLinks.
     */
    distinct?: UserOrganizationLinkScalarFieldEnum | UserOrganizationLinkScalarFieldEnum[]
  }

  /**
   * UserOrganizationLink findFirstOrThrow
   */
  export type UserOrganizationLinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganizationLink
     */
    select?: UserOrganizationLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationLinkInclude<ExtArgs> | null
    /**
     * Filter, which UserOrganizationLink to fetch.
     */
    where?: UserOrganizationLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOrganizationLinks to fetch.
     */
    orderBy?: UserOrganizationLinkOrderByWithRelationInput | UserOrganizationLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserOrganizationLinks.
     */
    cursor?: UserOrganizationLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOrganizationLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOrganizationLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserOrganizationLinks.
     */
    distinct?: UserOrganizationLinkScalarFieldEnum | UserOrganizationLinkScalarFieldEnum[]
  }

  /**
   * UserOrganizationLink findMany
   */
  export type UserOrganizationLinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganizationLink
     */
    select?: UserOrganizationLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationLinkInclude<ExtArgs> | null
    /**
     * Filter, which UserOrganizationLinks to fetch.
     */
    where?: UserOrganizationLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOrganizationLinks to fetch.
     */
    orderBy?: UserOrganizationLinkOrderByWithRelationInput | UserOrganizationLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserOrganizationLinks.
     */
    cursor?: UserOrganizationLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOrganizationLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOrganizationLinks.
     */
    skip?: number
    distinct?: UserOrganizationLinkScalarFieldEnum | UserOrganizationLinkScalarFieldEnum[]
  }

  /**
   * UserOrganizationLink create
   */
  export type UserOrganizationLinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganizationLink
     */
    select?: UserOrganizationLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationLinkInclude<ExtArgs> | null
    /**
     * The data needed to create a UserOrganizationLink.
     */
    data: XOR<UserOrganizationLinkCreateInput, UserOrganizationLinkUncheckedCreateInput>
  }

  /**
   * UserOrganizationLink createMany
   */
  export type UserOrganizationLinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserOrganizationLinks.
     */
    data: UserOrganizationLinkCreateManyInput | UserOrganizationLinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserOrganizationLink update
   */
  export type UserOrganizationLinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganizationLink
     */
    select?: UserOrganizationLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationLinkInclude<ExtArgs> | null
    /**
     * The data needed to update a UserOrganizationLink.
     */
    data: XOR<UserOrganizationLinkUpdateInput, UserOrganizationLinkUncheckedUpdateInput>
    /**
     * Choose, which UserOrganizationLink to update.
     */
    where: UserOrganizationLinkWhereUniqueInput
  }

  /**
   * UserOrganizationLink updateMany
   */
  export type UserOrganizationLinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserOrganizationLinks.
     */
    data: XOR<UserOrganizationLinkUpdateManyMutationInput, UserOrganizationLinkUncheckedUpdateManyInput>
    /**
     * Filter which UserOrganizationLinks to update
     */
    where?: UserOrganizationLinkWhereInput
  }

  /**
   * UserOrganizationLink upsert
   */
  export type UserOrganizationLinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganizationLink
     */
    select?: UserOrganizationLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationLinkInclude<ExtArgs> | null
    /**
     * The filter to search for the UserOrganizationLink to update in case it exists.
     */
    where: UserOrganizationLinkWhereUniqueInput
    /**
     * In case the UserOrganizationLink found by the `where` argument doesn't exist, create a new UserOrganizationLink with this data.
     */
    create: XOR<UserOrganizationLinkCreateInput, UserOrganizationLinkUncheckedCreateInput>
    /**
     * In case the UserOrganizationLink was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserOrganizationLinkUpdateInput, UserOrganizationLinkUncheckedUpdateInput>
  }

  /**
   * UserOrganizationLink delete
   */
  export type UserOrganizationLinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganizationLink
     */
    select?: UserOrganizationLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationLinkInclude<ExtArgs> | null
    /**
     * Filter which UserOrganizationLink to delete.
     */
    where: UserOrganizationLinkWhereUniqueInput
  }

  /**
   * UserOrganizationLink deleteMany
   */
  export type UserOrganizationLinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserOrganizationLinks to delete
     */
    where?: UserOrganizationLinkWhereInput
  }

  /**
   * UserOrganizationLink without action
   */
  export type UserOrganizationLinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOrganizationLink
     */
    select?: UserOrganizationLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOrganizationLinkInclude<ExtArgs> | null
  }


  /**
   * Model OrganizationVertical
   */

  export type AggregateOrganizationVertical = {
    _count: OrganizationVerticalCountAggregateOutputType | null
    _min: OrganizationVerticalMinAggregateOutputType | null
    _max: OrganizationVerticalMaxAggregateOutputType | null
  }

  export type OrganizationVerticalMinAggregateOutputType = {
    organizationId: string | null
    verticalCode: string | null
    statusId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationVerticalMaxAggregateOutputType = {
    organizationId: string | null
    verticalCode: string | null
    statusId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationVerticalCountAggregateOutputType = {
    organizationId: number
    verticalCode: number
    statusId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrganizationVerticalMinAggregateInputType = {
    organizationId?: true
    verticalCode?: true
    statusId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationVerticalMaxAggregateInputType = {
    organizationId?: true
    verticalCode?: true
    statusId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationVerticalCountAggregateInputType = {
    organizationId?: true
    verticalCode?: true
    statusId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrganizationVerticalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizationVertical to aggregate.
     */
    where?: OrganizationVerticalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationVerticals to fetch.
     */
    orderBy?: OrganizationVerticalOrderByWithRelationInput | OrganizationVerticalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationVerticalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationVerticals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationVerticals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrganizationVerticals
    **/
    _count?: true | OrganizationVerticalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationVerticalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationVerticalMaxAggregateInputType
  }

  export type GetOrganizationVerticalAggregateType<T extends OrganizationVerticalAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganizationVertical]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganizationVertical[P]>
      : GetScalarType<T[P], AggregateOrganizationVertical[P]>
  }




  export type OrganizationVerticalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationVerticalWhereInput
    orderBy?: OrganizationVerticalOrderByWithAggregationInput | OrganizationVerticalOrderByWithAggregationInput[]
    by: OrganizationVerticalScalarFieldEnum[] | OrganizationVerticalScalarFieldEnum
    having?: OrganizationVerticalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationVerticalCountAggregateInputType | true
    _min?: OrganizationVerticalMinAggregateInputType
    _max?: OrganizationVerticalMaxAggregateInputType
  }

  export type OrganizationVerticalGroupByOutputType = {
    organizationId: string
    verticalCode: string
    statusId: string
    createdAt: Date
    updatedAt: Date | null
    _count: OrganizationVerticalCountAggregateOutputType | null
    _min: OrganizationVerticalMinAggregateOutputType | null
    _max: OrganizationVerticalMaxAggregateOutputType | null
  }

  type GetOrganizationVerticalGroupByPayload<T extends OrganizationVerticalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationVerticalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationVerticalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationVerticalGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationVerticalGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationVerticalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    organizationId?: boolean
    verticalCode?: boolean
    statusId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationVertical"]>


  export type OrganizationVerticalSelectScalar = {
    organizationId?: boolean
    verticalCode?: boolean
    statusId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrganizationVerticalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $OrganizationVerticalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrganizationVertical"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      organizationId: string
      verticalCode: string
      statusId: string
      createdAt: Date
      updatedAt: Date | null
    }, ExtArgs["result"]["organizationVertical"]>
    composites: {}
  }

  type OrganizationVerticalGetPayload<S extends boolean | null | undefined | OrganizationVerticalDefaultArgs> = $Result.GetResult<Prisma.$OrganizationVerticalPayload, S>

  type OrganizationVerticalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OrganizationVerticalFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OrganizationVerticalCountAggregateInputType | true
    }

  export interface OrganizationVerticalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrganizationVertical'], meta: { name: 'OrganizationVertical' } }
    /**
     * Find zero or one OrganizationVertical that matches the filter.
     * @param {OrganizationVerticalFindUniqueArgs} args - Arguments to find a OrganizationVertical
     * @example
     * // Get one OrganizationVertical
     * const organizationVertical = await prisma.organizationVertical.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationVerticalFindUniqueArgs>(args: SelectSubset<T, OrganizationVerticalFindUniqueArgs<ExtArgs>>): Prisma__OrganizationVerticalClient<$Result.GetResult<Prisma.$OrganizationVerticalPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one OrganizationVertical that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OrganizationVerticalFindUniqueOrThrowArgs} args - Arguments to find a OrganizationVertical
     * @example
     * // Get one OrganizationVertical
     * const organizationVertical = await prisma.organizationVertical.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationVerticalFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationVerticalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationVerticalClient<$Result.GetResult<Prisma.$OrganizationVerticalPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first OrganizationVertical that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationVerticalFindFirstArgs} args - Arguments to find a OrganizationVertical
     * @example
     * // Get one OrganizationVertical
     * const organizationVertical = await prisma.organizationVertical.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationVerticalFindFirstArgs>(args?: SelectSubset<T, OrganizationVerticalFindFirstArgs<ExtArgs>>): Prisma__OrganizationVerticalClient<$Result.GetResult<Prisma.$OrganizationVerticalPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first OrganizationVertical that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationVerticalFindFirstOrThrowArgs} args - Arguments to find a OrganizationVertical
     * @example
     * // Get one OrganizationVertical
     * const organizationVertical = await prisma.organizationVertical.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationVerticalFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationVerticalFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationVerticalClient<$Result.GetResult<Prisma.$OrganizationVerticalPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more OrganizationVerticals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationVerticalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrganizationVerticals
     * const organizationVerticals = await prisma.organizationVertical.findMany()
     * 
     * // Get first 10 OrganizationVerticals
     * const organizationVerticals = await prisma.organizationVertical.findMany({ take: 10 })
     * 
     * // Only select the `organizationId`
     * const organizationVerticalWithOrganizationIdOnly = await prisma.organizationVertical.findMany({ select: { organizationId: true } })
     * 
     */
    findMany<T extends OrganizationVerticalFindManyArgs>(args?: SelectSubset<T, OrganizationVerticalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationVerticalPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a OrganizationVertical.
     * @param {OrganizationVerticalCreateArgs} args - Arguments to create a OrganizationVertical.
     * @example
     * // Create one OrganizationVertical
     * const OrganizationVertical = await prisma.organizationVertical.create({
     *   data: {
     *     // ... data to create a OrganizationVertical
     *   }
     * })
     * 
     */
    create<T extends OrganizationVerticalCreateArgs>(args: SelectSubset<T, OrganizationVerticalCreateArgs<ExtArgs>>): Prisma__OrganizationVerticalClient<$Result.GetResult<Prisma.$OrganizationVerticalPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many OrganizationVerticals.
     * @param {OrganizationVerticalCreateManyArgs} args - Arguments to create many OrganizationVerticals.
     * @example
     * // Create many OrganizationVerticals
     * const organizationVertical = await prisma.organizationVertical.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationVerticalCreateManyArgs>(args?: SelectSubset<T, OrganizationVerticalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OrganizationVertical.
     * @param {OrganizationVerticalDeleteArgs} args - Arguments to delete one OrganizationVertical.
     * @example
     * // Delete one OrganizationVertical
     * const OrganizationVertical = await prisma.organizationVertical.delete({
     *   where: {
     *     // ... filter to delete one OrganizationVertical
     *   }
     * })
     * 
     */
    delete<T extends OrganizationVerticalDeleteArgs>(args: SelectSubset<T, OrganizationVerticalDeleteArgs<ExtArgs>>): Prisma__OrganizationVerticalClient<$Result.GetResult<Prisma.$OrganizationVerticalPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one OrganizationVertical.
     * @param {OrganizationVerticalUpdateArgs} args - Arguments to update one OrganizationVertical.
     * @example
     * // Update one OrganizationVertical
     * const organizationVertical = await prisma.organizationVertical.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationVerticalUpdateArgs>(args: SelectSubset<T, OrganizationVerticalUpdateArgs<ExtArgs>>): Prisma__OrganizationVerticalClient<$Result.GetResult<Prisma.$OrganizationVerticalPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more OrganizationVerticals.
     * @param {OrganizationVerticalDeleteManyArgs} args - Arguments to filter OrganizationVerticals to delete.
     * @example
     * // Delete a few OrganizationVerticals
     * const { count } = await prisma.organizationVertical.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationVerticalDeleteManyArgs>(args?: SelectSubset<T, OrganizationVerticalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrganizationVerticals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationVerticalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrganizationVerticals
     * const organizationVertical = await prisma.organizationVertical.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationVerticalUpdateManyArgs>(args: SelectSubset<T, OrganizationVerticalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OrganizationVertical.
     * @param {OrganizationVerticalUpsertArgs} args - Arguments to update or create a OrganizationVertical.
     * @example
     * // Update or create a OrganizationVertical
     * const organizationVertical = await prisma.organizationVertical.upsert({
     *   create: {
     *     // ... data to create a OrganizationVertical
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrganizationVertical we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationVerticalUpsertArgs>(args: SelectSubset<T, OrganizationVerticalUpsertArgs<ExtArgs>>): Prisma__OrganizationVerticalClient<$Result.GetResult<Prisma.$OrganizationVerticalPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of OrganizationVerticals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationVerticalCountArgs} args - Arguments to filter OrganizationVerticals to count.
     * @example
     * // Count the number of OrganizationVerticals
     * const count = await prisma.organizationVertical.count({
     *   where: {
     *     // ... the filter for the OrganizationVerticals we want to count
     *   }
     * })
    **/
    count<T extends OrganizationVerticalCountArgs>(
      args?: Subset<T, OrganizationVerticalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationVerticalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrganizationVertical.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationVerticalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizationVerticalAggregateArgs>(args: Subset<T, OrganizationVerticalAggregateArgs>): Prisma.PrismaPromise<GetOrganizationVerticalAggregateType<T>>

    /**
     * Group by OrganizationVertical.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationVerticalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrganizationVerticalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationVerticalGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationVerticalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrganizationVerticalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationVerticalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrganizationVertical model
   */
  readonly fields: OrganizationVerticalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrganizationVertical.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationVerticalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrganizationVertical model
   */ 
  interface OrganizationVerticalFieldRefs {
    readonly organizationId: FieldRef<"OrganizationVertical", 'String'>
    readonly verticalCode: FieldRef<"OrganizationVertical", 'String'>
    readonly statusId: FieldRef<"OrganizationVertical", 'String'>
    readonly createdAt: FieldRef<"OrganizationVertical", 'DateTime'>
    readonly updatedAt: FieldRef<"OrganizationVertical", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrganizationVertical findUnique
   */
  export type OrganizationVerticalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationVertical
     */
    select?: OrganizationVerticalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationVerticalInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationVertical to fetch.
     */
    where: OrganizationVerticalWhereUniqueInput
  }

  /**
   * OrganizationVertical findUniqueOrThrow
   */
  export type OrganizationVerticalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationVertical
     */
    select?: OrganizationVerticalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationVerticalInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationVertical to fetch.
     */
    where: OrganizationVerticalWhereUniqueInput
  }

  /**
   * OrganizationVertical findFirst
   */
  export type OrganizationVerticalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationVertical
     */
    select?: OrganizationVerticalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationVerticalInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationVertical to fetch.
     */
    where?: OrganizationVerticalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationVerticals to fetch.
     */
    orderBy?: OrganizationVerticalOrderByWithRelationInput | OrganizationVerticalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizationVerticals.
     */
    cursor?: OrganizationVerticalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationVerticals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationVerticals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizationVerticals.
     */
    distinct?: OrganizationVerticalScalarFieldEnum | OrganizationVerticalScalarFieldEnum[]
  }

  /**
   * OrganizationVertical findFirstOrThrow
   */
  export type OrganizationVerticalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationVertical
     */
    select?: OrganizationVerticalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationVerticalInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationVertical to fetch.
     */
    where?: OrganizationVerticalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationVerticals to fetch.
     */
    orderBy?: OrganizationVerticalOrderByWithRelationInput | OrganizationVerticalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizationVerticals.
     */
    cursor?: OrganizationVerticalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationVerticals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationVerticals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizationVerticals.
     */
    distinct?: OrganizationVerticalScalarFieldEnum | OrganizationVerticalScalarFieldEnum[]
  }

  /**
   * OrganizationVertical findMany
   */
  export type OrganizationVerticalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationVertical
     */
    select?: OrganizationVerticalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationVerticalInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationVerticals to fetch.
     */
    where?: OrganizationVerticalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationVerticals to fetch.
     */
    orderBy?: OrganizationVerticalOrderByWithRelationInput | OrganizationVerticalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrganizationVerticals.
     */
    cursor?: OrganizationVerticalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationVerticals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationVerticals.
     */
    skip?: number
    distinct?: OrganizationVerticalScalarFieldEnum | OrganizationVerticalScalarFieldEnum[]
  }

  /**
   * OrganizationVertical create
   */
  export type OrganizationVerticalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationVertical
     */
    select?: OrganizationVerticalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationVerticalInclude<ExtArgs> | null
    /**
     * The data needed to create a OrganizationVertical.
     */
    data: XOR<OrganizationVerticalCreateInput, OrganizationVerticalUncheckedCreateInput>
  }

  /**
   * OrganizationVertical createMany
   */
  export type OrganizationVerticalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrganizationVerticals.
     */
    data: OrganizationVerticalCreateManyInput | OrganizationVerticalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrganizationVertical update
   */
  export type OrganizationVerticalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationVertical
     */
    select?: OrganizationVerticalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationVerticalInclude<ExtArgs> | null
    /**
     * The data needed to update a OrganizationVertical.
     */
    data: XOR<OrganizationVerticalUpdateInput, OrganizationVerticalUncheckedUpdateInput>
    /**
     * Choose, which OrganizationVertical to update.
     */
    where: OrganizationVerticalWhereUniqueInput
  }

  /**
   * OrganizationVertical updateMany
   */
  export type OrganizationVerticalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrganizationVerticals.
     */
    data: XOR<OrganizationVerticalUpdateManyMutationInput, OrganizationVerticalUncheckedUpdateManyInput>
    /**
     * Filter which OrganizationVerticals to update
     */
    where?: OrganizationVerticalWhereInput
  }

  /**
   * OrganizationVertical upsert
   */
  export type OrganizationVerticalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationVertical
     */
    select?: OrganizationVerticalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationVerticalInclude<ExtArgs> | null
    /**
     * The filter to search for the OrganizationVertical to update in case it exists.
     */
    where: OrganizationVerticalWhereUniqueInput
    /**
     * In case the OrganizationVertical found by the `where` argument doesn't exist, create a new OrganizationVertical with this data.
     */
    create: XOR<OrganizationVerticalCreateInput, OrganizationVerticalUncheckedCreateInput>
    /**
     * In case the OrganizationVertical was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationVerticalUpdateInput, OrganizationVerticalUncheckedUpdateInput>
  }

  /**
   * OrganizationVertical delete
   */
  export type OrganizationVerticalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationVertical
     */
    select?: OrganizationVerticalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationVerticalInclude<ExtArgs> | null
    /**
     * Filter which OrganizationVertical to delete.
     */
    where: OrganizationVerticalWhereUniqueInput
  }

  /**
   * OrganizationVertical deleteMany
   */
  export type OrganizationVerticalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizationVerticals to delete
     */
    where?: OrganizationVerticalWhereInput
  }

  /**
   * OrganizationVertical without action
   */
  export type OrganizationVerticalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationVertical
     */
    select?: OrganizationVerticalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationVerticalInclude<ExtArgs> | null
  }


  /**
   * Model BusinessUnit
   */

  export type AggregateBusinessUnit = {
    _count: BusinessUnitCountAggregateOutputType | null
    _min: BusinessUnitMinAggregateOutputType | null
    _max: BusinessUnitMaxAggregateOutputType | null
  }

  export type BusinessUnitMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    publicName: string | null
    phoneNumber: string | null
    phoneHasWhatsapp: boolean | null
    email: string | null
    instagram: string | null
    website: string | null
    statusId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BusinessUnitMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    publicName: string | null
    phoneNumber: string | null
    phoneHasWhatsapp: boolean | null
    email: string | null
    instagram: string | null
    website: string | null
    statusId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BusinessUnitCountAggregateOutputType = {
    id: number
    organizationId: number
    publicName: number
    phoneNumber: number
    phoneHasWhatsapp: number
    email: number
    instagram: number
    website: number
    statusId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BusinessUnitMinAggregateInputType = {
    id?: true
    organizationId?: true
    publicName?: true
    phoneNumber?: true
    phoneHasWhatsapp?: true
    email?: true
    instagram?: true
    website?: true
    statusId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BusinessUnitMaxAggregateInputType = {
    id?: true
    organizationId?: true
    publicName?: true
    phoneNumber?: true
    phoneHasWhatsapp?: true
    email?: true
    instagram?: true
    website?: true
    statusId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BusinessUnitCountAggregateInputType = {
    id?: true
    organizationId?: true
    publicName?: true
    phoneNumber?: true
    phoneHasWhatsapp?: true
    email?: true
    instagram?: true
    website?: true
    statusId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BusinessUnitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BusinessUnit to aggregate.
     */
    where?: BusinessUnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessUnits to fetch.
     */
    orderBy?: BusinessUnitOrderByWithRelationInput | BusinessUnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BusinessUnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessUnits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessUnits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BusinessUnits
    **/
    _count?: true | BusinessUnitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BusinessUnitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BusinessUnitMaxAggregateInputType
  }

  export type GetBusinessUnitAggregateType<T extends BusinessUnitAggregateArgs> = {
        [P in keyof T & keyof AggregateBusinessUnit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBusinessUnit[P]>
      : GetScalarType<T[P], AggregateBusinessUnit[P]>
  }




  export type BusinessUnitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessUnitWhereInput
    orderBy?: BusinessUnitOrderByWithAggregationInput | BusinessUnitOrderByWithAggregationInput[]
    by: BusinessUnitScalarFieldEnum[] | BusinessUnitScalarFieldEnum
    having?: BusinessUnitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BusinessUnitCountAggregateInputType | true
    _min?: BusinessUnitMinAggregateInputType
    _max?: BusinessUnitMaxAggregateInputType
  }

  export type BusinessUnitGroupByOutputType = {
    id: string
    organizationId: string
    publicName: string
    phoneNumber: string
    phoneHasWhatsapp: boolean
    email: string | null
    instagram: string | null
    website: string | null
    statusId: string
    createdAt: Date
    updatedAt: Date | null
    _count: BusinessUnitCountAggregateOutputType | null
    _min: BusinessUnitMinAggregateOutputType | null
    _max: BusinessUnitMaxAggregateOutputType | null
  }

  type GetBusinessUnitGroupByPayload<T extends BusinessUnitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BusinessUnitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BusinessUnitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BusinessUnitGroupByOutputType[P]>
            : GetScalarType<T[P], BusinessUnitGroupByOutputType[P]>
        }
      >
    >


  export type BusinessUnitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    publicName?: boolean
    phoneNumber?: boolean
    phoneHasWhatsapp?: boolean
    email?: boolean
    instagram?: boolean
    website?: boolean
    statusId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    address?: boolean | BusinessUnit$addressArgs<ExtArgs>
    businessUnitVerticals?: boolean | BusinessUnit$businessUnitVerticalsArgs<ExtArgs>
    _count?: boolean | BusinessUnitCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["businessUnit"]>


  export type BusinessUnitSelectScalar = {
    id?: boolean
    organizationId?: boolean
    publicName?: boolean
    phoneNumber?: boolean
    phoneHasWhatsapp?: boolean
    email?: boolean
    instagram?: boolean
    website?: boolean
    statusId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BusinessUnitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    address?: boolean | BusinessUnit$addressArgs<ExtArgs>
    businessUnitVerticals?: boolean | BusinessUnit$businessUnitVerticalsArgs<ExtArgs>
    _count?: boolean | BusinessUnitCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $BusinessUnitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BusinessUnit"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      address: Prisma.$BusinessUnitAddressPayload<ExtArgs> | null
      businessUnitVerticals: Prisma.$BusinessUnitVerticalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizationId: string
      publicName: string
      phoneNumber: string
      phoneHasWhatsapp: boolean
      email: string | null
      instagram: string | null
      website: string | null
      statusId: string
      createdAt: Date
      updatedAt: Date | null
    }, ExtArgs["result"]["businessUnit"]>
    composites: {}
  }

  type BusinessUnitGetPayload<S extends boolean | null | undefined | BusinessUnitDefaultArgs> = $Result.GetResult<Prisma.$BusinessUnitPayload, S>

  type BusinessUnitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BusinessUnitFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BusinessUnitCountAggregateInputType | true
    }

  export interface BusinessUnitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BusinessUnit'], meta: { name: 'BusinessUnit' } }
    /**
     * Find zero or one BusinessUnit that matches the filter.
     * @param {BusinessUnitFindUniqueArgs} args - Arguments to find a BusinessUnit
     * @example
     * // Get one BusinessUnit
     * const businessUnit = await prisma.businessUnit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BusinessUnitFindUniqueArgs>(args: SelectSubset<T, BusinessUnitFindUniqueArgs<ExtArgs>>): Prisma__BusinessUnitClient<$Result.GetResult<Prisma.$BusinessUnitPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BusinessUnit that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BusinessUnitFindUniqueOrThrowArgs} args - Arguments to find a BusinessUnit
     * @example
     * // Get one BusinessUnit
     * const businessUnit = await prisma.businessUnit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BusinessUnitFindUniqueOrThrowArgs>(args: SelectSubset<T, BusinessUnitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BusinessUnitClient<$Result.GetResult<Prisma.$BusinessUnitPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BusinessUnit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUnitFindFirstArgs} args - Arguments to find a BusinessUnit
     * @example
     * // Get one BusinessUnit
     * const businessUnit = await prisma.businessUnit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BusinessUnitFindFirstArgs>(args?: SelectSubset<T, BusinessUnitFindFirstArgs<ExtArgs>>): Prisma__BusinessUnitClient<$Result.GetResult<Prisma.$BusinessUnitPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BusinessUnit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUnitFindFirstOrThrowArgs} args - Arguments to find a BusinessUnit
     * @example
     * // Get one BusinessUnit
     * const businessUnit = await prisma.businessUnit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BusinessUnitFindFirstOrThrowArgs>(args?: SelectSubset<T, BusinessUnitFindFirstOrThrowArgs<ExtArgs>>): Prisma__BusinessUnitClient<$Result.GetResult<Prisma.$BusinessUnitPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BusinessUnits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUnitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BusinessUnits
     * const businessUnits = await prisma.businessUnit.findMany()
     * 
     * // Get first 10 BusinessUnits
     * const businessUnits = await prisma.businessUnit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const businessUnitWithIdOnly = await prisma.businessUnit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BusinessUnitFindManyArgs>(args?: SelectSubset<T, BusinessUnitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessUnitPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BusinessUnit.
     * @param {BusinessUnitCreateArgs} args - Arguments to create a BusinessUnit.
     * @example
     * // Create one BusinessUnit
     * const BusinessUnit = await prisma.businessUnit.create({
     *   data: {
     *     // ... data to create a BusinessUnit
     *   }
     * })
     * 
     */
    create<T extends BusinessUnitCreateArgs>(args: SelectSubset<T, BusinessUnitCreateArgs<ExtArgs>>): Prisma__BusinessUnitClient<$Result.GetResult<Prisma.$BusinessUnitPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BusinessUnits.
     * @param {BusinessUnitCreateManyArgs} args - Arguments to create many BusinessUnits.
     * @example
     * // Create many BusinessUnits
     * const businessUnit = await prisma.businessUnit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BusinessUnitCreateManyArgs>(args?: SelectSubset<T, BusinessUnitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a BusinessUnit.
     * @param {BusinessUnitDeleteArgs} args - Arguments to delete one BusinessUnit.
     * @example
     * // Delete one BusinessUnit
     * const BusinessUnit = await prisma.businessUnit.delete({
     *   where: {
     *     // ... filter to delete one BusinessUnit
     *   }
     * })
     * 
     */
    delete<T extends BusinessUnitDeleteArgs>(args: SelectSubset<T, BusinessUnitDeleteArgs<ExtArgs>>): Prisma__BusinessUnitClient<$Result.GetResult<Prisma.$BusinessUnitPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BusinessUnit.
     * @param {BusinessUnitUpdateArgs} args - Arguments to update one BusinessUnit.
     * @example
     * // Update one BusinessUnit
     * const businessUnit = await prisma.businessUnit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BusinessUnitUpdateArgs>(args: SelectSubset<T, BusinessUnitUpdateArgs<ExtArgs>>): Prisma__BusinessUnitClient<$Result.GetResult<Prisma.$BusinessUnitPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BusinessUnits.
     * @param {BusinessUnitDeleteManyArgs} args - Arguments to filter BusinessUnits to delete.
     * @example
     * // Delete a few BusinessUnits
     * const { count } = await prisma.businessUnit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BusinessUnitDeleteManyArgs>(args?: SelectSubset<T, BusinessUnitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BusinessUnits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUnitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BusinessUnits
     * const businessUnit = await prisma.businessUnit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BusinessUnitUpdateManyArgs>(args: SelectSubset<T, BusinessUnitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BusinessUnit.
     * @param {BusinessUnitUpsertArgs} args - Arguments to update or create a BusinessUnit.
     * @example
     * // Update or create a BusinessUnit
     * const businessUnit = await prisma.businessUnit.upsert({
     *   create: {
     *     // ... data to create a BusinessUnit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BusinessUnit we want to update
     *   }
     * })
     */
    upsert<T extends BusinessUnitUpsertArgs>(args: SelectSubset<T, BusinessUnitUpsertArgs<ExtArgs>>): Prisma__BusinessUnitClient<$Result.GetResult<Prisma.$BusinessUnitPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BusinessUnits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUnitCountArgs} args - Arguments to filter BusinessUnits to count.
     * @example
     * // Count the number of BusinessUnits
     * const count = await prisma.businessUnit.count({
     *   where: {
     *     // ... the filter for the BusinessUnits we want to count
     *   }
     * })
    **/
    count<T extends BusinessUnitCountArgs>(
      args?: Subset<T, BusinessUnitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BusinessUnitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BusinessUnit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUnitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BusinessUnitAggregateArgs>(args: Subset<T, BusinessUnitAggregateArgs>): Prisma.PrismaPromise<GetBusinessUnitAggregateType<T>>

    /**
     * Group by BusinessUnit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUnitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BusinessUnitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BusinessUnitGroupByArgs['orderBy'] }
        : { orderBy?: BusinessUnitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BusinessUnitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBusinessUnitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BusinessUnit model
   */
  readonly fields: BusinessUnitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BusinessUnit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BusinessUnitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    address<T extends BusinessUnit$addressArgs<ExtArgs> = {}>(args?: Subset<T, BusinessUnit$addressArgs<ExtArgs>>): Prisma__BusinessUnitAddressClient<$Result.GetResult<Prisma.$BusinessUnitAddressPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    businessUnitVerticals<T extends BusinessUnit$businessUnitVerticalsArgs<ExtArgs> = {}>(args?: Subset<T, BusinessUnit$businessUnitVerticalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessUnitVerticalPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BusinessUnit model
   */ 
  interface BusinessUnitFieldRefs {
    readonly id: FieldRef<"BusinessUnit", 'String'>
    readonly organizationId: FieldRef<"BusinessUnit", 'String'>
    readonly publicName: FieldRef<"BusinessUnit", 'String'>
    readonly phoneNumber: FieldRef<"BusinessUnit", 'String'>
    readonly phoneHasWhatsapp: FieldRef<"BusinessUnit", 'Boolean'>
    readonly email: FieldRef<"BusinessUnit", 'String'>
    readonly instagram: FieldRef<"BusinessUnit", 'String'>
    readonly website: FieldRef<"BusinessUnit", 'String'>
    readonly statusId: FieldRef<"BusinessUnit", 'String'>
    readonly createdAt: FieldRef<"BusinessUnit", 'DateTime'>
    readonly updatedAt: FieldRef<"BusinessUnit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BusinessUnit findUnique
   */
  export type BusinessUnitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnit
     */
    select?: BusinessUnitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitInclude<ExtArgs> | null
    /**
     * Filter, which BusinessUnit to fetch.
     */
    where: BusinessUnitWhereUniqueInput
  }

  /**
   * BusinessUnit findUniqueOrThrow
   */
  export type BusinessUnitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnit
     */
    select?: BusinessUnitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitInclude<ExtArgs> | null
    /**
     * Filter, which BusinessUnit to fetch.
     */
    where: BusinessUnitWhereUniqueInput
  }

  /**
   * BusinessUnit findFirst
   */
  export type BusinessUnitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnit
     */
    select?: BusinessUnitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitInclude<ExtArgs> | null
    /**
     * Filter, which BusinessUnit to fetch.
     */
    where?: BusinessUnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessUnits to fetch.
     */
    orderBy?: BusinessUnitOrderByWithRelationInput | BusinessUnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusinessUnits.
     */
    cursor?: BusinessUnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessUnits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessUnits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusinessUnits.
     */
    distinct?: BusinessUnitScalarFieldEnum | BusinessUnitScalarFieldEnum[]
  }

  /**
   * BusinessUnit findFirstOrThrow
   */
  export type BusinessUnitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnit
     */
    select?: BusinessUnitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitInclude<ExtArgs> | null
    /**
     * Filter, which BusinessUnit to fetch.
     */
    where?: BusinessUnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessUnits to fetch.
     */
    orderBy?: BusinessUnitOrderByWithRelationInput | BusinessUnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusinessUnits.
     */
    cursor?: BusinessUnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessUnits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessUnits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusinessUnits.
     */
    distinct?: BusinessUnitScalarFieldEnum | BusinessUnitScalarFieldEnum[]
  }

  /**
   * BusinessUnit findMany
   */
  export type BusinessUnitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnit
     */
    select?: BusinessUnitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitInclude<ExtArgs> | null
    /**
     * Filter, which BusinessUnits to fetch.
     */
    where?: BusinessUnitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessUnits to fetch.
     */
    orderBy?: BusinessUnitOrderByWithRelationInput | BusinessUnitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BusinessUnits.
     */
    cursor?: BusinessUnitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessUnits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessUnits.
     */
    skip?: number
    distinct?: BusinessUnitScalarFieldEnum | BusinessUnitScalarFieldEnum[]
  }

  /**
   * BusinessUnit create
   */
  export type BusinessUnitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnit
     */
    select?: BusinessUnitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitInclude<ExtArgs> | null
    /**
     * The data needed to create a BusinessUnit.
     */
    data: XOR<BusinessUnitCreateInput, BusinessUnitUncheckedCreateInput>
  }

  /**
   * BusinessUnit createMany
   */
  export type BusinessUnitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BusinessUnits.
     */
    data: BusinessUnitCreateManyInput | BusinessUnitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BusinessUnit update
   */
  export type BusinessUnitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnit
     */
    select?: BusinessUnitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitInclude<ExtArgs> | null
    /**
     * The data needed to update a BusinessUnit.
     */
    data: XOR<BusinessUnitUpdateInput, BusinessUnitUncheckedUpdateInput>
    /**
     * Choose, which BusinessUnit to update.
     */
    where: BusinessUnitWhereUniqueInput
  }

  /**
   * BusinessUnit updateMany
   */
  export type BusinessUnitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BusinessUnits.
     */
    data: XOR<BusinessUnitUpdateManyMutationInput, BusinessUnitUncheckedUpdateManyInput>
    /**
     * Filter which BusinessUnits to update
     */
    where?: BusinessUnitWhereInput
  }

  /**
   * BusinessUnit upsert
   */
  export type BusinessUnitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnit
     */
    select?: BusinessUnitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitInclude<ExtArgs> | null
    /**
     * The filter to search for the BusinessUnit to update in case it exists.
     */
    where: BusinessUnitWhereUniqueInput
    /**
     * In case the BusinessUnit found by the `where` argument doesn't exist, create a new BusinessUnit with this data.
     */
    create: XOR<BusinessUnitCreateInput, BusinessUnitUncheckedCreateInput>
    /**
     * In case the BusinessUnit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BusinessUnitUpdateInput, BusinessUnitUncheckedUpdateInput>
  }

  /**
   * BusinessUnit delete
   */
  export type BusinessUnitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnit
     */
    select?: BusinessUnitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitInclude<ExtArgs> | null
    /**
     * Filter which BusinessUnit to delete.
     */
    where: BusinessUnitWhereUniqueInput
  }

  /**
   * BusinessUnit deleteMany
   */
  export type BusinessUnitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BusinessUnits to delete
     */
    where?: BusinessUnitWhereInput
  }

  /**
   * BusinessUnit.address
   */
  export type BusinessUnit$addressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnitAddress
     */
    select?: BusinessUnitAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitAddressInclude<ExtArgs> | null
    where?: BusinessUnitAddressWhereInput
  }

  /**
   * BusinessUnit.businessUnitVerticals
   */
  export type BusinessUnit$businessUnitVerticalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnitVertical
     */
    select?: BusinessUnitVerticalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitVerticalInclude<ExtArgs> | null
    where?: BusinessUnitVerticalWhereInput
    orderBy?: BusinessUnitVerticalOrderByWithRelationInput | BusinessUnitVerticalOrderByWithRelationInput[]
    cursor?: BusinessUnitVerticalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BusinessUnitVerticalScalarFieldEnum | BusinessUnitVerticalScalarFieldEnum[]
  }

  /**
   * BusinessUnit without action
   */
  export type BusinessUnitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnit
     */
    select?: BusinessUnitSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitInclude<ExtArgs> | null
  }


  /**
   * Model BusinessUnitAddress
   */

  export type AggregateBusinessUnitAddress = {
    _count: BusinessUnitAddressCountAggregateOutputType | null
    _min: BusinessUnitAddressMinAggregateOutputType | null
    _max: BusinessUnitAddressMaxAggregateOutputType | null
  }

  export type BusinessUnitAddressMinAggregateOutputType = {
    businessUnitId: string | null
    street: string | null
    number: string | null
    complement: string | null
    neighborhood: string | null
    city: string | null
    state: string | null
    postalCode: string | null
    country: string | null
    referencePoint: string | null
  }

  export type BusinessUnitAddressMaxAggregateOutputType = {
    businessUnitId: string | null
    street: string | null
    number: string | null
    complement: string | null
    neighborhood: string | null
    city: string | null
    state: string | null
    postalCode: string | null
    country: string | null
    referencePoint: string | null
  }

  export type BusinessUnitAddressCountAggregateOutputType = {
    businessUnitId: number
    street: number
    number: number
    complement: number
    neighborhood: number
    city: number
    state: number
    postalCode: number
    country: number
    referencePoint: number
    _all: number
  }


  export type BusinessUnitAddressMinAggregateInputType = {
    businessUnitId?: true
    street?: true
    number?: true
    complement?: true
    neighborhood?: true
    city?: true
    state?: true
    postalCode?: true
    country?: true
    referencePoint?: true
  }

  export type BusinessUnitAddressMaxAggregateInputType = {
    businessUnitId?: true
    street?: true
    number?: true
    complement?: true
    neighborhood?: true
    city?: true
    state?: true
    postalCode?: true
    country?: true
    referencePoint?: true
  }

  export type BusinessUnitAddressCountAggregateInputType = {
    businessUnitId?: true
    street?: true
    number?: true
    complement?: true
    neighborhood?: true
    city?: true
    state?: true
    postalCode?: true
    country?: true
    referencePoint?: true
    _all?: true
  }

  export type BusinessUnitAddressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BusinessUnitAddress to aggregate.
     */
    where?: BusinessUnitAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessUnitAddresses to fetch.
     */
    orderBy?: BusinessUnitAddressOrderByWithRelationInput | BusinessUnitAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BusinessUnitAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessUnitAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessUnitAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BusinessUnitAddresses
    **/
    _count?: true | BusinessUnitAddressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BusinessUnitAddressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BusinessUnitAddressMaxAggregateInputType
  }

  export type GetBusinessUnitAddressAggregateType<T extends BusinessUnitAddressAggregateArgs> = {
        [P in keyof T & keyof AggregateBusinessUnitAddress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBusinessUnitAddress[P]>
      : GetScalarType<T[P], AggregateBusinessUnitAddress[P]>
  }




  export type BusinessUnitAddressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessUnitAddressWhereInput
    orderBy?: BusinessUnitAddressOrderByWithAggregationInput | BusinessUnitAddressOrderByWithAggregationInput[]
    by: BusinessUnitAddressScalarFieldEnum[] | BusinessUnitAddressScalarFieldEnum
    having?: BusinessUnitAddressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BusinessUnitAddressCountAggregateInputType | true
    _min?: BusinessUnitAddressMinAggregateInputType
    _max?: BusinessUnitAddressMaxAggregateInputType
  }

  export type BusinessUnitAddressGroupByOutputType = {
    businessUnitId: string
    street: string
    number: string
    complement: string | null
    neighborhood: string
    city: string
    state: string
    postalCode: string
    country: string
    referencePoint: string
    _count: BusinessUnitAddressCountAggregateOutputType | null
    _min: BusinessUnitAddressMinAggregateOutputType | null
    _max: BusinessUnitAddressMaxAggregateOutputType | null
  }

  type GetBusinessUnitAddressGroupByPayload<T extends BusinessUnitAddressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BusinessUnitAddressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BusinessUnitAddressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BusinessUnitAddressGroupByOutputType[P]>
            : GetScalarType<T[P], BusinessUnitAddressGroupByOutputType[P]>
        }
      >
    >


  export type BusinessUnitAddressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    businessUnitId?: boolean
    street?: boolean
    number?: boolean
    complement?: boolean
    neighborhood?: boolean
    city?: boolean
    state?: boolean
    postalCode?: boolean
    country?: boolean
    referencePoint?: boolean
    businessUnit?: boolean | BusinessUnitDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["businessUnitAddress"]>


  export type BusinessUnitAddressSelectScalar = {
    businessUnitId?: boolean
    street?: boolean
    number?: boolean
    complement?: boolean
    neighborhood?: boolean
    city?: boolean
    state?: boolean
    postalCode?: boolean
    country?: boolean
    referencePoint?: boolean
  }

  export type BusinessUnitAddressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    businessUnit?: boolean | BusinessUnitDefaultArgs<ExtArgs>
  }

  export type $BusinessUnitAddressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BusinessUnitAddress"
    objects: {
      businessUnit: Prisma.$BusinessUnitPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      businessUnitId: string
      street: string
      number: string
      complement: string | null
      neighborhood: string
      city: string
      state: string
      postalCode: string
      country: string
      referencePoint: string
    }, ExtArgs["result"]["businessUnitAddress"]>
    composites: {}
  }

  type BusinessUnitAddressGetPayload<S extends boolean | null | undefined | BusinessUnitAddressDefaultArgs> = $Result.GetResult<Prisma.$BusinessUnitAddressPayload, S>

  type BusinessUnitAddressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BusinessUnitAddressFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BusinessUnitAddressCountAggregateInputType | true
    }

  export interface BusinessUnitAddressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BusinessUnitAddress'], meta: { name: 'BusinessUnitAddress' } }
    /**
     * Find zero or one BusinessUnitAddress that matches the filter.
     * @param {BusinessUnitAddressFindUniqueArgs} args - Arguments to find a BusinessUnitAddress
     * @example
     * // Get one BusinessUnitAddress
     * const businessUnitAddress = await prisma.businessUnitAddress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BusinessUnitAddressFindUniqueArgs>(args: SelectSubset<T, BusinessUnitAddressFindUniqueArgs<ExtArgs>>): Prisma__BusinessUnitAddressClient<$Result.GetResult<Prisma.$BusinessUnitAddressPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BusinessUnitAddress that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BusinessUnitAddressFindUniqueOrThrowArgs} args - Arguments to find a BusinessUnitAddress
     * @example
     * // Get one BusinessUnitAddress
     * const businessUnitAddress = await prisma.businessUnitAddress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BusinessUnitAddressFindUniqueOrThrowArgs>(args: SelectSubset<T, BusinessUnitAddressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BusinessUnitAddressClient<$Result.GetResult<Prisma.$BusinessUnitAddressPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BusinessUnitAddress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUnitAddressFindFirstArgs} args - Arguments to find a BusinessUnitAddress
     * @example
     * // Get one BusinessUnitAddress
     * const businessUnitAddress = await prisma.businessUnitAddress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BusinessUnitAddressFindFirstArgs>(args?: SelectSubset<T, BusinessUnitAddressFindFirstArgs<ExtArgs>>): Prisma__BusinessUnitAddressClient<$Result.GetResult<Prisma.$BusinessUnitAddressPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BusinessUnitAddress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUnitAddressFindFirstOrThrowArgs} args - Arguments to find a BusinessUnitAddress
     * @example
     * // Get one BusinessUnitAddress
     * const businessUnitAddress = await prisma.businessUnitAddress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BusinessUnitAddressFindFirstOrThrowArgs>(args?: SelectSubset<T, BusinessUnitAddressFindFirstOrThrowArgs<ExtArgs>>): Prisma__BusinessUnitAddressClient<$Result.GetResult<Prisma.$BusinessUnitAddressPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BusinessUnitAddresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUnitAddressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BusinessUnitAddresses
     * const businessUnitAddresses = await prisma.businessUnitAddress.findMany()
     * 
     * // Get first 10 BusinessUnitAddresses
     * const businessUnitAddresses = await prisma.businessUnitAddress.findMany({ take: 10 })
     * 
     * // Only select the `businessUnitId`
     * const businessUnitAddressWithBusinessUnitIdOnly = await prisma.businessUnitAddress.findMany({ select: { businessUnitId: true } })
     * 
     */
    findMany<T extends BusinessUnitAddressFindManyArgs>(args?: SelectSubset<T, BusinessUnitAddressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessUnitAddressPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BusinessUnitAddress.
     * @param {BusinessUnitAddressCreateArgs} args - Arguments to create a BusinessUnitAddress.
     * @example
     * // Create one BusinessUnitAddress
     * const BusinessUnitAddress = await prisma.businessUnitAddress.create({
     *   data: {
     *     // ... data to create a BusinessUnitAddress
     *   }
     * })
     * 
     */
    create<T extends BusinessUnitAddressCreateArgs>(args: SelectSubset<T, BusinessUnitAddressCreateArgs<ExtArgs>>): Prisma__BusinessUnitAddressClient<$Result.GetResult<Prisma.$BusinessUnitAddressPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BusinessUnitAddresses.
     * @param {BusinessUnitAddressCreateManyArgs} args - Arguments to create many BusinessUnitAddresses.
     * @example
     * // Create many BusinessUnitAddresses
     * const businessUnitAddress = await prisma.businessUnitAddress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BusinessUnitAddressCreateManyArgs>(args?: SelectSubset<T, BusinessUnitAddressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a BusinessUnitAddress.
     * @param {BusinessUnitAddressDeleteArgs} args - Arguments to delete one BusinessUnitAddress.
     * @example
     * // Delete one BusinessUnitAddress
     * const BusinessUnitAddress = await prisma.businessUnitAddress.delete({
     *   where: {
     *     // ... filter to delete one BusinessUnitAddress
     *   }
     * })
     * 
     */
    delete<T extends BusinessUnitAddressDeleteArgs>(args: SelectSubset<T, BusinessUnitAddressDeleteArgs<ExtArgs>>): Prisma__BusinessUnitAddressClient<$Result.GetResult<Prisma.$BusinessUnitAddressPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BusinessUnitAddress.
     * @param {BusinessUnitAddressUpdateArgs} args - Arguments to update one BusinessUnitAddress.
     * @example
     * // Update one BusinessUnitAddress
     * const businessUnitAddress = await prisma.businessUnitAddress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BusinessUnitAddressUpdateArgs>(args: SelectSubset<T, BusinessUnitAddressUpdateArgs<ExtArgs>>): Prisma__BusinessUnitAddressClient<$Result.GetResult<Prisma.$BusinessUnitAddressPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BusinessUnitAddresses.
     * @param {BusinessUnitAddressDeleteManyArgs} args - Arguments to filter BusinessUnitAddresses to delete.
     * @example
     * // Delete a few BusinessUnitAddresses
     * const { count } = await prisma.businessUnitAddress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BusinessUnitAddressDeleteManyArgs>(args?: SelectSubset<T, BusinessUnitAddressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BusinessUnitAddresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUnitAddressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BusinessUnitAddresses
     * const businessUnitAddress = await prisma.businessUnitAddress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BusinessUnitAddressUpdateManyArgs>(args: SelectSubset<T, BusinessUnitAddressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BusinessUnitAddress.
     * @param {BusinessUnitAddressUpsertArgs} args - Arguments to update or create a BusinessUnitAddress.
     * @example
     * // Update or create a BusinessUnitAddress
     * const businessUnitAddress = await prisma.businessUnitAddress.upsert({
     *   create: {
     *     // ... data to create a BusinessUnitAddress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BusinessUnitAddress we want to update
     *   }
     * })
     */
    upsert<T extends BusinessUnitAddressUpsertArgs>(args: SelectSubset<T, BusinessUnitAddressUpsertArgs<ExtArgs>>): Prisma__BusinessUnitAddressClient<$Result.GetResult<Prisma.$BusinessUnitAddressPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BusinessUnitAddresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUnitAddressCountArgs} args - Arguments to filter BusinessUnitAddresses to count.
     * @example
     * // Count the number of BusinessUnitAddresses
     * const count = await prisma.businessUnitAddress.count({
     *   where: {
     *     // ... the filter for the BusinessUnitAddresses we want to count
     *   }
     * })
    **/
    count<T extends BusinessUnitAddressCountArgs>(
      args?: Subset<T, BusinessUnitAddressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BusinessUnitAddressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BusinessUnitAddress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUnitAddressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BusinessUnitAddressAggregateArgs>(args: Subset<T, BusinessUnitAddressAggregateArgs>): Prisma.PrismaPromise<GetBusinessUnitAddressAggregateType<T>>

    /**
     * Group by BusinessUnitAddress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUnitAddressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BusinessUnitAddressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BusinessUnitAddressGroupByArgs['orderBy'] }
        : { orderBy?: BusinessUnitAddressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BusinessUnitAddressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBusinessUnitAddressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BusinessUnitAddress model
   */
  readonly fields: BusinessUnitAddressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BusinessUnitAddress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BusinessUnitAddressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    businessUnit<T extends BusinessUnitDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BusinessUnitDefaultArgs<ExtArgs>>): Prisma__BusinessUnitClient<$Result.GetResult<Prisma.$BusinessUnitPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BusinessUnitAddress model
   */ 
  interface BusinessUnitAddressFieldRefs {
    readonly businessUnitId: FieldRef<"BusinessUnitAddress", 'String'>
    readonly street: FieldRef<"BusinessUnitAddress", 'String'>
    readonly number: FieldRef<"BusinessUnitAddress", 'String'>
    readonly complement: FieldRef<"BusinessUnitAddress", 'String'>
    readonly neighborhood: FieldRef<"BusinessUnitAddress", 'String'>
    readonly city: FieldRef<"BusinessUnitAddress", 'String'>
    readonly state: FieldRef<"BusinessUnitAddress", 'String'>
    readonly postalCode: FieldRef<"BusinessUnitAddress", 'String'>
    readonly country: FieldRef<"BusinessUnitAddress", 'String'>
    readonly referencePoint: FieldRef<"BusinessUnitAddress", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BusinessUnitAddress findUnique
   */
  export type BusinessUnitAddressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnitAddress
     */
    select?: BusinessUnitAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitAddressInclude<ExtArgs> | null
    /**
     * Filter, which BusinessUnitAddress to fetch.
     */
    where: BusinessUnitAddressWhereUniqueInput
  }

  /**
   * BusinessUnitAddress findUniqueOrThrow
   */
  export type BusinessUnitAddressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnitAddress
     */
    select?: BusinessUnitAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitAddressInclude<ExtArgs> | null
    /**
     * Filter, which BusinessUnitAddress to fetch.
     */
    where: BusinessUnitAddressWhereUniqueInput
  }

  /**
   * BusinessUnitAddress findFirst
   */
  export type BusinessUnitAddressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnitAddress
     */
    select?: BusinessUnitAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitAddressInclude<ExtArgs> | null
    /**
     * Filter, which BusinessUnitAddress to fetch.
     */
    where?: BusinessUnitAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessUnitAddresses to fetch.
     */
    orderBy?: BusinessUnitAddressOrderByWithRelationInput | BusinessUnitAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusinessUnitAddresses.
     */
    cursor?: BusinessUnitAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessUnitAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessUnitAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusinessUnitAddresses.
     */
    distinct?: BusinessUnitAddressScalarFieldEnum | BusinessUnitAddressScalarFieldEnum[]
  }

  /**
   * BusinessUnitAddress findFirstOrThrow
   */
  export type BusinessUnitAddressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnitAddress
     */
    select?: BusinessUnitAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitAddressInclude<ExtArgs> | null
    /**
     * Filter, which BusinessUnitAddress to fetch.
     */
    where?: BusinessUnitAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessUnitAddresses to fetch.
     */
    orderBy?: BusinessUnitAddressOrderByWithRelationInput | BusinessUnitAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusinessUnitAddresses.
     */
    cursor?: BusinessUnitAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessUnitAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessUnitAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusinessUnitAddresses.
     */
    distinct?: BusinessUnitAddressScalarFieldEnum | BusinessUnitAddressScalarFieldEnum[]
  }

  /**
   * BusinessUnitAddress findMany
   */
  export type BusinessUnitAddressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnitAddress
     */
    select?: BusinessUnitAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitAddressInclude<ExtArgs> | null
    /**
     * Filter, which BusinessUnitAddresses to fetch.
     */
    where?: BusinessUnitAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessUnitAddresses to fetch.
     */
    orderBy?: BusinessUnitAddressOrderByWithRelationInput | BusinessUnitAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BusinessUnitAddresses.
     */
    cursor?: BusinessUnitAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessUnitAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessUnitAddresses.
     */
    skip?: number
    distinct?: BusinessUnitAddressScalarFieldEnum | BusinessUnitAddressScalarFieldEnum[]
  }

  /**
   * BusinessUnitAddress create
   */
  export type BusinessUnitAddressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnitAddress
     */
    select?: BusinessUnitAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitAddressInclude<ExtArgs> | null
    /**
     * The data needed to create a BusinessUnitAddress.
     */
    data: XOR<BusinessUnitAddressCreateInput, BusinessUnitAddressUncheckedCreateInput>
  }

  /**
   * BusinessUnitAddress createMany
   */
  export type BusinessUnitAddressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BusinessUnitAddresses.
     */
    data: BusinessUnitAddressCreateManyInput | BusinessUnitAddressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BusinessUnitAddress update
   */
  export type BusinessUnitAddressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnitAddress
     */
    select?: BusinessUnitAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitAddressInclude<ExtArgs> | null
    /**
     * The data needed to update a BusinessUnitAddress.
     */
    data: XOR<BusinessUnitAddressUpdateInput, BusinessUnitAddressUncheckedUpdateInput>
    /**
     * Choose, which BusinessUnitAddress to update.
     */
    where: BusinessUnitAddressWhereUniqueInput
  }

  /**
   * BusinessUnitAddress updateMany
   */
  export type BusinessUnitAddressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BusinessUnitAddresses.
     */
    data: XOR<BusinessUnitAddressUpdateManyMutationInput, BusinessUnitAddressUncheckedUpdateManyInput>
    /**
     * Filter which BusinessUnitAddresses to update
     */
    where?: BusinessUnitAddressWhereInput
  }

  /**
   * BusinessUnitAddress upsert
   */
  export type BusinessUnitAddressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnitAddress
     */
    select?: BusinessUnitAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitAddressInclude<ExtArgs> | null
    /**
     * The filter to search for the BusinessUnitAddress to update in case it exists.
     */
    where: BusinessUnitAddressWhereUniqueInput
    /**
     * In case the BusinessUnitAddress found by the `where` argument doesn't exist, create a new BusinessUnitAddress with this data.
     */
    create: XOR<BusinessUnitAddressCreateInput, BusinessUnitAddressUncheckedCreateInput>
    /**
     * In case the BusinessUnitAddress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BusinessUnitAddressUpdateInput, BusinessUnitAddressUncheckedUpdateInput>
  }

  /**
   * BusinessUnitAddress delete
   */
  export type BusinessUnitAddressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnitAddress
     */
    select?: BusinessUnitAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitAddressInclude<ExtArgs> | null
    /**
     * Filter which BusinessUnitAddress to delete.
     */
    where: BusinessUnitAddressWhereUniqueInput
  }

  /**
   * BusinessUnitAddress deleteMany
   */
  export type BusinessUnitAddressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BusinessUnitAddresses to delete
     */
    where?: BusinessUnitAddressWhereInput
  }

  /**
   * BusinessUnitAddress without action
   */
  export type BusinessUnitAddressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnitAddress
     */
    select?: BusinessUnitAddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitAddressInclude<ExtArgs> | null
  }


  /**
   * Model BusinessUnitVertical
   */

  export type AggregateBusinessUnitVertical = {
    _count: BusinessUnitVerticalCountAggregateOutputType | null
    _min: BusinessUnitVerticalMinAggregateOutputType | null
    _max: BusinessUnitVerticalMaxAggregateOutputType | null
  }

  export type BusinessUnitVerticalMinAggregateOutputType = {
    businessUnitId: string | null
    organizationId: string | null
    verticalCode: string | null
    statusId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BusinessUnitVerticalMaxAggregateOutputType = {
    businessUnitId: string | null
    organizationId: string | null
    verticalCode: string | null
    statusId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BusinessUnitVerticalCountAggregateOutputType = {
    businessUnitId: number
    organizationId: number
    verticalCode: number
    statusId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BusinessUnitVerticalMinAggregateInputType = {
    businessUnitId?: true
    organizationId?: true
    verticalCode?: true
    statusId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BusinessUnitVerticalMaxAggregateInputType = {
    businessUnitId?: true
    organizationId?: true
    verticalCode?: true
    statusId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BusinessUnitVerticalCountAggregateInputType = {
    businessUnitId?: true
    organizationId?: true
    verticalCode?: true
    statusId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BusinessUnitVerticalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BusinessUnitVertical to aggregate.
     */
    where?: BusinessUnitVerticalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessUnitVerticals to fetch.
     */
    orderBy?: BusinessUnitVerticalOrderByWithRelationInput | BusinessUnitVerticalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BusinessUnitVerticalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessUnitVerticals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessUnitVerticals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BusinessUnitVerticals
    **/
    _count?: true | BusinessUnitVerticalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BusinessUnitVerticalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BusinessUnitVerticalMaxAggregateInputType
  }

  export type GetBusinessUnitVerticalAggregateType<T extends BusinessUnitVerticalAggregateArgs> = {
        [P in keyof T & keyof AggregateBusinessUnitVertical]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBusinessUnitVertical[P]>
      : GetScalarType<T[P], AggregateBusinessUnitVertical[P]>
  }




  export type BusinessUnitVerticalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessUnitVerticalWhereInput
    orderBy?: BusinessUnitVerticalOrderByWithAggregationInput | BusinessUnitVerticalOrderByWithAggregationInput[]
    by: BusinessUnitVerticalScalarFieldEnum[] | BusinessUnitVerticalScalarFieldEnum
    having?: BusinessUnitVerticalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BusinessUnitVerticalCountAggregateInputType | true
    _min?: BusinessUnitVerticalMinAggregateInputType
    _max?: BusinessUnitVerticalMaxAggregateInputType
  }

  export type BusinessUnitVerticalGroupByOutputType = {
    businessUnitId: string
    organizationId: string
    verticalCode: string
    statusId: string
    createdAt: Date
    updatedAt: Date | null
    _count: BusinessUnitVerticalCountAggregateOutputType | null
    _min: BusinessUnitVerticalMinAggregateOutputType | null
    _max: BusinessUnitVerticalMaxAggregateOutputType | null
  }

  type GetBusinessUnitVerticalGroupByPayload<T extends BusinessUnitVerticalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BusinessUnitVerticalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BusinessUnitVerticalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BusinessUnitVerticalGroupByOutputType[P]>
            : GetScalarType<T[P], BusinessUnitVerticalGroupByOutputType[P]>
        }
      >
    >


  export type BusinessUnitVerticalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    businessUnitId?: boolean
    organizationId?: boolean
    verticalCode?: boolean
    statusId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    businessUnit?: boolean | BusinessUnitDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["businessUnitVertical"]>


  export type BusinessUnitVerticalSelectScalar = {
    businessUnitId?: boolean
    organizationId?: boolean
    verticalCode?: boolean
    statusId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BusinessUnitVerticalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    businessUnit?: boolean | BusinessUnitDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $BusinessUnitVerticalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BusinessUnitVertical"
    objects: {
      businessUnit: Prisma.$BusinessUnitPayload<ExtArgs>
      organization: Prisma.$OrganizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      businessUnitId: string
      organizationId: string
      verticalCode: string
      statusId: string
      createdAt: Date
      updatedAt: Date | null
    }, ExtArgs["result"]["businessUnitVertical"]>
    composites: {}
  }

  type BusinessUnitVerticalGetPayload<S extends boolean | null | undefined | BusinessUnitVerticalDefaultArgs> = $Result.GetResult<Prisma.$BusinessUnitVerticalPayload, S>

  type BusinessUnitVerticalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BusinessUnitVerticalFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BusinessUnitVerticalCountAggregateInputType | true
    }

  export interface BusinessUnitVerticalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BusinessUnitVertical'], meta: { name: 'BusinessUnitVertical' } }
    /**
     * Find zero or one BusinessUnitVertical that matches the filter.
     * @param {BusinessUnitVerticalFindUniqueArgs} args - Arguments to find a BusinessUnitVertical
     * @example
     * // Get one BusinessUnitVertical
     * const businessUnitVertical = await prisma.businessUnitVertical.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BusinessUnitVerticalFindUniqueArgs>(args: SelectSubset<T, BusinessUnitVerticalFindUniqueArgs<ExtArgs>>): Prisma__BusinessUnitVerticalClient<$Result.GetResult<Prisma.$BusinessUnitVerticalPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BusinessUnitVertical that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BusinessUnitVerticalFindUniqueOrThrowArgs} args - Arguments to find a BusinessUnitVertical
     * @example
     * // Get one BusinessUnitVertical
     * const businessUnitVertical = await prisma.businessUnitVertical.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BusinessUnitVerticalFindUniqueOrThrowArgs>(args: SelectSubset<T, BusinessUnitVerticalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BusinessUnitVerticalClient<$Result.GetResult<Prisma.$BusinessUnitVerticalPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BusinessUnitVertical that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUnitVerticalFindFirstArgs} args - Arguments to find a BusinessUnitVertical
     * @example
     * // Get one BusinessUnitVertical
     * const businessUnitVertical = await prisma.businessUnitVertical.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BusinessUnitVerticalFindFirstArgs>(args?: SelectSubset<T, BusinessUnitVerticalFindFirstArgs<ExtArgs>>): Prisma__BusinessUnitVerticalClient<$Result.GetResult<Prisma.$BusinessUnitVerticalPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BusinessUnitVertical that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUnitVerticalFindFirstOrThrowArgs} args - Arguments to find a BusinessUnitVertical
     * @example
     * // Get one BusinessUnitVertical
     * const businessUnitVertical = await prisma.businessUnitVertical.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BusinessUnitVerticalFindFirstOrThrowArgs>(args?: SelectSubset<T, BusinessUnitVerticalFindFirstOrThrowArgs<ExtArgs>>): Prisma__BusinessUnitVerticalClient<$Result.GetResult<Prisma.$BusinessUnitVerticalPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BusinessUnitVerticals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUnitVerticalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BusinessUnitVerticals
     * const businessUnitVerticals = await prisma.businessUnitVertical.findMany()
     * 
     * // Get first 10 BusinessUnitVerticals
     * const businessUnitVerticals = await prisma.businessUnitVertical.findMany({ take: 10 })
     * 
     * // Only select the `businessUnitId`
     * const businessUnitVerticalWithBusinessUnitIdOnly = await prisma.businessUnitVertical.findMany({ select: { businessUnitId: true } })
     * 
     */
    findMany<T extends BusinessUnitVerticalFindManyArgs>(args?: SelectSubset<T, BusinessUnitVerticalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessUnitVerticalPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BusinessUnitVertical.
     * @param {BusinessUnitVerticalCreateArgs} args - Arguments to create a BusinessUnitVertical.
     * @example
     * // Create one BusinessUnitVertical
     * const BusinessUnitVertical = await prisma.businessUnitVertical.create({
     *   data: {
     *     // ... data to create a BusinessUnitVertical
     *   }
     * })
     * 
     */
    create<T extends BusinessUnitVerticalCreateArgs>(args: SelectSubset<T, BusinessUnitVerticalCreateArgs<ExtArgs>>): Prisma__BusinessUnitVerticalClient<$Result.GetResult<Prisma.$BusinessUnitVerticalPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BusinessUnitVerticals.
     * @param {BusinessUnitVerticalCreateManyArgs} args - Arguments to create many BusinessUnitVerticals.
     * @example
     * // Create many BusinessUnitVerticals
     * const businessUnitVertical = await prisma.businessUnitVertical.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BusinessUnitVerticalCreateManyArgs>(args?: SelectSubset<T, BusinessUnitVerticalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a BusinessUnitVertical.
     * @param {BusinessUnitVerticalDeleteArgs} args - Arguments to delete one BusinessUnitVertical.
     * @example
     * // Delete one BusinessUnitVertical
     * const BusinessUnitVertical = await prisma.businessUnitVertical.delete({
     *   where: {
     *     // ... filter to delete one BusinessUnitVertical
     *   }
     * })
     * 
     */
    delete<T extends BusinessUnitVerticalDeleteArgs>(args: SelectSubset<T, BusinessUnitVerticalDeleteArgs<ExtArgs>>): Prisma__BusinessUnitVerticalClient<$Result.GetResult<Prisma.$BusinessUnitVerticalPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BusinessUnitVertical.
     * @param {BusinessUnitVerticalUpdateArgs} args - Arguments to update one BusinessUnitVertical.
     * @example
     * // Update one BusinessUnitVertical
     * const businessUnitVertical = await prisma.businessUnitVertical.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BusinessUnitVerticalUpdateArgs>(args: SelectSubset<T, BusinessUnitVerticalUpdateArgs<ExtArgs>>): Prisma__BusinessUnitVerticalClient<$Result.GetResult<Prisma.$BusinessUnitVerticalPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BusinessUnitVerticals.
     * @param {BusinessUnitVerticalDeleteManyArgs} args - Arguments to filter BusinessUnitVerticals to delete.
     * @example
     * // Delete a few BusinessUnitVerticals
     * const { count } = await prisma.businessUnitVertical.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BusinessUnitVerticalDeleteManyArgs>(args?: SelectSubset<T, BusinessUnitVerticalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BusinessUnitVerticals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUnitVerticalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BusinessUnitVerticals
     * const businessUnitVertical = await prisma.businessUnitVertical.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BusinessUnitVerticalUpdateManyArgs>(args: SelectSubset<T, BusinessUnitVerticalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BusinessUnitVertical.
     * @param {BusinessUnitVerticalUpsertArgs} args - Arguments to update or create a BusinessUnitVertical.
     * @example
     * // Update or create a BusinessUnitVertical
     * const businessUnitVertical = await prisma.businessUnitVertical.upsert({
     *   create: {
     *     // ... data to create a BusinessUnitVertical
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BusinessUnitVertical we want to update
     *   }
     * })
     */
    upsert<T extends BusinessUnitVerticalUpsertArgs>(args: SelectSubset<T, BusinessUnitVerticalUpsertArgs<ExtArgs>>): Prisma__BusinessUnitVerticalClient<$Result.GetResult<Prisma.$BusinessUnitVerticalPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BusinessUnitVerticals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUnitVerticalCountArgs} args - Arguments to filter BusinessUnitVerticals to count.
     * @example
     * // Count the number of BusinessUnitVerticals
     * const count = await prisma.businessUnitVertical.count({
     *   where: {
     *     // ... the filter for the BusinessUnitVerticals we want to count
     *   }
     * })
    **/
    count<T extends BusinessUnitVerticalCountArgs>(
      args?: Subset<T, BusinessUnitVerticalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BusinessUnitVerticalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BusinessUnitVertical.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUnitVerticalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BusinessUnitVerticalAggregateArgs>(args: Subset<T, BusinessUnitVerticalAggregateArgs>): Prisma.PrismaPromise<GetBusinessUnitVerticalAggregateType<T>>

    /**
     * Group by BusinessUnitVertical.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUnitVerticalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BusinessUnitVerticalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BusinessUnitVerticalGroupByArgs['orderBy'] }
        : { orderBy?: BusinessUnitVerticalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BusinessUnitVerticalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBusinessUnitVerticalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BusinessUnitVertical model
   */
  readonly fields: BusinessUnitVerticalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BusinessUnitVertical.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BusinessUnitVerticalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    businessUnit<T extends BusinessUnitDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BusinessUnitDefaultArgs<ExtArgs>>): Prisma__BusinessUnitClient<$Result.GetResult<Prisma.$BusinessUnitPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BusinessUnitVertical model
   */ 
  interface BusinessUnitVerticalFieldRefs {
    readonly businessUnitId: FieldRef<"BusinessUnitVertical", 'String'>
    readonly organizationId: FieldRef<"BusinessUnitVertical", 'String'>
    readonly verticalCode: FieldRef<"BusinessUnitVertical", 'String'>
    readonly statusId: FieldRef<"BusinessUnitVertical", 'String'>
    readonly createdAt: FieldRef<"BusinessUnitVertical", 'DateTime'>
    readonly updatedAt: FieldRef<"BusinessUnitVertical", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BusinessUnitVertical findUnique
   */
  export type BusinessUnitVerticalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnitVertical
     */
    select?: BusinessUnitVerticalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitVerticalInclude<ExtArgs> | null
    /**
     * Filter, which BusinessUnitVertical to fetch.
     */
    where: BusinessUnitVerticalWhereUniqueInput
  }

  /**
   * BusinessUnitVertical findUniqueOrThrow
   */
  export type BusinessUnitVerticalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnitVertical
     */
    select?: BusinessUnitVerticalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitVerticalInclude<ExtArgs> | null
    /**
     * Filter, which BusinessUnitVertical to fetch.
     */
    where: BusinessUnitVerticalWhereUniqueInput
  }

  /**
   * BusinessUnitVertical findFirst
   */
  export type BusinessUnitVerticalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnitVertical
     */
    select?: BusinessUnitVerticalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitVerticalInclude<ExtArgs> | null
    /**
     * Filter, which BusinessUnitVertical to fetch.
     */
    where?: BusinessUnitVerticalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessUnitVerticals to fetch.
     */
    orderBy?: BusinessUnitVerticalOrderByWithRelationInput | BusinessUnitVerticalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusinessUnitVerticals.
     */
    cursor?: BusinessUnitVerticalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessUnitVerticals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessUnitVerticals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusinessUnitVerticals.
     */
    distinct?: BusinessUnitVerticalScalarFieldEnum | BusinessUnitVerticalScalarFieldEnum[]
  }

  /**
   * BusinessUnitVertical findFirstOrThrow
   */
  export type BusinessUnitVerticalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnitVertical
     */
    select?: BusinessUnitVerticalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitVerticalInclude<ExtArgs> | null
    /**
     * Filter, which BusinessUnitVertical to fetch.
     */
    where?: BusinessUnitVerticalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessUnitVerticals to fetch.
     */
    orderBy?: BusinessUnitVerticalOrderByWithRelationInput | BusinessUnitVerticalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusinessUnitVerticals.
     */
    cursor?: BusinessUnitVerticalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessUnitVerticals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessUnitVerticals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusinessUnitVerticals.
     */
    distinct?: BusinessUnitVerticalScalarFieldEnum | BusinessUnitVerticalScalarFieldEnum[]
  }

  /**
   * BusinessUnitVertical findMany
   */
  export type BusinessUnitVerticalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnitVertical
     */
    select?: BusinessUnitVerticalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitVerticalInclude<ExtArgs> | null
    /**
     * Filter, which BusinessUnitVerticals to fetch.
     */
    where?: BusinessUnitVerticalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessUnitVerticals to fetch.
     */
    orderBy?: BusinessUnitVerticalOrderByWithRelationInput | BusinessUnitVerticalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BusinessUnitVerticals.
     */
    cursor?: BusinessUnitVerticalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessUnitVerticals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessUnitVerticals.
     */
    skip?: number
    distinct?: BusinessUnitVerticalScalarFieldEnum | BusinessUnitVerticalScalarFieldEnum[]
  }

  /**
   * BusinessUnitVertical create
   */
  export type BusinessUnitVerticalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnitVertical
     */
    select?: BusinessUnitVerticalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitVerticalInclude<ExtArgs> | null
    /**
     * The data needed to create a BusinessUnitVertical.
     */
    data: XOR<BusinessUnitVerticalCreateInput, BusinessUnitVerticalUncheckedCreateInput>
  }

  /**
   * BusinessUnitVertical createMany
   */
  export type BusinessUnitVerticalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BusinessUnitVerticals.
     */
    data: BusinessUnitVerticalCreateManyInput | BusinessUnitVerticalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BusinessUnitVertical update
   */
  export type BusinessUnitVerticalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnitVertical
     */
    select?: BusinessUnitVerticalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitVerticalInclude<ExtArgs> | null
    /**
     * The data needed to update a BusinessUnitVertical.
     */
    data: XOR<BusinessUnitVerticalUpdateInput, BusinessUnitVerticalUncheckedUpdateInput>
    /**
     * Choose, which BusinessUnitVertical to update.
     */
    where: BusinessUnitVerticalWhereUniqueInput
  }

  /**
   * BusinessUnitVertical updateMany
   */
  export type BusinessUnitVerticalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BusinessUnitVerticals.
     */
    data: XOR<BusinessUnitVerticalUpdateManyMutationInput, BusinessUnitVerticalUncheckedUpdateManyInput>
    /**
     * Filter which BusinessUnitVerticals to update
     */
    where?: BusinessUnitVerticalWhereInput
  }

  /**
   * BusinessUnitVertical upsert
   */
  export type BusinessUnitVerticalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnitVertical
     */
    select?: BusinessUnitVerticalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitVerticalInclude<ExtArgs> | null
    /**
     * The filter to search for the BusinessUnitVertical to update in case it exists.
     */
    where: BusinessUnitVerticalWhereUniqueInput
    /**
     * In case the BusinessUnitVertical found by the `where` argument doesn't exist, create a new BusinessUnitVertical with this data.
     */
    create: XOR<BusinessUnitVerticalCreateInput, BusinessUnitVerticalUncheckedCreateInput>
    /**
     * In case the BusinessUnitVertical was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BusinessUnitVerticalUpdateInput, BusinessUnitVerticalUncheckedUpdateInput>
  }

  /**
   * BusinessUnitVertical delete
   */
  export type BusinessUnitVerticalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnitVertical
     */
    select?: BusinessUnitVerticalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitVerticalInclude<ExtArgs> | null
    /**
     * Filter which BusinessUnitVertical to delete.
     */
    where: BusinessUnitVerticalWhereUniqueInput
  }

  /**
   * BusinessUnitVertical deleteMany
   */
  export type BusinessUnitVerticalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BusinessUnitVerticals to delete
     */
    where?: BusinessUnitVerticalWhereInput
  }

  /**
   * BusinessUnitVertical without action
   */
  export type BusinessUnitVerticalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUnitVertical
     */
    select?: BusinessUnitVerticalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUnitVerticalInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
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

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const OrganizationScalarFieldEnum: {
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

  export type OrganizationScalarFieldEnum = (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum]


  export const UserOrganizationLinkScalarFieldEnum: {
    userId: 'userId',
    organizationId: 'organizationId',
    isOwner: 'isOwner',
    createdAt: 'createdAt'
  };

  export type UserOrganizationLinkScalarFieldEnum = (typeof UserOrganizationLinkScalarFieldEnum)[keyof typeof UserOrganizationLinkScalarFieldEnum]


  export const OrganizationVerticalScalarFieldEnum: {
    organizationId: 'organizationId',
    verticalCode: 'verticalCode',
    statusId: 'statusId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrganizationVerticalScalarFieldEnum = (typeof OrganizationVerticalScalarFieldEnum)[keyof typeof OrganizationVerticalScalarFieldEnum]


  export const BusinessUnitScalarFieldEnum: {
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

  export type BusinessUnitScalarFieldEnum = (typeof BusinessUnitScalarFieldEnum)[keyof typeof BusinessUnitScalarFieldEnum]


  export const BusinessUnitAddressScalarFieldEnum: {
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

  export type BusinessUnitAddressScalarFieldEnum = (typeof BusinessUnitAddressScalarFieldEnum)[keyof typeof BusinessUnitAddressScalarFieldEnum]


  export const BusinessUnitVerticalScalarFieldEnum: {
    businessUnitId: 'businessUnitId',
    organizationId: 'organizationId',
    verticalCode: 'verticalCode',
    statusId: 'statusId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BusinessUnitVerticalScalarFieldEnum = (typeof BusinessUnitVerticalScalarFieldEnum)[keyof typeof BusinessUnitVerticalScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    documentType?: StringFilter<"User"> | string
    documentNumber?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    phoneNumber?: StringFilter<"User"> | string
    emailOptIn?: BoolFilter<"User"> | boolean
    phoneOptIn?: BoolFilter<"User"> | boolean
    statusId?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    organizationLink?: XOR<UserOrganizationLinkNullableRelationFilter, UserOrganizationLinkWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    emailOptIn?: SortOrder
    phoneOptIn?: SortOrder
    statusId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    organizationLink?: UserOrganizationLinkOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    documentNumber?: string
    email?: string
    phoneNumber?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    documentType?: StringFilter<"User"> | string
    emailOptIn?: BoolFilter<"User"> | boolean
    phoneOptIn?: BoolFilter<"User"> | boolean
    statusId?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    organizationLink?: XOR<UserOrganizationLinkNullableRelationFilter, UserOrganizationLinkWhereInput> | null
  }, "id" | "documentNumber" | "email" | "phoneNumber">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    emailOptIn?: SortOrder
    phoneOptIn?: SortOrder
    statusId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    documentType?: StringWithAggregatesFilter<"User"> | string
    documentNumber?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    phoneNumber?: StringWithAggregatesFilter<"User"> | string
    emailOptIn?: BoolWithAggregatesFilter<"User"> | boolean
    phoneOptIn?: BoolWithAggregatesFilter<"User"> | boolean
    statusId?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type OrganizationWhereInput = {
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    id?: StringFilter<"Organization"> | string
    tradeName?: StringFilter<"Organization"> | string
    legalName?: StringNullableFilter<"Organization"> | string | null
    documentType?: StringFilter<"Organization"> | string
    documentNumber?: StringFilter<"Organization"> | string
    statusId?: StringFilter<"Organization"> | string
    ownerUserId?: StringNullableFilter<"Organization"> | string | null
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Organization"> | Date | string | null
    organizationLinks?: UserOrganizationLinkListRelationFilter
    organizationVerticals?: OrganizationVerticalListRelationFilter
    businessUnitVerticals?: BusinessUnitVerticalListRelationFilter
    businessUnits?: BusinessUnitListRelationFilter
  }

  export type OrganizationOrderByWithRelationInput = {
    id?: SortOrder
    tradeName?: SortOrder
    legalName?: SortOrderInput | SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    statusId?: SortOrder
    ownerUserId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    organizationLinks?: UserOrganizationLinkOrderByRelationAggregateInput
    organizationVerticals?: OrganizationVerticalOrderByRelationAggregateInput
    businessUnitVerticals?: BusinessUnitVerticalOrderByRelationAggregateInput
    businessUnits?: BusinessUnitOrderByRelationAggregateInput
  }

  export type OrganizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    documentNumber?: string
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    tradeName?: StringFilter<"Organization"> | string
    legalName?: StringNullableFilter<"Organization"> | string | null
    documentType?: StringFilter<"Organization"> | string
    statusId?: StringFilter<"Organization"> | string
    ownerUserId?: StringNullableFilter<"Organization"> | string | null
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Organization"> | Date | string | null
    organizationLinks?: UserOrganizationLinkListRelationFilter
    organizationVerticals?: OrganizationVerticalListRelationFilter
    businessUnitVerticals?: BusinessUnitVerticalListRelationFilter
    businessUnits?: BusinessUnitListRelationFilter
  }, "id" | "documentNumber">

  export type OrganizationOrderByWithAggregationInput = {
    id?: SortOrder
    tradeName?: SortOrder
    legalName?: SortOrderInput | SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    statusId?: SortOrder
    ownerUserId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: OrganizationCountOrderByAggregateInput
    _max?: OrganizationMaxOrderByAggregateInput
    _min?: OrganizationMinOrderByAggregateInput
  }

  export type OrganizationScalarWhereWithAggregatesInput = {
    AND?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    OR?: OrganizationScalarWhereWithAggregatesInput[]
    NOT?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Organization"> | string
    tradeName?: StringWithAggregatesFilter<"Organization"> | string
    legalName?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    documentType?: StringWithAggregatesFilter<"Organization"> | string
    documentNumber?: StringWithAggregatesFilter<"Organization"> | string
    statusId?: StringWithAggregatesFilter<"Organization"> | string
    ownerUserId?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Organization"> | Date | string | null
  }

  export type UserOrganizationLinkWhereInput = {
    AND?: UserOrganizationLinkWhereInput | UserOrganizationLinkWhereInput[]
    OR?: UserOrganizationLinkWhereInput[]
    NOT?: UserOrganizationLinkWhereInput | UserOrganizationLinkWhereInput[]
    userId?: StringFilter<"UserOrganizationLink"> | string
    organizationId?: StringFilter<"UserOrganizationLink"> | string
    isOwner?: BoolFilter<"UserOrganizationLink"> | boolean
    createdAt?: DateTimeFilter<"UserOrganizationLink"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
  }

  export type UserOrganizationLinkOrderByWithRelationInput = {
    userId?: SortOrder
    organizationId?: SortOrder
    isOwner?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    organization?: OrganizationOrderByWithRelationInput
  }

  export type UserOrganizationLinkWhereUniqueInput = Prisma.AtLeast<{
    userId?: string
    AND?: UserOrganizationLinkWhereInput | UserOrganizationLinkWhereInput[]
    OR?: UserOrganizationLinkWhereInput[]
    NOT?: UserOrganizationLinkWhereInput | UserOrganizationLinkWhereInput[]
    organizationId?: StringFilter<"UserOrganizationLink"> | string
    isOwner?: BoolFilter<"UserOrganizationLink"> | boolean
    createdAt?: DateTimeFilter<"UserOrganizationLink"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
  }, "userId">

  export type UserOrganizationLinkOrderByWithAggregationInput = {
    userId?: SortOrder
    organizationId?: SortOrder
    isOwner?: SortOrder
    createdAt?: SortOrder
    _count?: UserOrganizationLinkCountOrderByAggregateInput
    _max?: UserOrganizationLinkMaxOrderByAggregateInput
    _min?: UserOrganizationLinkMinOrderByAggregateInput
  }

  export type UserOrganizationLinkScalarWhereWithAggregatesInput = {
    AND?: UserOrganizationLinkScalarWhereWithAggregatesInput | UserOrganizationLinkScalarWhereWithAggregatesInput[]
    OR?: UserOrganizationLinkScalarWhereWithAggregatesInput[]
    NOT?: UserOrganizationLinkScalarWhereWithAggregatesInput | UserOrganizationLinkScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"UserOrganizationLink"> | string
    organizationId?: StringWithAggregatesFilter<"UserOrganizationLink"> | string
    isOwner?: BoolWithAggregatesFilter<"UserOrganizationLink"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"UserOrganizationLink"> | Date | string
  }

  export type OrganizationVerticalWhereInput = {
    AND?: OrganizationVerticalWhereInput | OrganizationVerticalWhereInput[]
    OR?: OrganizationVerticalWhereInput[]
    NOT?: OrganizationVerticalWhereInput | OrganizationVerticalWhereInput[]
    organizationId?: StringFilter<"OrganizationVertical"> | string
    verticalCode?: StringFilter<"OrganizationVertical"> | string
    statusId?: StringFilter<"OrganizationVertical"> | string
    createdAt?: DateTimeFilter<"OrganizationVertical"> | Date | string
    updatedAt?: DateTimeNullableFilter<"OrganizationVertical"> | Date | string | null
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
  }

  export type OrganizationVerticalOrderByWithRelationInput = {
    organizationId?: SortOrder
    verticalCode?: SortOrder
    statusId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    organization?: OrganizationOrderByWithRelationInput
  }

  export type OrganizationVerticalWhereUniqueInput = Prisma.AtLeast<{
    organizationId_verticalCode?: OrganizationVerticalOrganizationIdVerticalCodeCompoundUniqueInput
    AND?: OrganizationVerticalWhereInput | OrganizationVerticalWhereInput[]
    OR?: OrganizationVerticalWhereInput[]
    NOT?: OrganizationVerticalWhereInput | OrganizationVerticalWhereInput[]
    organizationId?: StringFilter<"OrganizationVertical"> | string
    verticalCode?: StringFilter<"OrganizationVertical"> | string
    statusId?: StringFilter<"OrganizationVertical"> | string
    createdAt?: DateTimeFilter<"OrganizationVertical"> | Date | string
    updatedAt?: DateTimeNullableFilter<"OrganizationVertical"> | Date | string | null
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
  }, "organizationId_verticalCode">

  export type OrganizationVerticalOrderByWithAggregationInput = {
    organizationId?: SortOrder
    verticalCode?: SortOrder
    statusId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: OrganizationVerticalCountOrderByAggregateInput
    _max?: OrganizationVerticalMaxOrderByAggregateInput
    _min?: OrganizationVerticalMinOrderByAggregateInput
  }

  export type OrganizationVerticalScalarWhereWithAggregatesInput = {
    AND?: OrganizationVerticalScalarWhereWithAggregatesInput | OrganizationVerticalScalarWhereWithAggregatesInput[]
    OR?: OrganizationVerticalScalarWhereWithAggregatesInput[]
    NOT?: OrganizationVerticalScalarWhereWithAggregatesInput | OrganizationVerticalScalarWhereWithAggregatesInput[]
    organizationId?: StringWithAggregatesFilter<"OrganizationVertical"> | string
    verticalCode?: StringWithAggregatesFilter<"OrganizationVertical"> | string
    statusId?: StringWithAggregatesFilter<"OrganizationVertical"> | string
    createdAt?: DateTimeWithAggregatesFilter<"OrganizationVertical"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"OrganizationVertical"> | Date | string | null
  }

  export type BusinessUnitWhereInput = {
    AND?: BusinessUnitWhereInput | BusinessUnitWhereInput[]
    OR?: BusinessUnitWhereInput[]
    NOT?: BusinessUnitWhereInput | BusinessUnitWhereInput[]
    id?: StringFilter<"BusinessUnit"> | string
    organizationId?: StringFilter<"BusinessUnit"> | string
    publicName?: StringFilter<"BusinessUnit"> | string
    phoneNumber?: StringFilter<"BusinessUnit"> | string
    phoneHasWhatsapp?: BoolFilter<"BusinessUnit"> | boolean
    email?: StringNullableFilter<"BusinessUnit"> | string | null
    instagram?: StringNullableFilter<"BusinessUnit"> | string | null
    website?: StringNullableFilter<"BusinessUnit"> | string | null
    statusId?: StringFilter<"BusinessUnit"> | string
    createdAt?: DateTimeFilter<"BusinessUnit"> | Date | string
    updatedAt?: DateTimeNullableFilter<"BusinessUnit"> | Date | string | null
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
    address?: XOR<BusinessUnitAddressNullableRelationFilter, BusinessUnitAddressWhereInput> | null
    businessUnitVerticals?: BusinessUnitVerticalListRelationFilter
  }

  export type BusinessUnitOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    publicName?: SortOrder
    phoneNumber?: SortOrder
    phoneHasWhatsapp?: SortOrder
    email?: SortOrderInput | SortOrder
    instagram?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    statusId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    organization?: OrganizationOrderByWithRelationInput
    address?: BusinessUnitAddressOrderByWithRelationInput
    businessUnitVerticals?: BusinessUnitVerticalOrderByRelationAggregateInput
  }

  export type BusinessUnitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BusinessUnitWhereInput | BusinessUnitWhereInput[]
    OR?: BusinessUnitWhereInput[]
    NOT?: BusinessUnitWhereInput | BusinessUnitWhereInput[]
    organizationId?: StringFilter<"BusinessUnit"> | string
    publicName?: StringFilter<"BusinessUnit"> | string
    phoneNumber?: StringFilter<"BusinessUnit"> | string
    phoneHasWhatsapp?: BoolFilter<"BusinessUnit"> | boolean
    email?: StringNullableFilter<"BusinessUnit"> | string | null
    instagram?: StringNullableFilter<"BusinessUnit"> | string | null
    website?: StringNullableFilter<"BusinessUnit"> | string | null
    statusId?: StringFilter<"BusinessUnit"> | string
    createdAt?: DateTimeFilter<"BusinessUnit"> | Date | string
    updatedAt?: DateTimeNullableFilter<"BusinessUnit"> | Date | string | null
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
    address?: XOR<BusinessUnitAddressNullableRelationFilter, BusinessUnitAddressWhereInput> | null
    businessUnitVerticals?: BusinessUnitVerticalListRelationFilter
  }, "id">

  export type BusinessUnitOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    publicName?: SortOrder
    phoneNumber?: SortOrder
    phoneHasWhatsapp?: SortOrder
    email?: SortOrderInput | SortOrder
    instagram?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    statusId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: BusinessUnitCountOrderByAggregateInput
    _max?: BusinessUnitMaxOrderByAggregateInput
    _min?: BusinessUnitMinOrderByAggregateInput
  }

  export type BusinessUnitScalarWhereWithAggregatesInput = {
    AND?: BusinessUnitScalarWhereWithAggregatesInput | BusinessUnitScalarWhereWithAggregatesInput[]
    OR?: BusinessUnitScalarWhereWithAggregatesInput[]
    NOT?: BusinessUnitScalarWhereWithAggregatesInput | BusinessUnitScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BusinessUnit"> | string
    organizationId?: StringWithAggregatesFilter<"BusinessUnit"> | string
    publicName?: StringWithAggregatesFilter<"BusinessUnit"> | string
    phoneNumber?: StringWithAggregatesFilter<"BusinessUnit"> | string
    phoneHasWhatsapp?: BoolWithAggregatesFilter<"BusinessUnit"> | boolean
    email?: StringNullableWithAggregatesFilter<"BusinessUnit"> | string | null
    instagram?: StringNullableWithAggregatesFilter<"BusinessUnit"> | string | null
    website?: StringNullableWithAggregatesFilter<"BusinessUnit"> | string | null
    statusId?: StringWithAggregatesFilter<"BusinessUnit"> | string
    createdAt?: DateTimeWithAggregatesFilter<"BusinessUnit"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"BusinessUnit"> | Date | string | null
  }

  export type BusinessUnitAddressWhereInput = {
    AND?: BusinessUnitAddressWhereInput | BusinessUnitAddressWhereInput[]
    OR?: BusinessUnitAddressWhereInput[]
    NOT?: BusinessUnitAddressWhereInput | BusinessUnitAddressWhereInput[]
    businessUnitId?: StringFilter<"BusinessUnitAddress"> | string
    street?: StringFilter<"BusinessUnitAddress"> | string
    number?: StringFilter<"BusinessUnitAddress"> | string
    complement?: StringNullableFilter<"BusinessUnitAddress"> | string | null
    neighborhood?: StringFilter<"BusinessUnitAddress"> | string
    city?: StringFilter<"BusinessUnitAddress"> | string
    state?: StringFilter<"BusinessUnitAddress"> | string
    postalCode?: StringFilter<"BusinessUnitAddress"> | string
    country?: StringFilter<"BusinessUnitAddress"> | string
    referencePoint?: StringFilter<"BusinessUnitAddress"> | string
    businessUnit?: XOR<BusinessUnitRelationFilter, BusinessUnitWhereInput>
  }

  export type BusinessUnitAddressOrderByWithRelationInput = {
    businessUnitId?: SortOrder
    street?: SortOrder
    number?: SortOrder
    complement?: SortOrderInput | SortOrder
    neighborhood?: SortOrder
    city?: SortOrder
    state?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    referencePoint?: SortOrder
    businessUnit?: BusinessUnitOrderByWithRelationInput
  }

  export type BusinessUnitAddressWhereUniqueInput = Prisma.AtLeast<{
    businessUnitId?: string
    AND?: BusinessUnitAddressWhereInput | BusinessUnitAddressWhereInput[]
    OR?: BusinessUnitAddressWhereInput[]
    NOT?: BusinessUnitAddressWhereInput | BusinessUnitAddressWhereInput[]
    street?: StringFilter<"BusinessUnitAddress"> | string
    number?: StringFilter<"BusinessUnitAddress"> | string
    complement?: StringNullableFilter<"BusinessUnitAddress"> | string | null
    neighborhood?: StringFilter<"BusinessUnitAddress"> | string
    city?: StringFilter<"BusinessUnitAddress"> | string
    state?: StringFilter<"BusinessUnitAddress"> | string
    postalCode?: StringFilter<"BusinessUnitAddress"> | string
    country?: StringFilter<"BusinessUnitAddress"> | string
    referencePoint?: StringFilter<"BusinessUnitAddress"> | string
    businessUnit?: XOR<BusinessUnitRelationFilter, BusinessUnitWhereInput>
  }, "businessUnitId">

  export type BusinessUnitAddressOrderByWithAggregationInput = {
    businessUnitId?: SortOrder
    street?: SortOrder
    number?: SortOrder
    complement?: SortOrderInput | SortOrder
    neighborhood?: SortOrder
    city?: SortOrder
    state?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    referencePoint?: SortOrder
    _count?: BusinessUnitAddressCountOrderByAggregateInput
    _max?: BusinessUnitAddressMaxOrderByAggregateInput
    _min?: BusinessUnitAddressMinOrderByAggregateInput
  }

  export type BusinessUnitAddressScalarWhereWithAggregatesInput = {
    AND?: BusinessUnitAddressScalarWhereWithAggregatesInput | BusinessUnitAddressScalarWhereWithAggregatesInput[]
    OR?: BusinessUnitAddressScalarWhereWithAggregatesInput[]
    NOT?: BusinessUnitAddressScalarWhereWithAggregatesInput | BusinessUnitAddressScalarWhereWithAggregatesInput[]
    businessUnitId?: StringWithAggregatesFilter<"BusinessUnitAddress"> | string
    street?: StringWithAggregatesFilter<"BusinessUnitAddress"> | string
    number?: StringWithAggregatesFilter<"BusinessUnitAddress"> | string
    complement?: StringNullableWithAggregatesFilter<"BusinessUnitAddress"> | string | null
    neighborhood?: StringWithAggregatesFilter<"BusinessUnitAddress"> | string
    city?: StringWithAggregatesFilter<"BusinessUnitAddress"> | string
    state?: StringWithAggregatesFilter<"BusinessUnitAddress"> | string
    postalCode?: StringWithAggregatesFilter<"BusinessUnitAddress"> | string
    country?: StringWithAggregatesFilter<"BusinessUnitAddress"> | string
    referencePoint?: StringWithAggregatesFilter<"BusinessUnitAddress"> | string
  }

  export type BusinessUnitVerticalWhereInput = {
    AND?: BusinessUnitVerticalWhereInput | BusinessUnitVerticalWhereInput[]
    OR?: BusinessUnitVerticalWhereInput[]
    NOT?: BusinessUnitVerticalWhereInput | BusinessUnitVerticalWhereInput[]
    businessUnitId?: StringFilter<"BusinessUnitVertical"> | string
    organizationId?: StringFilter<"BusinessUnitVertical"> | string
    verticalCode?: StringFilter<"BusinessUnitVertical"> | string
    statusId?: StringFilter<"BusinessUnitVertical"> | string
    createdAt?: DateTimeFilter<"BusinessUnitVertical"> | Date | string
    updatedAt?: DateTimeNullableFilter<"BusinessUnitVertical"> | Date | string | null
    businessUnit?: XOR<BusinessUnitRelationFilter, BusinessUnitWhereInput>
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
  }

  export type BusinessUnitVerticalOrderByWithRelationInput = {
    businessUnitId?: SortOrder
    organizationId?: SortOrder
    verticalCode?: SortOrder
    statusId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    businessUnit?: BusinessUnitOrderByWithRelationInput
    organization?: OrganizationOrderByWithRelationInput
  }

  export type BusinessUnitVerticalWhereUniqueInput = Prisma.AtLeast<{
    businessUnitId_verticalCode?: BusinessUnitVerticalBusinessUnitIdVerticalCodeCompoundUniqueInput
    AND?: BusinessUnitVerticalWhereInput | BusinessUnitVerticalWhereInput[]
    OR?: BusinessUnitVerticalWhereInput[]
    NOT?: BusinessUnitVerticalWhereInput | BusinessUnitVerticalWhereInput[]
    businessUnitId?: StringFilter<"BusinessUnitVertical"> | string
    organizationId?: StringFilter<"BusinessUnitVertical"> | string
    verticalCode?: StringFilter<"BusinessUnitVertical"> | string
    statusId?: StringFilter<"BusinessUnitVertical"> | string
    createdAt?: DateTimeFilter<"BusinessUnitVertical"> | Date | string
    updatedAt?: DateTimeNullableFilter<"BusinessUnitVertical"> | Date | string | null
    businessUnit?: XOR<BusinessUnitRelationFilter, BusinessUnitWhereInput>
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
  }, "businessUnitId_verticalCode">

  export type BusinessUnitVerticalOrderByWithAggregationInput = {
    businessUnitId?: SortOrder
    organizationId?: SortOrder
    verticalCode?: SortOrder
    statusId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: BusinessUnitVerticalCountOrderByAggregateInput
    _max?: BusinessUnitVerticalMaxOrderByAggregateInput
    _min?: BusinessUnitVerticalMinOrderByAggregateInput
  }

  export type BusinessUnitVerticalScalarWhereWithAggregatesInput = {
    AND?: BusinessUnitVerticalScalarWhereWithAggregatesInput | BusinessUnitVerticalScalarWhereWithAggregatesInput[]
    OR?: BusinessUnitVerticalScalarWhereWithAggregatesInput[]
    NOT?: BusinessUnitVerticalScalarWhereWithAggregatesInput | BusinessUnitVerticalScalarWhereWithAggregatesInput[]
    businessUnitId?: StringWithAggregatesFilter<"BusinessUnitVertical"> | string
    organizationId?: StringWithAggregatesFilter<"BusinessUnitVertical"> | string
    verticalCode?: StringWithAggregatesFilter<"BusinessUnitVertical"> | string
    statusId?: StringWithAggregatesFilter<"BusinessUnitVertical"> | string
    createdAt?: DateTimeWithAggregatesFilter<"BusinessUnitVertical"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"BusinessUnitVertical"> | Date | string | null
  }

  export type UserCreateInput = {
    id?: string
    firstName: string
    lastName: string
    documentType: string
    documentNumber: string
    email: string
    phoneNumber: string
    emailOptIn: boolean
    phoneOptIn: boolean
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    organizationLink?: UserOrganizationLinkCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    firstName: string
    lastName: string
    documentType: string
    documentNumber: string
    email: string
    phoneNumber: string
    emailOptIn: boolean
    phoneOptIn: boolean
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    organizationLink?: UserOrganizationLinkUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    emailOptIn?: BoolFieldUpdateOperationsInput | boolean
    phoneOptIn?: BoolFieldUpdateOperationsInput | boolean
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationLink?: UserOrganizationLinkUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    emailOptIn?: BoolFieldUpdateOperationsInput | boolean
    phoneOptIn?: BoolFieldUpdateOperationsInput | boolean
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationLink?: UserOrganizationLinkUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    firstName: string
    lastName: string
    documentType: string
    documentNumber: string
    email: string
    phoneNumber: string
    emailOptIn: boolean
    phoneOptIn: boolean
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    emailOptIn?: BoolFieldUpdateOperationsInput | boolean
    phoneOptIn?: BoolFieldUpdateOperationsInput | boolean
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    emailOptIn?: BoolFieldUpdateOperationsInput | boolean
    phoneOptIn?: BoolFieldUpdateOperationsInput | boolean
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrganizationCreateInput = {
    id?: string
    tradeName: string
    legalName?: string | null
    documentType: string
    documentNumber: string
    statusId: string
    ownerUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    organizationLinks?: UserOrganizationLinkCreateNestedManyWithoutOrganizationInput
    organizationVerticals?: OrganizationVerticalCreateNestedManyWithoutOrganizationInput
    businessUnitVerticals?: BusinessUnitVerticalCreateNestedManyWithoutOrganizationInput
    businessUnits?: BusinessUnitCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateInput = {
    id?: string
    tradeName: string
    legalName?: string | null
    documentType: string
    documentNumber: string
    statusId: string
    ownerUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    organizationLinks?: UserOrganizationLinkUncheckedCreateNestedManyWithoutOrganizationInput
    organizationVerticals?: OrganizationVerticalUncheckedCreateNestedManyWithoutOrganizationInput
    businessUnitVerticals?: BusinessUnitVerticalUncheckedCreateNestedManyWithoutOrganizationInput
    businessUnits?: BusinessUnitUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tradeName?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationLinks?: UserOrganizationLinkUpdateManyWithoutOrganizationNestedInput
    organizationVerticals?: OrganizationVerticalUpdateManyWithoutOrganizationNestedInput
    businessUnitVerticals?: BusinessUnitVerticalUpdateManyWithoutOrganizationNestedInput
    businessUnits?: BusinessUnitUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tradeName?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationLinks?: UserOrganizationLinkUncheckedUpdateManyWithoutOrganizationNestedInput
    organizationVerticals?: OrganizationVerticalUncheckedUpdateManyWithoutOrganizationNestedInput
    businessUnitVerticals?: BusinessUnitVerticalUncheckedUpdateManyWithoutOrganizationNestedInput
    businessUnits?: BusinessUnitUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateManyInput = {
    id?: string
    tradeName: string
    legalName?: string | null
    documentType: string
    documentNumber: string
    statusId: string
    ownerUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type OrganizationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tradeName?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrganizationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tradeName?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserOrganizationLinkCreateInput = {
    isOwner?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutOrganizationLinkInput
    organization: OrganizationCreateNestedOneWithoutOrganizationLinksInput
  }

  export type UserOrganizationLinkUncheckedCreateInput = {
    userId: string
    organizationId: string
    isOwner?: boolean
    createdAt?: Date | string
  }

  export type UserOrganizationLinkUpdateInput = {
    isOwner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOrganizationLinkNestedInput
    organization?: OrganizationUpdateOneRequiredWithoutOrganizationLinksNestedInput
  }

  export type UserOrganizationLinkUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    isOwner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserOrganizationLinkCreateManyInput = {
    userId: string
    organizationId: string
    isOwner?: boolean
    createdAt?: Date | string
  }

  export type UserOrganizationLinkUpdateManyMutationInput = {
    isOwner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserOrganizationLinkUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    isOwner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationVerticalCreateInput = {
    verticalCode: string
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    organization: OrganizationCreateNestedOneWithoutOrganizationVerticalsInput
  }

  export type OrganizationVerticalUncheckedCreateInput = {
    organizationId: string
    verticalCode: string
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type OrganizationVerticalUpdateInput = {
    verticalCode?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneRequiredWithoutOrganizationVerticalsNestedInput
  }

  export type OrganizationVerticalUncheckedUpdateInput = {
    organizationId?: StringFieldUpdateOperationsInput | string
    verticalCode?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrganizationVerticalCreateManyInput = {
    organizationId: string
    verticalCode: string
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type OrganizationVerticalUpdateManyMutationInput = {
    verticalCode?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrganizationVerticalUncheckedUpdateManyInput = {
    organizationId?: StringFieldUpdateOperationsInput | string
    verticalCode?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BusinessUnitCreateInput = {
    id?: string
    publicName: string
    phoneNumber: string
    phoneHasWhatsapp: boolean
    email?: string | null
    instagram?: string | null
    website?: string | null
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    organization: OrganizationCreateNestedOneWithoutBusinessUnitsInput
    address?: BusinessUnitAddressCreateNestedOneWithoutBusinessUnitInput
    businessUnitVerticals?: BusinessUnitVerticalCreateNestedManyWithoutBusinessUnitInput
  }

  export type BusinessUnitUncheckedCreateInput = {
    id?: string
    organizationId: string
    publicName: string
    phoneNumber: string
    phoneHasWhatsapp: boolean
    email?: string | null
    instagram?: string | null
    website?: string | null
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    address?: BusinessUnitAddressUncheckedCreateNestedOneWithoutBusinessUnitInput
    businessUnitVerticals?: BusinessUnitVerticalUncheckedCreateNestedManyWithoutBusinessUnitInput
  }

  export type BusinessUnitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneHasWhatsapp?: BoolFieldUpdateOperationsInput | boolean
    email?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneRequiredWithoutBusinessUnitsNestedInput
    address?: BusinessUnitAddressUpdateOneWithoutBusinessUnitNestedInput
    businessUnitVerticals?: BusinessUnitVerticalUpdateManyWithoutBusinessUnitNestedInput
  }

  export type BusinessUnitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    publicName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneHasWhatsapp?: BoolFieldUpdateOperationsInput | boolean
    email?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: BusinessUnitAddressUncheckedUpdateOneWithoutBusinessUnitNestedInput
    businessUnitVerticals?: BusinessUnitVerticalUncheckedUpdateManyWithoutBusinessUnitNestedInput
  }

  export type BusinessUnitCreateManyInput = {
    id?: string
    organizationId: string
    publicName: string
    phoneNumber: string
    phoneHasWhatsapp: boolean
    email?: string | null
    instagram?: string | null
    website?: string | null
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type BusinessUnitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneHasWhatsapp?: BoolFieldUpdateOperationsInput | boolean
    email?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BusinessUnitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    publicName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneHasWhatsapp?: BoolFieldUpdateOperationsInput | boolean
    email?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BusinessUnitAddressCreateInput = {
    street: string
    number: string
    complement?: string | null
    neighborhood: string
    city: string
    state: string
    postalCode: string
    country: string
    referencePoint: string
    businessUnit: BusinessUnitCreateNestedOneWithoutAddressInput
  }

  export type BusinessUnitAddressUncheckedCreateInput = {
    businessUnitId: string
    street: string
    number: string
    complement?: string | null
    neighborhood: string
    city: string
    state: string
    postalCode: string
    country: string
    referencePoint: string
  }

  export type BusinessUnitAddressUpdateInput = {
    street?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    referencePoint?: StringFieldUpdateOperationsInput | string
    businessUnit?: BusinessUnitUpdateOneRequiredWithoutAddressNestedInput
  }

  export type BusinessUnitAddressUncheckedUpdateInput = {
    businessUnitId?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    referencePoint?: StringFieldUpdateOperationsInput | string
  }

  export type BusinessUnitAddressCreateManyInput = {
    businessUnitId: string
    street: string
    number: string
    complement?: string | null
    neighborhood: string
    city: string
    state: string
    postalCode: string
    country: string
    referencePoint: string
  }

  export type BusinessUnitAddressUpdateManyMutationInput = {
    street?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    referencePoint?: StringFieldUpdateOperationsInput | string
  }

  export type BusinessUnitAddressUncheckedUpdateManyInput = {
    businessUnitId?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    referencePoint?: StringFieldUpdateOperationsInput | string
  }

  export type BusinessUnitVerticalCreateInput = {
    verticalCode: string
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    businessUnit: BusinessUnitCreateNestedOneWithoutBusinessUnitVerticalsInput
    organization: OrganizationCreateNestedOneWithoutBusinessUnitVerticalsInput
  }

  export type BusinessUnitVerticalUncheckedCreateInput = {
    businessUnitId: string
    organizationId: string
    verticalCode: string
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type BusinessUnitVerticalUpdateInput = {
    verticalCode?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    businessUnit?: BusinessUnitUpdateOneRequiredWithoutBusinessUnitVerticalsNestedInput
    organization?: OrganizationUpdateOneRequiredWithoutBusinessUnitVerticalsNestedInput
  }

  export type BusinessUnitVerticalUncheckedUpdateInput = {
    businessUnitId?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    verticalCode?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BusinessUnitVerticalCreateManyInput = {
    businessUnitId: string
    organizationId: string
    verticalCode: string
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type BusinessUnitVerticalUpdateManyMutationInput = {
    verticalCode?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BusinessUnitVerticalUncheckedUpdateManyInput = {
    businessUnitId?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    verticalCode?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserOrganizationLinkNullableRelationFilter = {
    is?: UserOrganizationLinkWhereInput | null
    isNot?: UserOrganizationLinkWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    emailOptIn?: SortOrder
    phoneOptIn?: SortOrder
    statusId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    emailOptIn?: SortOrder
    phoneOptIn?: SortOrder
    statusId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    emailOptIn?: SortOrder
    phoneOptIn?: SortOrder
    statusId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserOrganizationLinkListRelationFilter = {
    every?: UserOrganizationLinkWhereInput
    some?: UserOrganizationLinkWhereInput
    none?: UserOrganizationLinkWhereInput
  }

  export type OrganizationVerticalListRelationFilter = {
    every?: OrganizationVerticalWhereInput
    some?: OrganizationVerticalWhereInput
    none?: OrganizationVerticalWhereInput
  }

  export type BusinessUnitVerticalListRelationFilter = {
    every?: BusinessUnitVerticalWhereInput
    some?: BusinessUnitVerticalWhereInput
    none?: BusinessUnitVerticalWhereInput
  }

  export type BusinessUnitListRelationFilter = {
    every?: BusinessUnitWhereInput
    some?: BusinessUnitWhereInput
    none?: BusinessUnitWhereInput
  }

  export type UserOrganizationLinkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationVerticalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BusinessUnitVerticalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BusinessUnitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationCountOrderByAggregateInput = {
    id?: SortOrder
    tradeName?: SortOrder
    legalName?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    statusId?: SortOrder
    ownerUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationMaxOrderByAggregateInput = {
    id?: SortOrder
    tradeName?: SortOrder
    legalName?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    statusId?: SortOrder
    ownerUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationMinOrderByAggregateInput = {
    id?: SortOrder
    tradeName?: SortOrder
    legalName?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    statusId?: SortOrder
    ownerUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type OrganizationRelationFilter = {
    is?: OrganizationWhereInput
    isNot?: OrganizationWhereInput
  }

  export type UserOrganizationLinkCountOrderByAggregateInput = {
    userId?: SortOrder
    organizationId?: SortOrder
    isOwner?: SortOrder
    createdAt?: SortOrder
  }

  export type UserOrganizationLinkMaxOrderByAggregateInput = {
    userId?: SortOrder
    organizationId?: SortOrder
    isOwner?: SortOrder
    createdAt?: SortOrder
  }

  export type UserOrganizationLinkMinOrderByAggregateInput = {
    userId?: SortOrder
    organizationId?: SortOrder
    isOwner?: SortOrder
    createdAt?: SortOrder
  }

  export type OrganizationVerticalOrganizationIdVerticalCodeCompoundUniqueInput = {
    organizationId: string
    verticalCode: string
  }

  export type OrganizationVerticalCountOrderByAggregateInput = {
    organizationId?: SortOrder
    verticalCode?: SortOrder
    statusId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationVerticalMaxOrderByAggregateInput = {
    organizationId?: SortOrder
    verticalCode?: SortOrder
    statusId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationVerticalMinOrderByAggregateInput = {
    organizationId?: SortOrder
    verticalCode?: SortOrder
    statusId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusinessUnitAddressNullableRelationFilter = {
    is?: BusinessUnitAddressWhereInput | null
    isNot?: BusinessUnitAddressWhereInput | null
  }

  export type BusinessUnitCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    publicName?: SortOrder
    phoneNumber?: SortOrder
    phoneHasWhatsapp?: SortOrder
    email?: SortOrder
    instagram?: SortOrder
    website?: SortOrder
    statusId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusinessUnitMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    publicName?: SortOrder
    phoneNumber?: SortOrder
    phoneHasWhatsapp?: SortOrder
    email?: SortOrder
    instagram?: SortOrder
    website?: SortOrder
    statusId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusinessUnitMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    publicName?: SortOrder
    phoneNumber?: SortOrder
    phoneHasWhatsapp?: SortOrder
    email?: SortOrder
    instagram?: SortOrder
    website?: SortOrder
    statusId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusinessUnitRelationFilter = {
    is?: BusinessUnitWhereInput
    isNot?: BusinessUnitWhereInput
  }

  export type BusinessUnitAddressCountOrderByAggregateInput = {
    businessUnitId?: SortOrder
    street?: SortOrder
    number?: SortOrder
    complement?: SortOrder
    neighborhood?: SortOrder
    city?: SortOrder
    state?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    referencePoint?: SortOrder
  }

  export type BusinessUnitAddressMaxOrderByAggregateInput = {
    businessUnitId?: SortOrder
    street?: SortOrder
    number?: SortOrder
    complement?: SortOrder
    neighborhood?: SortOrder
    city?: SortOrder
    state?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    referencePoint?: SortOrder
  }

  export type BusinessUnitAddressMinOrderByAggregateInput = {
    businessUnitId?: SortOrder
    street?: SortOrder
    number?: SortOrder
    complement?: SortOrder
    neighborhood?: SortOrder
    city?: SortOrder
    state?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    referencePoint?: SortOrder
  }

  export type BusinessUnitVerticalBusinessUnitIdVerticalCodeCompoundUniqueInput = {
    businessUnitId: string
    verticalCode: string
  }

  export type BusinessUnitVerticalCountOrderByAggregateInput = {
    businessUnitId?: SortOrder
    organizationId?: SortOrder
    verticalCode?: SortOrder
    statusId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusinessUnitVerticalMaxOrderByAggregateInput = {
    businessUnitId?: SortOrder
    organizationId?: SortOrder
    verticalCode?: SortOrder
    statusId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusinessUnitVerticalMinOrderByAggregateInput = {
    businessUnitId?: SortOrder
    organizationId?: SortOrder
    verticalCode?: SortOrder
    statusId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserOrganizationLinkCreateNestedOneWithoutUserInput = {
    create?: XOR<UserOrganizationLinkCreateWithoutUserInput, UserOrganizationLinkUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserOrganizationLinkCreateOrConnectWithoutUserInput
    connect?: UserOrganizationLinkWhereUniqueInput
  }

  export type UserOrganizationLinkUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserOrganizationLinkCreateWithoutUserInput, UserOrganizationLinkUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserOrganizationLinkCreateOrConnectWithoutUserInput
    connect?: UserOrganizationLinkWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserOrganizationLinkUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserOrganizationLinkCreateWithoutUserInput, UserOrganizationLinkUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserOrganizationLinkCreateOrConnectWithoutUserInput
    upsert?: UserOrganizationLinkUpsertWithoutUserInput
    disconnect?: UserOrganizationLinkWhereInput | boolean
    delete?: UserOrganizationLinkWhereInput | boolean
    connect?: UserOrganizationLinkWhereUniqueInput
    update?: XOR<XOR<UserOrganizationLinkUpdateToOneWithWhereWithoutUserInput, UserOrganizationLinkUpdateWithoutUserInput>, UserOrganizationLinkUncheckedUpdateWithoutUserInput>
  }

  export type UserOrganizationLinkUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserOrganizationLinkCreateWithoutUserInput, UserOrganizationLinkUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserOrganizationLinkCreateOrConnectWithoutUserInput
    upsert?: UserOrganizationLinkUpsertWithoutUserInput
    disconnect?: UserOrganizationLinkWhereInput | boolean
    delete?: UserOrganizationLinkWhereInput | boolean
    connect?: UserOrganizationLinkWhereUniqueInput
    update?: XOR<XOR<UserOrganizationLinkUpdateToOneWithWhereWithoutUserInput, UserOrganizationLinkUpdateWithoutUserInput>, UserOrganizationLinkUncheckedUpdateWithoutUserInput>
  }

  export type UserOrganizationLinkCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<UserOrganizationLinkCreateWithoutOrganizationInput, UserOrganizationLinkUncheckedCreateWithoutOrganizationInput> | UserOrganizationLinkCreateWithoutOrganizationInput[] | UserOrganizationLinkUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserOrganizationLinkCreateOrConnectWithoutOrganizationInput | UserOrganizationLinkCreateOrConnectWithoutOrganizationInput[]
    createMany?: UserOrganizationLinkCreateManyOrganizationInputEnvelope
    connect?: UserOrganizationLinkWhereUniqueInput | UserOrganizationLinkWhereUniqueInput[]
  }

  export type OrganizationVerticalCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<OrganizationVerticalCreateWithoutOrganizationInput, OrganizationVerticalUncheckedCreateWithoutOrganizationInput> | OrganizationVerticalCreateWithoutOrganizationInput[] | OrganizationVerticalUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationVerticalCreateOrConnectWithoutOrganizationInput | OrganizationVerticalCreateOrConnectWithoutOrganizationInput[]
    createMany?: OrganizationVerticalCreateManyOrganizationInputEnvelope
    connect?: OrganizationVerticalWhereUniqueInput | OrganizationVerticalWhereUniqueInput[]
  }

  export type BusinessUnitVerticalCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<BusinessUnitVerticalCreateWithoutOrganizationInput, BusinessUnitVerticalUncheckedCreateWithoutOrganizationInput> | BusinessUnitVerticalCreateWithoutOrganizationInput[] | BusinessUnitVerticalUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: BusinessUnitVerticalCreateOrConnectWithoutOrganizationInput | BusinessUnitVerticalCreateOrConnectWithoutOrganizationInput[]
    createMany?: BusinessUnitVerticalCreateManyOrganizationInputEnvelope
    connect?: BusinessUnitVerticalWhereUniqueInput | BusinessUnitVerticalWhereUniqueInput[]
  }

  export type BusinessUnitCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<BusinessUnitCreateWithoutOrganizationInput, BusinessUnitUncheckedCreateWithoutOrganizationInput> | BusinessUnitCreateWithoutOrganizationInput[] | BusinessUnitUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: BusinessUnitCreateOrConnectWithoutOrganizationInput | BusinessUnitCreateOrConnectWithoutOrganizationInput[]
    createMany?: BusinessUnitCreateManyOrganizationInputEnvelope
    connect?: BusinessUnitWhereUniqueInput | BusinessUnitWhereUniqueInput[]
  }

  export type UserOrganizationLinkUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<UserOrganizationLinkCreateWithoutOrganizationInput, UserOrganizationLinkUncheckedCreateWithoutOrganizationInput> | UserOrganizationLinkCreateWithoutOrganizationInput[] | UserOrganizationLinkUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserOrganizationLinkCreateOrConnectWithoutOrganizationInput | UserOrganizationLinkCreateOrConnectWithoutOrganizationInput[]
    createMany?: UserOrganizationLinkCreateManyOrganizationInputEnvelope
    connect?: UserOrganizationLinkWhereUniqueInput | UserOrganizationLinkWhereUniqueInput[]
  }

  export type OrganizationVerticalUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<OrganizationVerticalCreateWithoutOrganizationInput, OrganizationVerticalUncheckedCreateWithoutOrganizationInput> | OrganizationVerticalCreateWithoutOrganizationInput[] | OrganizationVerticalUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationVerticalCreateOrConnectWithoutOrganizationInput | OrganizationVerticalCreateOrConnectWithoutOrganizationInput[]
    createMany?: OrganizationVerticalCreateManyOrganizationInputEnvelope
    connect?: OrganizationVerticalWhereUniqueInput | OrganizationVerticalWhereUniqueInput[]
  }

  export type BusinessUnitVerticalUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<BusinessUnitVerticalCreateWithoutOrganizationInput, BusinessUnitVerticalUncheckedCreateWithoutOrganizationInput> | BusinessUnitVerticalCreateWithoutOrganizationInput[] | BusinessUnitVerticalUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: BusinessUnitVerticalCreateOrConnectWithoutOrganizationInput | BusinessUnitVerticalCreateOrConnectWithoutOrganizationInput[]
    createMany?: BusinessUnitVerticalCreateManyOrganizationInputEnvelope
    connect?: BusinessUnitVerticalWhereUniqueInput | BusinessUnitVerticalWhereUniqueInput[]
  }

  export type BusinessUnitUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<BusinessUnitCreateWithoutOrganizationInput, BusinessUnitUncheckedCreateWithoutOrganizationInput> | BusinessUnitCreateWithoutOrganizationInput[] | BusinessUnitUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: BusinessUnitCreateOrConnectWithoutOrganizationInput | BusinessUnitCreateOrConnectWithoutOrganizationInput[]
    createMany?: BusinessUnitCreateManyOrganizationInputEnvelope
    connect?: BusinessUnitWhereUniqueInput | BusinessUnitWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserOrganizationLinkUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<UserOrganizationLinkCreateWithoutOrganizationInput, UserOrganizationLinkUncheckedCreateWithoutOrganizationInput> | UserOrganizationLinkCreateWithoutOrganizationInput[] | UserOrganizationLinkUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserOrganizationLinkCreateOrConnectWithoutOrganizationInput | UserOrganizationLinkCreateOrConnectWithoutOrganizationInput[]
    upsert?: UserOrganizationLinkUpsertWithWhereUniqueWithoutOrganizationInput | UserOrganizationLinkUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: UserOrganizationLinkCreateManyOrganizationInputEnvelope
    set?: UserOrganizationLinkWhereUniqueInput | UserOrganizationLinkWhereUniqueInput[]
    disconnect?: UserOrganizationLinkWhereUniqueInput | UserOrganizationLinkWhereUniqueInput[]
    delete?: UserOrganizationLinkWhereUniqueInput | UserOrganizationLinkWhereUniqueInput[]
    connect?: UserOrganizationLinkWhereUniqueInput | UserOrganizationLinkWhereUniqueInput[]
    update?: UserOrganizationLinkUpdateWithWhereUniqueWithoutOrganizationInput | UserOrganizationLinkUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: UserOrganizationLinkUpdateManyWithWhereWithoutOrganizationInput | UserOrganizationLinkUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: UserOrganizationLinkScalarWhereInput | UserOrganizationLinkScalarWhereInput[]
  }

  export type OrganizationVerticalUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<OrganizationVerticalCreateWithoutOrganizationInput, OrganizationVerticalUncheckedCreateWithoutOrganizationInput> | OrganizationVerticalCreateWithoutOrganizationInput[] | OrganizationVerticalUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationVerticalCreateOrConnectWithoutOrganizationInput | OrganizationVerticalCreateOrConnectWithoutOrganizationInput[]
    upsert?: OrganizationVerticalUpsertWithWhereUniqueWithoutOrganizationInput | OrganizationVerticalUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: OrganizationVerticalCreateManyOrganizationInputEnvelope
    set?: OrganizationVerticalWhereUniqueInput | OrganizationVerticalWhereUniqueInput[]
    disconnect?: OrganizationVerticalWhereUniqueInput | OrganizationVerticalWhereUniqueInput[]
    delete?: OrganizationVerticalWhereUniqueInput | OrganizationVerticalWhereUniqueInput[]
    connect?: OrganizationVerticalWhereUniqueInput | OrganizationVerticalWhereUniqueInput[]
    update?: OrganizationVerticalUpdateWithWhereUniqueWithoutOrganizationInput | OrganizationVerticalUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: OrganizationVerticalUpdateManyWithWhereWithoutOrganizationInput | OrganizationVerticalUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: OrganizationVerticalScalarWhereInput | OrganizationVerticalScalarWhereInput[]
  }

  export type BusinessUnitVerticalUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<BusinessUnitVerticalCreateWithoutOrganizationInput, BusinessUnitVerticalUncheckedCreateWithoutOrganizationInput> | BusinessUnitVerticalCreateWithoutOrganizationInput[] | BusinessUnitVerticalUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: BusinessUnitVerticalCreateOrConnectWithoutOrganizationInput | BusinessUnitVerticalCreateOrConnectWithoutOrganizationInput[]
    upsert?: BusinessUnitVerticalUpsertWithWhereUniqueWithoutOrganizationInput | BusinessUnitVerticalUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: BusinessUnitVerticalCreateManyOrganizationInputEnvelope
    set?: BusinessUnitVerticalWhereUniqueInput | BusinessUnitVerticalWhereUniqueInput[]
    disconnect?: BusinessUnitVerticalWhereUniqueInput | BusinessUnitVerticalWhereUniqueInput[]
    delete?: BusinessUnitVerticalWhereUniqueInput | BusinessUnitVerticalWhereUniqueInput[]
    connect?: BusinessUnitVerticalWhereUniqueInput | BusinessUnitVerticalWhereUniqueInput[]
    update?: BusinessUnitVerticalUpdateWithWhereUniqueWithoutOrganizationInput | BusinessUnitVerticalUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: BusinessUnitVerticalUpdateManyWithWhereWithoutOrganizationInput | BusinessUnitVerticalUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: BusinessUnitVerticalScalarWhereInput | BusinessUnitVerticalScalarWhereInput[]
  }

  export type BusinessUnitUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<BusinessUnitCreateWithoutOrganizationInput, BusinessUnitUncheckedCreateWithoutOrganizationInput> | BusinessUnitCreateWithoutOrganizationInput[] | BusinessUnitUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: BusinessUnitCreateOrConnectWithoutOrganizationInput | BusinessUnitCreateOrConnectWithoutOrganizationInput[]
    upsert?: BusinessUnitUpsertWithWhereUniqueWithoutOrganizationInput | BusinessUnitUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: BusinessUnitCreateManyOrganizationInputEnvelope
    set?: BusinessUnitWhereUniqueInput | BusinessUnitWhereUniqueInput[]
    disconnect?: BusinessUnitWhereUniqueInput | BusinessUnitWhereUniqueInput[]
    delete?: BusinessUnitWhereUniqueInput | BusinessUnitWhereUniqueInput[]
    connect?: BusinessUnitWhereUniqueInput | BusinessUnitWhereUniqueInput[]
    update?: BusinessUnitUpdateWithWhereUniqueWithoutOrganizationInput | BusinessUnitUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: BusinessUnitUpdateManyWithWhereWithoutOrganizationInput | BusinessUnitUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: BusinessUnitScalarWhereInput | BusinessUnitScalarWhereInput[]
  }

  export type UserOrganizationLinkUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<UserOrganizationLinkCreateWithoutOrganizationInput, UserOrganizationLinkUncheckedCreateWithoutOrganizationInput> | UserOrganizationLinkCreateWithoutOrganizationInput[] | UserOrganizationLinkUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserOrganizationLinkCreateOrConnectWithoutOrganizationInput | UserOrganizationLinkCreateOrConnectWithoutOrganizationInput[]
    upsert?: UserOrganizationLinkUpsertWithWhereUniqueWithoutOrganizationInput | UserOrganizationLinkUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: UserOrganizationLinkCreateManyOrganizationInputEnvelope
    set?: UserOrganizationLinkWhereUniqueInput | UserOrganizationLinkWhereUniqueInput[]
    disconnect?: UserOrganizationLinkWhereUniqueInput | UserOrganizationLinkWhereUniqueInput[]
    delete?: UserOrganizationLinkWhereUniqueInput | UserOrganizationLinkWhereUniqueInput[]
    connect?: UserOrganizationLinkWhereUniqueInput | UserOrganizationLinkWhereUniqueInput[]
    update?: UserOrganizationLinkUpdateWithWhereUniqueWithoutOrganizationInput | UserOrganizationLinkUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: UserOrganizationLinkUpdateManyWithWhereWithoutOrganizationInput | UserOrganizationLinkUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: UserOrganizationLinkScalarWhereInput | UserOrganizationLinkScalarWhereInput[]
  }

  export type OrganizationVerticalUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<OrganizationVerticalCreateWithoutOrganizationInput, OrganizationVerticalUncheckedCreateWithoutOrganizationInput> | OrganizationVerticalCreateWithoutOrganizationInput[] | OrganizationVerticalUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationVerticalCreateOrConnectWithoutOrganizationInput | OrganizationVerticalCreateOrConnectWithoutOrganizationInput[]
    upsert?: OrganizationVerticalUpsertWithWhereUniqueWithoutOrganizationInput | OrganizationVerticalUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: OrganizationVerticalCreateManyOrganizationInputEnvelope
    set?: OrganizationVerticalWhereUniqueInput | OrganizationVerticalWhereUniqueInput[]
    disconnect?: OrganizationVerticalWhereUniqueInput | OrganizationVerticalWhereUniqueInput[]
    delete?: OrganizationVerticalWhereUniqueInput | OrganizationVerticalWhereUniqueInput[]
    connect?: OrganizationVerticalWhereUniqueInput | OrganizationVerticalWhereUniqueInput[]
    update?: OrganizationVerticalUpdateWithWhereUniqueWithoutOrganizationInput | OrganizationVerticalUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: OrganizationVerticalUpdateManyWithWhereWithoutOrganizationInput | OrganizationVerticalUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: OrganizationVerticalScalarWhereInput | OrganizationVerticalScalarWhereInput[]
  }

  export type BusinessUnitVerticalUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<BusinessUnitVerticalCreateWithoutOrganizationInput, BusinessUnitVerticalUncheckedCreateWithoutOrganizationInput> | BusinessUnitVerticalCreateWithoutOrganizationInput[] | BusinessUnitVerticalUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: BusinessUnitVerticalCreateOrConnectWithoutOrganizationInput | BusinessUnitVerticalCreateOrConnectWithoutOrganizationInput[]
    upsert?: BusinessUnitVerticalUpsertWithWhereUniqueWithoutOrganizationInput | BusinessUnitVerticalUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: BusinessUnitVerticalCreateManyOrganizationInputEnvelope
    set?: BusinessUnitVerticalWhereUniqueInput | BusinessUnitVerticalWhereUniqueInput[]
    disconnect?: BusinessUnitVerticalWhereUniqueInput | BusinessUnitVerticalWhereUniqueInput[]
    delete?: BusinessUnitVerticalWhereUniqueInput | BusinessUnitVerticalWhereUniqueInput[]
    connect?: BusinessUnitVerticalWhereUniqueInput | BusinessUnitVerticalWhereUniqueInput[]
    update?: BusinessUnitVerticalUpdateWithWhereUniqueWithoutOrganizationInput | BusinessUnitVerticalUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: BusinessUnitVerticalUpdateManyWithWhereWithoutOrganizationInput | BusinessUnitVerticalUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: BusinessUnitVerticalScalarWhereInput | BusinessUnitVerticalScalarWhereInput[]
  }

  export type BusinessUnitUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<BusinessUnitCreateWithoutOrganizationInput, BusinessUnitUncheckedCreateWithoutOrganizationInput> | BusinessUnitCreateWithoutOrganizationInput[] | BusinessUnitUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: BusinessUnitCreateOrConnectWithoutOrganizationInput | BusinessUnitCreateOrConnectWithoutOrganizationInput[]
    upsert?: BusinessUnitUpsertWithWhereUniqueWithoutOrganizationInput | BusinessUnitUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: BusinessUnitCreateManyOrganizationInputEnvelope
    set?: BusinessUnitWhereUniqueInput | BusinessUnitWhereUniqueInput[]
    disconnect?: BusinessUnitWhereUniqueInput | BusinessUnitWhereUniqueInput[]
    delete?: BusinessUnitWhereUniqueInput | BusinessUnitWhereUniqueInput[]
    connect?: BusinessUnitWhereUniqueInput | BusinessUnitWhereUniqueInput[]
    update?: BusinessUnitUpdateWithWhereUniqueWithoutOrganizationInput | BusinessUnitUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: BusinessUnitUpdateManyWithWhereWithoutOrganizationInput | BusinessUnitUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: BusinessUnitScalarWhereInput | BusinessUnitScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutOrganizationLinkInput = {
    create?: XOR<UserCreateWithoutOrganizationLinkInput, UserUncheckedCreateWithoutOrganizationLinkInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationLinkInput
    connect?: UserWhereUniqueInput
  }

  export type OrganizationCreateNestedOneWithoutOrganizationLinksInput = {
    create?: XOR<OrganizationCreateWithoutOrganizationLinksInput, OrganizationUncheckedCreateWithoutOrganizationLinksInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutOrganizationLinksInput
    connect?: OrganizationWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutOrganizationLinkNestedInput = {
    create?: XOR<UserCreateWithoutOrganizationLinkInput, UserUncheckedCreateWithoutOrganizationLinkInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationLinkInput
    upsert?: UserUpsertWithoutOrganizationLinkInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOrganizationLinkInput, UserUpdateWithoutOrganizationLinkInput>, UserUncheckedUpdateWithoutOrganizationLinkInput>
  }

  export type OrganizationUpdateOneRequiredWithoutOrganizationLinksNestedInput = {
    create?: XOR<OrganizationCreateWithoutOrganizationLinksInput, OrganizationUncheckedCreateWithoutOrganizationLinksInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutOrganizationLinksInput
    upsert?: OrganizationUpsertWithoutOrganizationLinksInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutOrganizationLinksInput, OrganizationUpdateWithoutOrganizationLinksInput>, OrganizationUncheckedUpdateWithoutOrganizationLinksInput>
  }

  export type OrganizationCreateNestedOneWithoutOrganizationVerticalsInput = {
    create?: XOR<OrganizationCreateWithoutOrganizationVerticalsInput, OrganizationUncheckedCreateWithoutOrganizationVerticalsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutOrganizationVerticalsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type OrganizationUpdateOneRequiredWithoutOrganizationVerticalsNestedInput = {
    create?: XOR<OrganizationCreateWithoutOrganizationVerticalsInput, OrganizationUncheckedCreateWithoutOrganizationVerticalsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutOrganizationVerticalsInput
    upsert?: OrganizationUpsertWithoutOrganizationVerticalsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutOrganizationVerticalsInput, OrganizationUpdateWithoutOrganizationVerticalsInput>, OrganizationUncheckedUpdateWithoutOrganizationVerticalsInput>
  }

  export type OrganizationCreateNestedOneWithoutBusinessUnitsInput = {
    create?: XOR<OrganizationCreateWithoutBusinessUnitsInput, OrganizationUncheckedCreateWithoutBusinessUnitsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutBusinessUnitsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type BusinessUnitAddressCreateNestedOneWithoutBusinessUnitInput = {
    create?: XOR<BusinessUnitAddressCreateWithoutBusinessUnitInput, BusinessUnitAddressUncheckedCreateWithoutBusinessUnitInput>
    connectOrCreate?: BusinessUnitAddressCreateOrConnectWithoutBusinessUnitInput
    connect?: BusinessUnitAddressWhereUniqueInput
  }

  export type BusinessUnitVerticalCreateNestedManyWithoutBusinessUnitInput = {
    create?: XOR<BusinessUnitVerticalCreateWithoutBusinessUnitInput, BusinessUnitVerticalUncheckedCreateWithoutBusinessUnitInput> | BusinessUnitVerticalCreateWithoutBusinessUnitInput[] | BusinessUnitVerticalUncheckedCreateWithoutBusinessUnitInput[]
    connectOrCreate?: BusinessUnitVerticalCreateOrConnectWithoutBusinessUnitInput | BusinessUnitVerticalCreateOrConnectWithoutBusinessUnitInput[]
    createMany?: BusinessUnitVerticalCreateManyBusinessUnitInputEnvelope
    connect?: BusinessUnitVerticalWhereUniqueInput | BusinessUnitVerticalWhereUniqueInput[]
  }

  export type BusinessUnitAddressUncheckedCreateNestedOneWithoutBusinessUnitInput = {
    create?: XOR<BusinessUnitAddressCreateWithoutBusinessUnitInput, BusinessUnitAddressUncheckedCreateWithoutBusinessUnitInput>
    connectOrCreate?: BusinessUnitAddressCreateOrConnectWithoutBusinessUnitInput
    connect?: BusinessUnitAddressWhereUniqueInput
  }

  export type BusinessUnitVerticalUncheckedCreateNestedManyWithoutBusinessUnitInput = {
    create?: XOR<BusinessUnitVerticalCreateWithoutBusinessUnitInput, BusinessUnitVerticalUncheckedCreateWithoutBusinessUnitInput> | BusinessUnitVerticalCreateWithoutBusinessUnitInput[] | BusinessUnitVerticalUncheckedCreateWithoutBusinessUnitInput[]
    connectOrCreate?: BusinessUnitVerticalCreateOrConnectWithoutBusinessUnitInput | BusinessUnitVerticalCreateOrConnectWithoutBusinessUnitInput[]
    createMany?: BusinessUnitVerticalCreateManyBusinessUnitInputEnvelope
    connect?: BusinessUnitVerticalWhereUniqueInput | BusinessUnitVerticalWhereUniqueInput[]
  }

  export type OrganizationUpdateOneRequiredWithoutBusinessUnitsNestedInput = {
    create?: XOR<OrganizationCreateWithoutBusinessUnitsInput, OrganizationUncheckedCreateWithoutBusinessUnitsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutBusinessUnitsInput
    upsert?: OrganizationUpsertWithoutBusinessUnitsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutBusinessUnitsInput, OrganizationUpdateWithoutBusinessUnitsInput>, OrganizationUncheckedUpdateWithoutBusinessUnitsInput>
  }

  export type BusinessUnitAddressUpdateOneWithoutBusinessUnitNestedInput = {
    create?: XOR<BusinessUnitAddressCreateWithoutBusinessUnitInput, BusinessUnitAddressUncheckedCreateWithoutBusinessUnitInput>
    connectOrCreate?: BusinessUnitAddressCreateOrConnectWithoutBusinessUnitInput
    upsert?: BusinessUnitAddressUpsertWithoutBusinessUnitInput
    disconnect?: BusinessUnitAddressWhereInput | boolean
    delete?: BusinessUnitAddressWhereInput | boolean
    connect?: BusinessUnitAddressWhereUniqueInput
    update?: XOR<XOR<BusinessUnitAddressUpdateToOneWithWhereWithoutBusinessUnitInput, BusinessUnitAddressUpdateWithoutBusinessUnitInput>, BusinessUnitAddressUncheckedUpdateWithoutBusinessUnitInput>
  }

  export type BusinessUnitVerticalUpdateManyWithoutBusinessUnitNestedInput = {
    create?: XOR<BusinessUnitVerticalCreateWithoutBusinessUnitInput, BusinessUnitVerticalUncheckedCreateWithoutBusinessUnitInput> | BusinessUnitVerticalCreateWithoutBusinessUnitInput[] | BusinessUnitVerticalUncheckedCreateWithoutBusinessUnitInput[]
    connectOrCreate?: BusinessUnitVerticalCreateOrConnectWithoutBusinessUnitInput | BusinessUnitVerticalCreateOrConnectWithoutBusinessUnitInput[]
    upsert?: BusinessUnitVerticalUpsertWithWhereUniqueWithoutBusinessUnitInput | BusinessUnitVerticalUpsertWithWhereUniqueWithoutBusinessUnitInput[]
    createMany?: BusinessUnitVerticalCreateManyBusinessUnitInputEnvelope
    set?: BusinessUnitVerticalWhereUniqueInput | BusinessUnitVerticalWhereUniqueInput[]
    disconnect?: BusinessUnitVerticalWhereUniqueInput | BusinessUnitVerticalWhereUniqueInput[]
    delete?: BusinessUnitVerticalWhereUniqueInput | BusinessUnitVerticalWhereUniqueInput[]
    connect?: BusinessUnitVerticalWhereUniqueInput | BusinessUnitVerticalWhereUniqueInput[]
    update?: BusinessUnitVerticalUpdateWithWhereUniqueWithoutBusinessUnitInput | BusinessUnitVerticalUpdateWithWhereUniqueWithoutBusinessUnitInput[]
    updateMany?: BusinessUnitVerticalUpdateManyWithWhereWithoutBusinessUnitInput | BusinessUnitVerticalUpdateManyWithWhereWithoutBusinessUnitInput[]
    deleteMany?: BusinessUnitVerticalScalarWhereInput | BusinessUnitVerticalScalarWhereInput[]
  }

  export type BusinessUnitAddressUncheckedUpdateOneWithoutBusinessUnitNestedInput = {
    create?: XOR<BusinessUnitAddressCreateWithoutBusinessUnitInput, BusinessUnitAddressUncheckedCreateWithoutBusinessUnitInput>
    connectOrCreate?: BusinessUnitAddressCreateOrConnectWithoutBusinessUnitInput
    upsert?: BusinessUnitAddressUpsertWithoutBusinessUnitInput
    disconnect?: BusinessUnitAddressWhereInput | boolean
    delete?: BusinessUnitAddressWhereInput | boolean
    connect?: BusinessUnitAddressWhereUniqueInput
    update?: XOR<XOR<BusinessUnitAddressUpdateToOneWithWhereWithoutBusinessUnitInput, BusinessUnitAddressUpdateWithoutBusinessUnitInput>, BusinessUnitAddressUncheckedUpdateWithoutBusinessUnitInput>
  }

  export type BusinessUnitVerticalUncheckedUpdateManyWithoutBusinessUnitNestedInput = {
    create?: XOR<BusinessUnitVerticalCreateWithoutBusinessUnitInput, BusinessUnitVerticalUncheckedCreateWithoutBusinessUnitInput> | BusinessUnitVerticalCreateWithoutBusinessUnitInput[] | BusinessUnitVerticalUncheckedCreateWithoutBusinessUnitInput[]
    connectOrCreate?: BusinessUnitVerticalCreateOrConnectWithoutBusinessUnitInput | BusinessUnitVerticalCreateOrConnectWithoutBusinessUnitInput[]
    upsert?: BusinessUnitVerticalUpsertWithWhereUniqueWithoutBusinessUnitInput | BusinessUnitVerticalUpsertWithWhereUniqueWithoutBusinessUnitInput[]
    createMany?: BusinessUnitVerticalCreateManyBusinessUnitInputEnvelope
    set?: BusinessUnitVerticalWhereUniqueInput | BusinessUnitVerticalWhereUniqueInput[]
    disconnect?: BusinessUnitVerticalWhereUniqueInput | BusinessUnitVerticalWhereUniqueInput[]
    delete?: BusinessUnitVerticalWhereUniqueInput | BusinessUnitVerticalWhereUniqueInput[]
    connect?: BusinessUnitVerticalWhereUniqueInput | BusinessUnitVerticalWhereUniqueInput[]
    update?: BusinessUnitVerticalUpdateWithWhereUniqueWithoutBusinessUnitInput | BusinessUnitVerticalUpdateWithWhereUniqueWithoutBusinessUnitInput[]
    updateMany?: BusinessUnitVerticalUpdateManyWithWhereWithoutBusinessUnitInput | BusinessUnitVerticalUpdateManyWithWhereWithoutBusinessUnitInput[]
    deleteMany?: BusinessUnitVerticalScalarWhereInput | BusinessUnitVerticalScalarWhereInput[]
  }

  export type BusinessUnitCreateNestedOneWithoutAddressInput = {
    create?: XOR<BusinessUnitCreateWithoutAddressInput, BusinessUnitUncheckedCreateWithoutAddressInput>
    connectOrCreate?: BusinessUnitCreateOrConnectWithoutAddressInput
    connect?: BusinessUnitWhereUniqueInput
  }

  export type BusinessUnitUpdateOneRequiredWithoutAddressNestedInput = {
    create?: XOR<BusinessUnitCreateWithoutAddressInput, BusinessUnitUncheckedCreateWithoutAddressInput>
    connectOrCreate?: BusinessUnitCreateOrConnectWithoutAddressInput
    upsert?: BusinessUnitUpsertWithoutAddressInput
    connect?: BusinessUnitWhereUniqueInput
    update?: XOR<XOR<BusinessUnitUpdateToOneWithWhereWithoutAddressInput, BusinessUnitUpdateWithoutAddressInput>, BusinessUnitUncheckedUpdateWithoutAddressInput>
  }

  export type BusinessUnitCreateNestedOneWithoutBusinessUnitVerticalsInput = {
    create?: XOR<BusinessUnitCreateWithoutBusinessUnitVerticalsInput, BusinessUnitUncheckedCreateWithoutBusinessUnitVerticalsInput>
    connectOrCreate?: BusinessUnitCreateOrConnectWithoutBusinessUnitVerticalsInput
    connect?: BusinessUnitWhereUniqueInput
  }

  export type OrganizationCreateNestedOneWithoutBusinessUnitVerticalsInput = {
    create?: XOR<OrganizationCreateWithoutBusinessUnitVerticalsInput, OrganizationUncheckedCreateWithoutBusinessUnitVerticalsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutBusinessUnitVerticalsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type BusinessUnitUpdateOneRequiredWithoutBusinessUnitVerticalsNestedInput = {
    create?: XOR<BusinessUnitCreateWithoutBusinessUnitVerticalsInput, BusinessUnitUncheckedCreateWithoutBusinessUnitVerticalsInput>
    connectOrCreate?: BusinessUnitCreateOrConnectWithoutBusinessUnitVerticalsInput
    upsert?: BusinessUnitUpsertWithoutBusinessUnitVerticalsInput
    connect?: BusinessUnitWhereUniqueInput
    update?: XOR<XOR<BusinessUnitUpdateToOneWithWhereWithoutBusinessUnitVerticalsInput, BusinessUnitUpdateWithoutBusinessUnitVerticalsInput>, BusinessUnitUncheckedUpdateWithoutBusinessUnitVerticalsInput>
  }

  export type OrganizationUpdateOneRequiredWithoutBusinessUnitVerticalsNestedInput = {
    create?: XOR<OrganizationCreateWithoutBusinessUnitVerticalsInput, OrganizationUncheckedCreateWithoutBusinessUnitVerticalsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutBusinessUnitVerticalsInput
    upsert?: OrganizationUpsertWithoutBusinessUnitVerticalsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutBusinessUnitVerticalsInput, OrganizationUpdateWithoutBusinessUnitVerticalsInput>, OrganizationUncheckedUpdateWithoutBusinessUnitVerticalsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type UserOrganizationLinkCreateWithoutUserInput = {
    isOwner?: boolean
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutOrganizationLinksInput
  }

  export type UserOrganizationLinkUncheckedCreateWithoutUserInput = {
    organizationId: string
    isOwner?: boolean
    createdAt?: Date | string
  }

  export type UserOrganizationLinkCreateOrConnectWithoutUserInput = {
    where: UserOrganizationLinkWhereUniqueInput
    create: XOR<UserOrganizationLinkCreateWithoutUserInput, UserOrganizationLinkUncheckedCreateWithoutUserInput>
  }

  export type UserOrganizationLinkUpsertWithoutUserInput = {
    update: XOR<UserOrganizationLinkUpdateWithoutUserInput, UserOrganizationLinkUncheckedUpdateWithoutUserInput>
    create: XOR<UserOrganizationLinkCreateWithoutUserInput, UserOrganizationLinkUncheckedCreateWithoutUserInput>
    where?: UserOrganizationLinkWhereInput
  }

  export type UserOrganizationLinkUpdateToOneWithWhereWithoutUserInput = {
    where?: UserOrganizationLinkWhereInput
    data: XOR<UserOrganizationLinkUpdateWithoutUserInput, UserOrganizationLinkUncheckedUpdateWithoutUserInput>
  }

  export type UserOrganizationLinkUpdateWithoutUserInput = {
    isOwner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutOrganizationLinksNestedInput
  }

  export type UserOrganizationLinkUncheckedUpdateWithoutUserInput = {
    organizationId?: StringFieldUpdateOperationsInput | string
    isOwner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserOrganizationLinkCreateWithoutOrganizationInput = {
    isOwner?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutOrganizationLinkInput
  }

  export type UserOrganizationLinkUncheckedCreateWithoutOrganizationInput = {
    userId: string
    isOwner?: boolean
    createdAt?: Date | string
  }

  export type UserOrganizationLinkCreateOrConnectWithoutOrganizationInput = {
    where: UserOrganizationLinkWhereUniqueInput
    create: XOR<UserOrganizationLinkCreateWithoutOrganizationInput, UserOrganizationLinkUncheckedCreateWithoutOrganizationInput>
  }

  export type UserOrganizationLinkCreateManyOrganizationInputEnvelope = {
    data: UserOrganizationLinkCreateManyOrganizationInput | UserOrganizationLinkCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationVerticalCreateWithoutOrganizationInput = {
    verticalCode: string
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type OrganizationVerticalUncheckedCreateWithoutOrganizationInput = {
    verticalCode: string
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type OrganizationVerticalCreateOrConnectWithoutOrganizationInput = {
    where: OrganizationVerticalWhereUniqueInput
    create: XOR<OrganizationVerticalCreateWithoutOrganizationInput, OrganizationVerticalUncheckedCreateWithoutOrganizationInput>
  }

  export type OrganizationVerticalCreateManyOrganizationInputEnvelope = {
    data: OrganizationVerticalCreateManyOrganizationInput | OrganizationVerticalCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type BusinessUnitVerticalCreateWithoutOrganizationInput = {
    verticalCode: string
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    businessUnit: BusinessUnitCreateNestedOneWithoutBusinessUnitVerticalsInput
  }

  export type BusinessUnitVerticalUncheckedCreateWithoutOrganizationInput = {
    businessUnitId: string
    verticalCode: string
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type BusinessUnitVerticalCreateOrConnectWithoutOrganizationInput = {
    where: BusinessUnitVerticalWhereUniqueInput
    create: XOR<BusinessUnitVerticalCreateWithoutOrganizationInput, BusinessUnitVerticalUncheckedCreateWithoutOrganizationInput>
  }

  export type BusinessUnitVerticalCreateManyOrganizationInputEnvelope = {
    data: BusinessUnitVerticalCreateManyOrganizationInput | BusinessUnitVerticalCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type BusinessUnitCreateWithoutOrganizationInput = {
    id?: string
    publicName: string
    phoneNumber: string
    phoneHasWhatsapp: boolean
    email?: string | null
    instagram?: string | null
    website?: string | null
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    address?: BusinessUnitAddressCreateNestedOneWithoutBusinessUnitInput
    businessUnitVerticals?: BusinessUnitVerticalCreateNestedManyWithoutBusinessUnitInput
  }

  export type BusinessUnitUncheckedCreateWithoutOrganizationInput = {
    id?: string
    publicName: string
    phoneNumber: string
    phoneHasWhatsapp: boolean
    email?: string | null
    instagram?: string | null
    website?: string | null
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    address?: BusinessUnitAddressUncheckedCreateNestedOneWithoutBusinessUnitInput
    businessUnitVerticals?: BusinessUnitVerticalUncheckedCreateNestedManyWithoutBusinessUnitInput
  }

  export type BusinessUnitCreateOrConnectWithoutOrganizationInput = {
    where: BusinessUnitWhereUniqueInput
    create: XOR<BusinessUnitCreateWithoutOrganizationInput, BusinessUnitUncheckedCreateWithoutOrganizationInput>
  }

  export type BusinessUnitCreateManyOrganizationInputEnvelope = {
    data: BusinessUnitCreateManyOrganizationInput | BusinessUnitCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type UserOrganizationLinkUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: UserOrganizationLinkWhereUniqueInput
    update: XOR<UserOrganizationLinkUpdateWithoutOrganizationInput, UserOrganizationLinkUncheckedUpdateWithoutOrganizationInput>
    create: XOR<UserOrganizationLinkCreateWithoutOrganizationInput, UserOrganizationLinkUncheckedCreateWithoutOrganizationInput>
  }

  export type UserOrganizationLinkUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: UserOrganizationLinkWhereUniqueInput
    data: XOR<UserOrganizationLinkUpdateWithoutOrganizationInput, UserOrganizationLinkUncheckedUpdateWithoutOrganizationInput>
  }

  export type UserOrganizationLinkUpdateManyWithWhereWithoutOrganizationInput = {
    where: UserOrganizationLinkScalarWhereInput
    data: XOR<UserOrganizationLinkUpdateManyMutationInput, UserOrganizationLinkUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type UserOrganizationLinkScalarWhereInput = {
    AND?: UserOrganizationLinkScalarWhereInput | UserOrganizationLinkScalarWhereInput[]
    OR?: UserOrganizationLinkScalarWhereInput[]
    NOT?: UserOrganizationLinkScalarWhereInput | UserOrganizationLinkScalarWhereInput[]
    userId?: StringFilter<"UserOrganizationLink"> | string
    organizationId?: StringFilter<"UserOrganizationLink"> | string
    isOwner?: BoolFilter<"UserOrganizationLink"> | boolean
    createdAt?: DateTimeFilter<"UserOrganizationLink"> | Date | string
  }

  export type OrganizationVerticalUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: OrganizationVerticalWhereUniqueInput
    update: XOR<OrganizationVerticalUpdateWithoutOrganizationInput, OrganizationVerticalUncheckedUpdateWithoutOrganizationInput>
    create: XOR<OrganizationVerticalCreateWithoutOrganizationInput, OrganizationVerticalUncheckedCreateWithoutOrganizationInput>
  }

  export type OrganizationVerticalUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: OrganizationVerticalWhereUniqueInput
    data: XOR<OrganizationVerticalUpdateWithoutOrganizationInput, OrganizationVerticalUncheckedUpdateWithoutOrganizationInput>
  }

  export type OrganizationVerticalUpdateManyWithWhereWithoutOrganizationInput = {
    where: OrganizationVerticalScalarWhereInput
    data: XOR<OrganizationVerticalUpdateManyMutationInput, OrganizationVerticalUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type OrganizationVerticalScalarWhereInput = {
    AND?: OrganizationVerticalScalarWhereInput | OrganizationVerticalScalarWhereInput[]
    OR?: OrganizationVerticalScalarWhereInput[]
    NOT?: OrganizationVerticalScalarWhereInput | OrganizationVerticalScalarWhereInput[]
    organizationId?: StringFilter<"OrganizationVertical"> | string
    verticalCode?: StringFilter<"OrganizationVertical"> | string
    statusId?: StringFilter<"OrganizationVertical"> | string
    createdAt?: DateTimeFilter<"OrganizationVertical"> | Date | string
    updatedAt?: DateTimeNullableFilter<"OrganizationVertical"> | Date | string | null
  }

  export type BusinessUnitVerticalUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: BusinessUnitVerticalWhereUniqueInput
    update: XOR<BusinessUnitVerticalUpdateWithoutOrganizationInput, BusinessUnitVerticalUncheckedUpdateWithoutOrganizationInput>
    create: XOR<BusinessUnitVerticalCreateWithoutOrganizationInput, BusinessUnitVerticalUncheckedCreateWithoutOrganizationInput>
  }

  export type BusinessUnitVerticalUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: BusinessUnitVerticalWhereUniqueInput
    data: XOR<BusinessUnitVerticalUpdateWithoutOrganizationInput, BusinessUnitVerticalUncheckedUpdateWithoutOrganizationInput>
  }

  export type BusinessUnitVerticalUpdateManyWithWhereWithoutOrganizationInput = {
    where: BusinessUnitVerticalScalarWhereInput
    data: XOR<BusinessUnitVerticalUpdateManyMutationInput, BusinessUnitVerticalUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type BusinessUnitVerticalScalarWhereInput = {
    AND?: BusinessUnitVerticalScalarWhereInput | BusinessUnitVerticalScalarWhereInput[]
    OR?: BusinessUnitVerticalScalarWhereInput[]
    NOT?: BusinessUnitVerticalScalarWhereInput | BusinessUnitVerticalScalarWhereInput[]
    businessUnitId?: StringFilter<"BusinessUnitVertical"> | string
    organizationId?: StringFilter<"BusinessUnitVertical"> | string
    verticalCode?: StringFilter<"BusinessUnitVertical"> | string
    statusId?: StringFilter<"BusinessUnitVertical"> | string
    createdAt?: DateTimeFilter<"BusinessUnitVertical"> | Date | string
    updatedAt?: DateTimeNullableFilter<"BusinessUnitVertical"> | Date | string | null
  }

  export type BusinessUnitUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: BusinessUnitWhereUniqueInput
    update: XOR<BusinessUnitUpdateWithoutOrganizationInput, BusinessUnitUncheckedUpdateWithoutOrganizationInput>
    create: XOR<BusinessUnitCreateWithoutOrganizationInput, BusinessUnitUncheckedCreateWithoutOrganizationInput>
  }

  export type BusinessUnitUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: BusinessUnitWhereUniqueInput
    data: XOR<BusinessUnitUpdateWithoutOrganizationInput, BusinessUnitUncheckedUpdateWithoutOrganizationInput>
  }

  export type BusinessUnitUpdateManyWithWhereWithoutOrganizationInput = {
    where: BusinessUnitScalarWhereInput
    data: XOR<BusinessUnitUpdateManyMutationInput, BusinessUnitUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type BusinessUnitScalarWhereInput = {
    AND?: BusinessUnitScalarWhereInput | BusinessUnitScalarWhereInput[]
    OR?: BusinessUnitScalarWhereInput[]
    NOT?: BusinessUnitScalarWhereInput | BusinessUnitScalarWhereInput[]
    id?: StringFilter<"BusinessUnit"> | string
    organizationId?: StringFilter<"BusinessUnit"> | string
    publicName?: StringFilter<"BusinessUnit"> | string
    phoneNumber?: StringFilter<"BusinessUnit"> | string
    phoneHasWhatsapp?: BoolFilter<"BusinessUnit"> | boolean
    email?: StringNullableFilter<"BusinessUnit"> | string | null
    instagram?: StringNullableFilter<"BusinessUnit"> | string | null
    website?: StringNullableFilter<"BusinessUnit"> | string | null
    statusId?: StringFilter<"BusinessUnit"> | string
    createdAt?: DateTimeFilter<"BusinessUnit"> | Date | string
    updatedAt?: DateTimeNullableFilter<"BusinessUnit"> | Date | string | null
  }

  export type UserCreateWithoutOrganizationLinkInput = {
    id?: string
    firstName: string
    lastName: string
    documentType: string
    documentNumber: string
    email: string
    phoneNumber: string
    emailOptIn: boolean
    phoneOptIn: boolean
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type UserUncheckedCreateWithoutOrganizationLinkInput = {
    id?: string
    firstName: string
    lastName: string
    documentType: string
    documentNumber: string
    email: string
    phoneNumber: string
    emailOptIn: boolean
    phoneOptIn: boolean
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type UserCreateOrConnectWithoutOrganizationLinkInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrganizationLinkInput, UserUncheckedCreateWithoutOrganizationLinkInput>
  }

  export type OrganizationCreateWithoutOrganizationLinksInput = {
    id?: string
    tradeName: string
    legalName?: string | null
    documentType: string
    documentNumber: string
    statusId: string
    ownerUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    organizationVerticals?: OrganizationVerticalCreateNestedManyWithoutOrganizationInput
    businessUnitVerticals?: BusinessUnitVerticalCreateNestedManyWithoutOrganizationInput
    businessUnits?: BusinessUnitCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutOrganizationLinksInput = {
    id?: string
    tradeName: string
    legalName?: string | null
    documentType: string
    documentNumber: string
    statusId: string
    ownerUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    organizationVerticals?: OrganizationVerticalUncheckedCreateNestedManyWithoutOrganizationInput
    businessUnitVerticals?: BusinessUnitVerticalUncheckedCreateNestedManyWithoutOrganizationInput
    businessUnits?: BusinessUnitUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutOrganizationLinksInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutOrganizationLinksInput, OrganizationUncheckedCreateWithoutOrganizationLinksInput>
  }

  export type UserUpsertWithoutOrganizationLinkInput = {
    update: XOR<UserUpdateWithoutOrganizationLinkInput, UserUncheckedUpdateWithoutOrganizationLinkInput>
    create: XOR<UserCreateWithoutOrganizationLinkInput, UserUncheckedCreateWithoutOrganizationLinkInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrganizationLinkInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOrganizationLinkInput, UserUncheckedUpdateWithoutOrganizationLinkInput>
  }

  export type UserUpdateWithoutOrganizationLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    emailOptIn?: BoolFieldUpdateOperationsInput | boolean
    phoneOptIn?: BoolFieldUpdateOperationsInput | boolean
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateWithoutOrganizationLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    emailOptIn?: BoolFieldUpdateOperationsInput | boolean
    phoneOptIn?: BoolFieldUpdateOperationsInput | boolean
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrganizationUpsertWithoutOrganizationLinksInput = {
    update: XOR<OrganizationUpdateWithoutOrganizationLinksInput, OrganizationUncheckedUpdateWithoutOrganizationLinksInput>
    create: XOR<OrganizationCreateWithoutOrganizationLinksInput, OrganizationUncheckedCreateWithoutOrganizationLinksInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutOrganizationLinksInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutOrganizationLinksInput, OrganizationUncheckedUpdateWithoutOrganizationLinksInput>
  }

  export type OrganizationUpdateWithoutOrganizationLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    tradeName?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationVerticals?: OrganizationVerticalUpdateManyWithoutOrganizationNestedInput
    businessUnitVerticals?: BusinessUnitVerticalUpdateManyWithoutOrganizationNestedInput
    businessUnits?: BusinessUnitUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutOrganizationLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    tradeName?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationVerticals?: OrganizationVerticalUncheckedUpdateManyWithoutOrganizationNestedInput
    businessUnitVerticals?: BusinessUnitVerticalUncheckedUpdateManyWithoutOrganizationNestedInput
    businessUnits?: BusinessUnitUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateWithoutOrganizationVerticalsInput = {
    id?: string
    tradeName: string
    legalName?: string | null
    documentType: string
    documentNumber: string
    statusId: string
    ownerUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    organizationLinks?: UserOrganizationLinkCreateNestedManyWithoutOrganizationInput
    businessUnitVerticals?: BusinessUnitVerticalCreateNestedManyWithoutOrganizationInput
    businessUnits?: BusinessUnitCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutOrganizationVerticalsInput = {
    id?: string
    tradeName: string
    legalName?: string | null
    documentType: string
    documentNumber: string
    statusId: string
    ownerUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    organizationLinks?: UserOrganizationLinkUncheckedCreateNestedManyWithoutOrganizationInput
    businessUnitVerticals?: BusinessUnitVerticalUncheckedCreateNestedManyWithoutOrganizationInput
    businessUnits?: BusinessUnitUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutOrganizationVerticalsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutOrganizationVerticalsInput, OrganizationUncheckedCreateWithoutOrganizationVerticalsInput>
  }

  export type OrganizationUpsertWithoutOrganizationVerticalsInput = {
    update: XOR<OrganizationUpdateWithoutOrganizationVerticalsInput, OrganizationUncheckedUpdateWithoutOrganizationVerticalsInput>
    create: XOR<OrganizationCreateWithoutOrganizationVerticalsInput, OrganizationUncheckedCreateWithoutOrganizationVerticalsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutOrganizationVerticalsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutOrganizationVerticalsInput, OrganizationUncheckedUpdateWithoutOrganizationVerticalsInput>
  }

  export type OrganizationUpdateWithoutOrganizationVerticalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tradeName?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationLinks?: UserOrganizationLinkUpdateManyWithoutOrganizationNestedInput
    businessUnitVerticals?: BusinessUnitVerticalUpdateManyWithoutOrganizationNestedInput
    businessUnits?: BusinessUnitUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutOrganizationVerticalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tradeName?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationLinks?: UserOrganizationLinkUncheckedUpdateManyWithoutOrganizationNestedInput
    businessUnitVerticals?: BusinessUnitVerticalUncheckedUpdateManyWithoutOrganizationNestedInput
    businessUnits?: BusinessUnitUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateWithoutBusinessUnitsInput = {
    id?: string
    tradeName: string
    legalName?: string | null
    documentType: string
    documentNumber: string
    statusId: string
    ownerUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    organizationLinks?: UserOrganizationLinkCreateNestedManyWithoutOrganizationInput
    organizationVerticals?: OrganizationVerticalCreateNestedManyWithoutOrganizationInput
    businessUnitVerticals?: BusinessUnitVerticalCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutBusinessUnitsInput = {
    id?: string
    tradeName: string
    legalName?: string | null
    documentType: string
    documentNumber: string
    statusId: string
    ownerUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    organizationLinks?: UserOrganizationLinkUncheckedCreateNestedManyWithoutOrganizationInput
    organizationVerticals?: OrganizationVerticalUncheckedCreateNestedManyWithoutOrganizationInput
    businessUnitVerticals?: BusinessUnitVerticalUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutBusinessUnitsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutBusinessUnitsInput, OrganizationUncheckedCreateWithoutBusinessUnitsInput>
  }

  export type BusinessUnitAddressCreateWithoutBusinessUnitInput = {
    street: string
    number: string
    complement?: string | null
    neighborhood: string
    city: string
    state: string
    postalCode: string
    country: string
    referencePoint: string
  }

  export type BusinessUnitAddressUncheckedCreateWithoutBusinessUnitInput = {
    street: string
    number: string
    complement?: string | null
    neighborhood: string
    city: string
    state: string
    postalCode: string
    country: string
    referencePoint: string
  }

  export type BusinessUnitAddressCreateOrConnectWithoutBusinessUnitInput = {
    where: BusinessUnitAddressWhereUniqueInput
    create: XOR<BusinessUnitAddressCreateWithoutBusinessUnitInput, BusinessUnitAddressUncheckedCreateWithoutBusinessUnitInput>
  }

  export type BusinessUnitVerticalCreateWithoutBusinessUnitInput = {
    verticalCode: string
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    organization: OrganizationCreateNestedOneWithoutBusinessUnitVerticalsInput
  }

  export type BusinessUnitVerticalUncheckedCreateWithoutBusinessUnitInput = {
    organizationId: string
    verticalCode: string
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type BusinessUnitVerticalCreateOrConnectWithoutBusinessUnitInput = {
    where: BusinessUnitVerticalWhereUniqueInput
    create: XOR<BusinessUnitVerticalCreateWithoutBusinessUnitInput, BusinessUnitVerticalUncheckedCreateWithoutBusinessUnitInput>
  }

  export type BusinessUnitVerticalCreateManyBusinessUnitInputEnvelope = {
    data: BusinessUnitVerticalCreateManyBusinessUnitInput | BusinessUnitVerticalCreateManyBusinessUnitInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationUpsertWithoutBusinessUnitsInput = {
    update: XOR<OrganizationUpdateWithoutBusinessUnitsInput, OrganizationUncheckedUpdateWithoutBusinessUnitsInput>
    create: XOR<OrganizationCreateWithoutBusinessUnitsInput, OrganizationUncheckedCreateWithoutBusinessUnitsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutBusinessUnitsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutBusinessUnitsInput, OrganizationUncheckedUpdateWithoutBusinessUnitsInput>
  }

  export type OrganizationUpdateWithoutBusinessUnitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tradeName?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationLinks?: UserOrganizationLinkUpdateManyWithoutOrganizationNestedInput
    organizationVerticals?: OrganizationVerticalUpdateManyWithoutOrganizationNestedInput
    businessUnitVerticals?: BusinessUnitVerticalUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutBusinessUnitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tradeName?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationLinks?: UserOrganizationLinkUncheckedUpdateManyWithoutOrganizationNestedInput
    organizationVerticals?: OrganizationVerticalUncheckedUpdateManyWithoutOrganizationNestedInput
    businessUnitVerticals?: BusinessUnitVerticalUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type BusinessUnitAddressUpsertWithoutBusinessUnitInput = {
    update: XOR<BusinessUnitAddressUpdateWithoutBusinessUnitInput, BusinessUnitAddressUncheckedUpdateWithoutBusinessUnitInput>
    create: XOR<BusinessUnitAddressCreateWithoutBusinessUnitInput, BusinessUnitAddressUncheckedCreateWithoutBusinessUnitInput>
    where?: BusinessUnitAddressWhereInput
  }

  export type BusinessUnitAddressUpdateToOneWithWhereWithoutBusinessUnitInput = {
    where?: BusinessUnitAddressWhereInput
    data: XOR<BusinessUnitAddressUpdateWithoutBusinessUnitInput, BusinessUnitAddressUncheckedUpdateWithoutBusinessUnitInput>
  }

  export type BusinessUnitAddressUpdateWithoutBusinessUnitInput = {
    street?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    referencePoint?: StringFieldUpdateOperationsInput | string
  }

  export type BusinessUnitAddressUncheckedUpdateWithoutBusinessUnitInput = {
    street?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    referencePoint?: StringFieldUpdateOperationsInput | string
  }

  export type BusinessUnitVerticalUpsertWithWhereUniqueWithoutBusinessUnitInput = {
    where: BusinessUnitVerticalWhereUniqueInput
    update: XOR<BusinessUnitVerticalUpdateWithoutBusinessUnitInput, BusinessUnitVerticalUncheckedUpdateWithoutBusinessUnitInput>
    create: XOR<BusinessUnitVerticalCreateWithoutBusinessUnitInput, BusinessUnitVerticalUncheckedCreateWithoutBusinessUnitInput>
  }

  export type BusinessUnitVerticalUpdateWithWhereUniqueWithoutBusinessUnitInput = {
    where: BusinessUnitVerticalWhereUniqueInput
    data: XOR<BusinessUnitVerticalUpdateWithoutBusinessUnitInput, BusinessUnitVerticalUncheckedUpdateWithoutBusinessUnitInput>
  }

  export type BusinessUnitVerticalUpdateManyWithWhereWithoutBusinessUnitInput = {
    where: BusinessUnitVerticalScalarWhereInput
    data: XOR<BusinessUnitVerticalUpdateManyMutationInput, BusinessUnitVerticalUncheckedUpdateManyWithoutBusinessUnitInput>
  }

  export type BusinessUnitCreateWithoutAddressInput = {
    id?: string
    publicName: string
    phoneNumber: string
    phoneHasWhatsapp: boolean
    email?: string | null
    instagram?: string | null
    website?: string | null
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    organization: OrganizationCreateNestedOneWithoutBusinessUnitsInput
    businessUnitVerticals?: BusinessUnitVerticalCreateNestedManyWithoutBusinessUnitInput
  }

  export type BusinessUnitUncheckedCreateWithoutAddressInput = {
    id?: string
    organizationId: string
    publicName: string
    phoneNumber: string
    phoneHasWhatsapp: boolean
    email?: string | null
    instagram?: string | null
    website?: string | null
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    businessUnitVerticals?: BusinessUnitVerticalUncheckedCreateNestedManyWithoutBusinessUnitInput
  }

  export type BusinessUnitCreateOrConnectWithoutAddressInput = {
    where: BusinessUnitWhereUniqueInput
    create: XOR<BusinessUnitCreateWithoutAddressInput, BusinessUnitUncheckedCreateWithoutAddressInput>
  }

  export type BusinessUnitUpsertWithoutAddressInput = {
    update: XOR<BusinessUnitUpdateWithoutAddressInput, BusinessUnitUncheckedUpdateWithoutAddressInput>
    create: XOR<BusinessUnitCreateWithoutAddressInput, BusinessUnitUncheckedCreateWithoutAddressInput>
    where?: BusinessUnitWhereInput
  }

  export type BusinessUnitUpdateToOneWithWhereWithoutAddressInput = {
    where?: BusinessUnitWhereInput
    data: XOR<BusinessUnitUpdateWithoutAddressInput, BusinessUnitUncheckedUpdateWithoutAddressInput>
  }

  export type BusinessUnitUpdateWithoutAddressInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneHasWhatsapp?: BoolFieldUpdateOperationsInput | boolean
    email?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneRequiredWithoutBusinessUnitsNestedInput
    businessUnitVerticals?: BusinessUnitVerticalUpdateManyWithoutBusinessUnitNestedInput
  }

  export type BusinessUnitUncheckedUpdateWithoutAddressInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    publicName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneHasWhatsapp?: BoolFieldUpdateOperationsInput | boolean
    email?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    businessUnitVerticals?: BusinessUnitVerticalUncheckedUpdateManyWithoutBusinessUnitNestedInput
  }

  export type BusinessUnitCreateWithoutBusinessUnitVerticalsInput = {
    id?: string
    publicName: string
    phoneNumber: string
    phoneHasWhatsapp: boolean
    email?: string | null
    instagram?: string | null
    website?: string | null
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    organization: OrganizationCreateNestedOneWithoutBusinessUnitsInput
    address?: BusinessUnitAddressCreateNestedOneWithoutBusinessUnitInput
  }

  export type BusinessUnitUncheckedCreateWithoutBusinessUnitVerticalsInput = {
    id?: string
    organizationId: string
    publicName: string
    phoneNumber: string
    phoneHasWhatsapp: boolean
    email?: string | null
    instagram?: string | null
    website?: string | null
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    address?: BusinessUnitAddressUncheckedCreateNestedOneWithoutBusinessUnitInput
  }

  export type BusinessUnitCreateOrConnectWithoutBusinessUnitVerticalsInput = {
    where: BusinessUnitWhereUniqueInput
    create: XOR<BusinessUnitCreateWithoutBusinessUnitVerticalsInput, BusinessUnitUncheckedCreateWithoutBusinessUnitVerticalsInput>
  }

  export type OrganizationCreateWithoutBusinessUnitVerticalsInput = {
    id?: string
    tradeName: string
    legalName?: string | null
    documentType: string
    documentNumber: string
    statusId: string
    ownerUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    organizationLinks?: UserOrganizationLinkCreateNestedManyWithoutOrganizationInput
    organizationVerticals?: OrganizationVerticalCreateNestedManyWithoutOrganizationInput
    businessUnits?: BusinessUnitCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutBusinessUnitVerticalsInput = {
    id?: string
    tradeName: string
    legalName?: string | null
    documentType: string
    documentNumber: string
    statusId: string
    ownerUserId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    organizationLinks?: UserOrganizationLinkUncheckedCreateNestedManyWithoutOrganizationInput
    organizationVerticals?: OrganizationVerticalUncheckedCreateNestedManyWithoutOrganizationInput
    businessUnits?: BusinessUnitUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutBusinessUnitVerticalsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutBusinessUnitVerticalsInput, OrganizationUncheckedCreateWithoutBusinessUnitVerticalsInput>
  }

  export type BusinessUnitUpsertWithoutBusinessUnitVerticalsInput = {
    update: XOR<BusinessUnitUpdateWithoutBusinessUnitVerticalsInput, BusinessUnitUncheckedUpdateWithoutBusinessUnitVerticalsInput>
    create: XOR<BusinessUnitCreateWithoutBusinessUnitVerticalsInput, BusinessUnitUncheckedCreateWithoutBusinessUnitVerticalsInput>
    where?: BusinessUnitWhereInput
  }

  export type BusinessUnitUpdateToOneWithWhereWithoutBusinessUnitVerticalsInput = {
    where?: BusinessUnitWhereInput
    data: XOR<BusinessUnitUpdateWithoutBusinessUnitVerticalsInput, BusinessUnitUncheckedUpdateWithoutBusinessUnitVerticalsInput>
  }

  export type BusinessUnitUpdateWithoutBusinessUnitVerticalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneHasWhatsapp?: BoolFieldUpdateOperationsInput | boolean
    email?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneRequiredWithoutBusinessUnitsNestedInput
    address?: BusinessUnitAddressUpdateOneWithoutBusinessUnitNestedInput
  }

  export type BusinessUnitUncheckedUpdateWithoutBusinessUnitVerticalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    publicName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneHasWhatsapp?: BoolFieldUpdateOperationsInput | boolean
    email?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: BusinessUnitAddressUncheckedUpdateOneWithoutBusinessUnitNestedInput
  }

  export type OrganizationUpsertWithoutBusinessUnitVerticalsInput = {
    update: XOR<OrganizationUpdateWithoutBusinessUnitVerticalsInput, OrganizationUncheckedUpdateWithoutBusinessUnitVerticalsInput>
    create: XOR<OrganizationCreateWithoutBusinessUnitVerticalsInput, OrganizationUncheckedCreateWithoutBusinessUnitVerticalsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutBusinessUnitVerticalsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutBusinessUnitVerticalsInput, OrganizationUncheckedUpdateWithoutBusinessUnitVerticalsInput>
  }

  export type OrganizationUpdateWithoutBusinessUnitVerticalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tradeName?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationLinks?: UserOrganizationLinkUpdateManyWithoutOrganizationNestedInput
    organizationVerticals?: OrganizationVerticalUpdateManyWithoutOrganizationNestedInput
    businessUnits?: BusinessUnitUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutBusinessUnitVerticalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tradeName?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    documentType?: StringFieldUpdateOperationsInput | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organizationLinks?: UserOrganizationLinkUncheckedUpdateManyWithoutOrganizationNestedInput
    organizationVerticals?: OrganizationVerticalUncheckedUpdateManyWithoutOrganizationNestedInput
    businessUnits?: BusinessUnitUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type UserOrganizationLinkCreateManyOrganizationInput = {
    userId: string
    isOwner?: boolean
    createdAt?: Date | string
  }

  export type OrganizationVerticalCreateManyOrganizationInput = {
    verticalCode: string
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type BusinessUnitVerticalCreateManyOrganizationInput = {
    businessUnitId: string
    verticalCode: string
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type BusinessUnitCreateManyOrganizationInput = {
    id?: string
    publicName: string
    phoneNumber: string
    phoneHasWhatsapp: boolean
    email?: string | null
    instagram?: string | null
    website?: string | null
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type UserOrganizationLinkUpdateWithoutOrganizationInput = {
    isOwner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOrganizationLinkNestedInput
  }

  export type UserOrganizationLinkUncheckedUpdateWithoutOrganizationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    isOwner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserOrganizationLinkUncheckedUpdateManyWithoutOrganizationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    isOwner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationVerticalUpdateWithoutOrganizationInput = {
    verticalCode?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrganizationVerticalUncheckedUpdateWithoutOrganizationInput = {
    verticalCode?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrganizationVerticalUncheckedUpdateManyWithoutOrganizationInput = {
    verticalCode?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BusinessUnitVerticalUpdateWithoutOrganizationInput = {
    verticalCode?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    businessUnit?: BusinessUnitUpdateOneRequiredWithoutBusinessUnitVerticalsNestedInput
  }

  export type BusinessUnitVerticalUncheckedUpdateWithoutOrganizationInput = {
    businessUnitId?: StringFieldUpdateOperationsInput | string
    verticalCode?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BusinessUnitVerticalUncheckedUpdateManyWithoutOrganizationInput = {
    businessUnitId?: StringFieldUpdateOperationsInput | string
    verticalCode?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BusinessUnitUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneHasWhatsapp?: BoolFieldUpdateOperationsInput | boolean
    email?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: BusinessUnitAddressUpdateOneWithoutBusinessUnitNestedInput
    businessUnitVerticals?: BusinessUnitVerticalUpdateManyWithoutBusinessUnitNestedInput
  }

  export type BusinessUnitUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneHasWhatsapp?: BoolFieldUpdateOperationsInput | boolean
    email?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: BusinessUnitAddressUncheckedUpdateOneWithoutBusinessUnitNestedInput
    businessUnitVerticals?: BusinessUnitVerticalUncheckedUpdateManyWithoutBusinessUnitNestedInput
  }

  export type BusinessUnitUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneHasWhatsapp?: BoolFieldUpdateOperationsInput | boolean
    email?: NullableStringFieldUpdateOperationsInput | string | null
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BusinessUnitVerticalCreateManyBusinessUnitInput = {
    organizationId: string
    verticalCode: string
    statusId: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type BusinessUnitVerticalUpdateWithoutBusinessUnitInput = {
    verticalCode?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneRequiredWithoutBusinessUnitVerticalsNestedInput
  }

  export type BusinessUnitVerticalUncheckedUpdateWithoutBusinessUnitInput = {
    organizationId?: StringFieldUpdateOperationsInput | string
    verticalCode?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BusinessUnitVerticalUncheckedUpdateManyWithoutBusinessUnitInput = {
    organizationId?: StringFieldUpdateOperationsInput | string
    verticalCode?: StringFieldUpdateOperationsInput | string
    statusId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use OrganizationCountOutputTypeDefaultArgs instead
     */
    export type OrganizationCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrganizationCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BusinessUnitCountOutputTypeDefaultArgs instead
     */
    export type BusinessUnitCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BusinessUnitCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrganizationDefaultArgs instead
     */
    export type OrganizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrganizationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserOrganizationLinkDefaultArgs instead
     */
    export type UserOrganizationLinkArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserOrganizationLinkDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrganizationVerticalDefaultArgs instead
     */
    export type OrganizationVerticalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrganizationVerticalDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BusinessUnitDefaultArgs instead
     */
    export type BusinessUnitArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BusinessUnitDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BusinessUnitAddressDefaultArgs instead
     */
    export type BusinessUnitAddressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BusinessUnitAddressDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BusinessUnitVerticalDefaultArgs instead
     */
    export type BusinessUnitVerticalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BusinessUnitVerticalDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}