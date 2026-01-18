
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
 * Model UnitOfMeasure
 * 
 */
export type UnitOfMeasure = $Result.DefaultSelection<Prisma.$UnitOfMeasurePayload>
/**
 * Model InventoryItem
 * 
 */
export type InventoryItem = $Result.DefaultSelection<Prisma.$InventoryItemPayload>
/**
 * Model ProductItemLink
 * 
 */
export type ProductItemLink = $Result.DefaultSelection<Prisma.$ProductItemLinkPayload>
/**
 * Model StockLot
 * 
 */
export type StockLot = $Result.DefaultSelection<Prisma.$StockLotPayload>
/**
 * Model StockMovement
 * 
 */
export type StockMovement = $Result.DefaultSelection<Prisma.$StockMovementPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more UnitOfMeasures
 * const unitOfMeasures = await prisma.unitOfMeasure.findMany()
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
   * // Fetch zero or more UnitOfMeasures
   * const unitOfMeasures = await prisma.unitOfMeasure.findMany()
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
   * `prisma.unitOfMeasure`: Exposes CRUD operations for the **UnitOfMeasure** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UnitOfMeasures
    * const unitOfMeasures = await prisma.unitOfMeasure.findMany()
    * ```
    */
  get unitOfMeasure(): Prisma.UnitOfMeasureDelegate<ExtArgs>;

  /**
   * `prisma.inventoryItem`: Exposes CRUD operations for the **InventoryItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InventoryItems
    * const inventoryItems = await prisma.inventoryItem.findMany()
    * ```
    */
  get inventoryItem(): Prisma.InventoryItemDelegate<ExtArgs>;

  /**
   * `prisma.productItemLink`: Exposes CRUD operations for the **ProductItemLink** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductItemLinks
    * const productItemLinks = await prisma.productItemLink.findMany()
    * ```
    */
  get productItemLink(): Prisma.ProductItemLinkDelegate<ExtArgs>;

  /**
   * `prisma.stockLot`: Exposes CRUD operations for the **StockLot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StockLots
    * const stockLots = await prisma.stockLot.findMany()
    * ```
    */
  get stockLot(): Prisma.StockLotDelegate<ExtArgs>;

  /**
   * `prisma.stockMovement`: Exposes CRUD operations for the **StockMovement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StockMovements
    * const stockMovements = await prisma.stockMovement.findMany()
    * ```
    */
  get stockMovement(): Prisma.StockMovementDelegate<ExtArgs>;
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
    UnitOfMeasure: 'UnitOfMeasure',
    InventoryItem: 'InventoryItem',
    ProductItemLink: 'ProductItemLink',
    StockLot: 'StockLot',
    StockMovement: 'StockMovement'
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
      modelProps: "unitOfMeasure" | "inventoryItem" | "productItemLink" | "stockLot" | "stockMovement"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      UnitOfMeasure: {
        payload: Prisma.$UnitOfMeasurePayload<ExtArgs>
        fields: Prisma.UnitOfMeasureFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UnitOfMeasureFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitOfMeasurePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UnitOfMeasureFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitOfMeasurePayload>
          }
          findFirst: {
            args: Prisma.UnitOfMeasureFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitOfMeasurePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UnitOfMeasureFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitOfMeasurePayload>
          }
          findMany: {
            args: Prisma.UnitOfMeasureFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitOfMeasurePayload>[]
          }
          create: {
            args: Prisma.UnitOfMeasureCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitOfMeasurePayload>
          }
          createMany: {
            args: Prisma.UnitOfMeasureCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UnitOfMeasureDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitOfMeasurePayload>
          }
          update: {
            args: Prisma.UnitOfMeasureUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitOfMeasurePayload>
          }
          deleteMany: {
            args: Prisma.UnitOfMeasureDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UnitOfMeasureUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UnitOfMeasureUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UnitOfMeasurePayload>
          }
          aggregate: {
            args: Prisma.UnitOfMeasureAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUnitOfMeasure>
          }
          groupBy: {
            args: Prisma.UnitOfMeasureGroupByArgs<ExtArgs>
            result: $Utils.Optional<UnitOfMeasureGroupByOutputType>[]
          }
          count: {
            args: Prisma.UnitOfMeasureCountArgs<ExtArgs>
            result: $Utils.Optional<UnitOfMeasureCountAggregateOutputType> | number
          }
        }
      }
      InventoryItem: {
        payload: Prisma.$InventoryItemPayload<ExtArgs>
        fields: Prisma.InventoryItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InventoryItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InventoryItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryItemPayload>
          }
          findFirst: {
            args: Prisma.InventoryItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InventoryItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryItemPayload>
          }
          findMany: {
            args: Prisma.InventoryItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryItemPayload>[]
          }
          create: {
            args: Prisma.InventoryItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryItemPayload>
          }
          createMany: {
            args: Prisma.InventoryItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.InventoryItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryItemPayload>
          }
          update: {
            args: Prisma.InventoryItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryItemPayload>
          }
          deleteMany: {
            args: Prisma.InventoryItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InventoryItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InventoryItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryItemPayload>
          }
          aggregate: {
            args: Prisma.InventoryItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInventoryItem>
          }
          groupBy: {
            args: Prisma.InventoryItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<InventoryItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.InventoryItemCountArgs<ExtArgs>
            result: $Utils.Optional<InventoryItemCountAggregateOutputType> | number
          }
        }
      }
      ProductItemLink: {
        payload: Prisma.$ProductItemLinkPayload<ExtArgs>
        fields: Prisma.ProductItemLinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductItemLinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductItemLinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductItemLinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductItemLinkPayload>
          }
          findFirst: {
            args: Prisma.ProductItemLinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductItemLinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductItemLinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductItemLinkPayload>
          }
          findMany: {
            args: Prisma.ProductItemLinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductItemLinkPayload>[]
          }
          create: {
            args: Prisma.ProductItemLinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductItemLinkPayload>
          }
          createMany: {
            args: Prisma.ProductItemLinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductItemLinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductItemLinkPayload>
          }
          update: {
            args: Prisma.ProductItemLinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductItemLinkPayload>
          }
          deleteMany: {
            args: Prisma.ProductItemLinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductItemLinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductItemLinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductItemLinkPayload>
          }
          aggregate: {
            args: Prisma.ProductItemLinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductItemLink>
          }
          groupBy: {
            args: Prisma.ProductItemLinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductItemLinkGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductItemLinkCountArgs<ExtArgs>
            result: $Utils.Optional<ProductItemLinkCountAggregateOutputType> | number
          }
        }
      }
      StockLot: {
        payload: Prisma.$StockLotPayload<ExtArgs>
        fields: Prisma.StockLotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StockLotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockLotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StockLotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockLotPayload>
          }
          findFirst: {
            args: Prisma.StockLotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockLotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StockLotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockLotPayload>
          }
          findMany: {
            args: Prisma.StockLotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockLotPayload>[]
          }
          create: {
            args: Prisma.StockLotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockLotPayload>
          }
          createMany: {
            args: Prisma.StockLotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.StockLotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockLotPayload>
          }
          update: {
            args: Prisma.StockLotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockLotPayload>
          }
          deleteMany: {
            args: Prisma.StockLotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StockLotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StockLotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockLotPayload>
          }
          aggregate: {
            args: Prisma.StockLotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStockLot>
          }
          groupBy: {
            args: Prisma.StockLotGroupByArgs<ExtArgs>
            result: $Utils.Optional<StockLotGroupByOutputType>[]
          }
          count: {
            args: Prisma.StockLotCountArgs<ExtArgs>
            result: $Utils.Optional<StockLotCountAggregateOutputType> | number
          }
        }
      }
      StockMovement: {
        payload: Prisma.$StockMovementPayload<ExtArgs>
        fields: Prisma.StockMovementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StockMovementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StockMovementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>
          }
          findFirst: {
            args: Prisma.StockMovementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StockMovementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>
          }
          findMany: {
            args: Prisma.StockMovementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>[]
          }
          create: {
            args: Prisma.StockMovementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>
          }
          createMany: {
            args: Prisma.StockMovementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.StockMovementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>
          }
          update: {
            args: Prisma.StockMovementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>
          }
          deleteMany: {
            args: Prisma.StockMovementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StockMovementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StockMovementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockMovementPayload>
          }
          aggregate: {
            args: Prisma.StockMovementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStockMovement>
          }
          groupBy: {
            args: Prisma.StockMovementGroupByArgs<ExtArgs>
            result: $Utils.Optional<StockMovementGroupByOutputType>[]
          }
          count: {
            args: Prisma.StockMovementCountArgs<ExtArgs>
            result: $Utils.Optional<StockMovementCountAggregateOutputType> | number
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
   * Count Type UnitOfMeasureCountOutputType
   */

  export type UnitOfMeasureCountOutputType = {
    inventoryItems: number
  }

  export type UnitOfMeasureCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inventoryItems?: boolean | UnitOfMeasureCountOutputTypeCountInventoryItemsArgs
  }

  // Custom InputTypes
  /**
   * UnitOfMeasureCountOutputType without action
   */
  export type UnitOfMeasureCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitOfMeasureCountOutputType
     */
    select?: UnitOfMeasureCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UnitOfMeasureCountOutputType without action
   */
  export type UnitOfMeasureCountOutputTypeCountInventoryItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InventoryItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model UnitOfMeasure
   */

  export type AggregateUnitOfMeasure = {
    _count: UnitOfMeasureCountAggregateOutputType | null
    _min: UnitOfMeasureMinAggregateOutputType | null
    _max: UnitOfMeasureMaxAggregateOutputType | null
  }

  export type UnitOfMeasureMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    code: string | null
    codeNormalized: string | null
    name: string | null
    nameNormalized: string | null
    symbol: string | null
    allowsFraction: boolean | null
    status: string | null
    createdBy: string | null
    createdAt: Date | null
    updatedBy: string | null
    updatedAt: Date | null
  }

  export type UnitOfMeasureMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    code: string | null
    codeNormalized: string | null
    name: string | null
    nameNormalized: string | null
    symbol: string | null
    allowsFraction: boolean | null
    status: string | null
    createdBy: string | null
    createdAt: Date | null
    updatedBy: string | null
    updatedAt: Date | null
  }

  export type UnitOfMeasureCountAggregateOutputType = {
    id: number
    organizationId: number
    code: number
    codeNormalized: number
    name: number
    nameNormalized: number
    symbol: number
    allowsFraction: number
    status: number
    createdBy: number
    createdAt: number
    updatedBy: number
    updatedAt: number
    _all: number
  }


  export type UnitOfMeasureMinAggregateInputType = {
    id?: true
    organizationId?: true
    code?: true
    codeNormalized?: true
    name?: true
    nameNormalized?: true
    symbol?: true
    allowsFraction?: true
    status?: true
    createdBy?: true
    createdAt?: true
    updatedBy?: true
    updatedAt?: true
  }

  export type UnitOfMeasureMaxAggregateInputType = {
    id?: true
    organizationId?: true
    code?: true
    codeNormalized?: true
    name?: true
    nameNormalized?: true
    symbol?: true
    allowsFraction?: true
    status?: true
    createdBy?: true
    createdAt?: true
    updatedBy?: true
    updatedAt?: true
  }

  export type UnitOfMeasureCountAggregateInputType = {
    id?: true
    organizationId?: true
    code?: true
    codeNormalized?: true
    name?: true
    nameNormalized?: true
    symbol?: true
    allowsFraction?: true
    status?: true
    createdBy?: true
    createdAt?: true
    updatedBy?: true
    updatedAt?: true
    _all?: true
  }

  export type UnitOfMeasureAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UnitOfMeasure to aggregate.
     */
    where?: UnitOfMeasureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UnitOfMeasures to fetch.
     */
    orderBy?: UnitOfMeasureOrderByWithRelationInput | UnitOfMeasureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UnitOfMeasureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UnitOfMeasures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UnitOfMeasures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UnitOfMeasures
    **/
    _count?: true | UnitOfMeasureCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UnitOfMeasureMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UnitOfMeasureMaxAggregateInputType
  }

  export type GetUnitOfMeasureAggregateType<T extends UnitOfMeasureAggregateArgs> = {
        [P in keyof T & keyof AggregateUnitOfMeasure]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUnitOfMeasure[P]>
      : GetScalarType<T[P], AggregateUnitOfMeasure[P]>
  }




  export type UnitOfMeasureGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UnitOfMeasureWhereInput
    orderBy?: UnitOfMeasureOrderByWithAggregationInput | UnitOfMeasureOrderByWithAggregationInput[]
    by: UnitOfMeasureScalarFieldEnum[] | UnitOfMeasureScalarFieldEnum
    having?: UnitOfMeasureScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UnitOfMeasureCountAggregateInputType | true
    _min?: UnitOfMeasureMinAggregateInputType
    _max?: UnitOfMeasureMaxAggregateInputType
  }

  export type UnitOfMeasureGroupByOutputType = {
    id: string
    organizationId: string
    code: string
    codeNormalized: string
    name: string
    nameNormalized: string
    symbol: string
    allowsFraction: boolean
    status: string
    createdBy: string
    createdAt: Date
    updatedBy: string | null
    updatedAt: Date | null
    _count: UnitOfMeasureCountAggregateOutputType | null
    _min: UnitOfMeasureMinAggregateOutputType | null
    _max: UnitOfMeasureMaxAggregateOutputType | null
  }

  type GetUnitOfMeasureGroupByPayload<T extends UnitOfMeasureGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UnitOfMeasureGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UnitOfMeasureGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UnitOfMeasureGroupByOutputType[P]>
            : GetScalarType<T[P], UnitOfMeasureGroupByOutputType[P]>
        }
      >
    >


  export type UnitOfMeasureSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    code?: boolean
    codeNormalized?: boolean
    name?: boolean
    nameNormalized?: boolean
    symbol?: boolean
    allowsFraction?: boolean
    status?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    inventoryItems?: boolean | UnitOfMeasure$inventoryItemsArgs<ExtArgs>
    _count?: boolean | UnitOfMeasureCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["unitOfMeasure"]>


  export type UnitOfMeasureSelectScalar = {
    id?: boolean
    organizationId?: boolean
    code?: boolean
    codeNormalized?: boolean
    name?: boolean
    nameNormalized?: boolean
    symbol?: boolean
    allowsFraction?: boolean
    status?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
  }

  export type UnitOfMeasureInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inventoryItems?: boolean | UnitOfMeasure$inventoryItemsArgs<ExtArgs>
    _count?: boolean | UnitOfMeasureCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UnitOfMeasurePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UnitOfMeasure"
    objects: {
      inventoryItems: Prisma.$InventoryItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizationId: string
      code: string
      codeNormalized: string
      name: string
      nameNormalized: string
      symbol: string
      allowsFraction: boolean
      status: string
      createdBy: string
      createdAt: Date
      updatedBy: string | null
      updatedAt: Date | null
    }, ExtArgs["result"]["unitOfMeasure"]>
    composites: {}
  }

  type UnitOfMeasureGetPayload<S extends boolean | null | undefined | UnitOfMeasureDefaultArgs> = $Result.GetResult<Prisma.$UnitOfMeasurePayload, S>

  type UnitOfMeasureCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UnitOfMeasureFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UnitOfMeasureCountAggregateInputType | true
    }

  export interface UnitOfMeasureDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UnitOfMeasure'], meta: { name: 'UnitOfMeasure' } }
    /**
     * Find zero or one UnitOfMeasure that matches the filter.
     * @param {UnitOfMeasureFindUniqueArgs} args - Arguments to find a UnitOfMeasure
     * @example
     * // Get one UnitOfMeasure
     * const unitOfMeasure = await prisma.unitOfMeasure.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UnitOfMeasureFindUniqueArgs>(args: SelectSubset<T, UnitOfMeasureFindUniqueArgs<ExtArgs>>): Prisma__UnitOfMeasureClient<$Result.GetResult<Prisma.$UnitOfMeasurePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UnitOfMeasure that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UnitOfMeasureFindUniqueOrThrowArgs} args - Arguments to find a UnitOfMeasure
     * @example
     * // Get one UnitOfMeasure
     * const unitOfMeasure = await prisma.unitOfMeasure.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UnitOfMeasureFindUniqueOrThrowArgs>(args: SelectSubset<T, UnitOfMeasureFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UnitOfMeasureClient<$Result.GetResult<Prisma.$UnitOfMeasurePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UnitOfMeasure that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitOfMeasureFindFirstArgs} args - Arguments to find a UnitOfMeasure
     * @example
     * // Get one UnitOfMeasure
     * const unitOfMeasure = await prisma.unitOfMeasure.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UnitOfMeasureFindFirstArgs>(args?: SelectSubset<T, UnitOfMeasureFindFirstArgs<ExtArgs>>): Prisma__UnitOfMeasureClient<$Result.GetResult<Prisma.$UnitOfMeasurePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UnitOfMeasure that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitOfMeasureFindFirstOrThrowArgs} args - Arguments to find a UnitOfMeasure
     * @example
     * // Get one UnitOfMeasure
     * const unitOfMeasure = await prisma.unitOfMeasure.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UnitOfMeasureFindFirstOrThrowArgs>(args?: SelectSubset<T, UnitOfMeasureFindFirstOrThrowArgs<ExtArgs>>): Prisma__UnitOfMeasureClient<$Result.GetResult<Prisma.$UnitOfMeasurePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UnitOfMeasures that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitOfMeasureFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UnitOfMeasures
     * const unitOfMeasures = await prisma.unitOfMeasure.findMany()
     * 
     * // Get first 10 UnitOfMeasures
     * const unitOfMeasures = await prisma.unitOfMeasure.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const unitOfMeasureWithIdOnly = await prisma.unitOfMeasure.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UnitOfMeasureFindManyArgs>(args?: SelectSubset<T, UnitOfMeasureFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UnitOfMeasurePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UnitOfMeasure.
     * @param {UnitOfMeasureCreateArgs} args - Arguments to create a UnitOfMeasure.
     * @example
     * // Create one UnitOfMeasure
     * const UnitOfMeasure = await prisma.unitOfMeasure.create({
     *   data: {
     *     // ... data to create a UnitOfMeasure
     *   }
     * })
     * 
     */
    create<T extends UnitOfMeasureCreateArgs>(args: SelectSubset<T, UnitOfMeasureCreateArgs<ExtArgs>>): Prisma__UnitOfMeasureClient<$Result.GetResult<Prisma.$UnitOfMeasurePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UnitOfMeasures.
     * @param {UnitOfMeasureCreateManyArgs} args - Arguments to create many UnitOfMeasures.
     * @example
     * // Create many UnitOfMeasures
     * const unitOfMeasure = await prisma.unitOfMeasure.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UnitOfMeasureCreateManyArgs>(args?: SelectSubset<T, UnitOfMeasureCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UnitOfMeasure.
     * @param {UnitOfMeasureDeleteArgs} args - Arguments to delete one UnitOfMeasure.
     * @example
     * // Delete one UnitOfMeasure
     * const UnitOfMeasure = await prisma.unitOfMeasure.delete({
     *   where: {
     *     // ... filter to delete one UnitOfMeasure
     *   }
     * })
     * 
     */
    delete<T extends UnitOfMeasureDeleteArgs>(args: SelectSubset<T, UnitOfMeasureDeleteArgs<ExtArgs>>): Prisma__UnitOfMeasureClient<$Result.GetResult<Prisma.$UnitOfMeasurePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UnitOfMeasure.
     * @param {UnitOfMeasureUpdateArgs} args - Arguments to update one UnitOfMeasure.
     * @example
     * // Update one UnitOfMeasure
     * const unitOfMeasure = await prisma.unitOfMeasure.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UnitOfMeasureUpdateArgs>(args: SelectSubset<T, UnitOfMeasureUpdateArgs<ExtArgs>>): Prisma__UnitOfMeasureClient<$Result.GetResult<Prisma.$UnitOfMeasurePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UnitOfMeasures.
     * @param {UnitOfMeasureDeleteManyArgs} args - Arguments to filter UnitOfMeasures to delete.
     * @example
     * // Delete a few UnitOfMeasures
     * const { count } = await prisma.unitOfMeasure.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UnitOfMeasureDeleteManyArgs>(args?: SelectSubset<T, UnitOfMeasureDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UnitOfMeasures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitOfMeasureUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UnitOfMeasures
     * const unitOfMeasure = await prisma.unitOfMeasure.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UnitOfMeasureUpdateManyArgs>(args: SelectSubset<T, UnitOfMeasureUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UnitOfMeasure.
     * @param {UnitOfMeasureUpsertArgs} args - Arguments to update or create a UnitOfMeasure.
     * @example
     * // Update or create a UnitOfMeasure
     * const unitOfMeasure = await prisma.unitOfMeasure.upsert({
     *   create: {
     *     // ... data to create a UnitOfMeasure
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UnitOfMeasure we want to update
     *   }
     * })
     */
    upsert<T extends UnitOfMeasureUpsertArgs>(args: SelectSubset<T, UnitOfMeasureUpsertArgs<ExtArgs>>): Prisma__UnitOfMeasureClient<$Result.GetResult<Prisma.$UnitOfMeasurePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UnitOfMeasures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitOfMeasureCountArgs} args - Arguments to filter UnitOfMeasures to count.
     * @example
     * // Count the number of UnitOfMeasures
     * const count = await prisma.unitOfMeasure.count({
     *   where: {
     *     // ... the filter for the UnitOfMeasures we want to count
     *   }
     * })
    **/
    count<T extends UnitOfMeasureCountArgs>(
      args?: Subset<T, UnitOfMeasureCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UnitOfMeasureCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UnitOfMeasure.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitOfMeasureAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UnitOfMeasureAggregateArgs>(args: Subset<T, UnitOfMeasureAggregateArgs>): Prisma.PrismaPromise<GetUnitOfMeasureAggregateType<T>>

    /**
     * Group by UnitOfMeasure.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UnitOfMeasureGroupByArgs} args - Group by arguments.
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
      T extends UnitOfMeasureGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UnitOfMeasureGroupByArgs['orderBy'] }
        : { orderBy?: UnitOfMeasureGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UnitOfMeasureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUnitOfMeasureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UnitOfMeasure model
   */
  readonly fields: UnitOfMeasureFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UnitOfMeasure.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UnitOfMeasureClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inventoryItems<T extends UnitOfMeasure$inventoryItemsArgs<ExtArgs> = {}>(args?: Subset<T, UnitOfMeasure$inventoryItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the UnitOfMeasure model
   */ 
  interface UnitOfMeasureFieldRefs {
    readonly id: FieldRef<"UnitOfMeasure", 'String'>
    readonly organizationId: FieldRef<"UnitOfMeasure", 'String'>
    readonly code: FieldRef<"UnitOfMeasure", 'String'>
    readonly codeNormalized: FieldRef<"UnitOfMeasure", 'String'>
    readonly name: FieldRef<"UnitOfMeasure", 'String'>
    readonly nameNormalized: FieldRef<"UnitOfMeasure", 'String'>
    readonly symbol: FieldRef<"UnitOfMeasure", 'String'>
    readonly allowsFraction: FieldRef<"UnitOfMeasure", 'Boolean'>
    readonly status: FieldRef<"UnitOfMeasure", 'String'>
    readonly createdBy: FieldRef<"UnitOfMeasure", 'String'>
    readonly createdAt: FieldRef<"UnitOfMeasure", 'DateTime'>
    readonly updatedBy: FieldRef<"UnitOfMeasure", 'String'>
    readonly updatedAt: FieldRef<"UnitOfMeasure", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UnitOfMeasure findUnique
   */
  export type UnitOfMeasureFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitOfMeasure
     */
    select?: UnitOfMeasureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitOfMeasureInclude<ExtArgs> | null
    /**
     * Filter, which UnitOfMeasure to fetch.
     */
    where: UnitOfMeasureWhereUniqueInput
  }

  /**
   * UnitOfMeasure findUniqueOrThrow
   */
  export type UnitOfMeasureFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitOfMeasure
     */
    select?: UnitOfMeasureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitOfMeasureInclude<ExtArgs> | null
    /**
     * Filter, which UnitOfMeasure to fetch.
     */
    where: UnitOfMeasureWhereUniqueInput
  }

  /**
   * UnitOfMeasure findFirst
   */
  export type UnitOfMeasureFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitOfMeasure
     */
    select?: UnitOfMeasureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitOfMeasureInclude<ExtArgs> | null
    /**
     * Filter, which UnitOfMeasure to fetch.
     */
    where?: UnitOfMeasureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UnitOfMeasures to fetch.
     */
    orderBy?: UnitOfMeasureOrderByWithRelationInput | UnitOfMeasureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UnitOfMeasures.
     */
    cursor?: UnitOfMeasureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UnitOfMeasures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UnitOfMeasures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UnitOfMeasures.
     */
    distinct?: UnitOfMeasureScalarFieldEnum | UnitOfMeasureScalarFieldEnum[]
  }

  /**
   * UnitOfMeasure findFirstOrThrow
   */
  export type UnitOfMeasureFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitOfMeasure
     */
    select?: UnitOfMeasureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitOfMeasureInclude<ExtArgs> | null
    /**
     * Filter, which UnitOfMeasure to fetch.
     */
    where?: UnitOfMeasureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UnitOfMeasures to fetch.
     */
    orderBy?: UnitOfMeasureOrderByWithRelationInput | UnitOfMeasureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UnitOfMeasures.
     */
    cursor?: UnitOfMeasureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UnitOfMeasures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UnitOfMeasures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UnitOfMeasures.
     */
    distinct?: UnitOfMeasureScalarFieldEnum | UnitOfMeasureScalarFieldEnum[]
  }

  /**
   * UnitOfMeasure findMany
   */
  export type UnitOfMeasureFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitOfMeasure
     */
    select?: UnitOfMeasureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitOfMeasureInclude<ExtArgs> | null
    /**
     * Filter, which UnitOfMeasures to fetch.
     */
    where?: UnitOfMeasureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UnitOfMeasures to fetch.
     */
    orderBy?: UnitOfMeasureOrderByWithRelationInput | UnitOfMeasureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UnitOfMeasures.
     */
    cursor?: UnitOfMeasureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UnitOfMeasures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UnitOfMeasures.
     */
    skip?: number
    distinct?: UnitOfMeasureScalarFieldEnum | UnitOfMeasureScalarFieldEnum[]
  }

  /**
   * UnitOfMeasure create
   */
  export type UnitOfMeasureCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitOfMeasure
     */
    select?: UnitOfMeasureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitOfMeasureInclude<ExtArgs> | null
    /**
     * The data needed to create a UnitOfMeasure.
     */
    data: XOR<UnitOfMeasureCreateInput, UnitOfMeasureUncheckedCreateInput>
  }

  /**
   * UnitOfMeasure createMany
   */
  export type UnitOfMeasureCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UnitOfMeasures.
     */
    data: UnitOfMeasureCreateManyInput | UnitOfMeasureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UnitOfMeasure update
   */
  export type UnitOfMeasureUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitOfMeasure
     */
    select?: UnitOfMeasureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitOfMeasureInclude<ExtArgs> | null
    /**
     * The data needed to update a UnitOfMeasure.
     */
    data: XOR<UnitOfMeasureUpdateInput, UnitOfMeasureUncheckedUpdateInput>
    /**
     * Choose, which UnitOfMeasure to update.
     */
    where: UnitOfMeasureWhereUniqueInput
  }

  /**
   * UnitOfMeasure updateMany
   */
  export type UnitOfMeasureUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UnitOfMeasures.
     */
    data: XOR<UnitOfMeasureUpdateManyMutationInput, UnitOfMeasureUncheckedUpdateManyInput>
    /**
     * Filter which UnitOfMeasures to update
     */
    where?: UnitOfMeasureWhereInput
  }

  /**
   * UnitOfMeasure upsert
   */
  export type UnitOfMeasureUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitOfMeasure
     */
    select?: UnitOfMeasureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitOfMeasureInclude<ExtArgs> | null
    /**
     * The filter to search for the UnitOfMeasure to update in case it exists.
     */
    where: UnitOfMeasureWhereUniqueInput
    /**
     * In case the UnitOfMeasure found by the `where` argument doesn't exist, create a new UnitOfMeasure with this data.
     */
    create: XOR<UnitOfMeasureCreateInput, UnitOfMeasureUncheckedCreateInput>
    /**
     * In case the UnitOfMeasure was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UnitOfMeasureUpdateInput, UnitOfMeasureUncheckedUpdateInput>
  }

  /**
   * UnitOfMeasure delete
   */
  export type UnitOfMeasureDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitOfMeasure
     */
    select?: UnitOfMeasureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitOfMeasureInclude<ExtArgs> | null
    /**
     * Filter which UnitOfMeasure to delete.
     */
    where: UnitOfMeasureWhereUniqueInput
  }

  /**
   * UnitOfMeasure deleteMany
   */
  export type UnitOfMeasureDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UnitOfMeasures to delete
     */
    where?: UnitOfMeasureWhereInput
  }

  /**
   * UnitOfMeasure.inventoryItems
   */
  export type UnitOfMeasure$inventoryItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryItemInclude<ExtArgs> | null
    where?: InventoryItemWhereInput
    orderBy?: InventoryItemOrderByWithRelationInput | InventoryItemOrderByWithRelationInput[]
    cursor?: InventoryItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InventoryItemScalarFieldEnum | InventoryItemScalarFieldEnum[]
  }

  /**
   * UnitOfMeasure without action
   */
  export type UnitOfMeasureDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UnitOfMeasure
     */
    select?: UnitOfMeasureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UnitOfMeasureInclude<ExtArgs> | null
  }


  /**
   * Model InventoryItem
   */

  export type AggregateInventoryItem = {
    _count: InventoryItemCountAggregateOutputType | null
    _min: InventoryItemMinAggregateOutputType | null
    _max: InventoryItemMaxAggregateOutputType | null
  }

  export type InventoryItemMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    businessUnitId: string | null
    name: string | null
    nameNormalized: string | null
    type: string | null
    unitOfMeasureId: string | null
    requiresExpiration: boolean | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InventoryItemMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    businessUnitId: string | null
    name: string | null
    nameNormalized: string | null
    type: string | null
    unitOfMeasureId: string | null
    requiresExpiration: boolean | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InventoryItemCountAggregateOutputType = {
    id: number
    organizationId: number
    businessUnitId: number
    name: number
    nameNormalized: number
    type: number
    unitOfMeasureId: number
    requiresExpiration: number
    createdBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InventoryItemMinAggregateInputType = {
    id?: true
    organizationId?: true
    businessUnitId?: true
    name?: true
    nameNormalized?: true
    type?: true
    unitOfMeasureId?: true
    requiresExpiration?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InventoryItemMaxAggregateInputType = {
    id?: true
    organizationId?: true
    businessUnitId?: true
    name?: true
    nameNormalized?: true
    type?: true
    unitOfMeasureId?: true
    requiresExpiration?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InventoryItemCountAggregateInputType = {
    id?: true
    organizationId?: true
    businessUnitId?: true
    name?: true
    nameNormalized?: true
    type?: true
    unitOfMeasureId?: true
    requiresExpiration?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InventoryItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InventoryItem to aggregate.
     */
    where?: InventoryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryItems to fetch.
     */
    orderBy?: InventoryItemOrderByWithRelationInput | InventoryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InventoryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InventoryItems
    **/
    _count?: true | InventoryItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InventoryItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InventoryItemMaxAggregateInputType
  }

  export type GetInventoryItemAggregateType<T extends InventoryItemAggregateArgs> = {
        [P in keyof T & keyof AggregateInventoryItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInventoryItem[P]>
      : GetScalarType<T[P], AggregateInventoryItem[P]>
  }




  export type InventoryItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InventoryItemWhereInput
    orderBy?: InventoryItemOrderByWithAggregationInput | InventoryItemOrderByWithAggregationInput[]
    by: InventoryItemScalarFieldEnum[] | InventoryItemScalarFieldEnum
    having?: InventoryItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InventoryItemCountAggregateInputType | true
    _min?: InventoryItemMinAggregateInputType
    _max?: InventoryItemMaxAggregateInputType
  }

  export type InventoryItemGroupByOutputType = {
    id: string
    organizationId: string
    businessUnitId: string
    name: string
    nameNormalized: string
    type: string
    unitOfMeasureId: string
    requiresExpiration: boolean
    createdBy: string
    createdAt: Date
    updatedAt: Date | null
    _count: InventoryItemCountAggregateOutputType | null
    _min: InventoryItemMinAggregateOutputType | null
    _max: InventoryItemMaxAggregateOutputType | null
  }

  type GetInventoryItemGroupByPayload<T extends InventoryItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InventoryItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InventoryItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InventoryItemGroupByOutputType[P]>
            : GetScalarType<T[P], InventoryItemGroupByOutputType[P]>
        }
      >
    >


  export type InventoryItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    businessUnitId?: boolean
    name?: boolean
    nameNormalized?: boolean
    type?: boolean
    unitOfMeasureId?: boolean
    requiresExpiration?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    unitOfMeasure?: boolean | UnitOfMeasureDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inventoryItem"]>


  export type InventoryItemSelectScalar = {
    id?: boolean
    organizationId?: boolean
    businessUnitId?: boolean
    name?: boolean
    nameNormalized?: boolean
    type?: boolean
    unitOfMeasureId?: boolean
    requiresExpiration?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InventoryItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    unitOfMeasure?: boolean | UnitOfMeasureDefaultArgs<ExtArgs>
  }

  export type $InventoryItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InventoryItem"
    objects: {
      unitOfMeasure: Prisma.$UnitOfMeasurePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizationId: string
      businessUnitId: string
      name: string
      nameNormalized: string
      type: string
      unitOfMeasureId: string
      requiresExpiration: boolean
      createdBy: string
      createdAt: Date
      updatedAt: Date | null
    }, ExtArgs["result"]["inventoryItem"]>
    composites: {}
  }

  type InventoryItemGetPayload<S extends boolean | null | undefined | InventoryItemDefaultArgs> = $Result.GetResult<Prisma.$InventoryItemPayload, S>

  type InventoryItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InventoryItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InventoryItemCountAggregateInputType | true
    }

  export interface InventoryItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InventoryItem'], meta: { name: 'InventoryItem' } }
    /**
     * Find zero or one InventoryItem that matches the filter.
     * @param {InventoryItemFindUniqueArgs} args - Arguments to find a InventoryItem
     * @example
     * // Get one InventoryItem
     * const inventoryItem = await prisma.inventoryItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InventoryItemFindUniqueArgs>(args: SelectSubset<T, InventoryItemFindUniqueArgs<ExtArgs>>): Prisma__InventoryItemClient<$Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one InventoryItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InventoryItemFindUniqueOrThrowArgs} args - Arguments to find a InventoryItem
     * @example
     * // Get one InventoryItem
     * const inventoryItem = await prisma.inventoryItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InventoryItemFindUniqueOrThrowArgs>(args: SelectSubset<T, InventoryItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InventoryItemClient<$Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first InventoryItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemFindFirstArgs} args - Arguments to find a InventoryItem
     * @example
     * // Get one InventoryItem
     * const inventoryItem = await prisma.inventoryItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InventoryItemFindFirstArgs>(args?: SelectSubset<T, InventoryItemFindFirstArgs<ExtArgs>>): Prisma__InventoryItemClient<$Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first InventoryItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemFindFirstOrThrowArgs} args - Arguments to find a InventoryItem
     * @example
     * // Get one InventoryItem
     * const inventoryItem = await prisma.inventoryItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InventoryItemFindFirstOrThrowArgs>(args?: SelectSubset<T, InventoryItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__InventoryItemClient<$Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more InventoryItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InventoryItems
     * const inventoryItems = await prisma.inventoryItem.findMany()
     * 
     * // Get first 10 InventoryItems
     * const inventoryItems = await prisma.inventoryItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inventoryItemWithIdOnly = await prisma.inventoryItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InventoryItemFindManyArgs>(args?: SelectSubset<T, InventoryItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a InventoryItem.
     * @param {InventoryItemCreateArgs} args - Arguments to create a InventoryItem.
     * @example
     * // Create one InventoryItem
     * const InventoryItem = await prisma.inventoryItem.create({
     *   data: {
     *     // ... data to create a InventoryItem
     *   }
     * })
     * 
     */
    create<T extends InventoryItemCreateArgs>(args: SelectSubset<T, InventoryItemCreateArgs<ExtArgs>>): Prisma__InventoryItemClient<$Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many InventoryItems.
     * @param {InventoryItemCreateManyArgs} args - Arguments to create many InventoryItems.
     * @example
     * // Create many InventoryItems
     * const inventoryItem = await prisma.inventoryItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InventoryItemCreateManyArgs>(args?: SelectSubset<T, InventoryItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a InventoryItem.
     * @param {InventoryItemDeleteArgs} args - Arguments to delete one InventoryItem.
     * @example
     * // Delete one InventoryItem
     * const InventoryItem = await prisma.inventoryItem.delete({
     *   where: {
     *     // ... filter to delete one InventoryItem
     *   }
     * })
     * 
     */
    delete<T extends InventoryItemDeleteArgs>(args: SelectSubset<T, InventoryItemDeleteArgs<ExtArgs>>): Prisma__InventoryItemClient<$Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one InventoryItem.
     * @param {InventoryItemUpdateArgs} args - Arguments to update one InventoryItem.
     * @example
     * // Update one InventoryItem
     * const inventoryItem = await prisma.inventoryItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InventoryItemUpdateArgs>(args: SelectSubset<T, InventoryItemUpdateArgs<ExtArgs>>): Prisma__InventoryItemClient<$Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more InventoryItems.
     * @param {InventoryItemDeleteManyArgs} args - Arguments to filter InventoryItems to delete.
     * @example
     * // Delete a few InventoryItems
     * const { count } = await prisma.inventoryItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InventoryItemDeleteManyArgs>(args?: SelectSubset<T, InventoryItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InventoryItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InventoryItems
     * const inventoryItem = await prisma.inventoryItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InventoryItemUpdateManyArgs>(args: SelectSubset<T, InventoryItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InventoryItem.
     * @param {InventoryItemUpsertArgs} args - Arguments to update or create a InventoryItem.
     * @example
     * // Update or create a InventoryItem
     * const inventoryItem = await prisma.inventoryItem.upsert({
     *   create: {
     *     // ... data to create a InventoryItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InventoryItem we want to update
     *   }
     * })
     */
    upsert<T extends InventoryItemUpsertArgs>(args: SelectSubset<T, InventoryItemUpsertArgs<ExtArgs>>): Prisma__InventoryItemClient<$Result.GetResult<Prisma.$InventoryItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of InventoryItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemCountArgs} args - Arguments to filter InventoryItems to count.
     * @example
     * // Count the number of InventoryItems
     * const count = await prisma.inventoryItem.count({
     *   where: {
     *     // ... the filter for the InventoryItems we want to count
     *   }
     * })
    **/
    count<T extends InventoryItemCountArgs>(
      args?: Subset<T, InventoryItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InventoryItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InventoryItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InventoryItemAggregateArgs>(args: Subset<T, InventoryItemAggregateArgs>): Prisma.PrismaPromise<GetInventoryItemAggregateType<T>>

    /**
     * Group by InventoryItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryItemGroupByArgs} args - Group by arguments.
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
      T extends InventoryItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InventoryItemGroupByArgs['orderBy'] }
        : { orderBy?: InventoryItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, InventoryItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInventoryItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InventoryItem model
   */
  readonly fields: InventoryItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InventoryItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InventoryItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    unitOfMeasure<T extends UnitOfMeasureDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UnitOfMeasureDefaultArgs<ExtArgs>>): Prisma__UnitOfMeasureClient<$Result.GetResult<Prisma.$UnitOfMeasurePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the InventoryItem model
   */ 
  interface InventoryItemFieldRefs {
    readonly id: FieldRef<"InventoryItem", 'String'>
    readonly organizationId: FieldRef<"InventoryItem", 'String'>
    readonly businessUnitId: FieldRef<"InventoryItem", 'String'>
    readonly name: FieldRef<"InventoryItem", 'String'>
    readonly nameNormalized: FieldRef<"InventoryItem", 'String'>
    readonly type: FieldRef<"InventoryItem", 'String'>
    readonly unitOfMeasureId: FieldRef<"InventoryItem", 'String'>
    readonly requiresExpiration: FieldRef<"InventoryItem", 'Boolean'>
    readonly createdBy: FieldRef<"InventoryItem", 'String'>
    readonly createdAt: FieldRef<"InventoryItem", 'DateTime'>
    readonly updatedAt: FieldRef<"InventoryItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InventoryItem findUnique
   */
  export type InventoryItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryItemInclude<ExtArgs> | null
    /**
     * Filter, which InventoryItem to fetch.
     */
    where: InventoryItemWhereUniqueInput
  }

  /**
   * InventoryItem findUniqueOrThrow
   */
  export type InventoryItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryItemInclude<ExtArgs> | null
    /**
     * Filter, which InventoryItem to fetch.
     */
    where: InventoryItemWhereUniqueInput
  }

  /**
   * InventoryItem findFirst
   */
  export type InventoryItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryItemInclude<ExtArgs> | null
    /**
     * Filter, which InventoryItem to fetch.
     */
    where?: InventoryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryItems to fetch.
     */
    orderBy?: InventoryItemOrderByWithRelationInput | InventoryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InventoryItems.
     */
    cursor?: InventoryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InventoryItems.
     */
    distinct?: InventoryItemScalarFieldEnum | InventoryItemScalarFieldEnum[]
  }

  /**
   * InventoryItem findFirstOrThrow
   */
  export type InventoryItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryItemInclude<ExtArgs> | null
    /**
     * Filter, which InventoryItem to fetch.
     */
    where?: InventoryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryItems to fetch.
     */
    orderBy?: InventoryItemOrderByWithRelationInput | InventoryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InventoryItems.
     */
    cursor?: InventoryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InventoryItems.
     */
    distinct?: InventoryItemScalarFieldEnum | InventoryItemScalarFieldEnum[]
  }

  /**
   * InventoryItem findMany
   */
  export type InventoryItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryItemInclude<ExtArgs> | null
    /**
     * Filter, which InventoryItems to fetch.
     */
    where?: InventoryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryItems to fetch.
     */
    orderBy?: InventoryItemOrderByWithRelationInput | InventoryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InventoryItems.
     */
    cursor?: InventoryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryItems.
     */
    skip?: number
    distinct?: InventoryItemScalarFieldEnum | InventoryItemScalarFieldEnum[]
  }

  /**
   * InventoryItem create
   */
  export type InventoryItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryItemInclude<ExtArgs> | null
    /**
     * The data needed to create a InventoryItem.
     */
    data: XOR<InventoryItemCreateInput, InventoryItemUncheckedCreateInput>
  }

  /**
   * InventoryItem createMany
   */
  export type InventoryItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InventoryItems.
     */
    data: InventoryItemCreateManyInput | InventoryItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InventoryItem update
   */
  export type InventoryItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryItemInclude<ExtArgs> | null
    /**
     * The data needed to update a InventoryItem.
     */
    data: XOR<InventoryItemUpdateInput, InventoryItemUncheckedUpdateInput>
    /**
     * Choose, which InventoryItem to update.
     */
    where: InventoryItemWhereUniqueInput
  }

  /**
   * InventoryItem updateMany
   */
  export type InventoryItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InventoryItems.
     */
    data: XOR<InventoryItemUpdateManyMutationInput, InventoryItemUncheckedUpdateManyInput>
    /**
     * Filter which InventoryItems to update
     */
    where?: InventoryItemWhereInput
  }

  /**
   * InventoryItem upsert
   */
  export type InventoryItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryItemInclude<ExtArgs> | null
    /**
     * The filter to search for the InventoryItem to update in case it exists.
     */
    where: InventoryItemWhereUniqueInput
    /**
     * In case the InventoryItem found by the `where` argument doesn't exist, create a new InventoryItem with this data.
     */
    create: XOR<InventoryItemCreateInput, InventoryItemUncheckedCreateInput>
    /**
     * In case the InventoryItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InventoryItemUpdateInput, InventoryItemUncheckedUpdateInput>
  }

  /**
   * InventoryItem delete
   */
  export type InventoryItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryItemInclude<ExtArgs> | null
    /**
     * Filter which InventoryItem to delete.
     */
    where: InventoryItemWhereUniqueInput
  }

  /**
   * InventoryItem deleteMany
   */
  export type InventoryItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InventoryItems to delete
     */
    where?: InventoryItemWhereInput
  }

  /**
   * InventoryItem without action
   */
  export type InventoryItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryItem
     */
    select?: InventoryItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryItemInclude<ExtArgs> | null
  }


  /**
   * Model ProductItemLink
   */

  export type AggregateProductItemLink = {
    _count: ProductItemLinkCountAggregateOutputType | null
    _min: ProductItemLinkMinAggregateOutputType | null
    _max: ProductItemLinkMaxAggregateOutputType | null
  }

  export type ProductItemLinkMinAggregateOutputType = {
    id: string | null
    businessUnitId: string | null
    productId: string | null
    itemId: string | null
    status: string | null
    createdBy: string | null
    createdAt: Date | null
    updatedBy: string | null
    updatedAt: Date | null
  }

  export type ProductItemLinkMaxAggregateOutputType = {
    id: string | null
    businessUnitId: string | null
    productId: string | null
    itemId: string | null
    status: string | null
    createdBy: string | null
    createdAt: Date | null
    updatedBy: string | null
    updatedAt: Date | null
  }

  export type ProductItemLinkCountAggregateOutputType = {
    id: number
    businessUnitId: number
    productId: number
    itemId: number
    status: number
    createdBy: number
    createdAt: number
    updatedBy: number
    updatedAt: number
    _all: number
  }


  export type ProductItemLinkMinAggregateInputType = {
    id?: true
    businessUnitId?: true
    productId?: true
    itemId?: true
    status?: true
    createdBy?: true
    createdAt?: true
    updatedBy?: true
    updatedAt?: true
  }

  export type ProductItemLinkMaxAggregateInputType = {
    id?: true
    businessUnitId?: true
    productId?: true
    itemId?: true
    status?: true
    createdBy?: true
    createdAt?: true
    updatedBy?: true
    updatedAt?: true
  }

  export type ProductItemLinkCountAggregateInputType = {
    id?: true
    businessUnitId?: true
    productId?: true
    itemId?: true
    status?: true
    createdBy?: true
    createdAt?: true
    updatedBy?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductItemLinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductItemLink to aggregate.
     */
    where?: ProductItemLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductItemLinks to fetch.
     */
    orderBy?: ProductItemLinkOrderByWithRelationInput | ProductItemLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductItemLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductItemLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductItemLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductItemLinks
    **/
    _count?: true | ProductItemLinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductItemLinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductItemLinkMaxAggregateInputType
  }

  export type GetProductItemLinkAggregateType<T extends ProductItemLinkAggregateArgs> = {
        [P in keyof T & keyof AggregateProductItemLink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductItemLink[P]>
      : GetScalarType<T[P], AggregateProductItemLink[P]>
  }




  export type ProductItemLinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductItemLinkWhereInput
    orderBy?: ProductItemLinkOrderByWithAggregationInput | ProductItemLinkOrderByWithAggregationInput[]
    by: ProductItemLinkScalarFieldEnum[] | ProductItemLinkScalarFieldEnum
    having?: ProductItemLinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductItemLinkCountAggregateInputType | true
    _min?: ProductItemLinkMinAggregateInputType
    _max?: ProductItemLinkMaxAggregateInputType
  }

  export type ProductItemLinkGroupByOutputType = {
    id: string
    businessUnitId: string
    productId: string
    itemId: string
    status: string
    createdBy: string
    createdAt: Date
    updatedBy: string | null
    updatedAt: Date | null
    _count: ProductItemLinkCountAggregateOutputType | null
    _min: ProductItemLinkMinAggregateOutputType | null
    _max: ProductItemLinkMaxAggregateOutputType | null
  }

  type GetProductItemLinkGroupByPayload<T extends ProductItemLinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductItemLinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductItemLinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductItemLinkGroupByOutputType[P]>
            : GetScalarType<T[P], ProductItemLinkGroupByOutputType[P]>
        }
      >
    >


  export type ProductItemLinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    businessUnitId?: boolean
    productId?: boolean
    itemId?: boolean
    status?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["productItemLink"]>


  export type ProductItemLinkSelectScalar = {
    id?: boolean
    businessUnitId?: boolean
    productId?: boolean
    itemId?: boolean
    status?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
  }


  export type $ProductItemLinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductItemLink"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      businessUnitId: string
      productId: string
      itemId: string
      status: string
      createdBy: string
      createdAt: Date
      updatedBy: string | null
      updatedAt: Date | null
    }, ExtArgs["result"]["productItemLink"]>
    composites: {}
  }

  type ProductItemLinkGetPayload<S extends boolean | null | undefined | ProductItemLinkDefaultArgs> = $Result.GetResult<Prisma.$ProductItemLinkPayload, S>

  type ProductItemLinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductItemLinkFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductItemLinkCountAggregateInputType | true
    }

  export interface ProductItemLinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductItemLink'], meta: { name: 'ProductItemLink' } }
    /**
     * Find zero or one ProductItemLink that matches the filter.
     * @param {ProductItemLinkFindUniqueArgs} args - Arguments to find a ProductItemLink
     * @example
     * // Get one ProductItemLink
     * const productItemLink = await prisma.productItemLink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductItemLinkFindUniqueArgs>(args: SelectSubset<T, ProductItemLinkFindUniqueArgs<ExtArgs>>): Prisma__ProductItemLinkClient<$Result.GetResult<Prisma.$ProductItemLinkPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ProductItemLink that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductItemLinkFindUniqueOrThrowArgs} args - Arguments to find a ProductItemLink
     * @example
     * // Get one ProductItemLink
     * const productItemLink = await prisma.productItemLink.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductItemLinkFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductItemLinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductItemLinkClient<$Result.GetResult<Prisma.$ProductItemLinkPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ProductItemLink that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductItemLinkFindFirstArgs} args - Arguments to find a ProductItemLink
     * @example
     * // Get one ProductItemLink
     * const productItemLink = await prisma.productItemLink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductItemLinkFindFirstArgs>(args?: SelectSubset<T, ProductItemLinkFindFirstArgs<ExtArgs>>): Prisma__ProductItemLinkClient<$Result.GetResult<Prisma.$ProductItemLinkPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ProductItemLink that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductItemLinkFindFirstOrThrowArgs} args - Arguments to find a ProductItemLink
     * @example
     * // Get one ProductItemLink
     * const productItemLink = await prisma.productItemLink.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductItemLinkFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductItemLinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductItemLinkClient<$Result.GetResult<Prisma.$ProductItemLinkPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ProductItemLinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductItemLinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductItemLinks
     * const productItemLinks = await prisma.productItemLink.findMany()
     * 
     * // Get first 10 ProductItemLinks
     * const productItemLinks = await prisma.productItemLink.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productItemLinkWithIdOnly = await prisma.productItemLink.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductItemLinkFindManyArgs>(args?: SelectSubset<T, ProductItemLinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductItemLinkPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ProductItemLink.
     * @param {ProductItemLinkCreateArgs} args - Arguments to create a ProductItemLink.
     * @example
     * // Create one ProductItemLink
     * const ProductItemLink = await prisma.productItemLink.create({
     *   data: {
     *     // ... data to create a ProductItemLink
     *   }
     * })
     * 
     */
    create<T extends ProductItemLinkCreateArgs>(args: SelectSubset<T, ProductItemLinkCreateArgs<ExtArgs>>): Prisma__ProductItemLinkClient<$Result.GetResult<Prisma.$ProductItemLinkPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ProductItemLinks.
     * @param {ProductItemLinkCreateManyArgs} args - Arguments to create many ProductItemLinks.
     * @example
     * // Create many ProductItemLinks
     * const productItemLink = await prisma.productItemLink.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductItemLinkCreateManyArgs>(args?: SelectSubset<T, ProductItemLinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProductItemLink.
     * @param {ProductItemLinkDeleteArgs} args - Arguments to delete one ProductItemLink.
     * @example
     * // Delete one ProductItemLink
     * const ProductItemLink = await prisma.productItemLink.delete({
     *   where: {
     *     // ... filter to delete one ProductItemLink
     *   }
     * })
     * 
     */
    delete<T extends ProductItemLinkDeleteArgs>(args: SelectSubset<T, ProductItemLinkDeleteArgs<ExtArgs>>): Prisma__ProductItemLinkClient<$Result.GetResult<Prisma.$ProductItemLinkPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ProductItemLink.
     * @param {ProductItemLinkUpdateArgs} args - Arguments to update one ProductItemLink.
     * @example
     * // Update one ProductItemLink
     * const productItemLink = await prisma.productItemLink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductItemLinkUpdateArgs>(args: SelectSubset<T, ProductItemLinkUpdateArgs<ExtArgs>>): Prisma__ProductItemLinkClient<$Result.GetResult<Prisma.$ProductItemLinkPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ProductItemLinks.
     * @param {ProductItemLinkDeleteManyArgs} args - Arguments to filter ProductItemLinks to delete.
     * @example
     * // Delete a few ProductItemLinks
     * const { count } = await prisma.productItemLink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductItemLinkDeleteManyArgs>(args?: SelectSubset<T, ProductItemLinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductItemLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductItemLinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductItemLinks
     * const productItemLink = await prisma.productItemLink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductItemLinkUpdateManyArgs>(args: SelectSubset<T, ProductItemLinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductItemLink.
     * @param {ProductItemLinkUpsertArgs} args - Arguments to update or create a ProductItemLink.
     * @example
     * // Update or create a ProductItemLink
     * const productItemLink = await prisma.productItemLink.upsert({
     *   create: {
     *     // ... data to create a ProductItemLink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductItemLink we want to update
     *   }
     * })
     */
    upsert<T extends ProductItemLinkUpsertArgs>(args: SelectSubset<T, ProductItemLinkUpsertArgs<ExtArgs>>): Prisma__ProductItemLinkClient<$Result.GetResult<Prisma.$ProductItemLinkPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ProductItemLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductItemLinkCountArgs} args - Arguments to filter ProductItemLinks to count.
     * @example
     * // Count the number of ProductItemLinks
     * const count = await prisma.productItemLink.count({
     *   where: {
     *     // ... the filter for the ProductItemLinks we want to count
     *   }
     * })
    **/
    count<T extends ProductItemLinkCountArgs>(
      args?: Subset<T, ProductItemLinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductItemLinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductItemLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductItemLinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductItemLinkAggregateArgs>(args: Subset<T, ProductItemLinkAggregateArgs>): Prisma.PrismaPromise<GetProductItemLinkAggregateType<T>>

    /**
     * Group by ProductItemLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductItemLinkGroupByArgs} args - Group by arguments.
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
      T extends ProductItemLinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductItemLinkGroupByArgs['orderBy'] }
        : { orderBy?: ProductItemLinkGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductItemLinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductItemLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductItemLink model
   */
  readonly fields: ProductItemLinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductItemLink.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductItemLinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the ProductItemLink model
   */ 
  interface ProductItemLinkFieldRefs {
    readonly id: FieldRef<"ProductItemLink", 'String'>
    readonly businessUnitId: FieldRef<"ProductItemLink", 'String'>
    readonly productId: FieldRef<"ProductItemLink", 'String'>
    readonly itemId: FieldRef<"ProductItemLink", 'String'>
    readonly status: FieldRef<"ProductItemLink", 'String'>
    readonly createdBy: FieldRef<"ProductItemLink", 'String'>
    readonly createdAt: FieldRef<"ProductItemLink", 'DateTime'>
    readonly updatedBy: FieldRef<"ProductItemLink", 'String'>
    readonly updatedAt: FieldRef<"ProductItemLink", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductItemLink findUnique
   */
  export type ProductItemLinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductItemLink
     */
    select?: ProductItemLinkSelect<ExtArgs> | null
    /**
     * Filter, which ProductItemLink to fetch.
     */
    where: ProductItemLinkWhereUniqueInput
  }

  /**
   * ProductItemLink findUniqueOrThrow
   */
  export type ProductItemLinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductItemLink
     */
    select?: ProductItemLinkSelect<ExtArgs> | null
    /**
     * Filter, which ProductItemLink to fetch.
     */
    where: ProductItemLinkWhereUniqueInput
  }

  /**
   * ProductItemLink findFirst
   */
  export type ProductItemLinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductItemLink
     */
    select?: ProductItemLinkSelect<ExtArgs> | null
    /**
     * Filter, which ProductItemLink to fetch.
     */
    where?: ProductItemLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductItemLinks to fetch.
     */
    orderBy?: ProductItemLinkOrderByWithRelationInput | ProductItemLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductItemLinks.
     */
    cursor?: ProductItemLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductItemLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductItemLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductItemLinks.
     */
    distinct?: ProductItemLinkScalarFieldEnum | ProductItemLinkScalarFieldEnum[]
  }

  /**
   * ProductItemLink findFirstOrThrow
   */
  export type ProductItemLinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductItemLink
     */
    select?: ProductItemLinkSelect<ExtArgs> | null
    /**
     * Filter, which ProductItemLink to fetch.
     */
    where?: ProductItemLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductItemLinks to fetch.
     */
    orderBy?: ProductItemLinkOrderByWithRelationInput | ProductItemLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductItemLinks.
     */
    cursor?: ProductItemLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductItemLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductItemLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductItemLinks.
     */
    distinct?: ProductItemLinkScalarFieldEnum | ProductItemLinkScalarFieldEnum[]
  }

  /**
   * ProductItemLink findMany
   */
  export type ProductItemLinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductItemLink
     */
    select?: ProductItemLinkSelect<ExtArgs> | null
    /**
     * Filter, which ProductItemLinks to fetch.
     */
    where?: ProductItemLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductItemLinks to fetch.
     */
    orderBy?: ProductItemLinkOrderByWithRelationInput | ProductItemLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductItemLinks.
     */
    cursor?: ProductItemLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductItemLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductItemLinks.
     */
    skip?: number
    distinct?: ProductItemLinkScalarFieldEnum | ProductItemLinkScalarFieldEnum[]
  }

  /**
   * ProductItemLink create
   */
  export type ProductItemLinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductItemLink
     */
    select?: ProductItemLinkSelect<ExtArgs> | null
    /**
     * The data needed to create a ProductItemLink.
     */
    data: XOR<ProductItemLinkCreateInput, ProductItemLinkUncheckedCreateInput>
  }

  /**
   * ProductItemLink createMany
   */
  export type ProductItemLinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductItemLinks.
     */
    data: ProductItemLinkCreateManyInput | ProductItemLinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductItemLink update
   */
  export type ProductItemLinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductItemLink
     */
    select?: ProductItemLinkSelect<ExtArgs> | null
    /**
     * The data needed to update a ProductItemLink.
     */
    data: XOR<ProductItemLinkUpdateInput, ProductItemLinkUncheckedUpdateInput>
    /**
     * Choose, which ProductItemLink to update.
     */
    where: ProductItemLinkWhereUniqueInput
  }

  /**
   * ProductItemLink updateMany
   */
  export type ProductItemLinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductItemLinks.
     */
    data: XOR<ProductItemLinkUpdateManyMutationInput, ProductItemLinkUncheckedUpdateManyInput>
    /**
     * Filter which ProductItemLinks to update
     */
    where?: ProductItemLinkWhereInput
  }

  /**
   * ProductItemLink upsert
   */
  export type ProductItemLinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductItemLink
     */
    select?: ProductItemLinkSelect<ExtArgs> | null
    /**
     * The filter to search for the ProductItemLink to update in case it exists.
     */
    where: ProductItemLinkWhereUniqueInput
    /**
     * In case the ProductItemLink found by the `where` argument doesn't exist, create a new ProductItemLink with this data.
     */
    create: XOR<ProductItemLinkCreateInput, ProductItemLinkUncheckedCreateInput>
    /**
     * In case the ProductItemLink was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductItemLinkUpdateInput, ProductItemLinkUncheckedUpdateInput>
  }

  /**
   * ProductItemLink delete
   */
  export type ProductItemLinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductItemLink
     */
    select?: ProductItemLinkSelect<ExtArgs> | null
    /**
     * Filter which ProductItemLink to delete.
     */
    where: ProductItemLinkWhereUniqueInput
  }

  /**
   * ProductItemLink deleteMany
   */
  export type ProductItemLinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductItemLinks to delete
     */
    where?: ProductItemLinkWhereInput
  }

  /**
   * ProductItemLink without action
   */
  export type ProductItemLinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductItemLink
     */
    select?: ProductItemLinkSelect<ExtArgs> | null
  }


  /**
   * Model StockLot
   */

  export type AggregateStockLot = {
    _count: StockLotCountAggregateOutputType | null
    _avg: StockLotAvgAggregateOutputType | null
    _sum: StockLotSumAggregateOutputType | null
    _min: StockLotMinAggregateOutputType | null
    _max: StockLotMaxAggregateOutputType | null
  }

  export type StockLotAvgAggregateOutputType = {
    quantityAvailable: Decimal | null
  }

  export type StockLotSumAggregateOutputType = {
    quantityAvailable: Decimal | null
  }

  export type StockLotMinAggregateOutputType = {
    id: string | null
    businessUnitId: string | null
    itemId: string | null
    lotNumber: string | null
    expiresAt: Date | null
    quantityAvailable: Decimal | null
    firstEntryAt: Date | null
  }

  export type StockLotMaxAggregateOutputType = {
    id: string | null
    businessUnitId: string | null
    itemId: string | null
    lotNumber: string | null
    expiresAt: Date | null
    quantityAvailable: Decimal | null
    firstEntryAt: Date | null
  }

  export type StockLotCountAggregateOutputType = {
    id: number
    businessUnitId: number
    itemId: number
    lotNumber: number
    expiresAt: number
    quantityAvailable: number
    firstEntryAt: number
    _all: number
  }


  export type StockLotAvgAggregateInputType = {
    quantityAvailable?: true
  }

  export type StockLotSumAggregateInputType = {
    quantityAvailable?: true
  }

  export type StockLotMinAggregateInputType = {
    id?: true
    businessUnitId?: true
    itemId?: true
    lotNumber?: true
    expiresAt?: true
    quantityAvailable?: true
    firstEntryAt?: true
  }

  export type StockLotMaxAggregateInputType = {
    id?: true
    businessUnitId?: true
    itemId?: true
    lotNumber?: true
    expiresAt?: true
    quantityAvailable?: true
    firstEntryAt?: true
  }

  export type StockLotCountAggregateInputType = {
    id?: true
    businessUnitId?: true
    itemId?: true
    lotNumber?: true
    expiresAt?: true
    quantityAvailable?: true
    firstEntryAt?: true
    _all?: true
  }

  export type StockLotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockLot to aggregate.
     */
    where?: StockLotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockLots to fetch.
     */
    orderBy?: StockLotOrderByWithRelationInput | StockLotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StockLotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockLots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockLots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StockLots
    **/
    _count?: true | StockLotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StockLotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StockLotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StockLotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StockLotMaxAggregateInputType
  }

  export type GetStockLotAggregateType<T extends StockLotAggregateArgs> = {
        [P in keyof T & keyof AggregateStockLot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStockLot[P]>
      : GetScalarType<T[P], AggregateStockLot[P]>
  }




  export type StockLotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockLotWhereInput
    orderBy?: StockLotOrderByWithAggregationInput | StockLotOrderByWithAggregationInput[]
    by: StockLotScalarFieldEnum[] | StockLotScalarFieldEnum
    having?: StockLotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StockLotCountAggregateInputType | true
    _avg?: StockLotAvgAggregateInputType
    _sum?: StockLotSumAggregateInputType
    _min?: StockLotMinAggregateInputType
    _max?: StockLotMaxAggregateInputType
  }

  export type StockLotGroupByOutputType = {
    id: string
    businessUnitId: string
    itemId: string
    lotNumber: string
    expiresAt: Date | null
    quantityAvailable: Decimal
    firstEntryAt: Date
    _count: StockLotCountAggregateOutputType | null
    _avg: StockLotAvgAggregateOutputType | null
    _sum: StockLotSumAggregateOutputType | null
    _min: StockLotMinAggregateOutputType | null
    _max: StockLotMaxAggregateOutputType | null
  }

  type GetStockLotGroupByPayload<T extends StockLotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StockLotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StockLotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StockLotGroupByOutputType[P]>
            : GetScalarType<T[P], StockLotGroupByOutputType[P]>
        }
      >
    >


  export type StockLotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    businessUnitId?: boolean
    itemId?: boolean
    lotNumber?: boolean
    expiresAt?: boolean
    quantityAvailable?: boolean
    firstEntryAt?: boolean
  }, ExtArgs["result"]["stockLot"]>


  export type StockLotSelectScalar = {
    id?: boolean
    businessUnitId?: boolean
    itemId?: boolean
    lotNumber?: boolean
    expiresAt?: boolean
    quantityAvailable?: boolean
    firstEntryAt?: boolean
  }


  export type $StockLotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StockLot"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      businessUnitId: string
      itemId: string
      lotNumber: string
      expiresAt: Date | null
      quantityAvailable: Prisma.Decimal
      firstEntryAt: Date
    }, ExtArgs["result"]["stockLot"]>
    composites: {}
  }

  type StockLotGetPayload<S extends boolean | null | undefined | StockLotDefaultArgs> = $Result.GetResult<Prisma.$StockLotPayload, S>

  type StockLotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StockLotFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StockLotCountAggregateInputType | true
    }

  export interface StockLotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StockLot'], meta: { name: 'StockLot' } }
    /**
     * Find zero or one StockLot that matches the filter.
     * @param {StockLotFindUniqueArgs} args - Arguments to find a StockLot
     * @example
     * // Get one StockLot
     * const stockLot = await prisma.stockLot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockLotFindUniqueArgs>(args: SelectSubset<T, StockLotFindUniqueArgs<ExtArgs>>): Prisma__StockLotClient<$Result.GetResult<Prisma.$StockLotPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one StockLot that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StockLotFindUniqueOrThrowArgs} args - Arguments to find a StockLot
     * @example
     * // Get one StockLot
     * const stockLot = await prisma.stockLot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockLotFindUniqueOrThrowArgs>(args: SelectSubset<T, StockLotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StockLotClient<$Result.GetResult<Prisma.$StockLotPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first StockLot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockLotFindFirstArgs} args - Arguments to find a StockLot
     * @example
     * // Get one StockLot
     * const stockLot = await prisma.stockLot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockLotFindFirstArgs>(args?: SelectSubset<T, StockLotFindFirstArgs<ExtArgs>>): Prisma__StockLotClient<$Result.GetResult<Prisma.$StockLotPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first StockLot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockLotFindFirstOrThrowArgs} args - Arguments to find a StockLot
     * @example
     * // Get one StockLot
     * const stockLot = await prisma.stockLot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockLotFindFirstOrThrowArgs>(args?: SelectSubset<T, StockLotFindFirstOrThrowArgs<ExtArgs>>): Prisma__StockLotClient<$Result.GetResult<Prisma.$StockLotPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more StockLots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockLotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StockLots
     * const stockLots = await prisma.stockLot.findMany()
     * 
     * // Get first 10 StockLots
     * const stockLots = await prisma.stockLot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stockLotWithIdOnly = await prisma.stockLot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StockLotFindManyArgs>(args?: SelectSubset<T, StockLotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockLotPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a StockLot.
     * @param {StockLotCreateArgs} args - Arguments to create a StockLot.
     * @example
     * // Create one StockLot
     * const StockLot = await prisma.stockLot.create({
     *   data: {
     *     // ... data to create a StockLot
     *   }
     * })
     * 
     */
    create<T extends StockLotCreateArgs>(args: SelectSubset<T, StockLotCreateArgs<ExtArgs>>): Prisma__StockLotClient<$Result.GetResult<Prisma.$StockLotPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many StockLots.
     * @param {StockLotCreateManyArgs} args - Arguments to create many StockLots.
     * @example
     * // Create many StockLots
     * const stockLot = await prisma.stockLot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StockLotCreateManyArgs>(args?: SelectSubset<T, StockLotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a StockLot.
     * @param {StockLotDeleteArgs} args - Arguments to delete one StockLot.
     * @example
     * // Delete one StockLot
     * const StockLot = await prisma.stockLot.delete({
     *   where: {
     *     // ... filter to delete one StockLot
     *   }
     * })
     * 
     */
    delete<T extends StockLotDeleteArgs>(args: SelectSubset<T, StockLotDeleteArgs<ExtArgs>>): Prisma__StockLotClient<$Result.GetResult<Prisma.$StockLotPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one StockLot.
     * @param {StockLotUpdateArgs} args - Arguments to update one StockLot.
     * @example
     * // Update one StockLot
     * const stockLot = await prisma.stockLot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StockLotUpdateArgs>(args: SelectSubset<T, StockLotUpdateArgs<ExtArgs>>): Prisma__StockLotClient<$Result.GetResult<Prisma.$StockLotPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more StockLots.
     * @param {StockLotDeleteManyArgs} args - Arguments to filter StockLots to delete.
     * @example
     * // Delete a few StockLots
     * const { count } = await prisma.stockLot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StockLotDeleteManyArgs>(args?: SelectSubset<T, StockLotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StockLots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockLotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StockLots
     * const stockLot = await prisma.stockLot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StockLotUpdateManyArgs>(args: SelectSubset<T, StockLotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one StockLot.
     * @param {StockLotUpsertArgs} args - Arguments to update or create a StockLot.
     * @example
     * // Update or create a StockLot
     * const stockLot = await prisma.stockLot.upsert({
     *   create: {
     *     // ... data to create a StockLot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StockLot we want to update
     *   }
     * })
     */
    upsert<T extends StockLotUpsertArgs>(args: SelectSubset<T, StockLotUpsertArgs<ExtArgs>>): Prisma__StockLotClient<$Result.GetResult<Prisma.$StockLotPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of StockLots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockLotCountArgs} args - Arguments to filter StockLots to count.
     * @example
     * // Count the number of StockLots
     * const count = await prisma.stockLot.count({
     *   where: {
     *     // ... the filter for the StockLots we want to count
     *   }
     * })
    **/
    count<T extends StockLotCountArgs>(
      args?: Subset<T, StockLotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StockLotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StockLot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockLotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StockLotAggregateArgs>(args: Subset<T, StockLotAggregateArgs>): Prisma.PrismaPromise<GetStockLotAggregateType<T>>

    /**
     * Group by StockLot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockLotGroupByArgs} args - Group by arguments.
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
      T extends StockLotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StockLotGroupByArgs['orderBy'] }
        : { orderBy?: StockLotGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StockLotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockLotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StockLot model
   */
  readonly fields: StockLotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StockLot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StockLotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the StockLot model
   */ 
  interface StockLotFieldRefs {
    readonly id: FieldRef<"StockLot", 'String'>
    readonly businessUnitId: FieldRef<"StockLot", 'String'>
    readonly itemId: FieldRef<"StockLot", 'String'>
    readonly lotNumber: FieldRef<"StockLot", 'String'>
    readonly expiresAt: FieldRef<"StockLot", 'DateTime'>
    readonly quantityAvailable: FieldRef<"StockLot", 'Decimal'>
    readonly firstEntryAt: FieldRef<"StockLot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StockLot findUnique
   */
  export type StockLotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockLot
     */
    select?: StockLotSelect<ExtArgs> | null
    /**
     * Filter, which StockLot to fetch.
     */
    where: StockLotWhereUniqueInput
  }

  /**
   * StockLot findUniqueOrThrow
   */
  export type StockLotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockLot
     */
    select?: StockLotSelect<ExtArgs> | null
    /**
     * Filter, which StockLot to fetch.
     */
    where: StockLotWhereUniqueInput
  }

  /**
   * StockLot findFirst
   */
  export type StockLotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockLot
     */
    select?: StockLotSelect<ExtArgs> | null
    /**
     * Filter, which StockLot to fetch.
     */
    where?: StockLotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockLots to fetch.
     */
    orderBy?: StockLotOrderByWithRelationInput | StockLotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockLots.
     */
    cursor?: StockLotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockLots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockLots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockLots.
     */
    distinct?: StockLotScalarFieldEnum | StockLotScalarFieldEnum[]
  }

  /**
   * StockLot findFirstOrThrow
   */
  export type StockLotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockLot
     */
    select?: StockLotSelect<ExtArgs> | null
    /**
     * Filter, which StockLot to fetch.
     */
    where?: StockLotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockLots to fetch.
     */
    orderBy?: StockLotOrderByWithRelationInput | StockLotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockLots.
     */
    cursor?: StockLotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockLots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockLots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockLots.
     */
    distinct?: StockLotScalarFieldEnum | StockLotScalarFieldEnum[]
  }

  /**
   * StockLot findMany
   */
  export type StockLotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockLot
     */
    select?: StockLotSelect<ExtArgs> | null
    /**
     * Filter, which StockLots to fetch.
     */
    where?: StockLotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockLots to fetch.
     */
    orderBy?: StockLotOrderByWithRelationInput | StockLotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StockLots.
     */
    cursor?: StockLotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockLots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockLots.
     */
    skip?: number
    distinct?: StockLotScalarFieldEnum | StockLotScalarFieldEnum[]
  }

  /**
   * StockLot create
   */
  export type StockLotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockLot
     */
    select?: StockLotSelect<ExtArgs> | null
    /**
     * The data needed to create a StockLot.
     */
    data: XOR<StockLotCreateInput, StockLotUncheckedCreateInput>
  }

  /**
   * StockLot createMany
   */
  export type StockLotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StockLots.
     */
    data: StockLotCreateManyInput | StockLotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StockLot update
   */
  export type StockLotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockLot
     */
    select?: StockLotSelect<ExtArgs> | null
    /**
     * The data needed to update a StockLot.
     */
    data: XOR<StockLotUpdateInput, StockLotUncheckedUpdateInput>
    /**
     * Choose, which StockLot to update.
     */
    where: StockLotWhereUniqueInput
  }

  /**
   * StockLot updateMany
   */
  export type StockLotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StockLots.
     */
    data: XOR<StockLotUpdateManyMutationInput, StockLotUncheckedUpdateManyInput>
    /**
     * Filter which StockLots to update
     */
    where?: StockLotWhereInput
  }

  /**
   * StockLot upsert
   */
  export type StockLotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockLot
     */
    select?: StockLotSelect<ExtArgs> | null
    /**
     * The filter to search for the StockLot to update in case it exists.
     */
    where: StockLotWhereUniqueInput
    /**
     * In case the StockLot found by the `where` argument doesn't exist, create a new StockLot with this data.
     */
    create: XOR<StockLotCreateInput, StockLotUncheckedCreateInput>
    /**
     * In case the StockLot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StockLotUpdateInput, StockLotUncheckedUpdateInput>
  }

  /**
   * StockLot delete
   */
  export type StockLotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockLot
     */
    select?: StockLotSelect<ExtArgs> | null
    /**
     * Filter which StockLot to delete.
     */
    where: StockLotWhereUniqueInput
  }

  /**
   * StockLot deleteMany
   */
  export type StockLotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockLots to delete
     */
    where?: StockLotWhereInput
  }

  /**
   * StockLot without action
   */
  export type StockLotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockLot
     */
    select?: StockLotSelect<ExtArgs> | null
  }


  /**
   * Model StockMovement
   */

  export type AggregateStockMovement = {
    _count: StockMovementCountAggregateOutputType | null
    _avg: StockMovementAvgAggregateOutputType | null
    _sum: StockMovementSumAggregateOutputType | null
    _min: StockMovementMinAggregateOutputType | null
    _max: StockMovementMaxAggregateOutputType | null
  }

  export type StockMovementAvgAggregateOutputType = {
    quantity: Decimal | null
  }

  export type StockMovementSumAggregateOutputType = {
    quantity: Decimal | null
  }

  export type StockMovementMinAggregateOutputType = {
    id: string | null
    businessUnitId: string | null
    itemId: string | null
    lotNumber: string | null
    type: string | null
    quantity: Decimal | null
    movementSource: string | null
    externalId: string | null
    occurredAt: Date | null
    createdBy: string | null
    createdAt: Date | null
  }

  export type StockMovementMaxAggregateOutputType = {
    id: string | null
    businessUnitId: string | null
    itemId: string | null
    lotNumber: string | null
    type: string | null
    quantity: Decimal | null
    movementSource: string | null
    externalId: string | null
    occurredAt: Date | null
    createdBy: string | null
    createdAt: Date | null
  }

  export type StockMovementCountAggregateOutputType = {
    id: number
    businessUnitId: number
    itemId: number
    lotNumber: number
    type: number
    quantity: number
    movementSource: number
    externalId: number
    occurredAt: number
    createdBy: number
    createdAt: number
    _all: number
  }


  export type StockMovementAvgAggregateInputType = {
    quantity?: true
  }

  export type StockMovementSumAggregateInputType = {
    quantity?: true
  }

  export type StockMovementMinAggregateInputType = {
    id?: true
    businessUnitId?: true
    itemId?: true
    lotNumber?: true
    type?: true
    quantity?: true
    movementSource?: true
    externalId?: true
    occurredAt?: true
    createdBy?: true
    createdAt?: true
  }

  export type StockMovementMaxAggregateInputType = {
    id?: true
    businessUnitId?: true
    itemId?: true
    lotNumber?: true
    type?: true
    quantity?: true
    movementSource?: true
    externalId?: true
    occurredAt?: true
    createdBy?: true
    createdAt?: true
  }

  export type StockMovementCountAggregateInputType = {
    id?: true
    businessUnitId?: true
    itemId?: true
    lotNumber?: true
    type?: true
    quantity?: true
    movementSource?: true
    externalId?: true
    occurredAt?: true
    createdBy?: true
    createdAt?: true
    _all?: true
  }

  export type StockMovementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockMovement to aggregate.
     */
    where?: StockMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: StockMovementOrderByWithRelationInput | StockMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StockMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StockMovements
    **/
    _count?: true | StockMovementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StockMovementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StockMovementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StockMovementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StockMovementMaxAggregateInputType
  }

  export type GetStockMovementAggregateType<T extends StockMovementAggregateArgs> = {
        [P in keyof T & keyof AggregateStockMovement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStockMovement[P]>
      : GetScalarType<T[P], AggregateStockMovement[P]>
  }




  export type StockMovementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockMovementWhereInput
    orderBy?: StockMovementOrderByWithAggregationInput | StockMovementOrderByWithAggregationInput[]
    by: StockMovementScalarFieldEnum[] | StockMovementScalarFieldEnum
    having?: StockMovementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StockMovementCountAggregateInputType | true
    _avg?: StockMovementAvgAggregateInputType
    _sum?: StockMovementSumAggregateInputType
    _min?: StockMovementMinAggregateInputType
    _max?: StockMovementMaxAggregateInputType
  }

  export type StockMovementGroupByOutputType = {
    id: string
    businessUnitId: string
    itemId: string
    lotNumber: string
    type: string
    quantity: Decimal
    movementSource: string
    externalId: string | null
    occurredAt: Date
    createdBy: string
    createdAt: Date
    _count: StockMovementCountAggregateOutputType | null
    _avg: StockMovementAvgAggregateOutputType | null
    _sum: StockMovementSumAggregateOutputType | null
    _min: StockMovementMinAggregateOutputType | null
    _max: StockMovementMaxAggregateOutputType | null
  }

  type GetStockMovementGroupByPayload<T extends StockMovementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StockMovementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StockMovementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StockMovementGroupByOutputType[P]>
            : GetScalarType<T[P], StockMovementGroupByOutputType[P]>
        }
      >
    >


  export type StockMovementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    businessUnitId?: boolean
    itemId?: boolean
    lotNumber?: boolean
    type?: boolean
    quantity?: boolean
    movementSource?: boolean
    externalId?: boolean
    occurredAt?: boolean
    createdBy?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["stockMovement"]>


  export type StockMovementSelectScalar = {
    id?: boolean
    businessUnitId?: boolean
    itemId?: boolean
    lotNumber?: boolean
    type?: boolean
    quantity?: boolean
    movementSource?: boolean
    externalId?: boolean
    occurredAt?: boolean
    createdBy?: boolean
    createdAt?: boolean
  }


  export type $StockMovementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StockMovement"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      businessUnitId: string
      itemId: string
      lotNumber: string
      type: string
      quantity: Prisma.Decimal
      movementSource: string
      externalId: string | null
      occurredAt: Date
      createdBy: string
      createdAt: Date
    }, ExtArgs["result"]["stockMovement"]>
    composites: {}
  }

  type StockMovementGetPayload<S extends boolean | null | undefined | StockMovementDefaultArgs> = $Result.GetResult<Prisma.$StockMovementPayload, S>

  type StockMovementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StockMovementFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StockMovementCountAggregateInputType | true
    }

  export interface StockMovementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StockMovement'], meta: { name: 'StockMovement' } }
    /**
     * Find zero or one StockMovement that matches the filter.
     * @param {StockMovementFindUniqueArgs} args - Arguments to find a StockMovement
     * @example
     * // Get one StockMovement
     * const stockMovement = await prisma.stockMovement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockMovementFindUniqueArgs>(args: SelectSubset<T, StockMovementFindUniqueArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one StockMovement that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StockMovementFindUniqueOrThrowArgs} args - Arguments to find a StockMovement
     * @example
     * // Get one StockMovement
     * const stockMovement = await prisma.stockMovement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockMovementFindUniqueOrThrowArgs>(args: SelectSubset<T, StockMovementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first StockMovement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementFindFirstArgs} args - Arguments to find a StockMovement
     * @example
     * // Get one StockMovement
     * const stockMovement = await prisma.stockMovement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockMovementFindFirstArgs>(args?: SelectSubset<T, StockMovementFindFirstArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first StockMovement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementFindFirstOrThrowArgs} args - Arguments to find a StockMovement
     * @example
     * // Get one StockMovement
     * const stockMovement = await prisma.stockMovement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockMovementFindFirstOrThrowArgs>(args?: SelectSubset<T, StockMovementFindFirstOrThrowArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more StockMovements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StockMovements
     * const stockMovements = await prisma.stockMovement.findMany()
     * 
     * // Get first 10 StockMovements
     * const stockMovements = await prisma.stockMovement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stockMovementWithIdOnly = await prisma.stockMovement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StockMovementFindManyArgs>(args?: SelectSubset<T, StockMovementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a StockMovement.
     * @param {StockMovementCreateArgs} args - Arguments to create a StockMovement.
     * @example
     * // Create one StockMovement
     * const StockMovement = await prisma.stockMovement.create({
     *   data: {
     *     // ... data to create a StockMovement
     *   }
     * })
     * 
     */
    create<T extends StockMovementCreateArgs>(args: SelectSubset<T, StockMovementCreateArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many StockMovements.
     * @param {StockMovementCreateManyArgs} args - Arguments to create many StockMovements.
     * @example
     * // Create many StockMovements
     * const stockMovement = await prisma.stockMovement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StockMovementCreateManyArgs>(args?: SelectSubset<T, StockMovementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a StockMovement.
     * @param {StockMovementDeleteArgs} args - Arguments to delete one StockMovement.
     * @example
     * // Delete one StockMovement
     * const StockMovement = await prisma.stockMovement.delete({
     *   where: {
     *     // ... filter to delete one StockMovement
     *   }
     * })
     * 
     */
    delete<T extends StockMovementDeleteArgs>(args: SelectSubset<T, StockMovementDeleteArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one StockMovement.
     * @param {StockMovementUpdateArgs} args - Arguments to update one StockMovement.
     * @example
     * // Update one StockMovement
     * const stockMovement = await prisma.stockMovement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StockMovementUpdateArgs>(args: SelectSubset<T, StockMovementUpdateArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more StockMovements.
     * @param {StockMovementDeleteManyArgs} args - Arguments to filter StockMovements to delete.
     * @example
     * // Delete a few StockMovements
     * const { count } = await prisma.stockMovement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StockMovementDeleteManyArgs>(args?: SelectSubset<T, StockMovementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StockMovements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StockMovements
     * const stockMovement = await prisma.stockMovement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StockMovementUpdateManyArgs>(args: SelectSubset<T, StockMovementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one StockMovement.
     * @param {StockMovementUpsertArgs} args - Arguments to update or create a StockMovement.
     * @example
     * // Update or create a StockMovement
     * const stockMovement = await prisma.stockMovement.upsert({
     *   create: {
     *     // ... data to create a StockMovement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StockMovement we want to update
     *   }
     * })
     */
    upsert<T extends StockMovementUpsertArgs>(args: SelectSubset<T, StockMovementUpsertArgs<ExtArgs>>): Prisma__StockMovementClient<$Result.GetResult<Prisma.$StockMovementPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of StockMovements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementCountArgs} args - Arguments to filter StockMovements to count.
     * @example
     * // Count the number of StockMovements
     * const count = await prisma.stockMovement.count({
     *   where: {
     *     // ... the filter for the StockMovements we want to count
     *   }
     * })
    **/
    count<T extends StockMovementCountArgs>(
      args?: Subset<T, StockMovementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StockMovementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StockMovement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StockMovementAggregateArgs>(args: Subset<T, StockMovementAggregateArgs>): Prisma.PrismaPromise<GetStockMovementAggregateType<T>>

    /**
     * Group by StockMovement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockMovementGroupByArgs} args - Group by arguments.
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
      T extends StockMovementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StockMovementGroupByArgs['orderBy'] }
        : { orderBy?: StockMovementGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StockMovementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockMovementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StockMovement model
   */
  readonly fields: StockMovementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StockMovement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StockMovementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the StockMovement model
   */ 
  interface StockMovementFieldRefs {
    readonly id: FieldRef<"StockMovement", 'String'>
    readonly businessUnitId: FieldRef<"StockMovement", 'String'>
    readonly itemId: FieldRef<"StockMovement", 'String'>
    readonly lotNumber: FieldRef<"StockMovement", 'String'>
    readonly type: FieldRef<"StockMovement", 'String'>
    readonly quantity: FieldRef<"StockMovement", 'Decimal'>
    readonly movementSource: FieldRef<"StockMovement", 'String'>
    readonly externalId: FieldRef<"StockMovement", 'String'>
    readonly occurredAt: FieldRef<"StockMovement", 'DateTime'>
    readonly createdBy: FieldRef<"StockMovement", 'String'>
    readonly createdAt: FieldRef<"StockMovement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StockMovement findUnique
   */
  export type StockMovementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Filter, which StockMovement to fetch.
     */
    where: StockMovementWhereUniqueInput
  }

  /**
   * StockMovement findUniqueOrThrow
   */
  export type StockMovementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Filter, which StockMovement to fetch.
     */
    where: StockMovementWhereUniqueInput
  }

  /**
   * StockMovement findFirst
   */
  export type StockMovementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Filter, which StockMovement to fetch.
     */
    where?: StockMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: StockMovementOrderByWithRelationInput | StockMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockMovements.
     */
    cursor?: StockMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockMovements.
     */
    distinct?: StockMovementScalarFieldEnum | StockMovementScalarFieldEnum[]
  }

  /**
   * StockMovement findFirstOrThrow
   */
  export type StockMovementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Filter, which StockMovement to fetch.
     */
    where?: StockMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: StockMovementOrderByWithRelationInput | StockMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StockMovements.
     */
    cursor?: StockMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockMovements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StockMovements.
     */
    distinct?: StockMovementScalarFieldEnum | StockMovementScalarFieldEnum[]
  }

  /**
   * StockMovement findMany
   */
  export type StockMovementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Filter, which StockMovements to fetch.
     */
    where?: StockMovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StockMovements to fetch.
     */
    orderBy?: StockMovementOrderByWithRelationInput | StockMovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StockMovements.
     */
    cursor?: StockMovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StockMovements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StockMovements.
     */
    skip?: number
    distinct?: StockMovementScalarFieldEnum | StockMovementScalarFieldEnum[]
  }

  /**
   * StockMovement create
   */
  export type StockMovementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * The data needed to create a StockMovement.
     */
    data: XOR<StockMovementCreateInput, StockMovementUncheckedCreateInput>
  }

  /**
   * StockMovement createMany
   */
  export type StockMovementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StockMovements.
     */
    data: StockMovementCreateManyInput | StockMovementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StockMovement update
   */
  export type StockMovementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * The data needed to update a StockMovement.
     */
    data: XOR<StockMovementUpdateInput, StockMovementUncheckedUpdateInput>
    /**
     * Choose, which StockMovement to update.
     */
    where: StockMovementWhereUniqueInput
  }

  /**
   * StockMovement updateMany
   */
  export type StockMovementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StockMovements.
     */
    data: XOR<StockMovementUpdateManyMutationInput, StockMovementUncheckedUpdateManyInput>
    /**
     * Filter which StockMovements to update
     */
    where?: StockMovementWhereInput
  }

  /**
   * StockMovement upsert
   */
  export type StockMovementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * The filter to search for the StockMovement to update in case it exists.
     */
    where: StockMovementWhereUniqueInput
    /**
     * In case the StockMovement found by the `where` argument doesn't exist, create a new StockMovement with this data.
     */
    create: XOR<StockMovementCreateInput, StockMovementUncheckedCreateInput>
    /**
     * In case the StockMovement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StockMovementUpdateInput, StockMovementUncheckedUpdateInput>
  }

  /**
   * StockMovement delete
   */
  export type StockMovementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
    /**
     * Filter which StockMovement to delete.
     */
    where: StockMovementWhereUniqueInput
  }

  /**
   * StockMovement deleteMany
   */
  export type StockMovementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StockMovements to delete
     */
    where?: StockMovementWhereInput
  }

  /**
   * StockMovement without action
   */
  export type StockMovementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockMovement
     */
    select?: StockMovementSelect<ExtArgs> | null
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


  export const UnitOfMeasureScalarFieldEnum: {
    id: 'id',
    organizationId: 'organizationId',
    code: 'code',
    codeNormalized: 'codeNormalized',
    name: 'name',
    nameNormalized: 'nameNormalized',
    symbol: 'symbol',
    allowsFraction: 'allowsFraction',
    status: 'status',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    updatedBy: 'updatedBy',
    updatedAt: 'updatedAt'
  };

  export type UnitOfMeasureScalarFieldEnum = (typeof UnitOfMeasureScalarFieldEnum)[keyof typeof UnitOfMeasureScalarFieldEnum]


  export const InventoryItemScalarFieldEnum: {
    id: 'id',
    organizationId: 'organizationId',
    businessUnitId: 'businessUnitId',
    name: 'name',
    nameNormalized: 'nameNormalized',
    type: 'type',
    unitOfMeasureId: 'unitOfMeasureId',
    requiresExpiration: 'requiresExpiration',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InventoryItemScalarFieldEnum = (typeof InventoryItemScalarFieldEnum)[keyof typeof InventoryItemScalarFieldEnum]


  export const ProductItemLinkScalarFieldEnum: {
    id: 'id',
    businessUnitId: 'businessUnitId',
    productId: 'productId',
    itemId: 'itemId',
    status: 'status',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    updatedBy: 'updatedBy',
    updatedAt: 'updatedAt'
  };

  export type ProductItemLinkScalarFieldEnum = (typeof ProductItemLinkScalarFieldEnum)[keyof typeof ProductItemLinkScalarFieldEnum]


  export const StockLotScalarFieldEnum: {
    id: 'id',
    businessUnitId: 'businessUnitId',
    itemId: 'itemId',
    lotNumber: 'lotNumber',
    expiresAt: 'expiresAt',
    quantityAvailable: 'quantityAvailable',
    firstEntryAt: 'firstEntryAt'
  };

  export type StockLotScalarFieldEnum = (typeof StockLotScalarFieldEnum)[keyof typeof StockLotScalarFieldEnum]


  export const StockMovementScalarFieldEnum: {
    id: 'id',
    businessUnitId: 'businessUnitId',
    itemId: 'itemId',
    lotNumber: 'lotNumber',
    type: 'type',
    quantity: 'quantity',
    movementSource: 'movementSource',
    externalId: 'externalId',
    occurredAt: 'occurredAt',
    createdBy: 'createdBy',
    createdAt: 'createdAt'
  };

  export type StockMovementScalarFieldEnum = (typeof StockMovementScalarFieldEnum)[keyof typeof StockMovementScalarFieldEnum]


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
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type UnitOfMeasureWhereInput = {
    AND?: UnitOfMeasureWhereInput | UnitOfMeasureWhereInput[]
    OR?: UnitOfMeasureWhereInput[]
    NOT?: UnitOfMeasureWhereInput | UnitOfMeasureWhereInput[]
    id?: StringFilter<"UnitOfMeasure"> | string
    organizationId?: StringFilter<"UnitOfMeasure"> | string
    code?: StringFilter<"UnitOfMeasure"> | string
    codeNormalized?: StringFilter<"UnitOfMeasure"> | string
    name?: StringFilter<"UnitOfMeasure"> | string
    nameNormalized?: StringFilter<"UnitOfMeasure"> | string
    symbol?: StringFilter<"UnitOfMeasure"> | string
    allowsFraction?: BoolFilter<"UnitOfMeasure"> | boolean
    status?: StringFilter<"UnitOfMeasure"> | string
    createdBy?: StringFilter<"UnitOfMeasure"> | string
    createdAt?: DateTimeFilter<"UnitOfMeasure"> | Date | string
    updatedBy?: StringNullableFilter<"UnitOfMeasure"> | string | null
    updatedAt?: DateTimeNullableFilter<"UnitOfMeasure"> | Date | string | null
    inventoryItems?: InventoryItemListRelationFilter
  }

  export type UnitOfMeasureOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    code?: SortOrder
    codeNormalized?: SortOrder
    name?: SortOrder
    nameNormalized?: SortOrder
    symbol?: SortOrder
    allowsFraction?: SortOrder
    status?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    inventoryItems?: InventoryItemOrderByRelationAggregateInput
  }

  export type UnitOfMeasureWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    organizationId_codeNormalized?: UnitOfMeasureOrganizationIdCodeNormalizedCompoundUniqueInput
    organizationId_nameNormalized?: UnitOfMeasureOrganizationIdNameNormalizedCompoundUniqueInput
    AND?: UnitOfMeasureWhereInput | UnitOfMeasureWhereInput[]
    OR?: UnitOfMeasureWhereInput[]
    NOT?: UnitOfMeasureWhereInput | UnitOfMeasureWhereInput[]
    organizationId?: StringFilter<"UnitOfMeasure"> | string
    code?: StringFilter<"UnitOfMeasure"> | string
    codeNormalized?: StringFilter<"UnitOfMeasure"> | string
    name?: StringFilter<"UnitOfMeasure"> | string
    nameNormalized?: StringFilter<"UnitOfMeasure"> | string
    symbol?: StringFilter<"UnitOfMeasure"> | string
    allowsFraction?: BoolFilter<"UnitOfMeasure"> | boolean
    status?: StringFilter<"UnitOfMeasure"> | string
    createdBy?: StringFilter<"UnitOfMeasure"> | string
    createdAt?: DateTimeFilter<"UnitOfMeasure"> | Date | string
    updatedBy?: StringNullableFilter<"UnitOfMeasure"> | string | null
    updatedAt?: DateTimeNullableFilter<"UnitOfMeasure"> | Date | string | null
    inventoryItems?: InventoryItemListRelationFilter
  }, "id" | "organizationId_codeNormalized" | "organizationId_nameNormalized">

  export type UnitOfMeasureOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    code?: SortOrder
    codeNormalized?: SortOrder
    name?: SortOrder
    nameNormalized?: SortOrder
    symbol?: SortOrder
    allowsFraction?: SortOrder
    status?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: UnitOfMeasureCountOrderByAggregateInput
    _max?: UnitOfMeasureMaxOrderByAggregateInput
    _min?: UnitOfMeasureMinOrderByAggregateInput
  }

  export type UnitOfMeasureScalarWhereWithAggregatesInput = {
    AND?: UnitOfMeasureScalarWhereWithAggregatesInput | UnitOfMeasureScalarWhereWithAggregatesInput[]
    OR?: UnitOfMeasureScalarWhereWithAggregatesInput[]
    NOT?: UnitOfMeasureScalarWhereWithAggregatesInput | UnitOfMeasureScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UnitOfMeasure"> | string
    organizationId?: StringWithAggregatesFilter<"UnitOfMeasure"> | string
    code?: StringWithAggregatesFilter<"UnitOfMeasure"> | string
    codeNormalized?: StringWithAggregatesFilter<"UnitOfMeasure"> | string
    name?: StringWithAggregatesFilter<"UnitOfMeasure"> | string
    nameNormalized?: StringWithAggregatesFilter<"UnitOfMeasure"> | string
    symbol?: StringWithAggregatesFilter<"UnitOfMeasure"> | string
    allowsFraction?: BoolWithAggregatesFilter<"UnitOfMeasure"> | boolean
    status?: StringWithAggregatesFilter<"UnitOfMeasure"> | string
    createdBy?: StringWithAggregatesFilter<"UnitOfMeasure"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UnitOfMeasure"> | Date | string
    updatedBy?: StringNullableWithAggregatesFilter<"UnitOfMeasure"> | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"UnitOfMeasure"> | Date | string | null
  }

  export type InventoryItemWhereInput = {
    AND?: InventoryItemWhereInput | InventoryItemWhereInput[]
    OR?: InventoryItemWhereInput[]
    NOT?: InventoryItemWhereInput | InventoryItemWhereInput[]
    id?: StringFilter<"InventoryItem"> | string
    organizationId?: StringFilter<"InventoryItem"> | string
    businessUnitId?: StringFilter<"InventoryItem"> | string
    name?: StringFilter<"InventoryItem"> | string
    nameNormalized?: StringFilter<"InventoryItem"> | string
    type?: StringFilter<"InventoryItem"> | string
    unitOfMeasureId?: StringFilter<"InventoryItem"> | string
    requiresExpiration?: BoolFilter<"InventoryItem"> | boolean
    createdBy?: StringFilter<"InventoryItem"> | string
    createdAt?: DateTimeFilter<"InventoryItem"> | Date | string
    updatedAt?: DateTimeNullableFilter<"InventoryItem"> | Date | string | null
    unitOfMeasure?: XOR<UnitOfMeasureRelationFilter, UnitOfMeasureWhereInput>
  }

  export type InventoryItemOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    businessUnitId?: SortOrder
    name?: SortOrder
    nameNormalized?: SortOrder
    type?: SortOrder
    unitOfMeasureId?: SortOrder
    requiresExpiration?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    unitOfMeasure?: UnitOfMeasureOrderByWithRelationInput
  }

  export type InventoryItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    businessUnitId_nameNormalized?: InventoryItemBusinessUnitIdNameNormalizedCompoundUniqueInput
    AND?: InventoryItemWhereInput | InventoryItemWhereInput[]
    OR?: InventoryItemWhereInput[]
    NOT?: InventoryItemWhereInput | InventoryItemWhereInput[]
    organizationId?: StringFilter<"InventoryItem"> | string
    businessUnitId?: StringFilter<"InventoryItem"> | string
    name?: StringFilter<"InventoryItem"> | string
    nameNormalized?: StringFilter<"InventoryItem"> | string
    type?: StringFilter<"InventoryItem"> | string
    unitOfMeasureId?: StringFilter<"InventoryItem"> | string
    requiresExpiration?: BoolFilter<"InventoryItem"> | boolean
    createdBy?: StringFilter<"InventoryItem"> | string
    createdAt?: DateTimeFilter<"InventoryItem"> | Date | string
    updatedAt?: DateTimeNullableFilter<"InventoryItem"> | Date | string | null
    unitOfMeasure?: XOR<UnitOfMeasureRelationFilter, UnitOfMeasureWhereInput>
  }, "id" | "businessUnitId_nameNormalized">

  export type InventoryItemOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    businessUnitId?: SortOrder
    name?: SortOrder
    nameNormalized?: SortOrder
    type?: SortOrder
    unitOfMeasureId?: SortOrder
    requiresExpiration?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: InventoryItemCountOrderByAggregateInput
    _max?: InventoryItemMaxOrderByAggregateInput
    _min?: InventoryItemMinOrderByAggregateInput
  }

  export type InventoryItemScalarWhereWithAggregatesInput = {
    AND?: InventoryItemScalarWhereWithAggregatesInput | InventoryItemScalarWhereWithAggregatesInput[]
    OR?: InventoryItemScalarWhereWithAggregatesInput[]
    NOT?: InventoryItemScalarWhereWithAggregatesInput | InventoryItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InventoryItem"> | string
    organizationId?: StringWithAggregatesFilter<"InventoryItem"> | string
    businessUnitId?: StringWithAggregatesFilter<"InventoryItem"> | string
    name?: StringWithAggregatesFilter<"InventoryItem"> | string
    nameNormalized?: StringWithAggregatesFilter<"InventoryItem"> | string
    type?: StringWithAggregatesFilter<"InventoryItem"> | string
    unitOfMeasureId?: StringWithAggregatesFilter<"InventoryItem"> | string
    requiresExpiration?: BoolWithAggregatesFilter<"InventoryItem"> | boolean
    createdBy?: StringWithAggregatesFilter<"InventoryItem"> | string
    createdAt?: DateTimeWithAggregatesFilter<"InventoryItem"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"InventoryItem"> | Date | string | null
  }

  export type ProductItemLinkWhereInput = {
    AND?: ProductItemLinkWhereInput | ProductItemLinkWhereInput[]
    OR?: ProductItemLinkWhereInput[]
    NOT?: ProductItemLinkWhereInput | ProductItemLinkWhereInput[]
    id?: StringFilter<"ProductItemLink"> | string
    businessUnitId?: StringFilter<"ProductItemLink"> | string
    productId?: StringFilter<"ProductItemLink"> | string
    itemId?: StringFilter<"ProductItemLink"> | string
    status?: StringFilter<"ProductItemLink"> | string
    createdBy?: StringFilter<"ProductItemLink"> | string
    createdAt?: DateTimeFilter<"ProductItemLink"> | Date | string
    updatedBy?: StringNullableFilter<"ProductItemLink"> | string | null
    updatedAt?: DateTimeNullableFilter<"ProductItemLink"> | Date | string | null
  }

  export type ProductItemLinkOrderByWithRelationInput = {
    id?: SortOrder
    businessUnitId?: SortOrder
    productId?: SortOrder
    itemId?: SortOrder
    status?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
  }

  export type ProductItemLinkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    businessUnitId_productId?: ProductItemLinkBusinessUnitIdProductIdCompoundUniqueInput
    businessUnitId_itemId?: ProductItemLinkBusinessUnitIdItemIdCompoundUniqueInput
    AND?: ProductItemLinkWhereInput | ProductItemLinkWhereInput[]
    OR?: ProductItemLinkWhereInput[]
    NOT?: ProductItemLinkWhereInput | ProductItemLinkWhereInput[]
    businessUnitId?: StringFilter<"ProductItemLink"> | string
    productId?: StringFilter<"ProductItemLink"> | string
    itemId?: StringFilter<"ProductItemLink"> | string
    status?: StringFilter<"ProductItemLink"> | string
    createdBy?: StringFilter<"ProductItemLink"> | string
    createdAt?: DateTimeFilter<"ProductItemLink"> | Date | string
    updatedBy?: StringNullableFilter<"ProductItemLink"> | string | null
    updatedAt?: DateTimeNullableFilter<"ProductItemLink"> | Date | string | null
  }, "id" | "businessUnitId_productId" | "businessUnitId_itemId">

  export type ProductItemLinkOrderByWithAggregationInput = {
    id?: SortOrder
    businessUnitId?: SortOrder
    productId?: SortOrder
    itemId?: SortOrder
    status?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: ProductItemLinkCountOrderByAggregateInput
    _max?: ProductItemLinkMaxOrderByAggregateInput
    _min?: ProductItemLinkMinOrderByAggregateInput
  }

  export type ProductItemLinkScalarWhereWithAggregatesInput = {
    AND?: ProductItemLinkScalarWhereWithAggregatesInput | ProductItemLinkScalarWhereWithAggregatesInput[]
    OR?: ProductItemLinkScalarWhereWithAggregatesInput[]
    NOT?: ProductItemLinkScalarWhereWithAggregatesInput | ProductItemLinkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProductItemLink"> | string
    businessUnitId?: StringWithAggregatesFilter<"ProductItemLink"> | string
    productId?: StringWithAggregatesFilter<"ProductItemLink"> | string
    itemId?: StringWithAggregatesFilter<"ProductItemLink"> | string
    status?: StringWithAggregatesFilter<"ProductItemLink"> | string
    createdBy?: StringWithAggregatesFilter<"ProductItemLink"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ProductItemLink"> | Date | string
    updatedBy?: StringNullableWithAggregatesFilter<"ProductItemLink"> | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"ProductItemLink"> | Date | string | null
  }

  export type StockLotWhereInput = {
    AND?: StockLotWhereInput | StockLotWhereInput[]
    OR?: StockLotWhereInput[]
    NOT?: StockLotWhereInput | StockLotWhereInput[]
    id?: StringFilter<"StockLot"> | string
    businessUnitId?: StringFilter<"StockLot"> | string
    itemId?: StringFilter<"StockLot"> | string
    lotNumber?: StringFilter<"StockLot"> | string
    expiresAt?: DateTimeNullableFilter<"StockLot"> | Date | string | null
    quantityAvailable?: DecimalFilter<"StockLot"> | Decimal | DecimalJsLike | number | string
    firstEntryAt?: DateTimeFilter<"StockLot"> | Date | string
  }

  export type StockLotOrderByWithRelationInput = {
    id?: SortOrder
    businessUnitId?: SortOrder
    itemId?: SortOrder
    lotNumber?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    quantityAvailable?: SortOrder
    firstEntryAt?: SortOrder
  }

  export type StockLotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    businessUnitId_lotNumber?: StockLotBusinessUnitIdLotNumberCompoundUniqueInput
    AND?: StockLotWhereInput | StockLotWhereInput[]
    OR?: StockLotWhereInput[]
    NOT?: StockLotWhereInput | StockLotWhereInput[]
    businessUnitId?: StringFilter<"StockLot"> | string
    itemId?: StringFilter<"StockLot"> | string
    lotNumber?: StringFilter<"StockLot"> | string
    expiresAt?: DateTimeNullableFilter<"StockLot"> | Date | string | null
    quantityAvailable?: DecimalFilter<"StockLot"> | Decimal | DecimalJsLike | number | string
    firstEntryAt?: DateTimeFilter<"StockLot"> | Date | string
  }, "id" | "businessUnitId_lotNumber">

  export type StockLotOrderByWithAggregationInput = {
    id?: SortOrder
    businessUnitId?: SortOrder
    itemId?: SortOrder
    lotNumber?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    quantityAvailable?: SortOrder
    firstEntryAt?: SortOrder
    _count?: StockLotCountOrderByAggregateInput
    _avg?: StockLotAvgOrderByAggregateInput
    _max?: StockLotMaxOrderByAggregateInput
    _min?: StockLotMinOrderByAggregateInput
    _sum?: StockLotSumOrderByAggregateInput
  }

  export type StockLotScalarWhereWithAggregatesInput = {
    AND?: StockLotScalarWhereWithAggregatesInput | StockLotScalarWhereWithAggregatesInput[]
    OR?: StockLotScalarWhereWithAggregatesInput[]
    NOT?: StockLotScalarWhereWithAggregatesInput | StockLotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StockLot"> | string
    businessUnitId?: StringWithAggregatesFilter<"StockLot"> | string
    itemId?: StringWithAggregatesFilter<"StockLot"> | string
    lotNumber?: StringWithAggregatesFilter<"StockLot"> | string
    expiresAt?: DateTimeNullableWithAggregatesFilter<"StockLot"> | Date | string | null
    quantityAvailable?: DecimalWithAggregatesFilter<"StockLot"> | Decimal | DecimalJsLike | number | string
    firstEntryAt?: DateTimeWithAggregatesFilter<"StockLot"> | Date | string
  }

  export type StockMovementWhereInput = {
    AND?: StockMovementWhereInput | StockMovementWhereInput[]
    OR?: StockMovementWhereInput[]
    NOT?: StockMovementWhereInput | StockMovementWhereInput[]
    id?: StringFilter<"StockMovement"> | string
    businessUnitId?: StringFilter<"StockMovement"> | string
    itemId?: StringFilter<"StockMovement"> | string
    lotNumber?: StringFilter<"StockMovement"> | string
    type?: StringFilter<"StockMovement"> | string
    quantity?: DecimalFilter<"StockMovement"> | Decimal | DecimalJsLike | number | string
    movementSource?: StringFilter<"StockMovement"> | string
    externalId?: StringNullableFilter<"StockMovement"> | string | null
    occurredAt?: DateTimeFilter<"StockMovement"> | Date | string
    createdBy?: StringFilter<"StockMovement"> | string
    createdAt?: DateTimeFilter<"StockMovement"> | Date | string
  }

  export type StockMovementOrderByWithRelationInput = {
    id?: SortOrder
    businessUnitId?: SortOrder
    itemId?: SortOrder
    lotNumber?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    movementSource?: SortOrder
    externalId?: SortOrderInput | SortOrder
    occurredAt?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type StockMovementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StockMovementWhereInput | StockMovementWhereInput[]
    OR?: StockMovementWhereInput[]
    NOT?: StockMovementWhereInput | StockMovementWhereInput[]
    businessUnitId?: StringFilter<"StockMovement"> | string
    itemId?: StringFilter<"StockMovement"> | string
    lotNumber?: StringFilter<"StockMovement"> | string
    type?: StringFilter<"StockMovement"> | string
    quantity?: DecimalFilter<"StockMovement"> | Decimal | DecimalJsLike | number | string
    movementSource?: StringFilter<"StockMovement"> | string
    externalId?: StringNullableFilter<"StockMovement"> | string | null
    occurredAt?: DateTimeFilter<"StockMovement"> | Date | string
    createdBy?: StringFilter<"StockMovement"> | string
    createdAt?: DateTimeFilter<"StockMovement"> | Date | string
  }, "id">

  export type StockMovementOrderByWithAggregationInput = {
    id?: SortOrder
    businessUnitId?: SortOrder
    itemId?: SortOrder
    lotNumber?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    movementSource?: SortOrder
    externalId?: SortOrderInput | SortOrder
    occurredAt?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    _count?: StockMovementCountOrderByAggregateInput
    _avg?: StockMovementAvgOrderByAggregateInput
    _max?: StockMovementMaxOrderByAggregateInput
    _min?: StockMovementMinOrderByAggregateInput
    _sum?: StockMovementSumOrderByAggregateInput
  }

  export type StockMovementScalarWhereWithAggregatesInput = {
    AND?: StockMovementScalarWhereWithAggregatesInput | StockMovementScalarWhereWithAggregatesInput[]
    OR?: StockMovementScalarWhereWithAggregatesInput[]
    NOT?: StockMovementScalarWhereWithAggregatesInput | StockMovementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StockMovement"> | string
    businessUnitId?: StringWithAggregatesFilter<"StockMovement"> | string
    itemId?: StringWithAggregatesFilter<"StockMovement"> | string
    lotNumber?: StringWithAggregatesFilter<"StockMovement"> | string
    type?: StringWithAggregatesFilter<"StockMovement"> | string
    quantity?: DecimalWithAggregatesFilter<"StockMovement"> | Decimal | DecimalJsLike | number | string
    movementSource?: StringWithAggregatesFilter<"StockMovement"> | string
    externalId?: StringNullableWithAggregatesFilter<"StockMovement"> | string | null
    occurredAt?: DateTimeWithAggregatesFilter<"StockMovement"> | Date | string
    createdBy?: StringWithAggregatesFilter<"StockMovement"> | string
    createdAt?: DateTimeWithAggregatesFilter<"StockMovement"> | Date | string
  }

  export type UnitOfMeasureCreateInput = {
    id?: string
    organizationId: string
    code: string
    codeNormalized: string
    name: string
    nameNormalized: string
    symbol: string
    allowsFraction: boolean
    status: string
    createdBy: string
    createdAt?: Date | string
    updatedBy?: string | null
    updatedAt?: Date | string | null
    inventoryItems?: InventoryItemCreateNestedManyWithoutUnitOfMeasureInput
  }

  export type UnitOfMeasureUncheckedCreateInput = {
    id?: string
    organizationId: string
    code: string
    codeNormalized: string
    name: string
    nameNormalized: string
    symbol: string
    allowsFraction: boolean
    status: string
    createdBy: string
    createdAt?: Date | string
    updatedBy?: string | null
    updatedAt?: Date | string | null
    inventoryItems?: InventoryItemUncheckedCreateNestedManyWithoutUnitOfMeasureInput
  }

  export type UnitOfMeasureUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    codeNormalized?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameNormalized?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    allowsFraction?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inventoryItems?: InventoryItemUpdateManyWithoutUnitOfMeasureNestedInput
  }

  export type UnitOfMeasureUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    codeNormalized?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameNormalized?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    allowsFraction?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    inventoryItems?: InventoryItemUncheckedUpdateManyWithoutUnitOfMeasureNestedInput
  }

  export type UnitOfMeasureCreateManyInput = {
    id?: string
    organizationId: string
    code: string
    codeNormalized: string
    name: string
    nameNormalized: string
    symbol: string
    allowsFraction: boolean
    status: string
    createdBy: string
    createdAt?: Date | string
    updatedBy?: string | null
    updatedAt?: Date | string | null
  }

  export type UnitOfMeasureUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    codeNormalized?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameNormalized?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    allowsFraction?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UnitOfMeasureUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    codeNormalized?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameNormalized?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    allowsFraction?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InventoryItemCreateInput = {
    id?: string
    organizationId: string
    businessUnitId: string
    name: string
    nameNormalized: string
    type: string
    requiresExpiration: boolean
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    unitOfMeasure: UnitOfMeasureCreateNestedOneWithoutInventoryItemsInput
  }

  export type InventoryItemUncheckedCreateInput = {
    id?: string
    organizationId: string
    businessUnitId: string
    name: string
    nameNormalized: string
    type: string
    unitOfMeasureId: string
    requiresExpiration: boolean
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type InventoryItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameNormalized?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    requiresExpiration?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    unitOfMeasure?: UnitOfMeasureUpdateOneRequiredWithoutInventoryItemsNestedInput
  }

  export type InventoryItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameNormalized?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    unitOfMeasureId?: StringFieldUpdateOperationsInput | string
    requiresExpiration?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InventoryItemCreateManyInput = {
    id?: string
    organizationId: string
    businessUnitId: string
    name: string
    nameNormalized: string
    type: string
    unitOfMeasureId: string
    requiresExpiration: boolean
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type InventoryItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameNormalized?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    requiresExpiration?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InventoryItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameNormalized?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    unitOfMeasureId?: StringFieldUpdateOperationsInput | string
    requiresExpiration?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProductItemLinkCreateInput = {
    id?: string
    businessUnitId: string
    productId: string
    itemId: string
    status: string
    createdBy: string
    createdAt?: Date | string
    updatedBy?: string | null
    updatedAt?: Date | string | null
  }

  export type ProductItemLinkUncheckedCreateInput = {
    id?: string
    businessUnitId: string
    productId: string
    itemId: string
    status: string
    createdBy: string
    createdAt?: Date | string
    updatedBy?: string | null
    updatedAt?: Date | string | null
  }

  export type ProductItemLinkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProductItemLinkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProductItemLinkCreateManyInput = {
    id?: string
    businessUnitId: string
    productId: string
    itemId: string
    status: string
    createdBy: string
    createdAt?: Date | string
    updatedBy?: string | null
    updatedAt?: Date | string | null
  }

  export type ProductItemLinkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProductItemLinkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StockLotCreateInput = {
    id?: string
    businessUnitId: string
    itemId: string
    lotNumber: string
    expiresAt?: Date | string | null
    quantityAvailable: Decimal | DecimalJsLike | number | string
    firstEntryAt: Date | string
  }

  export type StockLotUncheckedCreateInput = {
    id?: string
    businessUnitId: string
    itemId: string
    lotNumber: string
    expiresAt?: Date | string | null
    quantityAvailable: Decimal | DecimalJsLike | number | string
    firstEntryAt: Date | string
  }

  export type StockLotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    lotNumber?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quantityAvailable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    firstEntryAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockLotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    lotNumber?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quantityAvailable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    firstEntryAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockLotCreateManyInput = {
    id?: string
    businessUnitId: string
    itemId: string
    lotNumber: string
    expiresAt?: Date | string | null
    quantityAvailable: Decimal | DecimalJsLike | number | string
    firstEntryAt: Date | string
  }

  export type StockLotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    lotNumber?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quantityAvailable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    firstEntryAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockLotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    lotNumber?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quantityAvailable?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    firstEntryAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementCreateInput = {
    id?: string
    businessUnitId: string
    itemId: string
    lotNumber: string
    type: string
    quantity: Decimal | DecimalJsLike | number | string
    movementSource: string
    externalId?: string | null
    occurredAt: Date | string
    createdBy: string
    createdAt?: Date | string
  }

  export type StockMovementUncheckedCreateInput = {
    id?: string
    businessUnitId: string
    itemId: string
    lotNumber: string
    type: string
    quantity: Decimal | DecimalJsLike | number | string
    movementSource: string
    externalId?: string | null
    occurredAt: Date | string
    createdBy: string
    createdAt?: Date | string
  }

  export type StockMovementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    lotNumber?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    movementSource?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    lotNumber?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    movementSource?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementCreateManyInput = {
    id?: string
    businessUnitId: string
    itemId: string
    lotNumber: string
    type: string
    quantity: Decimal | DecimalJsLike | number | string
    movementSource: string
    externalId?: string | null
    occurredAt: Date | string
    createdBy: string
    createdAt?: Date | string
  }

  export type StockMovementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    lotNumber?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    movementSource?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockMovementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    lotNumber?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    movementSource?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type InventoryItemListRelationFilter = {
    every?: InventoryItemWhereInput
    some?: InventoryItemWhereInput
    none?: InventoryItemWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type InventoryItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UnitOfMeasureOrganizationIdCodeNormalizedCompoundUniqueInput = {
    organizationId: string
    codeNormalized: string
  }

  export type UnitOfMeasureOrganizationIdNameNormalizedCompoundUniqueInput = {
    organizationId: string
    nameNormalized: string
  }

  export type UnitOfMeasureCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    code?: SortOrder
    codeNormalized?: SortOrder
    name?: SortOrder
    nameNormalized?: SortOrder
    symbol?: SortOrder
    allowsFraction?: SortOrder
    status?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
  }

  export type UnitOfMeasureMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    code?: SortOrder
    codeNormalized?: SortOrder
    name?: SortOrder
    nameNormalized?: SortOrder
    symbol?: SortOrder
    allowsFraction?: SortOrder
    status?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
  }

  export type UnitOfMeasureMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    code?: SortOrder
    codeNormalized?: SortOrder
    name?: SortOrder
    nameNormalized?: SortOrder
    symbol?: SortOrder
    allowsFraction?: SortOrder
    status?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedBy?: SortOrder
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

  export type UnitOfMeasureRelationFilter = {
    is?: UnitOfMeasureWhereInput
    isNot?: UnitOfMeasureWhereInput
  }

  export type InventoryItemBusinessUnitIdNameNormalizedCompoundUniqueInput = {
    businessUnitId: string
    nameNormalized: string
  }

  export type InventoryItemCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    businessUnitId?: SortOrder
    name?: SortOrder
    nameNormalized?: SortOrder
    type?: SortOrder
    unitOfMeasureId?: SortOrder
    requiresExpiration?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InventoryItemMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    businessUnitId?: SortOrder
    name?: SortOrder
    nameNormalized?: SortOrder
    type?: SortOrder
    unitOfMeasureId?: SortOrder
    requiresExpiration?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InventoryItemMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    businessUnitId?: SortOrder
    name?: SortOrder
    nameNormalized?: SortOrder
    type?: SortOrder
    unitOfMeasureId?: SortOrder
    requiresExpiration?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductItemLinkBusinessUnitIdProductIdCompoundUniqueInput = {
    businessUnitId: string
    productId: string
  }

  export type ProductItemLinkBusinessUnitIdItemIdCompoundUniqueInput = {
    businessUnitId: string
    itemId: string
  }

  export type ProductItemLinkCountOrderByAggregateInput = {
    id?: SortOrder
    businessUnitId?: SortOrder
    productId?: SortOrder
    itemId?: SortOrder
    status?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductItemLinkMaxOrderByAggregateInput = {
    id?: SortOrder
    businessUnitId?: SortOrder
    productId?: SortOrder
    itemId?: SortOrder
    status?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductItemLinkMinOrderByAggregateInput = {
    id?: SortOrder
    businessUnitId?: SortOrder
    productId?: SortOrder
    itemId?: SortOrder
    status?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type StockLotBusinessUnitIdLotNumberCompoundUniqueInput = {
    businessUnitId: string
    lotNumber: string
  }

  export type StockLotCountOrderByAggregateInput = {
    id?: SortOrder
    businessUnitId?: SortOrder
    itemId?: SortOrder
    lotNumber?: SortOrder
    expiresAt?: SortOrder
    quantityAvailable?: SortOrder
    firstEntryAt?: SortOrder
  }

  export type StockLotAvgOrderByAggregateInput = {
    quantityAvailable?: SortOrder
  }

  export type StockLotMaxOrderByAggregateInput = {
    id?: SortOrder
    businessUnitId?: SortOrder
    itemId?: SortOrder
    lotNumber?: SortOrder
    expiresAt?: SortOrder
    quantityAvailable?: SortOrder
    firstEntryAt?: SortOrder
  }

  export type StockLotMinOrderByAggregateInput = {
    id?: SortOrder
    businessUnitId?: SortOrder
    itemId?: SortOrder
    lotNumber?: SortOrder
    expiresAt?: SortOrder
    quantityAvailable?: SortOrder
    firstEntryAt?: SortOrder
  }

  export type StockLotSumOrderByAggregateInput = {
    quantityAvailable?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type StockMovementCountOrderByAggregateInput = {
    id?: SortOrder
    businessUnitId?: SortOrder
    itemId?: SortOrder
    lotNumber?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    movementSource?: SortOrder
    externalId?: SortOrder
    occurredAt?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type StockMovementAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type StockMovementMaxOrderByAggregateInput = {
    id?: SortOrder
    businessUnitId?: SortOrder
    itemId?: SortOrder
    lotNumber?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    movementSource?: SortOrder
    externalId?: SortOrder
    occurredAt?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type StockMovementMinOrderByAggregateInput = {
    id?: SortOrder
    businessUnitId?: SortOrder
    itemId?: SortOrder
    lotNumber?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    movementSource?: SortOrder
    externalId?: SortOrder
    occurredAt?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type StockMovementSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type InventoryItemCreateNestedManyWithoutUnitOfMeasureInput = {
    create?: XOR<InventoryItemCreateWithoutUnitOfMeasureInput, InventoryItemUncheckedCreateWithoutUnitOfMeasureInput> | InventoryItemCreateWithoutUnitOfMeasureInput[] | InventoryItemUncheckedCreateWithoutUnitOfMeasureInput[]
    connectOrCreate?: InventoryItemCreateOrConnectWithoutUnitOfMeasureInput | InventoryItemCreateOrConnectWithoutUnitOfMeasureInput[]
    createMany?: InventoryItemCreateManyUnitOfMeasureInputEnvelope
    connect?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
  }

  export type InventoryItemUncheckedCreateNestedManyWithoutUnitOfMeasureInput = {
    create?: XOR<InventoryItemCreateWithoutUnitOfMeasureInput, InventoryItemUncheckedCreateWithoutUnitOfMeasureInput> | InventoryItemCreateWithoutUnitOfMeasureInput[] | InventoryItemUncheckedCreateWithoutUnitOfMeasureInput[]
    connectOrCreate?: InventoryItemCreateOrConnectWithoutUnitOfMeasureInput | InventoryItemCreateOrConnectWithoutUnitOfMeasureInput[]
    createMany?: InventoryItemCreateManyUnitOfMeasureInputEnvelope
    connect?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
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

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type InventoryItemUpdateManyWithoutUnitOfMeasureNestedInput = {
    create?: XOR<InventoryItemCreateWithoutUnitOfMeasureInput, InventoryItemUncheckedCreateWithoutUnitOfMeasureInput> | InventoryItemCreateWithoutUnitOfMeasureInput[] | InventoryItemUncheckedCreateWithoutUnitOfMeasureInput[]
    connectOrCreate?: InventoryItemCreateOrConnectWithoutUnitOfMeasureInput | InventoryItemCreateOrConnectWithoutUnitOfMeasureInput[]
    upsert?: InventoryItemUpsertWithWhereUniqueWithoutUnitOfMeasureInput | InventoryItemUpsertWithWhereUniqueWithoutUnitOfMeasureInput[]
    createMany?: InventoryItemCreateManyUnitOfMeasureInputEnvelope
    set?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
    disconnect?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
    delete?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
    connect?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
    update?: InventoryItemUpdateWithWhereUniqueWithoutUnitOfMeasureInput | InventoryItemUpdateWithWhereUniqueWithoutUnitOfMeasureInput[]
    updateMany?: InventoryItemUpdateManyWithWhereWithoutUnitOfMeasureInput | InventoryItemUpdateManyWithWhereWithoutUnitOfMeasureInput[]
    deleteMany?: InventoryItemScalarWhereInput | InventoryItemScalarWhereInput[]
  }

  export type InventoryItemUncheckedUpdateManyWithoutUnitOfMeasureNestedInput = {
    create?: XOR<InventoryItemCreateWithoutUnitOfMeasureInput, InventoryItemUncheckedCreateWithoutUnitOfMeasureInput> | InventoryItemCreateWithoutUnitOfMeasureInput[] | InventoryItemUncheckedCreateWithoutUnitOfMeasureInput[]
    connectOrCreate?: InventoryItemCreateOrConnectWithoutUnitOfMeasureInput | InventoryItemCreateOrConnectWithoutUnitOfMeasureInput[]
    upsert?: InventoryItemUpsertWithWhereUniqueWithoutUnitOfMeasureInput | InventoryItemUpsertWithWhereUniqueWithoutUnitOfMeasureInput[]
    createMany?: InventoryItemCreateManyUnitOfMeasureInputEnvelope
    set?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
    disconnect?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
    delete?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
    connect?: InventoryItemWhereUniqueInput | InventoryItemWhereUniqueInput[]
    update?: InventoryItemUpdateWithWhereUniqueWithoutUnitOfMeasureInput | InventoryItemUpdateWithWhereUniqueWithoutUnitOfMeasureInput[]
    updateMany?: InventoryItemUpdateManyWithWhereWithoutUnitOfMeasureInput | InventoryItemUpdateManyWithWhereWithoutUnitOfMeasureInput[]
    deleteMany?: InventoryItemScalarWhereInput | InventoryItemScalarWhereInput[]
  }

  export type UnitOfMeasureCreateNestedOneWithoutInventoryItemsInput = {
    create?: XOR<UnitOfMeasureCreateWithoutInventoryItemsInput, UnitOfMeasureUncheckedCreateWithoutInventoryItemsInput>
    connectOrCreate?: UnitOfMeasureCreateOrConnectWithoutInventoryItemsInput
    connect?: UnitOfMeasureWhereUniqueInput
  }

  export type UnitOfMeasureUpdateOneRequiredWithoutInventoryItemsNestedInput = {
    create?: XOR<UnitOfMeasureCreateWithoutInventoryItemsInput, UnitOfMeasureUncheckedCreateWithoutInventoryItemsInput>
    connectOrCreate?: UnitOfMeasureCreateOrConnectWithoutInventoryItemsInput
    upsert?: UnitOfMeasureUpsertWithoutInventoryItemsInput
    connect?: UnitOfMeasureWhereUniqueInput
    update?: XOR<XOR<UnitOfMeasureUpdateToOneWithWhereWithoutInventoryItemsInput, UnitOfMeasureUpdateWithoutInventoryItemsInput>, UnitOfMeasureUncheckedUpdateWithoutInventoryItemsInput>
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
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

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type InventoryItemCreateWithoutUnitOfMeasureInput = {
    id?: string
    organizationId: string
    businessUnitId: string
    name: string
    nameNormalized: string
    type: string
    requiresExpiration: boolean
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type InventoryItemUncheckedCreateWithoutUnitOfMeasureInput = {
    id?: string
    organizationId: string
    businessUnitId: string
    name: string
    nameNormalized: string
    type: string
    requiresExpiration: boolean
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type InventoryItemCreateOrConnectWithoutUnitOfMeasureInput = {
    where: InventoryItemWhereUniqueInput
    create: XOR<InventoryItemCreateWithoutUnitOfMeasureInput, InventoryItemUncheckedCreateWithoutUnitOfMeasureInput>
  }

  export type InventoryItemCreateManyUnitOfMeasureInputEnvelope = {
    data: InventoryItemCreateManyUnitOfMeasureInput | InventoryItemCreateManyUnitOfMeasureInput[]
    skipDuplicates?: boolean
  }

  export type InventoryItemUpsertWithWhereUniqueWithoutUnitOfMeasureInput = {
    where: InventoryItemWhereUniqueInput
    update: XOR<InventoryItemUpdateWithoutUnitOfMeasureInput, InventoryItemUncheckedUpdateWithoutUnitOfMeasureInput>
    create: XOR<InventoryItemCreateWithoutUnitOfMeasureInput, InventoryItemUncheckedCreateWithoutUnitOfMeasureInput>
  }

  export type InventoryItemUpdateWithWhereUniqueWithoutUnitOfMeasureInput = {
    where: InventoryItemWhereUniqueInput
    data: XOR<InventoryItemUpdateWithoutUnitOfMeasureInput, InventoryItemUncheckedUpdateWithoutUnitOfMeasureInput>
  }

  export type InventoryItemUpdateManyWithWhereWithoutUnitOfMeasureInput = {
    where: InventoryItemScalarWhereInput
    data: XOR<InventoryItemUpdateManyMutationInput, InventoryItemUncheckedUpdateManyWithoutUnitOfMeasureInput>
  }

  export type InventoryItemScalarWhereInput = {
    AND?: InventoryItemScalarWhereInput | InventoryItemScalarWhereInput[]
    OR?: InventoryItemScalarWhereInput[]
    NOT?: InventoryItemScalarWhereInput | InventoryItemScalarWhereInput[]
    id?: StringFilter<"InventoryItem"> | string
    organizationId?: StringFilter<"InventoryItem"> | string
    businessUnitId?: StringFilter<"InventoryItem"> | string
    name?: StringFilter<"InventoryItem"> | string
    nameNormalized?: StringFilter<"InventoryItem"> | string
    type?: StringFilter<"InventoryItem"> | string
    unitOfMeasureId?: StringFilter<"InventoryItem"> | string
    requiresExpiration?: BoolFilter<"InventoryItem"> | boolean
    createdBy?: StringFilter<"InventoryItem"> | string
    createdAt?: DateTimeFilter<"InventoryItem"> | Date | string
    updatedAt?: DateTimeNullableFilter<"InventoryItem"> | Date | string | null
  }

  export type UnitOfMeasureCreateWithoutInventoryItemsInput = {
    id?: string
    organizationId: string
    code: string
    codeNormalized: string
    name: string
    nameNormalized: string
    symbol: string
    allowsFraction: boolean
    status: string
    createdBy: string
    createdAt?: Date | string
    updatedBy?: string | null
    updatedAt?: Date | string | null
  }

  export type UnitOfMeasureUncheckedCreateWithoutInventoryItemsInput = {
    id?: string
    organizationId: string
    code: string
    codeNormalized: string
    name: string
    nameNormalized: string
    symbol: string
    allowsFraction: boolean
    status: string
    createdBy: string
    createdAt?: Date | string
    updatedBy?: string | null
    updatedAt?: Date | string | null
  }

  export type UnitOfMeasureCreateOrConnectWithoutInventoryItemsInput = {
    where: UnitOfMeasureWhereUniqueInput
    create: XOR<UnitOfMeasureCreateWithoutInventoryItemsInput, UnitOfMeasureUncheckedCreateWithoutInventoryItemsInput>
  }

  export type UnitOfMeasureUpsertWithoutInventoryItemsInput = {
    update: XOR<UnitOfMeasureUpdateWithoutInventoryItemsInput, UnitOfMeasureUncheckedUpdateWithoutInventoryItemsInput>
    create: XOR<UnitOfMeasureCreateWithoutInventoryItemsInput, UnitOfMeasureUncheckedCreateWithoutInventoryItemsInput>
    where?: UnitOfMeasureWhereInput
  }

  export type UnitOfMeasureUpdateToOneWithWhereWithoutInventoryItemsInput = {
    where?: UnitOfMeasureWhereInput
    data: XOR<UnitOfMeasureUpdateWithoutInventoryItemsInput, UnitOfMeasureUncheckedUpdateWithoutInventoryItemsInput>
  }

  export type UnitOfMeasureUpdateWithoutInventoryItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    codeNormalized?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameNormalized?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    allowsFraction?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UnitOfMeasureUncheckedUpdateWithoutInventoryItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    codeNormalized?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameNormalized?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    allowsFraction?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InventoryItemCreateManyUnitOfMeasureInput = {
    id?: string
    organizationId: string
    businessUnitId: string
    name: string
    nameNormalized: string
    type: string
    requiresExpiration: boolean
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type InventoryItemUpdateWithoutUnitOfMeasureInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameNormalized?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    requiresExpiration?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InventoryItemUncheckedUpdateWithoutUnitOfMeasureInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameNormalized?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    requiresExpiration?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InventoryItemUncheckedUpdateManyWithoutUnitOfMeasureInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameNormalized?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    requiresExpiration?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UnitOfMeasureCountOutputTypeDefaultArgs instead
     */
    export type UnitOfMeasureCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UnitOfMeasureCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UnitOfMeasureDefaultArgs instead
     */
    export type UnitOfMeasureArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UnitOfMeasureDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InventoryItemDefaultArgs instead
     */
    export type InventoryItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InventoryItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductItemLinkDefaultArgs instead
     */
    export type ProductItemLinkArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductItemLinkDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StockLotDefaultArgs instead
     */
    export type StockLotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StockLotDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StockMovementDefaultArgs instead
     */
    export type StockMovementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StockMovementDefaultArgs<ExtArgs>

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