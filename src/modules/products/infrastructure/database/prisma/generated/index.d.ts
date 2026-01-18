
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
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model ProductImage
 * 
 */
export type ProductImage = $Result.DefaultSelection<Prisma.$ProductImagePayload>
/**
 * Model ProductAttributeValue
 * 
 */
export type ProductAttributeValue = $Result.DefaultSelection<Prisma.$ProductAttributeValuePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Products
 * const products = await prisma.product.findMany()
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
   * // Fetch zero or more Products
   * const products = await prisma.product.findMany()
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
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs>;

  /**
   * `prisma.productImage`: Exposes CRUD operations for the **ProductImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductImages
    * const productImages = await prisma.productImage.findMany()
    * ```
    */
  get productImage(): Prisma.ProductImageDelegate<ExtArgs>;

  /**
   * `prisma.productAttributeValue`: Exposes CRUD operations for the **ProductAttributeValue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductAttributeValues
    * const productAttributeValues = await prisma.productAttributeValue.findMany()
    * ```
    */
  get productAttributeValue(): Prisma.ProductAttributeValueDelegate<ExtArgs>;
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
    Product: 'Product',
    ProductImage: 'ProductImage',
    ProductAttributeValue: 'ProductAttributeValue'
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
      modelProps: "product" | "productImage" | "productAttributeValue"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      ProductImage: {
        payload: Prisma.$ProductImagePayload<ExtArgs>
        fields: Prisma.ProductImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          findFirst: {
            args: Prisma.ProductImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          findMany: {
            args: Prisma.ProductImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>[]
          }
          create: {
            args: Prisma.ProductImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          createMany: {
            args: Prisma.ProductImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          update: {
            args: Prisma.ProductImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          deleteMany: {
            args: Prisma.ProductImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          aggregate: {
            args: Prisma.ProductImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductImage>
          }
          groupBy: {
            args: Prisma.ProductImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductImageCountArgs<ExtArgs>
            result: $Utils.Optional<ProductImageCountAggregateOutputType> | number
          }
        }
      }
      ProductAttributeValue: {
        payload: Prisma.$ProductAttributeValuePayload<ExtArgs>
        fields: Prisma.ProductAttributeValueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductAttributeValueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributeValuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductAttributeValueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributeValuePayload>
          }
          findFirst: {
            args: Prisma.ProductAttributeValueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributeValuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductAttributeValueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributeValuePayload>
          }
          findMany: {
            args: Prisma.ProductAttributeValueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributeValuePayload>[]
          }
          create: {
            args: Prisma.ProductAttributeValueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributeValuePayload>
          }
          createMany: {
            args: Prisma.ProductAttributeValueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductAttributeValueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributeValuePayload>
          }
          update: {
            args: Prisma.ProductAttributeValueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributeValuePayload>
          }
          deleteMany: {
            args: Prisma.ProductAttributeValueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductAttributeValueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductAttributeValueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributeValuePayload>
          }
          aggregate: {
            args: Prisma.ProductAttributeValueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductAttributeValue>
          }
          groupBy: {
            args: Prisma.ProductAttributeValueGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductAttributeValueGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductAttributeValueCountArgs<ExtArgs>
            result: $Utils.Optional<ProductAttributeValueCountAggregateOutputType> | number
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
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    images: number
    attributes: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | ProductCountOutputTypeCountImagesArgs
    attributes?: boolean | ProductCountOutputTypeCountAttributesArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductImageWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountAttributesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductAttributeValueWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    businessUnitId: string | null
    categoryId: string | null
    code: string | null
    codeNormalized: string | null
    title: string | null
    titleNormalized: string | null
    shortDescription: string | null
    description: string | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    businessUnitId: string | null
    categoryId: string | null
    code: string | null
    codeNormalized: string | null
    title: string | null
    titleNormalized: string | null
    shortDescription: string | null
    description: string | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    organizationId: number
    businessUnitId: number
    categoryId: number
    code: number
    codeNormalized: number
    title: number
    titleNormalized: number
    shortDescription: number
    description: number
    createdBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductMinAggregateInputType = {
    id?: true
    organizationId?: true
    businessUnitId?: true
    categoryId?: true
    code?: true
    codeNormalized?: true
    title?: true
    titleNormalized?: true
    shortDescription?: true
    description?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    organizationId?: true
    businessUnitId?: true
    categoryId?: true
    code?: true
    codeNormalized?: true
    title?: true
    titleNormalized?: true
    shortDescription?: true
    description?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    organizationId?: true
    businessUnitId?: true
    categoryId?: true
    code?: true
    codeNormalized?: true
    title?: true
    titleNormalized?: true
    shortDescription?: true
    description?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    organizationId: string
    businessUnitId: string
    categoryId: string
    code: string
    codeNormalized: string
    title: string
    titleNormalized: string
    shortDescription: string
    description: string
    createdBy: string
    createdAt: Date
    updatedAt: Date | null
    _count: ProductCountAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    businessUnitId?: boolean
    categoryId?: boolean
    code?: boolean
    codeNormalized?: boolean
    title?: boolean
    titleNormalized?: boolean
    shortDescription?: boolean
    description?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    images?: boolean | Product$imagesArgs<ExtArgs>
    attributes?: boolean | Product$attributesArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>


  export type ProductSelectScalar = {
    id?: boolean
    organizationId?: boolean
    businessUnitId?: boolean
    categoryId?: boolean
    code?: boolean
    codeNormalized?: boolean
    title?: boolean
    titleNormalized?: boolean
    shortDescription?: boolean
    description?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | Product$imagesArgs<ExtArgs>
    attributes?: boolean | Product$attributesArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      images: Prisma.$ProductImagePayload<ExtArgs>[]
      attributes: Prisma.$ProductAttributeValuePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizationId: string
      businessUnitId: string
      categoryId: string
      code: string
      codeNormalized: string
      title: string
      titleNormalized: string
      shortDescription: string
      description: string
      createdBy: string
      createdAt: Date
      updatedAt: Date | null
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
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
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    images<T extends Product$imagesArgs<ExtArgs> = {}>(args?: Subset<T, Product$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findMany"> | Null>
    attributes<T extends Product$attributesArgs<ExtArgs> = {}>(args?: Subset<T, Product$attributesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductAttributeValuePayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Product model
   */ 
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly organizationId: FieldRef<"Product", 'String'>
    readonly businessUnitId: FieldRef<"Product", 'String'>
    readonly categoryId: FieldRef<"Product", 'String'>
    readonly code: FieldRef<"Product", 'String'>
    readonly codeNormalized: FieldRef<"Product", 'String'>
    readonly title: FieldRef<"Product", 'String'>
    readonly titleNormalized: FieldRef<"Product", 'String'>
    readonly shortDescription: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly createdBy: FieldRef<"Product", 'String'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
  }

  /**
   * Product.images
   */
  export type Product$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    where?: ProductImageWhereInput
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    cursor?: ProductImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[]
  }

  /**
   * Product.attributes
   */
  export type Product$attributesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttributeValue
     */
    select?: ProductAttributeValueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeValueInclude<ExtArgs> | null
    where?: ProductAttributeValueWhereInput
    orderBy?: ProductAttributeValueOrderByWithRelationInput | ProductAttributeValueOrderByWithRelationInput[]
    cursor?: ProductAttributeValueWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductAttributeValueScalarFieldEnum | ProductAttributeValueScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model ProductImage
   */

  export type AggregateProductImage = {
    _count: ProductImageCountAggregateOutputType | null
    _avg: ProductImageAvgAggregateOutputType | null
    _sum: ProductImageSumAggregateOutputType | null
    _min: ProductImageMinAggregateOutputType | null
    _max: ProductImageMaxAggregateOutputType | null
  }

  export type ProductImageAvgAggregateOutputType = {
    displayOrder: number | null
  }

  export type ProductImageSumAggregateOutputType = {
    displayOrder: number | null
  }

  export type ProductImageMinAggregateOutputType = {
    productId: string | null
    url: string | null
    displayOrder: number | null
    altText: string | null
    isPrimary: boolean | null
  }

  export type ProductImageMaxAggregateOutputType = {
    productId: string | null
    url: string | null
    displayOrder: number | null
    altText: string | null
    isPrimary: boolean | null
  }

  export type ProductImageCountAggregateOutputType = {
    productId: number
    url: number
    displayOrder: number
    altText: number
    isPrimary: number
    _all: number
  }


  export type ProductImageAvgAggregateInputType = {
    displayOrder?: true
  }

  export type ProductImageSumAggregateInputType = {
    displayOrder?: true
  }

  export type ProductImageMinAggregateInputType = {
    productId?: true
    url?: true
    displayOrder?: true
    altText?: true
    isPrimary?: true
  }

  export type ProductImageMaxAggregateInputType = {
    productId?: true
    url?: true
    displayOrder?: true
    altText?: true
    isPrimary?: true
  }

  export type ProductImageCountAggregateInputType = {
    productId?: true
    url?: true
    displayOrder?: true
    altText?: true
    isPrimary?: true
    _all?: true
  }

  export type ProductImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductImage to aggregate.
     */
    where?: ProductImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductImages to fetch.
     */
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductImages
    **/
    _count?: true | ProductImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductImageMaxAggregateInputType
  }

  export type GetProductImageAggregateType<T extends ProductImageAggregateArgs> = {
        [P in keyof T & keyof AggregateProductImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductImage[P]>
      : GetScalarType<T[P], AggregateProductImage[P]>
  }




  export type ProductImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductImageWhereInput
    orderBy?: ProductImageOrderByWithAggregationInput | ProductImageOrderByWithAggregationInput[]
    by: ProductImageScalarFieldEnum[] | ProductImageScalarFieldEnum
    having?: ProductImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductImageCountAggregateInputType | true
    _avg?: ProductImageAvgAggregateInputType
    _sum?: ProductImageSumAggregateInputType
    _min?: ProductImageMinAggregateInputType
    _max?: ProductImageMaxAggregateInputType
  }

  export type ProductImageGroupByOutputType = {
    productId: string
    url: string
    displayOrder: number
    altText: string | null
    isPrimary: boolean
    _count: ProductImageCountAggregateOutputType | null
    _avg: ProductImageAvgAggregateOutputType | null
    _sum: ProductImageSumAggregateOutputType | null
    _min: ProductImageMinAggregateOutputType | null
    _max: ProductImageMaxAggregateOutputType | null
  }

  type GetProductImageGroupByPayload<T extends ProductImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductImageGroupByOutputType[P]>
            : GetScalarType<T[P], ProductImageGroupByOutputType[P]>
        }
      >
    >


  export type ProductImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    productId?: boolean
    url?: boolean
    displayOrder?: boolean
    altText?: boolean
    isPrimary?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productImage"]>


  export type ProductImageSelectScalar = {
    productId?: boolean
    url?: boolean
    displayOrder?: boolean
    altText?: boolean
    isPrimary?: boolean
  }

  export type ProductImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $ProductImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductImage"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      productId: string
      url: string
      displayOrder: number
      altText: string | null
      isPrimary: boolean
    }, ExtArgs["result"]["productImage"]>
    composites: {}
  }

  type ProductImageGetPayload<S extends boolean | null | undefined | ProductImageDefaultArgs> = $Result.GetResult<Prisma.$ProductImagePayload, S>

  type ProductImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductImageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductImageCountAggregateInputType | true
    }

  export interface ProductImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductImage'], meta: { name: 'ProductImage' } }
    /**
     * Find zero or one ProductImage that matches the filter.
     * @param {ProductImageFindUniqueArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductImageFindUniqueArgs>(args: SelectSubset<T, ProductImageFindUniqueArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ProductImage that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductImageFindUniqueOrThrowArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductImageFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ProductImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageFindFirstArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductImageFindFirstArgs>(args?: SelectSubset<T, ProductImageFindFirstArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ProductImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageFindFirstOrThrowArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductImageFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ProductImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductImages
     * const productImages = await prisma.productImage.findMany()
     * 
     * // Get first 10 ProductImages
     * const productImages = await prisma.productImage.findMany({ take: 10 })
     * 
     * // Only select the `productId`
     * const productImageWithProductIdOnly = await prisma.productImage.findMany({ select: { productId: true } })
     * 
     */
    findMany<T extends ProductImageFindManyArgs>(args?: SelectSubset<T, ProductImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ProductImage.
     * @param {ProductImageCreateArgs} args - Arguments to create a ProductImage.
     * @example
     * // Create one ProductImage
     * const ProductImage = await prisma.productImage.create({
     *   data: {
     *     // ... data to create a ProductImage
     *   }
     * })
     * 
     */
    create<T extends ProductImageCreateArgs>(args: SelectSubset<T, ProductImageCreateArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ProductImages.
     * @param {ProductImageCreateManyArgs} args - Arguments to create many ProductImages.
     * @example
     * // Create many ProductImages
     * const productImage = await prisma.productImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductImageCreateManyArgs>(args?: SelectSubset<T, ProductImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProductImage.
     * @param {ProductImageDeleteArgs} args - Arguments to delete one ProductImage.
     * @example
     * // Delete one ProductImage
     * const ProductImage = await prisma.productImage.delete({
     *   where: {
     *     // ... filter to delete one ProductImage
     *   }
     * })
     * 
     */
    delete<T extends ProductImageDeleteArgs>(args: SelectSubset<T, ProductImageDeleteArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ProductImage.
     * @param {ProductImageUpdateArgs} args - Arguments to update one ProductImage.
     * @example
     * // Update one ProductImage
     * const productImage = await prisma.productImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductImageUpdateArgs>(args: SelectSubset<T, ProductImageUpdateArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ProductImages.
     * @param {ProductImageDeleteManyArgs} args - Arguments to filter ProductImages to delete.
     * @example
     * // Delete a few ProductImages
     * const { count } = await prisma.productImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductImageDeleteManyArgs>(args?: SelectSubset<T, ProductImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductImages
     * const productImage = await prisma.productImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductImageUpdateManyArgs>(args: SelectSubset<T, ProductImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductImage.
     * @param {ProductImageUpsertArgs} args - Arguments to update or create a ProductImage.
     * @example
     * // Update or create a ProductImage
     * const productImage = await prisma.productImage.upsert({
     *   create: {
     *     // ... data to create a ProductImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductImage we want to update
     *   }
     * })
     */
    upsert<T extends ProductImageUpsertArgs>(args: SelectSubset<T, ProductImageUpsertArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ProductImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageCountArgs} args - Arguments to filter ProductImages to count.
     * @example
     * // Count the number of ProductImages
     * const count = await prisma.productImage.count({
     *   where: {
     *     // ... the filter for the ProductImages we want to count
     *   }
     * })
    **/
    count<T extends ProductImageCountArgs>(
      args?: Subset<T, ProductImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductImageAggregateArgs>(args: Subset<T, ProductImageAggregateArgs>): Prisma.PrismaPromise<GetProductImageAggregateType<T>>

    /**
     * Group by ProductImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageGroupByArgs} args - Group by arguments.
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
      T extends ProductImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductImageGroupByArgs['orderBy'] }
        : { orderBy?: ProductImageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductImage model
   */
  readonly fields: ProductImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the ProductImage model
   */ 
  interface ProductImageFieldRefs {
    readonly productId: FieldRef<"ProductImage", 'String'>
    readonly url: FieldRef<"ProductImage", 'String'>
    readonly displayOrder: FieldRef<"ProductImage", 'Int'>
    readonly altText: FieldRef<"ProductImage", 'String'>
    readonly isPrimary: FieldRef<"ProductImage", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ProductImage findUnique
   */
  export type ProductImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImage to fetch.
     */
    where: ProductImageWhereUniqueInput
  }

  /**
   * ProductImage findUniqueOrThrow
   */
  export type ProductImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImage to fetch.
     */
    where: ProductImageWhereUniqueInput
  }

  /**
   * ProductImage findFirst
   */
  export type ProductImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImage to fetch.
     */
    where?: ProductImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductImages to fetch.
     */
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductImages.
     */
    cursor?: ProductImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductImages.
     */
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[]
  }

  /**
   * ProductImage findFirstOrThrow
   */
  export type ProductImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImage to fetch.
     */
    where?: ProductImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductImages to fetch.
     */
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductImages.
     */
    cursor?: ProductImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductImages.
     */
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[]
  }

  /**
   * ProductImage findMany
   */
  export type ProductImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImages to fetch.
     */
    where?: ProductImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductImages to fetch.
     */
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductImages.
     */
    cursor?: ProductImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductImages.
     */
    skip?: number
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[]
  }

  /**
   * ProductImage create
   */
  export type ProductImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductImage.
     */
    data: XOR<ProductImageCreateInput, ProductImageUncheckedCreateInput>
  }

  /**
   * ProductImage createMany
   */
  export type ProductImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductImages.
     */
    data: ProductImageCreateManyInput | ProductImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductImage update
   */
  export type ProductImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductImage.
     */
    data: XOR<ProductImageUpdateInput, ProductImageUncheckedUpdateInput>
    /**
     * Choose, which ProductImage to update.
     */
    where: ProductImageWhereUniqueInput
  }

  /**
   * ProductImage updateMany
   */
  export type ProductImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductImages.
     */
    data: XOR<ProductImageUpdateManyMutationInput, ProductImageUncheckedUpdateManyInput>
    /**
     * Filter which ProductImages to update
     */
    where?: ProductImageWhereInput
  }

  /**
   * ProductImage upsert
   */
  export type ProductImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductImage to update in case it exists.
     */
    where: ProductImageWhereUniqueInput
    /**
     * In case the ProductImage found by the `where` argument doesn't exist, create a new ProductImage with this data.
     */
    create: XOR<ProductImageCreateInput, ProductImageUncheckedCreateInput>
    /**
     * In case the ProductImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductImageUpdateInput, ProductImageUncheckedUpdateInput>
  }

  /**
   * ProductImage delete
   */
  export type ProductImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter which ProductImage to delete.
     */
    where: ProductImageWhereUniqueInput
  }

  /**
   * ProductImage deleteMany
   */
  export type ProductImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductImages to delete
     */
    where?: ProductImageWhereInput
  }

  /**
   * ProductImage without action
   */
  export type ProductImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
  }


  /**
   * Model ProductAttributeValue
   */

  export type AggregateProductAttributeValue = {
    _count: ProductAttributeValueCountAggregateOutputType | null
    _min: ProductAttributeValueMinAggregateOutputType | null
    _max: ProductAttributeValueMaxAggregateOutputType | null
  }

  export type ProductAttributeValueMinAggregateOutputType = {
    productId: string | null
    attributeId: string | null
    value: string | null
  }

  export type ProductAttributeValueMaxAggregateOutputType = {
    productId: string | null
    attributeId: string | null
    value: string | null
  }

  export type ProductAttributeValueCountAggregateOutputType = {
    productId: number
    attributeId: number
    value: number
    _all: number
  }


  export type ProductAttributeValueMinAggregateInputType = {
    productId?: true
    attributeId?: true
    value?: true
  }

  export type ProductAttributeValueMaxAggregateInputType = {
    productId?: true
    attributeId?: true
    value?: true
  }

  export type ProductAttributeValueCountAggregateInputType = {
    productId?: true
    attributeId?: true
    value?: true
    _all?: true
  }

  export type ProductAttributeValueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductAttributeValue to aggregate.
     */
    where?: ProductAttributeValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductAttributeValues to fetch.
     */
    orderBy?: ProductAttributeValueOrderByWithRelationInput | ProductAttributeValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductAttributeValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductAttributeValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductAttributeValues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductAttributeValues
    **/
    _count?: true | ProductAttributeValueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductAttributeValueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductAttributeValueMaxAggregateInputType
  }

  export type GetProductAttributeValueAggregateType<T extends ProductAttributeValueAggregateArgs> = {
        [P in keyof T & keyof AggregateProductAttributeValue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductAttributeValue[P]>
      : GetScalarType<T[P], AggregateProductAttributeValue[P]>
  }




  export type ProductAttributeValueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductAttributeValueWhereInput
    orderBy?: ProductAttributeValueOrderByWithAggregationInput | ProductAttributeValueOrderByWithAggregationInput[]
    by: ProductAttributeValueScalarFieldEnum[] | ProductAttributeValueScalarFieldEnum
    having?: ProductAttributeValueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductAttributeValueCountAggregateInputType | true
    _min?: ProductAttributeValueMinAggregateInputType
    _max?: ProductAttributeValueMaxAggregateInputType
  }

  export type ProductAttributeValueGroupByOutputType = {
    productId: string
    attributeId: string
    value: string
    _count: ProductAttributeValueCountAggregateOutputType | null
    _min: ProductAttributeValueMinAggregateOutputType | null
    _max: ProductAttributeValueMaxAggregateOutputType | null
  }

  type GetProductAttributeValueGroupByPayload<T extends ProductAttributeValueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductAttributeValueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductAttributeValueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductAttributeValueGroupByOutputType[P]>
            : GetScalarType<T[P], ProductAttributeValueGroupByOutputType[P]>
        }
      >
    >


  export type ProductAttributeValueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    productId?: boolean
    attributeId?: boolean
    value?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productAttributeValue"]>


  export type ProductAttributeValueSelectScalar = {
    productId?: boolean
    attributeId?: boolean
    value?: boolean
  }

  export type ProductAttributeValueInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $ProductAttributeValuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductAttributeValue"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      productId: string
      attributeId: string
      value: string
    }, ExtArgs["result"]["productAttributeValue"]>
    composites: {}
  }

  type ProductAttributeValueGetPayload<S extends boolean | null | undefined | ProductAttributeValueDefaultArgs> = $Result.GetResult<Prisma.$ProductAttributeValuePayload, S>

  type ProductAttributeValueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductAttributeValueFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductAttributeValueCountAggregateInputType | true
    }

  export interface ProductAttributeValueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductAttributeValue'], meta: { name: 'ProductAttributeValue' } }
    /**
     * Find zero or one ProductAttributeValue that matches the filter.
     * @param {ProductAttributeValueFindUniqueArgs} args - Arguments to find a ProductAttributeValue
     * @example
     * // Get one ProductAttributeValue
     * const productAttributeValue = await prisma.productAttributeValue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductAttributeValueFindUniqueArgs>(args: SelectSubset<T, ProductAttributeValueFindUniqueArgs<ExtArgs>>): Prisma__ProductAttributeValueClient<$Result.GetResult<Prisma.$ProductAttributeValuePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ProductAttributeValue that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductAttributeValueFindUniqueOrThrowArgs} args - Arguments to find a ProductAttributeValue
     * @example
     * // Get one ProductAttributeValue
     * const productAttributeValue = await prisma.productAttributeValue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductAttributeValueFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductAttributeValueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductAttributeValueClient<$Result.GetResult<Prisma.$ProductAttributeValuePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ProductAttributeValue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeValueFindFirstArgs} args - Arguments to find a ProductAttributeValue
     * @example
     * // Get one ProductAttributeValue
     * const productAttributeValue = await prisma.productAttributeValue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductAttributeValueFindFirstArgs>(args?: SelectSubset<T, ProductAttributeValueFindFirstArgs<ExtArgs>>): Prisma__ProductAttributeValueClient<$Result.GetResult<Prisma.$ProductAttributeValuePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ProductAttributeValue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeValueFindFirstOrThrowArgs} args - Arguments to find a ProductAttributeValue
     * @example
     * // Get one ProductAttributeValue
     * const productAttributeValue = await prisma.productAttributeValue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductAttributeValueFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductAttributeValueFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductAttributeValueClient<$Result.GetResult<Prisma.$ProductAttributeValuePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ProductAttributeValues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeValueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductAttributeValues
     * const productAttributeValues = await prisma.productAttributeValue.findMany()
     * 
     * // Get first 10 ProductAttributeValues
     * const productAttributeValues = await prisma.productAttributeValue.findMany({ take: 10 })
     * 
     * // Only select the `productId`
     * const productAttributeValueWithProductIdOnly = await prisma.productAttributeValue.findMany({ select: { productId: true } })
     * 
     */
    findMany<T extends ProductAttributeValueFindManyArgs>(args?: SelectSubset<T, ProductAttributeValueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductAttributeValuePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ProductAttributeValue.
     * @param {ProductAttributeValueCreateArgs} args - Arguments to create a ProductAttributeValue.
     * @example
     * // Create one ProductAttributeValue
     * const ProductAttributeValue = await prisma.productAttributeValue.create({
     *   data: {
     *     // ... data to create a ProductAttributeValue
     *   }
     * })
     * 
     */
    create<T extends ProductAttributeValueCreateArgs>(args: SelectSubset<T, ProductAttributeValueCreateArgs<ExtArgs>>): Prisma__ProductAttributeValueClient<$Result.GetResult<Prisma.$ProductAttributeValuePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ProductAttributeValues.
     * @param {ProductAttributeValueCreateManyArgs} args - Arguments to create many ProductAttributeValues.
     * @example
     * // Create many ProductAttributeValues
     * const productAttributeValue = await prisma.productAttributeValue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductAttributeValueCreateManyArgs>(args?: SelectSubset<T, ProductAttributeValueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProductAttributeValue.
     * @param {ProductAttributeValueDeleteArgs} args - Arguments to delete one ProductAttributeValue.
     * @example
     * // Delete one ProductAttributeValue
     * const ProductAttributeValue = await prisma.productAttributeValue.delete({
     *   where: {
     *     // ... filter to delete one ProductAttributeValue
     *   }
     * })
     * 
     */
    delete<T extends ProductAttributeValueDeleteArgs>(args: SelectSubset<T, ProductAttributeValueDeleteArgs<ExtArgs>>): Prisma__ProductAttributeValueClient<$Result.GetResult<Prisma.$ProductAttributeValuePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ProductAttributeValue.
     * @param {ProductAttributeValueUpdateArgs} args - Arguments to update one ProductAttributeValue.
     * @example
     * // Update one ProductAttributeValue
     * const productAttributeValue = await prisma.productAttributeValue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductAttributeValueUpdateArgs>(args: SelectSubset<T, ProductAttributeValueUpdateArgs<ExtArgs>>): Prisma__ProductAttributeValueClient<$Result.GetResult<Prisma.$ProductAttributeValuePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ProductAttributeValues.
     * @param {ProductAttributeValueDeleteManyArgs} args - Arguments to filter ProductAttributeValues to delete.
     * @example
     * // Delete a few ProductAttributeValues
     * const { count } = await prisma.productAttributeValue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductAttributeValueDeleteManyArgs>(args?: SelectSubset<T, ProductAttributeValueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductAttributeValues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeValueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductAttributeValues
     * const productAttributeValue = await prisma.productAttributeValue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductAttributeValueUpdateManyArgs>(args: SelectSubset<T, ProductAttributeValueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductAttributeValue.
     * @param {ProductAttributeValueUpsertArgs} args - Arguments to update or create a ProductAttributeValue.
     * @example
     * // Update or create a ProductAttributeValue
     * const productAttributeValue = await prisma.productAttributeValue.upsert({
     *   create: {
     *     // ... data to create a ProductAttributeValue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductAttributeValue we want to update
     *   }
     * })
     */
    upsert<T extends ProductAttributeValueUpsertArgs>(args: SelectSubset<T, ProductAttributeValueUpsertArgs<ExtArgs>>): Prisma__ProductAttributeValueClient<$Result.GetResult<Prisma.$ProductAttributeValuePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ProductAttributeValues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeValueCountArgs} args - Arguments to filter ProductAttributeValues to count.
     * @example
     * // Count the number of ProductAttributeValues
     * const count = await prisma.productAttributeValue.count({
     *   where: {
     *     // ... the filter for the ProductAttributeValues we want to count
     *   }
     * })
    **/
    count<T extends ProductAttributeValueCountArgs>(
      args?: Subset<T, ProductAttributeValueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductAttributeValueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductAttributeValue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeValueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductAttributeValueAggregateArgs>(args: Subset<T, ProductAttributeValueAggregateArgs>): Prisma.PrismaPromise<GetProductAttributeValueAggregateType<T>>

    /**
     * Group by ProductAttributeValue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeValueGroupByArgs} args - Group by arguments.
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
      T extends ProductAttributeValueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductAttributeValueGroupByArgs['orderBy'] }
        : { orderBy?: ProductAttributeValueGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductAttributeValueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductAttributeValueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductAttributeValue model
   */
  readonly fields: ProductAttributeValueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductAttributeValue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductAttributeValueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the ProductAttributeValue model
   */ 
  interface ProductAttributeValueFieldRefs {
    readonly productId: FieldRef<"ProductAttributeValue", 'String'>
    readonly attributeId: FieldRef<"ProductAttributeValue", 'String'>
    readonly value: FieldRef<"ProductAttributeValue", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProductAttributeValue findUnique
   */
  export type ProductAttributeValueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttributeValue
     */
    select?: ProductAttributeValueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeValueInclude<ExtArgs> | null
    /**
     * Filter, which ProductAttributeValue to fetch.
     */
    where: ProductAttributeValueWhereUniqueInput
  }

  /**
   * ProductAttributeValue findUniqueOrThrow
   */
  export type ProductAttributeValueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttributeValue
     */
    select?: ProductAttributeValueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeValueInclude<ExtArgs> | null
    /**
     * Filter, which ProductAttributeValue to fetch.
     */
    where: ProductAttributeValueWhereUniqueInput
  }

  /**
   * ProductAttributeValue findFirst
   */
  export type ProductAttributeValueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttributeValue
     */
    select?: ProductAttributeValueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeValueInclude<ExtArgs> | null
    /**
     * Filter, which ProductAttributeValue to fetch.
     */
    where?: ProductAttributeValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductAttributeValues to fetch.
     */
    orderBy?: ProductAttributeValueOrderByWithRelationInput | ProductAttributeValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductAttributeValues.
     */
    cursor?: ProductAttributeValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductAttributeValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductAttributeValues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductAttributeValues.
     */
    distinct?: ProductAttributeValueScalarFieldEnum | ProductAttributeValueScalarFieldEnum[]
  }

  /**
   * ProductAttributeValue findFirstOrThrow
   */
  export type ProductAttributeValueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttributeValue
     */
    select?: ProductAttributeValueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeValueInclude<ExtArgs> | null
    /**
     * Filter, which ProductAttributeValue to fetch.
     */
    where?: ProductAttributeValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductAttributeValues to fetch.
     */
    orderBy?: ProductAttributeValueOrderByWithRelationInput | ProductAttributeValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductAttributeValues.
     */
    cursor?: ProductAttributeValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductAttributeValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductAttributeValues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductAttributeValues.
     */
    distinct?: ProductAttributeValueScalarFieldEnum | ProductAttributeValueScalarFieldEnum[]
  }

  /**
   * ProductAttributeValue findMany
   */
  export type ProductAttributeValueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttributeValue
     */
    select?: ProductAttributeValueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeValueInclude<ExtArgs> | null
    /**
     * Filter, which ProductAttributeValues to fetch.
     */
    where?: ProductAttributeValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductAttributeValues to fetch.
     */
    orderBy?: ProductAttributeValueOrderByWithRelationInput | ProductAttributeValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductAttributeValues.
     */
    cursor?: ProductAttributeValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductAttributeValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductAttributeValues.
     */
    skip?: number
    distinct?: ProductAttributeValueScalarFieldEnum | ProductAttributeValueScalarFieldEnum[]
  }

  /**
   * ProductAttributeValue create
   */
  export type ProductAttributeValueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttributeValue
     */
    select?: ProductAttributeValueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeValueInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductAttributeValue.
     */
    data: XOR<ProductAttributeValueCreateInput, ProductAttributeValueUncheckedCreateInput>
  }

  /**
   * ProductAttributeValue createMany
   */
  export type ProductAttributeValueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductAttributeValues.
     */
    data: ProductAttributeValueCreateManyInput | ProductAttributeValueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductAttributeValue update
   */
  export type ProductAttributeValueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttributeValue
     */
    select?: ProductAttributeValueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeValueInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductAttributeValue.
     */
    data: XOR<ProductAttributeValueUpdateInput, ProductAttributeValueUncheckedUpdateInput>
    /**
     * Choose, which ProductAttributeValue to update.
     */
    where: ProductAttributeValueWhereUniqueInput
  }

  /**
   * ProductAttributeValue updateMany
   */
  export type ProductAttributeValueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductAttributeValues.
     */
    data: XOR<ProductAttributeValueUpdateManyMutationInput, ProductAttributeValueUncheckedUpdateManyInput>
    /**
     * Filter which ProductAttributeValues to update
     */
    where?: ProductAttributeValueWhereInput
  }

  /**
   * ProductAttributeValue upsert
   */
  export type ProductAttributeValueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttributeValue
     */
    select?: ProductAttributeValueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeValueInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductAttributeValue to update in case it exists.
     */
    where: ProductAttributeValueWhereUniqueInput
    /**
     * In case the ProductAttributeValue found by the `where` argument doesn't exist, create a new ProductAttributeValue with this data.
     */
    create: XOR<ProductAttributeValueCreateInput, ProductAttributeValueUncheckedCreateInput>
    /**
     * In case the ProductAttributeValue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductAttributeValueUpdateInput, ProductAttributeValueUncheckedUpdateInput>
  }

  /**
   * ProductAttributeValue delete
   */
  export type ProductAttributeValueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttributeValue
     */
    select?: ProductAttributeValueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeValueInclude<ExtArgs> | null
    /**
     * Filter which ProductAttributeValue to delete.
     */
    where: ProductAttributeValueWhereUniqueInput
  }

  /**
   * ProductAttributeValue deleteMany
   */
  export type ProductAttributeValueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductAttributeValues to delete
     */
    where?: ProductAttributeValueWhereInput
  }

  /**
   * ProductAttributeValue without action
   */
  export type ProductAttributeValueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttributeValue
     */
    select?: ProductAttributeValueSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeValueInclude<ExtArgs> | null
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


  export const ProductScalarFieldEnum: {
    id: 'id',
    organizationId: 'organizationId',
    businessUnitId: 'businessUnitId',
    categoryId: 'categoryId',
    code: 'code',
    codeNormalized: 'codeNormalized',
    title: 'title',
    titleNormalized: 'titleNormalized',
    shortDescription: 'shortDescription',
    description: 'description',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const ProductImageScalarFieldEnum: {
    productId: 'productId',
    url: 'url',
    displayOrder: 'displayOrder',
    altText: 'altText',
    isPrimary: 'isPrimary'
  };

  export type ProductImageScalarFieldEnum = (typeof ProductImageScalarFieldEnum)[keyof typeof ProductImageScalarFieldEnum]


  export const ProductAttributeValueScalarFieldEnum: {
    productId: 'productId',
    attributeId: 'attributeId',
    value: 'value'
  };

  export type ProductAttributeValueScalarFieldEnum = (typeof ProductAttributeValueScalarFieldEnum)[keyof typeof ProductAttributeValueScalarFieldEnum]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    organizationId?: StringFilter<"Product"> | string
    businessUnitId?: StringFilter<"Product"> | string
    categoryId?: StringFilter<"Product"> | string
    code?: StringFilter<"Product"> | string
    codeNormalized?: StringFilter<"Product"> | string
    title?: StringFilter<"Product"> | string
    titleNormalized?: StringFilter<"Product"> | string
    shortDescription?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    createdBy?: StringFilter<"Product"> | string
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Product"> | Date | string | null
    images?: ProductImageListRelationFilter
    attributes?: ProductAttributeValueListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    businessUnitId?: SortOrder
    categoryId?: SortOrder
    code?: SortOrder
    codeNormalized?: SortOrder
    title?: SortOrder
    titleNormalized?: SortOrder
    shortDescription?: SortOrder
    description?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    images?: ProductImageOrderByRelationAggregateInput
    attributes?: ProductAttributeValueOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    organizationId_codeNormalized?: ProductOrganizationIdCodeNormalizedCompoundUniqueInput
    businessUnitId_titleNormalized?: ProductBusinessUnitIdTitleNormalizedCompoundUniqueInput
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    organizationId?: StringFilter<"Product"> | string
    businessUnitId?: StringFilter<"Product"> | string
    categoryId?: StringFilter<"Product"> | string
    code?: StringFilter<"Product"> | string
    codeNormalized?: StringFilter<"Product"> | string
    title?: StringFilter<"Product"> | string
    titleNormalized?: StringFilter<"Product"> | string
    shortDescription?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    createdBy?: StringFilter<"Product"> | string
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Product"> | Date | string | null
    images?: ProductImageListRelationFilter
    attributes?: ProductAttributeValueListRelationFilter
  }, "id" | "organizationId_codeNormalized" | "businessUnitId_titleNormalized">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    businessUnitId?: SortOrder
    categoryId?: SortOrder
    code?: SortOrder
    codeNormalized?: SortOrder
    title?: SortOrder
    titleNormalized?: SortOrder
    shortDescription?: SortOrder
    description?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: ProductCountOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    organizationId?: StringWithAggregatesFilter<"Product"> | string
    businessUnitId?: StringWithAggregatesFilter<"Product"> | string
    categoryId?: StringWithAggregatesFilter<"Product"> | string
    code?: StringWithAggregatesFilter<"Product"> | string
    codeNormalized?: StringWithAggregatesFilter<"Product"> | string
    title?: StringWithAggregatesFilter<"Product"> | string
    titleNormalized?: StringWithAggregatesFilter<"Product"> | string
    shortDescription?: StringWithAggregatesFilter<"Product"> | string
    description?: StringWithAggregatesFilter<"Product"> | string
    createdBy?: StringWithAggregatesFilter<"Product"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Product"> | Date | string | null
  }

  export type ProductImageWhereInput = {
    AND?: ProductImageWhereInput | ProductImageWhereInput[]
    OR?: ProductImageWhereInput[]
    NOT?: ProductImageWhereInput | ProductImageWhereInput[]
    productId?: StringFilter<"ProductImage"> | string
    url?: StringFilter<"ProductImage"> | string
    displayOrder?: IntFilter<"ProductImage"> | number
    altText?: StringNullableFilter<"ProductImage"> | string | null
    isPrimary?: BoolFilter<"ProductImage"> | boolean
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }

  export type ProductImageOrderByWithRelationInput = {
    productId?: SortOrder
    url?: SortOrder
    displayOrder?: SortOrder
    altText?: SortOrderInput | SortOrder
    isPrimary?: SortOrder
    product?: ProductOrderByWithRelationInput
  }

  export type ProductImageWhereUniqueInput = Prisma.AtLeast<{
    productId_displayOrder?: ProductImageProductIdDisplayOrderCompoundUniqueInput
    AND?: ProductImageWhereInput | ProductImageWhereInput[]
    OR?: ProductImageWhereInput[]
    NOT?: ProductImageWhereInput | ProductImageWhereInput[]
    productId?: StringFilter<"ProductImage"> | string
    url?: StringFilter<"ProductImage"> | string
    displayOrder?: IntFilter<"ProductImage"> | number
    altText?: StringNullableFilter<"ProductImage"> | string | null
    isPrimary?: BoolFilter<"ProductImage"> | boolean
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }, "productId_displayOrder">

  export type ProductImageOrderByWithAggregationInput = {
    productId?: SortOrder
    url?: SortOrder
    displayOrder?: SortOrder
    altText?: SortOrderInput | SortOrder
    isPrimary?: SortOrder
    _count?: ProductImageCountOrderByAggregateInput
    _avg?: ProductImageAvgOrderByAggregateInput
    _max?: ProductImageMaxOrderByAggregateInput
    _min?: ProductImageMinOrderByAggregateInput
    _sum?: ProductImageSumOrderByAggregateInput
  }

  export type ProductImageScalarWhereWithAggregatesInput = {
    AND?: ProductImageScalarWhereWithAggregatesInput | ProductImageScalarWhereWithAggregatesInput[]
    OR?: ProductImageScalarWhereWithAggregatesInput[]
    NOT?: ProductImageScalarWhereWithAggregatesInput | ProductImageScalarWhereWithAggregatesInput[]
    productId?: StringWithAggregatesFilter<"ProductImage"> | string
    url?: StringWithAggregatesFilter<"ProductImage"> | string
    displayOrder?: IntWithAggregatesFilter<"ProductImage"> | number
    altText?: StringNullableWithAggregatesFilter<"ProductImage"> | string | null
    isPrimary?: BoolWithAggregatesFilter<"ProductImage"> | boolean
  }

  export type ProductAttributeValueWhereInput = {
    AND?: ProductAttributeValueWhereInput | ProductAttributeValueWhereInput[]
    OR?: ProductAttributeValueWhereInput[]
    NOT?: ProductAttributeValueWhereInput | ProductAttributeValueWhereInput[]
    productId?: StringFilter<"ProductAttributeValue"> | string
    attributeId?: StringFilter<"ProductAttributeValue"> | string
    value?: StringFilter<"ProductAttributeValue"> | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }

  export type ProductAttributeValueOrderByWithRelationInput = {
    productId?: SortOrder
    attributeId?: SortOrder
    value?: SortOrder
    product?: ProductOrderByWithRelationInput
  }

  export type ProductAttributeValueWhereUniqueInput = Prisma.AtLeast<{
    productId_attributeId_value?: ProductAttributeValueProductIdAttributeIdValueCompoundUniqueInput
    AND?: ProductAttributeValueWhereInput | ProductAttributeValueWhereInput[]
    OR?: ProductAttributeValueWhereInput[]
    NOT?: ProductAttributeValueWhereInput | ProductAttributeValueWhereInput[]
    productId?: StringFilter<"ProductAttributeValue"> | string
    attributeId?: StringFilter<"ProductAttributeValue"> | string
    value?: StringFilter<"ProductAttributeValue"> | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }, "productId_attributeId_value">

  export type ProductAttributeValueOrderByWithAggregationInput = {
    productId?: SortOrder
    attributeId?: SortOrder
    value?: SortOrder
    _count?: ProductAttributeValueCountOrderByAggregateInput
    _max?: ProductAttributeValueMaxOrderByAggregateInput
    _min?: ProductAttributeValueMinOrderByAggregateInput
  }

  export type ProductAttributeValueScalarWhereWithAggregatesInput = {
    AND?: ProductAttributeValueScalarWhereWithAggregatesInput | ProductAttributeValueScalarWhereWithAggregatesInput[]
    OR?: ProductAttributeValueScalarWhereWithAggregatesInput[]
    NOT?: ProductAttributeValueScalarWhereWithAggregatesInput | ProductAttributeValueScalarWhereWithAggregatesInput[]
    productId?: StringWithAggregatesFilter<"ProductAttributeValue"> | string
    attributeId?: StringWithAggregatesFilter<"ProductAttributeValue"> | string
    value?: StringWithAggregatesFilter<"ProductAttributeValue"> | string
  }

  export type ProductCreateInput = {
    id?: string
    organizationId: string
    businessUnitId: string
    categoryId: string
    code: string
    codeNormalized: string
    title: string
    titleNormalized: string
    shortDescription: string
    description: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    images?: ProductImageCreateNestedManyWithoutProductInput
    attributes?: ProductAttributeValueCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    organizationId: string
    businessUnitId: string
    categoryId: string
    code: string
    codeNormalized: string
    title: string
    titleNormalized: string
    shortDescription: string
    description: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
    attributes?: ProductAttributeValueUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    codeNormalized?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    titleNormalized?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: ProductImageUpdateManyWithoutProductNestedInput
    attributes?: ProductAttributeValueUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    codeNormalized?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    titleNormalized?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
    attributes?: ProductAttributeValueUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    organizationId: string
    businessUnitId: string
    categoryId: string
    code: string
    codeNormalized: string
    title: string
    titleNormalized: string
    shortDescription: string
    description: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    codeNormalized?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    titleNormalized?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    codeNormalized?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    titleNormalized?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProductImageCreateInput = {
    url: string
    displayOrder: number
    altText?: string | null
    isPrimary: boolean
    product: ProductCreateNestedOneWithoutImagesInput
  }

  export type ProductImageUncheckedCreateInput = {
    productId: string
    url: string
    displayOrder: number
    altText?: string | null
    isPrimary: boolean
  }

  export type ProductImageUpdateInput = {
    url?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    product?: ProductUpdateOneRequiredWithoutImagesNestedInput
  }

  export type ProductImageUncheckedUpdateInput = {
    productId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductImageCreateManyInput = {
    productId: string
    url: string
    displayOrder: number
    altText?: string | null
    isPrimary: boolean
  }

  export type ProductImageUpdateManyMutationInput = {
    url?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductImageUncheckedUpdateManyInput = {
    productId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductAttributeValueCreateInput = {
    attributeId: string
    value: string
    product: ProductCreateNestedOneWithoutAttributesInput
  }

  export type ProductAttributeValueUncheckedCreateInput = {
    productId: string
    attributeId: string
    value: string
  }

  export type ProductAttributeValueUpdateInput = {
    attributeId?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    product?: ProductUpdateOneRequiredWithoutAttributesNestedInput
  }

  export type ProductAttributeValueUncheckedUpdateInput = {
    productId?: StringFieldUpdateOperationsInput | string
    attributeId?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ProductAttributeValueCreateManyInput = {
    productId: string
    attributeId: string
    value: string
  }

  export type ProductAttributeValueUpdateManyMutationInput = {
    attributeId?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ProductAttributeValueUncheckedUpdateManyInput = {
    productId?: StringFieldUpdateOperationsInput | string
    attributeId?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
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

  export type ProductImageListRelationFilter = {
    every?: ProductImageWhereInput
    some?: ProductImageWhereInput
    none?: ProductImageWhereInput
  }

  export type ProductAttributeValueListRelationFilter = {
    every?: ProductAttributeValueWhereInput
    some?: ProductAttributeValueWhereInput
    none?: ProductAttributeValueWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProductImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductAttributeValueOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductOrganizationIdCodeNormalizedCompoundUniqueInput = {
    organizationId: string
    codeNormalized: string
  }

  export type ProductBusinessUnitIdTitleNormalizedCompoundUniqueInput = {
    businessUnitId: string
    titleNormalized: string
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    businessUnitId?: SortOrder
    categoryId?: SortOrder
    code?: SortOrder
    codeNormalized?: SortOrder
    title?: SortOrder
    titleNormalized?: SortOrder
    shortDescription?: SortOrder
    description?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    businessUnitId?: SortOrder
    categoryId?: SortOrder
    code?: SortOrder
    codeNormalized?: SortOrder
    title?: SortOrder
    titleNormalized?: SortOrder
    shortDescription?: SortOrder
    description?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    businessUnitId?: SortOrder
    categoryId?: SortOrder
    code?: SortOrder
    codeNormalized?: SortOrder
    title?: SortOrder
    titleNormalized?: SortOrder
    shortDescription?: SortOrder
    description?: SortOrder
    createdBy?: SortOrder
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

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ProductRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type ProductImageProductIdDisplayOrderCompoundUniqueInput = {
    productId: string
    displayOrder: number
  }

  export type ProductImageCountOrderByAggregateInput = {
    productId?: SortOrder
    url?: SortOrder
    displayOrder?: SortOrder
    altText?: SortOrder
    isPrimary?: SortOrder
  }

  export type ProductImageAvgOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type ProductImageMaxOrderByAggregateInput = {
    productId?: SortOrder
    url?: SortOrder
    displayOrder?: SortOrder
    altText?: SortOrder
    isPrimary?: SortOrder
  }

  export type ProductImageMinOrderByAggregateInput = {
    productId?: SortOrder
    url?: SortOrder
    displayOrder?: SortOrder
    altText?: SortOrder
    isPrimary?: SortOrder
  }

  export type ProductImageSumOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ProductAttributeValueProductIdAttributeIdValueCompoundUniqueInput = {
    productId: string
    attributeId: string
    value: string
  }

  export type ProductAttributeValueCountOrderByAggregateInput = {
    productId?: SortOrder
    attributeId?: SortOrder
    value?: SortOrder
  }

  export type ProductAttributeValueMaxOrderByAggregateInput = {
    productId?: SortOrder
    attributeId?: SortOrder
    value?: SortOrder
  }

  export type ProductAttributeValueMinOrderByAggregateInput = {
    productId?: SortOrder
    attributeId?: SortOrder
    value?: SortOrder
  }

  export type ProductImageCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput> | ProductImageCreateWithoutProductInput[] | ProductImageUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductImageCreateOrConnectWithoutProductInput | ProductImageCreateOrConnectWithoutProductInput[]
    createMany?: ProductImageCreateManyProductInputEnvelope
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
  }

  export type ProductAttributeValueCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductAttributeValueCreateWithoutProductInput, ProductAttributeValueUncheckedCreateWithoutProductInput> | ProductAttributeValueCreateWithoutProductInput[] | ProductAttributeValueUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductAttributeValueCreateOrConnectWithoutProductInput | ProductAttributeValueCreateOrConnectWithoutProductInput[]
    createMany?: ProductAttributeValueCreateManyProductInputEnvelope
    connect?: ProductAttributeValueWhereUniqueInput | ProductAttributeValueWhereUniqueInput[]
  }

  export type ProductImageUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput> | ProductImageCreateWithoutProductInput[] | ProductImageUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductImageCreateOrConnectWithoutProductInput | ProductImageCreateOrConnectWithoutProductInput[]
    createMany?: ProductImageCreateManyProductInputEnvelope
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
  }

  export type ProductAttributeValueUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductAttributeValueCreateWithoutProductInput, ProductAttributeValueUncheckedCreateWithoutProductInput> | ProductAttributeValueCreateWithoutProductInput[] | ProductAttributeValueUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductAttributeValueCreateOrConnectWithoutProductInput | ProductAttributeValueCreateOrConnectWithoutProductInput[]
    createMany?: ProductAttributeValueCreateManyProductInputEnvelope
    connect?: ProductAttributeValueWhereUniqueInput | ProductAttributeValueWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ProductImageUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput> | ProductImageCreateWithoutProductInput[] | ProductImageUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductImageCreateOrConnectWithoutProductInput | ProductImageCreateOrConnectWithoutProductInput[]
    upsert?: ProductImageUpsertWithWhereUniqueWithoutProductInput | ProductImageUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductImageCreateManyProductInputEnvelope
    set?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    disconnect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    delete?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    update?: ProductImageUpdateWithWhereUniqueWithoutProductInput | ProductImageUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductImageUpdateManyWithWhereWithoutProductInput | ProductImageUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[]
  }

  export type ProductAttributeValueUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductAttributeValueCreateWithoutProductInput, ProductAttributeValueUncheckedCreateWithoutProductInput> | ProductAttributeValueCreateWithoutProductInput[] | ProductAttributeValueUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductAttributeValueCreateOrConnectWithoutProductInput | ProductAttributeValueCreateOrConnectWithoutProductInput[]
    upsert?: ProductAttributeValueUpsertWithWhereUniqueWithoutProductInput | ProductAttributeValueUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductAttributeValueCreateManyProductInputEnvelope
    set?: ProductAttributeValueWhereUniqueInput | ProductAttributeValueWhereUniqueInput[]
    disconnect?: ProductAttributeValueWhereUniqueInput | ProductAttributeValueWhereUniqueInput[]
    delete?: ProductAttributeValueWhereUniqueInput | ProductAttributeValueWhereUniqueInput[]
    connect?: ProductAttributeValueWhereUniqueInput | ProductAttributeValueWhereUniqueInput[]
    update?: ProductAttributeValueUpdateWithWhereUniqueWithoutProductInput | ProductAttributeValueUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductAttributeValueUpdateManyWithWhereWithoutProductInput | ProductAttributeValueUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductAttributeValueScalarWhereInput | ProductAttributeValueScalarWhereInput[]
  }

  export type ProductImageUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput> | ProductImageCreateWithoutProductInput[] | ProductImageUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductImageCreateOrConnectWithoutProductInput | ProductImageCreateOrConnectWithoutProductInput[]
    upsert?: ProductImageUpsertWithWhereUniqueWithoutProductInput | ProductImageUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductImageCreateManyProductInputEnvelope
    set?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    disconnect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    delete?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    update?: ProductImageUpdateWithWhereUniqueWithoutProductInput | ProductImageUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductImageUpdateManyWithWhereWithoutProductInput | ProductImageUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[]
  }

  export type ProductAttributeValueUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductAttributeValueCreateWithoutProductInput, ProductAttributeValueUncheckedCreateWithoutProductInput> | ProductAttributeValueCreateWithoutProductInput[] | ProductAttributeValueUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductAttributeValueCreateOrConnectWithoutProductInput | ProductAttributeValueCreateOrConnectWithoutProductInput[]
    upsert?: ProductAttributeValueUpsertWithWhereUniqueWithoutProductInput | ProductAttributeValueUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductAttributeValueCreateManyProductInputEnvelope
    set?: ProductAttributeValueWhereUniqueInput | ProductAttributeValueWhereUniqueInput[]
    disconnect?: ProductAttributeValueWhereUniqueInput | ProductAttributeValueWhereUniqueInput[]
    delete?: ProductAttributeValueWhereUniqueInput | ProductAttributeValueWhereUniqueInput[]
    connect?: ProductAttributeValueWhereUniqueInput | ProductAttributeValueWhereUniqueInput[]
    update?: ProductAttributeValueUpdateWithWhereUniqueWithoutProductInput | ProductAttributeValueUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductAttributeValueUpdateManyWithWhereWithoutProductInput | ProductAttributeValueUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductAttributeValueScalarWhereInput | ProductAttributeValueScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutImagesInput = {
    create?: XOR<ProductCreateWithoutImagesInput, ProductUncheckedCreateWithoutImagesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutImagesInput
    connect?: ProductWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ProductUpdateOneRequiredWithoutImagesNestedInput = {
    create?: XOR<ProductCreateWithoutImagesInput, ProductUncheckedCreateWithoutImagesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutImagesInput
    upsert?: ProductUpsertWithoutImagesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutImagesInput, ProductUpdateWithoutImagesInput>, ProductUncheckedUpdateWithoutImagesInput>
  }

  export type ProductCreateNestedOneWithoutAttributesInput = {
    create?: XOR<ProductCreateWithoutAttributesInput, ProductUncheckedCreateWithoutAttributesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutAttributesInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutAttributesNestedInput = {
    create?: XOR<ProductCreateWithoutAttributesInput, ProductUncheckedCreateWithoutAttributesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutAttributesInput
    upsert?: ProductUpsertWithoutAttributesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutAttributesInput, ProductUpdateWithoutAttributesInput>, ProductUncheckedUpdateWithoutAttributesInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ProductImageCreateWithoutProductInput = {
    url: string
    displayOrder: number
    altText?: string | null
    isPrimary: boolean
  }

  export type ProductImageUncheckedCreateWithoutProductInput = {
    url: string
    displayOrder: number
    altText?: string | null
    isPrimary: boolean
  }

  export type ProductImageCreateOrConnectWithoutProductInput = {
    where: ProductImageWhereUniqueInput
    create: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput>
  }

  export type ProductImageCreateManyProductInputEnvelope = {
    data: ProductImageCreateManyProductInput | ProductImageCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type ProductAttributeValueCreateWithoutProductInput = {
    attributeId: string
    value: string
  }

  export type ProductAttributeValueUncheckedCreateWithoutProductInput = {
    attributeId: string
    value: string
  }

  export type ProductAttributeValueCreateOrConnectWithoutProductInput = {
    where: ProductAttributeValueWhereUniqueInput
    create: XOR<ProductAttributeValueCreateWithoutProductInput, ProductAttributeValueUncheckedCreateWithoutProductInput>
  }

  export type ProductAttributeValueCreateManyProductInputEnvelope = {
    data: ProductAttributeValueCreateManyProductInput | ProductAttributeValueCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type ProductImageUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductImageWhereUniqueInput
    update: XOR<ProductImageUpdateWithoutProductInput, ProductImageUncheckedUpdateWithoutProductInput>
    create: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput>
  }

  export type ProductImageUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductImageWhereUniqueInput
    data: XOR<ProductImageUpdateWithoutProductInput, ProductImageUncheckedUpdateWithoutProductInput>
  }

  export type ProductImageUpdateManyWithWhereWithoutProductInput = {
    where: ProductImageScalarWhereInput
    data: XOR<ProductImageUpdateManyMutationInput, ProductImageUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductImageScalarWhereInput = {
    AND?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[]
    OR?: ProductImageScalarWhereInput[]
    NOT?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[]
    productId?: StringFilter<"ProductImage"> | string
    url?: StringFilter<"ProductImage"> | string
    displayOrder?: IntFilter<"ProductImage"> | number
    altText?: StringNullableFilter<"ProductImage"> | string | null
    isPrimary?: BoolFilter<"ProductImage"> | boolean
  }

  export type ProductAttributeValueUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductAttributeValueWhereUniqueInput
    update: XOR<ProductAttributeValueUpdateWithoutProductInput, ProductAttributeValueUncheckedUpdateWithoutProductInput>
    create: XOR<ProductAttributeValueCreateWithoutProductInput, ProductAttributeValueUncheckedCreateWithoutProductInput>
  }

  export type ProductAttributeValueUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductAttributeValueWhereUniqueInput
    data: XOR<ProductAttributeValueUpdateWithoutProductInput, ProductAttributeValueUncheckedUpdateWithoutProductInput>
  }

  export type ProductAttributeValueUpdateManyWithWhereWithoutProductInput = {
    where: ProductAttributeValueScalarWhereInput
    data: XOR<ProductAttributeValueUpdateManyMutationInput, ProductAttributeValueUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductAttributeValueScalarWhereInput = {
    AND?: ProductAttributeValueScalarWhereInput | ProductAttributeValueScalarWhereInput[]
    OR?: ProductAttributeValueScalarWhereInput[]
    NOT?: ProductAttributeValueScalarWhereInput | ProductAttributeValueScalarWhereInput[]
    productId?: StringFilter<"ProductAttributeValue"> | string
    attributeId?: StringFilter<"ProductAttributeValue"> | string
    value?: StringFilter<"ProductAttributeValue"> | string
  }

  export type ProductCreateWithoutImagesInput = {
    id?: string
    organizationId: string
    businessUnitId: string
    categoryId: string
    code: string
    codeNormalized: string
    title: string
    titleNormalized: string
    shortDescription: string
    description: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    attributes?: ProductAttributeValueCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutImagesInput = {
    id?: string
    organizationId: string
    businessUnitId: string
    categoryId: string
    code: string
    codeNormalized: string
    title: string
    titleNormalized: string
    shortDescription: string
    description: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    attributes?: ProductAttributeValueUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutImagesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutImagesInput, ProductUncheckedCreateWithoutImagesInput>
  }

  export type ProductUpsertWithoutImagesInput = {
    update: XOR<ProductUpdateWithoutImagesInput, ProductUncheckedUpdateWithoutImagesInput>
    create: XOR<ProductCreateWithoutImagesInput, ProductUncheckedCreateWithoutImagesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutImagesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutImagesInput, ProductUncheckedUpdateWithoutImagesInput>
  }

  export type ProductUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    codeNormalized?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    titleNormalized?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attributes?: ProductAttributeValueUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    codeNormalized?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    titleNormalized?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attributes?: ProductAttributeValueUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateWithoutAttributesInput = {
    id?: string
    organizationId: string
    businessUnitId: string
    categoryId: string
    code: string
    codeNormalized: string
    title: string
    titleNormalized: string
    shortDescription: string
    description: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    images?: ProductImageCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutAttributesInput = {
    id?: string
    organizationId: string
    businessUnitId: string
    categoryId: string
    code: string
    codeNormalized: string
    title: string
    titleNormalized: string
    shortDescription: string
    description: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string | null
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutAttributesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutAttributesInput, ProductUncheckedCreateWithoutAttributesInput>
  }

  export type ProductUpsertWithoutAttributesInput = {
    update: XOR<ProductUpdateWithoutAttributesInput, ProductUncheckedUpdateWithoutAttributesInput>
    create: XOR<ProductCreateWithoutAttributesInput, ProductUncheckedCreateWithoutAttributesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutAttributesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutAttributesInput, ProductUncheckedUpdateWithoutAttributesInput>
  }

  export type ProductUpdateWithoutAttributesInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    codeNormalized?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    titleNormalized?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: ProductImageUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutAttributesInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    codeNormalized?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    titleNormalized?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductImageCreateManyProductInput = {
    url: string
    displayOrder: number
    altText?: string | null
    isPrimary: boolean
  }

  export type ProductAttributeValueCreateManyProductInput = {
    attributeId: string
    value: string
  }

  export type ProductImageUpdateWithoutProductInput = {
    url?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductImageUncheckedUpdateWithoutProductInput = {
    url?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductImageUncheckedUpdateManyWithoutProductInput = {
    url?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductAttributeValueUpdateWithoutProductInput = {
    attributeId?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ProductAttributeValueUncheckedUpdateWithoutProductInput = {
    attributeId?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ProductAttributeValueUncheckedUpdateManyWithoutProductInput = {
    attributeId?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ProductCountOutputTypeDefaultArgs instead
     */
    export type ProductCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductDefaultArgs instead
     */
    export type ProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductImageDefaultArgs instead
     */
    export type ProductImageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductImageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductAttributeValueDefaultArgs instead
     */
    export type ProductAttributeValueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductAttributeValueDefaultArgs<ExtArgs>

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