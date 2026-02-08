
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
 * Model Cart
 * 
 */
export type Cart = $Result.DefaultSelection<Prisma.$CartPayload>
/**
 * Model CartStatusHistory
 * 
 */
export type CartStatusHistory = $Result.DefaultSelection<Prisma.$CartStatusHistoryPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Carts
 * const carts = await prisma.cart.findMany()
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
   * // Fetch zero or more Carts
   * const carts = await prisma.cart.findMany()
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
   * `prisma.cart`: Exposes CRUD operations for the **Cart** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Carts
    * const carts = await prisma.cart.findMany()
    * ```
    */
  get cart(): Prisma.CartDelegate<ExtArgs>;

  /**
   * `prisma.cartStatusHistory`: Exposes CRUD operations for the **CartStatusHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CartStatusHistories
    * const cartStatusHistories = await prisma.cartStatusHistory.findMany()
    * ```
    */
  get cartStatusHistory(): Prisma.CartStatusHistoryDelegate<ExtArgs>;
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
    Cart: 'Cart',
    CartStatusHistory: 'CartStatusHistory'
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
      modelProps: "cart" | "cartStatusHistory"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Cart: {
        payload: Prisma.$CartPayload<ExtArgs>
        fields: Prisma.CartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          findFirst: {
            args: Prisma.CartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          findMany: {
            args: Prisma.CartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>[]
          }
          create: {
            args: Prisma.CartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          createMany: {
            args: Prisma.CartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          update: {
            args: Prisma.CartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          deleteMany: {
            args: Prisma.CartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          aggregate: {
            args: Prisma.CartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCart>
          }
          groupBy: {
            args: Prisma.CartGroupByArgs<ExtArgs>
            result: $Utils.Optional<CartGroupByOutputType>[]
          }
          count: {
            args: Prisma.CartCountArgs<ExtArgs>
            result: $Utils.Optional<CartCountAggregateOutputType> | number
          }
        }
      }
      CartStatusHistory: {
        payload: Prisma.$CartStatusHistoryPayload<ExtArgs>
        fields: Prisma.CartStatusHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CartStatusHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartStatusHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CartStatusHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartStatusHistoryPayload>
          }
          findFirst: {
            args: Prisma.CartStatusHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartStatusHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CartStatusHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartStatusHistoryPayload>
          }
          findMany: {
            args: Prisma.CartStatusHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartStatusHistoryPayload>[]
          }
          create: {
            args: Prisma.CartStatusHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartStatusHistoryPayload>
          }
          createMany: {
            args: Prisma.CartStatusHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CartStatusHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartStatusHistoryPayload>
          }
          update: {
            args: Prisma.CartStatusHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartStatusHistoryPayload>
          }
          deleteMany: {
            args: Prisma.CartStatusHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CartStatusHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CartStatusHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartStatusHistoryPayload>
          }
          aggregate: {
            args: Prisma.CartStatusHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCartStatusHistory>
          }
          groupBy: {
            args: Prisma.CartStatusHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CartStatusHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CartStatusHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<CartStatusHistoryCountAggregateOutputType> | number
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
   * Count Type CartCountOutputType
   */

  export type CartCountOutputType = {
    statusHistory: number
  }

  export type CartCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    statusHistory?: boolean | CartCountOutputTypeCountStatusHistoryArgs
  }

  // Custom InputTypes
  /**
   * CartCountOutputType without action
   */
  export type CartCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartCountOutputType
     */
    select?: CartCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CartCountOutputType without action
   */
  export type CartCountOutputTypeCountStatusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartStatusHistoryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Cart
   */

  export type AggregateCart = {
    _count: CartCountAggregateOutputType | null
    _avg: CartAvgAggregateOutputType | null
    _sum: CartSumAggregateOutputType | null
    _min: CartMinAggregateOutputType | null
    _max: CartMaxAggregateOutputType | null
  }

  export type CartAvgAggregateOutputType = {
    deliveryPrice: number | null
  }

  export type CartSumAggregateOutputType = {
    deliveryPrice: number | null
  }

  export type CartMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    verticalId: string | null
    businessUnitId: string | null
    status: string | null
    openedAt: Date | null
    lastMovementAt: Date | null
    closedAt: Date | null
    paymentMethod: string | null
    paymentId: string | null
    paymentObservation: string | null
    paymentPreferenceId: string | null
    quoteId: string | null
    deliveryPlanId: string | null
    deliveryAddressId: string | null
    deliveryPrice: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CartMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    verticalId: string | null
    businessUnitId: string | null
    status: string | null
    openedAt: Date | null
    lastMovementAt: Date | null
    closedAt: Date | null
    paymentMethod: string | null
    paymentId: string | null
    paymentObservation: string | null
    paymentPreferenceId: string | null
    quoteId: string | null
    deliveryPlanId: string | null
    deliveryAddressId: string | null
    deliveryPrice: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CartCountAggregateOutputType = {
    id: number
    customerId: number
    verticalId: number
    businessUnitId: number
    status: number
    openedAt: number
    lastMovementAt: number
    closedAt: number
    paymentMethod: number
    paymentId: number
    paymentObservation: number
    paymentPreferenceId: number
    quoteId: number
    deliveryPlanId: number
    deliveryAddressId: number
    deliveryPrice: number
    items: number
    coupons: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CartAvgAggregateInputType = {
    deliveryPrice?: true
  }

  export type CartSumAggregateInputType = {
    deliveryPrice?: true
  }

  export type CartMinAggregateInputType = {
    id?: true
    customerId?: true
    verticalId?: true
    businessUnitId?: true
    status?: true
    openedAt?: true
    lastMovementAt?: true
    closedAt?: true
    paymentMethod?: true
    paymentId?: true
    paymentObservation?: true
    paymentPreferenceId?: true
    quoteId?: true
    deliveryPlanId?: true
    deliveryAddressId?: true
    deliveryPrice?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CartMaxAggregateInputType = {
    id?: true
    customerId?: true
    verticalId?: true
    businessUnitId?: true
    status?: true
    openedAt?: true
    lastMovementAt?: true
    closedAt?: true
    paymentMethod?: true
    paymentId?: true
    paymentObservation?: true
    paymentPreferenceId?: true
    quoteId?: true
    deliveryPlanId?: true
    deliveryAddressId?: true
    deliveryPrice?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CartCountAggregateInputType = {
    id?: true
    customerId?: true
    verticalId?: true
    businessUnitId?: true
    status?: true
    openedAt?: true
    lastMovementAt?: true
    closedAt?: true
    paymentMethod?: true
    paymentId?: true
    paymentObservation?: true
    paymentPreferenceId?: true
    quoteId?: true
    deliveryPlanId?: true
    deliveryAddressId?: true
    deliveryPrice?: true
    items?: true
    coupons?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cart to aggregate.
     */
    where?: CartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carts to fetch.
     */
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Carts
    **/
    _count?: true | CartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CartMaxAggregateInputType
  }

  export type GetCartAggregateType<T extends CartAggregateArgs> = {
        [P in keyof T & keyof AggregateCart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCart[P]>
      : GetScalarType<T[P], AggregateCart[P]>
  }




  export type CartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartWhereInput
    orderBy?: CartOrderByWithAggregationInput | CartOrderByWithAggregationInput[]
    by: CartScalarFieldEnum[] | CartScalarFieldEnum
    having?: CartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CartCountAggregateInputType | true
    _avg?: CartAvgAggregateInputType
    _sum?: CartSumAggregateInputType
    _min?: CartMinAggregateInputType
    _max?: CartMaxAggregateInputType
  }

  export type CartGroupByOutputType = {
    id: string
    customerId: string
    verticalId: string
    businessUnitId: string
    status: string
    openedAt: Date
    lastMovementAt: Date
    closedAt: Date | null
    paymentMethod: string | null
    paymentId: string | null
    paymentObservation: string | null
    paymentPreferenceId: string | null
    quoteId: string | null
    deliveryPlanId: string | null
    deliveryAddressId: string | null
    deliveryPrice: number | null
    items: JsonValue | null
    coupons: JsonValue | null
    createdAt: Date
    updatedAt: Date | null
    _count: CartCountAggregateOutputType | null
    _avg: CartAvgAggregateOutputType | null
    _sum: CartSumAggregateOutputType | null
    _min: CartMinAggregateOutputType | null
    _max: CartMaxAggregateOutputType | null
  }

  type GetCartGroupByPayload<T extends CartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CartGroupByOutputType[P]>
            : GetScalarType<T[P], CartGroupByOutputType[P]>
        }
      >
    >


  export type CartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    verticalId?: boolean
    businessUnitId?: boolean
    status?: boolean
    openedAt?: boolean
    lastMovementAt?: boolean
    closedAt?: boolean
    paymentMethod?: boolean
    paymentId?: boolean
    paymentObservation?: boolean
    paymentPreferenceId?: boolean
    quoteId?: boolean
    deliveryPlanId?: boolean
    deliveryAddressId?: boolean
    deliveryPrice?: boolean
    items?: boolean
    coupons?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    statusHistory?: boolean | Cart$statusHistoryArgs<ExtArgs>
    _count?: boolean | CartCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cart"]>


  export type CartSelectScalar = {
    id?: boolean
    customerId?: boolean
    verticalId?: boolean
    businessUnitId?: boolean
    status?: boolean
    openedAt?: boolean
    lastMovementAt?: boolean
    closedAt?: boolean
    paymentMethod?: boolean
    paymentId?: boolean
    paymentObservation?: boolean
    paymentPreferenceId?: boolean
    quoteId?: boolean
    deliveryPlanId?: boolean
    deliveryAddressId?: boolean
    deliveryPrice?: boolean
    items?: boolean
    coupons?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    statusHistory?: boolean | Cart$statusHistoryArgs<ExtArgs>
    _count?: boolean | CartCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cart"
    objects: {
      statusHistory: Prisma.$CartStatusHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string
      verticalId: string
      businessUnitId: string
      status: string
      openedAt: Date
      lastMovementAt: Date
      closedAt: Date | null
      paymentMethod: string | null
      paymentId: string | null
      paymentObservation: string | null
      paymentPreferenceId: string | null
      quoteId: string | null
      deliveryPlanId: string | null
      deliveryAddressId: string | null
      deliveryPrice: number | null
      items: Prisma.JsonValue | null
      coupons: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date | null
    }, ExtArgs["result"]["cart"]>
    composites: {}
  }

  type CartGetPayload<S extends boolean | null | undefined | CartDefaultArgs> = $Result.GetResult<Prisma.$CartPayload, S>

  type CartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CartFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CartCountAggregateInputType | true
    }

  export interface CartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cart'], meta: { name: 'Cart' } }
    /**
     * Find zero or one Cart that matches the filter.
     * @param {CartFindUniqueArgs} args - Arguments to find a Cart
     * @example
     * // Get one Cart
     * const cart = await prisma.cart.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CartFindUniqueArgs>(args: SelectSubset<T, CartFindUniqueArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Cart that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CartFindUniqueOrThrowArgs} args - Arguments to find a Cart
     * @example
     * // Get one Cart
     * const cart = await prisma.cart.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CartFindUniqueOrThrowArgs>(args: SelectSubset<T, CartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Cart that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartFindFirstArgs} args - Arguments to find a Cart
     * @example
     * // Get one Cart
     * const cart = await prisma.cart.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CartFindFirstArgs>(args?: SelectSubset<T, CartFindFirstArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Cart that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartFindFirstOrThrowArgs} args - Arguments to find a Cart
     * @example
     * // Get one Cart
     * const cart = await prisma.cart.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CartFindFirstOrThrowArgs>(args?: SelectSubset<T, CartFindFirstOrThrowArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Carts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Carts
     * const carts = await prisma.cart.findMany()
     * 
     * // Get first 10 Carts
     * const carts = await prisma.cart.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cartWithIdOnly = await prisma.cart.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CartFindManyArgs>(args?: SelectSubset<T, CartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Cart.
     * @param {CartCreateArgs} args - Arguments to create a Cart.
     * @example
     * // Create one Cart
     * const Cart = await prisma.cart.create({
     *   data: {
     *     // ... data to create a Cart
     *   }
     * })
     * 
     */
    create<T extends CartCreateArgs>(args: SelectSubset<T, CartCreateArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Carts.
     * @param {CartCreateManyArgs} args - Arguments to create many Carts.
     * @example
     * // Create many Carts
     * const cart = await prisma.cart.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CartCreateManyArgs>(args?: SelectSubset<T, CartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Cart.
     * @param {CartDeleteArgs} args - Arguments to delete one Cart.
     * @example
     * // Delete one Cart
     * const Cart = await prisma.cart.delete({
     *   where: {
     *     // ... filter to delete one Cart
     *   }
     * })
     * 
     */
    delete<T extends CartDeleteArgs>(args: SelectSubset<T, CartDeleteArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Cart.
     * @param {CartUpdateArgs} args - Arguments to update one Cart.
     * @example
     * // Update one Cart
     * const cart = await prisma.cart.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CartUpdateArgs>(args: SelectSubset<T, CartUpdateArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Carts.
     * @param {CartDeleteManyArgs} args - Arguments to filter Carts to delete.
     * @example
     * // Delete a few Carts
     * const { count } = await prisma.cart.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CartDeleteManyArgs>(args?: SelectSubset<T, CartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Carts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Carts
     * const cart = await prisma.cart.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CartUpdateManyArgs>(args: SelectSubset<T, CartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Cart.
     * @param {CartUpsertArgs} args - Arguments to update or create a Cart.
     * @example
     * // Update or create a Cart
     * const cart = await prisma.cart.upsert({
     *   create: {
     *     // ... data to create a Cart
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cart we want to update
     *   }
     * })
     */
    upsert<T extends CartUpsertArgs>(args: SelectSubset<T, CartUpsertArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Carts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartCountArgs} args - Arguments to filter Carts to count.
     * @example
     * // Count the number of Carts
     * const count = await prisma.cart.count({
     *   where: {
     *     // ... the filter for the Carts we want to count
     *   }
     * })
    **/
    count<T extends CartCountArgs>(
      args?: Subset<T, CartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CartAggregateArgs>(args: Subset<T, CartAggregateArgs>): Prisma.PrismaPromise<GetCartAggregateType<T>>

    /**
     * Group by Cart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartGroupByArgs} args - Group by arguments.
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
      T extends CartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CartGroupByArgs['orderBy'] }
        : { orderBy?: CartGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Cart model
   */
  readonly fields: CartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cart.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    statusHistory<T extends Cart$statusHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Cart$statusHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartStatusHistoryPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Cart model
   */ 
  interface CartFieldRefs {
    readonly id: FieldRef<"Cart", 'String'>
    readonly customerId: FieldRef<"Cart", 'String'>
    readonly verticalId: FieldRef<"Cart", 'String'>
    readonly businessUnitId: FieldRef<"Cart", 'String'>
    readonly status: FieldRef<"Cart", 'String'>
    readonly openedAt: FieldRef<"Cart", 'DateTime'>
    readonly lastMovementAt: FieldRef<"Cart", 'DateTime'>
    readonly closedAt: FieldRef<"Cart", 'DateTime'>
    readonly paymentMethod: FieldRef<"Cart", 'String'>
    readonly paymentId: FieldRef<"Cart", 'String'>
    readonly paymentObservation: FieldRef<"Cart", 'String'>
    readonly paymentPreferenceId: FieldRef<"Cart", 'String'>
    readonly quoteId: FieldRef<"Cart", 'String'>
    readonly deliveryPlanId: FieldRef<"Cart", 'String'>
    readonly deliveryAddressId: FieldRef<"Cart", 'String'>
    readonly deliveryPrice: FieldRef<"Cart", 'Float'>
    readonly items: FieldRef<"Cart", 'Json'>
    readonly coupons: FieldRef<"Cart", 'Json'>
    readonly createdAt: FieldRef<"Cart", 'DateTime'>
    readonly updatedAt: FieldRef<"Cart", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Cart findUnique
   */
  export type CartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Cart to fetch.
     */
    where: CartWhereUniqueInput
  }

  /**
   * Cart findUniqueOrThrow
   */
  export type CartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Cart to fetch.
     */
    where: CartWhereUniqueInput
  }

  /**
   * Cart findFirst
   */
  export type CartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Cart to fetch.
     */
    where?: CartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carts to fetch.
     */
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Carts.
     */
    cursor?: CartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Carts.
     */
    distinct?: CartScalarFieldEnum | CartScalarFieldEnum[]
  }

  /**
   * Cart findFirstOrThrow
   */
  export type CartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Cart to fetch.
     */
    where?: CartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carts to fetch.
     */
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Carts.
     */
    cursor?: CartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Carts.
     */
    distinct?: CartScalarFieldEnum | CartScalarFieldEnum[]
  }

  /**
   * Cart findMany
   */
  export type CartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Carts to fetch.
     */
    where?: CartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carts to fetch.
     */
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Carts.
     */
    cursor?: CartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carts.
     */
    skip?: number
    distinct?: CartScalarFieldEnum | CartScalarFieldEnum[]
  }

  /**
   * Cart create
   */
  export type CartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * The data needed to create a Cart.
     */
    data: XOR<CartCreateInput, CartUncheckedCreateInput>
  }

  /**
   * Cart createMany
   */
  export type CartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Carts.
     */
    data: CartCreateManyInput | CartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cart update
   */
  export type CartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * The data needed to update a Cart.
     */
    data: XOR<CartUpdateInput, CartUncheckedUpdateInput>
    /**
     * Choose, which Cart to update.
     */
    where: CartWhereUniqueInput
  }

  /**
   * Cart updateMany
   */
  export type CartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Carts.
     */
    data: XOR<CartUpdateManyMutationInput, CartUncheckedUpdateManyInput>
    /**
     * Filter which Carts to update
     */
    where?: CartWhereInput
  }

  /**
   * Cart upsert
   */
  export type CartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * The filter to search for the Cart to update in case it exists.
     */
    where: CartWhereUniqueInput
    /**
     * In case the Cart found by the `where` argument doesn't exist, create a new Cart with this data.
     */
    create: XOR<CartCreateInput, CartUncheckedCreateInput>
    /**
     * In case the Cart was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CartUpdateInput, CartUncheckedUpdateInput>
  }

  /**
   * Cart delete
   */
  export type CartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter which Cart to delete.
     */
    where: CartWhereUniqueInput
  }

  /**
   * Cart deleteMany
   */
  export type CartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Carts to delete
     */
    where?: CartWhereInput
  }

  /**
   * Cart.statusHistory
   */
  export type Cart$statusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartStatusHistory
     */
    select?: CartStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartStatusHistoryInclude<ExtArgs> | null
    where?: CartStatusHistoryWhereInput
    orderBy?: CartStatusHistoryOrderByWithRelationInput | CartStatusHistoryOrderByWithRelationInput[]
    cursor?: CartStatusHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CartStatusHistoryScalarFieldEnum | CartStatusHistoryScalarFieldEnum[]
  }

  /**
   * Cart without action
   */
  export type CartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
  }


  /**
   * Model CartStatusHistory
   */

  export type AggregateCartStatusHistory = {
    _count: CartStatusHistoryCountAggregateOutputType | null
    _avg: CartStatusHistoryAvgAggregateOutputType | null
    _sum: CartStatusHistorySumAggregateOutputType | null
    _min: CartStatusHistoryMinAggregateOutputType | null
    _max: CartStatusHistoryMaxAggregateOutputType | null
  }

  export type CartStatusHistoryAvgAggregateOutputType = {
    durationMs: number | null
  }

  export type CartStatusHistorySumAggregateOutputType = {
    durationMs: number | null
  }

  export type CartStatusHistoryMinAggregateOutputType = {
    id: string | null
    cartId: string | null
    status: string | null
    changedAt: Date | null
    durationMs: number | null
    createdAt: Date | null
  }

  export type CartStatusHistoryMaxAggregateOutputType = {
    id: string | null
    cartId: string | null
    status: string | null
    changedAt: Date | null
    durationMs: number | null
    createdAt: Date | null
  }

  export type CartStatusHistoryCountAggregateOutputType = {
    id: number
    cartId: number
    status: number
    changedAt: number
    durationMs: number
    createdAt: number
    _all: number
  }


  export type CartStatusHistoryAvgAggregateInputType = {
    durationMs?: true
  }

  export type CartStatusHistorySumAggregateInputType = {
    durationMs?: true
  }

  export type CartStatusHistoryMinAggregateInputType = {
    id?: true
    cartId?: true
    status?: true
    changedAt?: true
    durationMs?: true
    createdAt?: true
  }

  export type CartStatusHistoryMaxAggregateInputType = {
    id?: true
    cartId?: true
    status?: true
    changedAt?: true
    durationMs?: true
    createdAt?: true
  }

  export type CartStatusHistoryCountAggregateInputType = {
    id?: true
    cartId?: true
    status?: true
    changedAt?: true
    durationMs?: true
    createdAt?: true
    _all?: true
  }

  export type CartStatusHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CartStatusHistory to aggregate.
     */
    where?: CartStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartStatusHistories to fetch.
     */
    orderBy?: CartStatusHistoryOrderByWithRelationInput | CartStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CartStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CartStatusHistories
    **/
    _count?: true | CartStatusHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CartStatusHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CartStatusHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CartStatusHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CartStatusHistoryMaxAggregateInputType
  }

  export type GetCartStatusHistoryAggregateType<T extends CartStatusHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCartStatusHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCartStatusHistory[P]>
      : GetScalarType<T[P], AggregateCartStatusHistory[P]>
  }




  export type CartStatusHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartStatusHistoryWhereInput
    orderBy?: CartStatusHistoryOrderByWithAggregationInput | CartStatusHistoryOrderByWithAggregationInput[]
    by: CartStatusHistoryScalarFieldEnum[] | CartStatusHistoryScalarFieldEnum
    having?: CartStatusHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CartStatusHistoryCountAggregateInputType | true
    _avg?: CartStatusHistoryAvgAggregateInputType
    _sum?: CartStatusHistorySumAggregateInputType
    _min?: CartStatusHistoryMinAggregateInputType
    _max?: CartStatusHistoryMaxAggregateInputType
  }

  export type CartStatusHistoryGroupByOutputType = {
    id: string
    cartId: string
    status: string
    changedAt: Date
    durationMs: number | null
    createdAt: Date
    _count: CartStatusHistoryCountAggregateOutputType | null
    _avg: CartStatusHistoryAvgAggregateOutputType | null
    _sum: CartStatusHistorySumAggregateOutputType | null
    _min: CartStatusHistoryMinAggregateOutputType | null
    _max: CartStatusHistoryMaxAggregateOutputType | null
  }

  type GetCartStatusHistoryGroupByPayload<T extends CartStatusHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CartStatusHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CartStatusHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CartStatusHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], CartStatusHistoryGroupByOutputType[P]>
        }
      >
    >


  export type CartStatusHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cartId?: boolean
    status?: boolean
    changedAt?: boolean
    durationMs?: boolean
    createdAt?: boolean
    cart?: boolean | CartDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cartStatusHistory"]>


  export type CartStatusHistorySelectScalar = {
    id?: boolean
    cartId?: boolean
    status?: boolean
    changedAt?: boolean
    durationMs?: boolean
    createdAt?: boolean
  }

  export type CartStatusHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cart?: boolean | CartDefaultArgs<ExtArgs>
  }

  export type $CartStatusHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CartStatusHistory"
    objects: {
      cart: Prisma.$CartPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      cartId: string
      status: string
      changedAt: Date
      durationMs: number | null
      createdAt: Date
    }, ExtArgs["result"]["cartStatusHistory"]>
    composites: {}
  }

  type CartStatusHistoryGetPayload<S extends boolean | null | undefined | CartStatusHistoryDefaultArgs> = $Result.GetResult<Prisma.$CartStatusHistoryPayload, S>

  type CartStatusHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CartStatusHistoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CartStatusHistoryCountAggregateInputType | true
    }

  export interface CartStatusHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CartStatusHistory'], meta: { name: 'CartStatusHistory' } }
    /**
     * Find zero or one CartStatusHistory that matches the filter.
     * @param {CartStatusHistoryFindUniqueArgs} args - Arguments to find a CartStatusHistory
     * @example
     * // Get one CartStatusHistory
     * const cartStatusHistory = await prisma.cartStatusHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CartStatusHistoryFindUniqueArgs>(args: SelectSubset<T, CartStatusHistoryFindUniqueArgs<ExtArgs>>): Prisma__CartStatusHistoryClient<$Result.GetResult<Prisma.$CartStatusHistoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CartStatusHistory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CartStatusHistoryFindUniqueOrThrowArgs} args - Arguments to find a CartStatusHistory
     * @example
     * // Get one CartStatusHistory
     * const cartStatusHistory = await prisma.cartStatusHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CartStatusHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CartStatusHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CartStatusHistoryClient<$Result.GetResult<Prisma.$CartStatusHistoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CartStatusHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartStatusHistoryFindFirstArgs} args - Arguments to find a CartStatusHistory
     * @example
     * // Get one CartStatusHistory
     * const cartStatusHistory = await prisma.cartStatusHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CartStatusHistoryFindFirstArgs>(args?: SelectSubset<T, CartStatusHistoryFindFirstArgs<ExtArgs>>): Prisma__CartStatusHistoryClient<$Result.GetResult<Prisma.$CartStatusHistoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CartStatusHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartStatusHistoryFindFirstOrThrowArgs} args - Arguments to find a CartStatusHistory
     * @example
     * // Get one CartStatusHistory
     * const cartStatusHistory = await prisma.cartStatusHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CartStatusHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CartStatusHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CartStatusHistoryClient<$Result.GetResult<Prisma.$CartStatusHistoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CartStatusHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartStatusHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CartStatusHistories
     * const cartStatusHistories = await prisma.cartStatusHistory.findMany()
     * 
     * // Get first 10 CartStatusHistories
     * const cartStatusHistories = await prisma.cartStatusHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cartStatusHistoryWithIdOnly = await prisma.cartStatusHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CartStatusHistoryFindManyArgs>(args?: SelectSubset<T, CartStatusHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartStatusHistoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CartStatusHistory.
     * @param {CartStatusHistoryCreateArgs} args - Arguments to create a CartStatusHistory.
     * @example
     * // Create one CartStatusHistory
     * const CartStatusHistory = await prisma.cartStatusHistory.create({
     *   data: {
     *     // ... data to create a CartStatusHistory
     *   }
     * })
     * 
     */
    create<T extends CartStatusHistoryCreateArgs>(args: SelectSubset<T, CartStatusHistoryCreateArgs<ExtArgs>>): Prisma__CartStatusHistoryClient<$Result.GetResult<Prisma.$CartStatusHistoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CartStatusHistories.
     * @param {CartStatusHistoryCreateManyArgs} args - Arguments to create many CartStatusHistories.
     * @example
     * // Create many CartStatusHistories
     * const cartStatusHistory = await prisma.cartStatusHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CartStatusHistoryCreateManyArgs>(args?: SelectSubset<T, CartStatusHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CartStatusHistory.
     * @param {CartStatusHistoryDeleteArgs} args - Arguments to delete one CartStatusHistory.
     * @example
     * // Delete one CartStatusHistory
     * const CartStatusHistory = await prisma.cartStatusHistory.delete({
     *   where: {
     *     // ... filter to delete one CartStatusHistory
     *   }
     * })
     * 
     */
    delete<T extends CartStatusHistoryDeleteArgs>(args: SelectSubset<T, CartStatusHistoryDeleteArgs<ExtArgs>>): Prisma__CartStatusHistoryClient<$Result.GetResult<Prisma.$CartStatusHistoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CartStatusHistory.
     * @param {CartStatusHistoryUpdateArgs} args - Arguments to update one CartStatusHistory.
     * @example
     * // Update one CartStatusHistory
     * const cartStatusHistory = await prisma.cartStatusHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CartStatusHistoryUpdateArgs>(args: SelectSubset<T, CartStatusHistoryUpdateArgs<ExtArgs>>): Prisma__CartStatusHistoryClient<$Result.GetResult<Prisma.$CartStatusHistoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CartStatusHistories.
     * @param {CartStatusHistoryDeleteManyArgs} args - Arguments to filter CartStatusHistories to delete.
     * @example
     * // Delete a few CartStatusHistories
     * const { count } = await prisma.cartStatusHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CartStatusHistoryDeleteManyArgs>(args?: SelectSubset<T, CartStatusHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CartStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartStatusHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CartStatusHistories
     * const cartStatusHistory = await prisma.cartStatusHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CartStatusHistoryUpdateManyArgs>(args: SelectSubset<T, CartStatusHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CartStatusHistory.
     * @param {CartStatusHistoryUpsertArgs} args - Arguments to update or create a CartStatusHistory.
     * @example
     * // Update or create a CartStatusHistory
     * const cartStatusHistory = await prisma.cartStatusHistory.upsert({
     *   create: {
     *     // ... data to create a CartStatusHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CartStatusHistory we want to update
     *   }
     * })
     */
    upsert<T extends CartStatusHistoryUpsertArgs>(args: SelectSubset<T, CartStatusHistoryUpsertArgs<ExtArgs>>): Prisma__CartStatusHistoryClient<$Result.GetResult<Prisma.$CartStatusHistoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CartStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartStatusHistoryCountArgs} args - Arguments to filter CartStatusHistories to count.
     * @example
     * // Count the number of CartStatusHistories
     * const count = await prisma.cartStatusHistory.count({
     *   where: {
     *     // ... the filter for the CartStatusHistories we want to count
     *   }
     * })
    **/
    count<T extends CartStatusHistoryCountArgs>(
      args?: Subset<T, CartStatusHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CartStatusHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CartStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartStatusHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CartStatusHistoryAggregateArgs>(args: Subset<T, CartStatusHistoryAggregateArgs>): Prisma.PrismaPromise<GetCartStatusHistoryAggregateType<T>>

    /**
     * Group by CartStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartStatusHistoryGroupByArgs} args - Group by arguments.
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
      T extends CartStatusHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CartStatusHistoryGroupByArgs['orderBy'] }
        : { orderBy?: CartStatusHistoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CartStatusHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCartStatusHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CartStatusHistory model
   */
  readonly fields: CartStatusHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CartStatusHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CartStatusHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cart<T extends CartDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CartDefaultArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the CartStatusHistory model
   */ 
  interface CartStatusHistoryFieldRefs {
    readonly id: FieldRef<"CartStatusHistory", 'String'>
    readonly cartId: FieldRef<"CartStatusHistory", 'String'>
    readonly status: FieldRef<"CartStatusHistory", 'String'>
    readonly changedAt: FieldRef<"CartStatusHistory", 'DateTime'>
    readonly durationMs: FieldRef<"CartStatusHistory", 'Int'>
    readonly createdAt: FieldRef<"CartStatusHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CartStatusHistory findUnique
   */
  export type CartStatusHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartStatusHistory
     */
    select?: CartStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which CartStatusHistory to fetch.
     */
    where: CartStatusHistoryWhereUniqueInput
  }

  /**
   * CartStatusHistory findUniqueOrThrow
   */
  export type CartStatusHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartStatusHistory
     */
    select?: CartStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which CartStatusHistory to fetch.
     */
    where: CartStatusHistoryWhereUniqueInput
  }

  /**
   * CartStatusHistory findFirst
   */
  export type CartStatusHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartStatusHistory
     */
    select?: CartStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which CartStatusHistory to fetch.
     */
    where?: CartStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartStatusHistories to fetch.
     */
    orderBy?: CartStatusHistoryOrderByWithRelationInput | CartStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CartStatusHistories.
     */
    cursor?: CartStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CartStatusHistories.
     */
    distinct?: CartStatusHistoryScalarFieldEnum | CartStatusHistoryScalarFieldEnum[]
  }

  /**
   * CartStatusHistory findFirstOrThrow
   */
  export type CartStatusHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartStatusHistory
     */
    select?: CartStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which CartStatusHistory to fetch.
     */
    where?: CartStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartStatusHistories to fetch.
     */
    orderBy?: CartStatusHistoryOrderByWithRelationInput | CartStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CartStatusHistories.
     */
    cursor?: CartStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CartStatusHistories.
     */
    distinct?: CartStatusHistoryScalarFieldEnum | CartStatusHistoryScalarFieldEnum[]
  }

  /**
   * CartStatusHistory findMany
   */
  export type CartStatusHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartStatusHistory
     */
    select?: CartStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which CartStatusHistories to fetch.
     */
    where?: CartStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartStatusHistories to fetch.
     */
    orderBy?: CartStatusHistoryOrderByWithRelationInput | CartStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CartStatusHistories.
     */
    cursor?: CartStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartStatusHistories.
     */
    skip?: number
    distinct?: CartStatusHistoryScalarFieldEnum | CartStatusHistoryScalarFieldEnum[]
  }

  /**
   * CartStatusHistory create
   */
  export type CartStatusHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartStatusHistory
     */
    select?: CartStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a CartStatusHistory.
     */
    data: XOR<CartStatusHistoryCreateInput, CartStatusHistoryUncheckedCreateInput>
  }

  /**
   * CartStatusHistory createMany
   */
  export type CartStatusHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CartStatusHistories.
     */
    data: CartStatusHistoryCreateManyInput | CartStatusHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CartStatusHistory update
   */
  export type CartStatusHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartStatusHistory
     */
    select?: CartStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a CartStatusHistory.
     */
    data: XOR<CartStatusHistoryUpdateInput, CartStatusHistoryUncheckedUpdateInput>
    /**
     * Choose, which CartStatusHistory to update.
     */
    where: CartStatusHistoryWhereUniqueInput
  }

  /**
   * CartStatusHistory updateMany
   */
  export type CartStatusHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CartStatusHistories.
     */
    data: XOR<CartStatusHistoryUpdateManyMutationInput, CartStatusHistoryUncheckedUpdateManyInput>
    /**
     * Filter which CartStatusHistories to update
     */
    where?: CartStatusHistoryWhereInput
  }

  /**
   * CartStatusHistory upsert
   */
  export type CartStatusHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartStatusHistory
     */
    select?: CartStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartStatusHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the CartStatusHistory to update in case it exists.
     */
    where: CartStatusHistoryWhereUniqueInput
    /**
     * In case the CartStatusHistory found by the `where` argument doesn't exist, create a new CartStatusHistory with this data.
     */
    create: XOR<CartStatusHistoryCreateInput, CartStatusHistoryUncheckedCreateInput>
    /**
     * In case the CartStatusHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CartStatusHistoryUpdateInput, CartStatusHistoryUncheckedUpdateInput>
  }

  /**
   * CartStatusHistory delete
   */
  export type CartStatusHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartStatusHistory
     */
    select?: CartStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter which CartStatusHistory to delete.
     */
    where: CartStatusHistoryWhereUniqueInput
  }

  /**
   * CartStatusHistory deleteMany
   */
  export type CartStatusHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CartStatusHistories to delete
     */
    where?: CartStatusHistoryWhereInput
  }

  /**
   * CartStatusHistory without action
   */
  export type CartStatusHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartStatusHistory
     */
    select?: CartStatusHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartStatusHistoryInclude<ExtArgs> | null
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


  export const CartScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    verticalId: 'verticalId',
    businessUnitId: 'businessUnitId',
    status: 'status',
    openedAt: 'openedAt',
    lastMovementAt: 'lastMovementAt',
    closedAt: 'closedAt',
    paymentMethod: 'paymentMethod',
    paymentId: 'paymentId',
    paymentObservation: 'paymentObservation',
    paymentPreferenceId: 'paymentPreferenceId',
    quoteId: 'quoteId',
    deliveryPlanId: 'deliveryPlanId',
    deliveryAddressId: 'deliveryAddressId',
    deliveryPrice: 'deliveryPrice',
    items: 'items',
    coupons: 'coupons',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CartScalarFieldEnum = (typeof CartScalarFieldEnum)[keyof typeof CartScalarFieldEnum]


  export const CartStatusHistoryScalarFieldEnum: {
    id: 'id',
    cartId: 'cartId',
    status: 'status',
    changedAt: 'changedAt',
    durationMs: 'durationMs',
    createdAt: 'createdAt'
  };

  export type CartStatusHistoryScalarFieldEnum = (typeof CartStatusHistoryScalarFieldEnum)[keyof typeof CartStatusHistoryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type CartWhereInput = {
    AND?: CartWhereInput | CartWhereInput[]
    OR?: CartWhereInput[]
    NOT?: CartWhereInput | CartWhereInput[]
    id?: StringFilter<"Cart"> | string
    customerId?: StringFilter<"Cart"> | string
    verticalId?: StringFilter<"Cart"> | string
    businessUnitId?: StringFilter<"Cart"> | string
    status?: StringFilter<"Cart"> | string
    openedAt?: DateTimeFilter<"Cart"> | Date | string
    lastMovementAt?: DateTimeFilter<"Cart"> | Date | string
    closedAt?: DateTimeNullableFilter<"Cart"> | Date | string | null
    paymentMethod?: StringNullableFilter<"Cart"> | string | null
    paymentId?: StringNullableFilter<"Cart"> | string | null
    paymentObservation?: StringNullableFilter<"Cart"> | string | null
    paymentPreferenceId?: StringNullableFilter<"Cart"> | string | null
    quoteId?: StringNullableFilter<"Cart"> | string | null
    deliveryPlanId?: StringNullableFilter<"Cart"> | string | null
    deliveryAddressId?: StringNullableFilter<"Cart"> | string | null
    deliveryPrice?: FloatNullableFilter<"Cart"> | number | null
    items?: JsonNullableFilter<"Cart">
    coupons?: JsonNullableFilter<"Cart">
    createdAt?: DateTimeFilter<"Cart"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Cart"> | Date | string | null
    statusHistory?: CartStatusHistoryListRelationFilter
  }

  export type CartOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    verticalId?: SortOrder
    businessUnitId?: SortOrder
    status?: SortOrder
    openedAt?: SortOrder
    lastMovementAt?: SortOrder
    closedAt?: SortOrderInput | SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    paymentId?: SortOrderInput | SortOrder
    paymentObservation?: SortOrderInput | SortOrder
    paymentPreferenceId?: SortOrderInput | SortOrder
    quoteId?: SortOrderInput | SortOrder
    deliveryPlanId?: SortOrderInput | SortOrder
    deliveryAddressId?: SortOrderInput | SortOrder
    deliveryPrice?: SortOrderInput | SortOrder
    items?: SortOrderInput | SortOrder
    coupons?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    statusHistory?: CartStatusHistoryOrderByRelationAggregateInput
  }

  export type CartWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CartWhereInput | CartWhereInput[]
    OR?: CartWhereInput[]
    NOT?: CartWhereInput | CartWhereInput[]
    customerId?: StringFilter<"Cart"> | string
    verticalId?: StringFilter<"Cart"> | string
    businessUnitId?: StringFilter<"Cart"> | string
    status?: StringFilter<"Cart"> | string
    openedAt?: DateTimeFilter<"Cart"> | Date | string
    lastMovementAt?: DateTimeFilter<"Cart"> | Date | string
    closedAt?: DateTimeNullableFilter<"Cart"> | Date | string | null
    paymentMethod?: StringNullableFilter<"Cart"> | string | null
    paymentId?: StringNullableFilter<"Cart"> | string | null
    paymentObservation?: StringNullableFilter<"Cart"> | string | null
    paymentPreferenceId?: StringNullableFilter<"Cart"> | string | null
    quoteId?: StringNullableFilter<"Cart"> | string | null
    deliveryPlanId?: StringNullableFilter<"Cart"> | string | null
    deliveryAddressId?: StringNullableFilter<"Cart"> | string | null
    deliveryPrice?: FloatNullableFilter<"Cart"> | number | null
    items?: JsonNullableFilter<"Cart">
    coupons?: JsonNullableFilter<"Cart">
    createdAt?: DateTimeFilter<"Cart"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Cart"> | Date | string | null
    statusHistory?: CartStatusHistoryListRelationFilter
  }, "id">

  export type CartOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    verticalId?: SortOrder
    businessUnitId?: SortOrder
    status?: SortOrder
    openedAt?: SortOrder
    lastMovementAt?: SortOrder
    closedAt?: SortOrderInput | SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    paymentId?: SortOrderInput | SortOrder
    paymentObservation?: SortOrderInput | SortOrder
    paymentPreferenceId?: SortOrderInput | SortOrder
    quoteId?: SortOrderInput | SortOrder
    deliveryPlanId?: SortOrderInput | SortOrder
    deliveryAddressId?: SortOrderInput | SortOrder
    deliveryPrice?: SortOrderInput | SortOrder
    items?: SortOrderInput | SortOrder
    coupons?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: CartCountOrderByAggregateInput
    _avg?: CartAvgOrderByAggregateInput
    _max?: CartMaxOrderByAggregateInput
    _min?: CartMinOrderByAggregateInput
    _sum?: CartSumOrderByAggregateInput
  }

  export type CartScalarWhereWithAggregatesInput = {
    AND?: CartScalarWhereWithAggregatesInput | CartScalarWhereWithAggregatesInput[]
    OR?: CartScalarWhereWithAggregatesInput[]
    NOT?: CartScalarWhereWithAggregatesInput | CartScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Cart"> | string
    customerId?: StringWithAggregatesFilter<"Cart"> | string
    verticalId?: StringWithAggregatesFilter<"Cart"> | string
    businessUnitId?: StringWithAggregatesFilter<"Cart"> | string
    status?: StringWithAggregatesFilter<"Cart"> | string
    openedAt?: DateTimeWithAggregatesFilter<"Cart"> | Date | string
    lastMovementAt?: DateTimeWithAggregatesFilter<"Cart"> | Date | string
    closedAt?: DateTimeNullableWithAggregatesFilter<"Cart"> | Date | string | null
    paymentMethod?: StringNullableWithAggregatesFilter<"Cart"> | string | null
    paymentId?: StringNullableWithAggregatesFilter<"Cart"> | string | null
    paymentObservation?: StringNullableWithAggregatesFilter<"Cart"> | string | null
    paymentPreferenceId?: StringNullableWithAggregatesFilter<"Cart"> | string | null
    quoteId?: StringNullableWithAggregatesFilter<"Cart"> | string | null
    deliveryPlanId?: StringNullableWithAggregatesFilter<"Cart"> | string | null
    deliveryAddressId?: StringNullableWithAggregatesFilter<"Cart"> | string | null
    deliveryPrice?: FloatNullableWithAggregatesFilter<"Cart"> | number | null
    items?: JsonNullableWithAggregatesFilter<"Cart">
    coupons?: JsonNullableWithAggregatesFilter<"Cart">
    createdAt?: DateTimeWithAggregatesFilter<"Cart"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Cart"> | Date | string | null
  }

  export type CartStatusHistoryWhereInput = {
    AND?: CartStatusHistoryWhereInput | CartStatusHistoryWhereInput[]
    OR?: CartStatusHistoryWhereInput[]
    NOT?: CartStatusHistoryWhereInput | CartStatusHistoryWhereInput[]
    id?: StringFilter<"CartStatusHistory"> | string
    cartId?: StringFilter<"CartStatusHistory"> | string
    status?: StringFilter<"CartStatusHistory"> | string
    changedAt?: DateTimeFilter<"CartStatusHistory"> | Date | string
    durationMs?: IntNullableFilter<"CartStatusHistory"> | number | null
    createdAt?: DateTimeFilter<"CartStatusHistory"> | Date | string
    cart?: XOR<CartRelationFilter, CartWhereInput>
  }

  export type CartStatusHistoryOrderByWithRelationInput = {
    id?: SortOrder
    cartId?: SortOrder
    status?: SortOrder
    changedAt?: SortOrder
    durationMs?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    cart?: CartOrderByWithRelationInput
  }

  export type CartStatusHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CartStatusHistoryWhereInput | CartStatusHistoryWhereInput[]
    OR?: CartStatusHistoryWhereInput[]
    NOT?: CartStatusHistoryWhereInput | CartStatusHistoryWhereInput[]
    cartId?: StringFilter<"CartStatusHistory"> | string
    status?: StringFilter<"CartStatusHistory"> | string
    changedAt?: DateTimeFilter<"CartStatusHistory"> | Date | string
    durationMs?: IntNullableFilter<"CartStatusHistory"> | number | null
    createdAt?: DateTimeFilter<"CartStatusHistory"> | Date | string
    cart?: XOR<CartRelationFilter, CartWhereInput>
  }, "id">

  export type CartStatusHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    cartId?: SortOrder
    status?: SortOrder
    changedAt?: SortOrder
    durationMs?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CartStatusHistoryCountOrderByAggregateInput
    _avg?: CartStatusHistoryAvgOrderByAggregateInput
    _max?: CartStatusHistoryMaxOrderByAggregateInput
    _min?: CartStatusHistoryMinOrderByAggregateInput
    _sum?: CartStatusHistorySumOrderByAggregateInput
  }

  export type CartStatusHistoryScalarWhereWithAggregatesInput = {
    AND?: CartStatusHistoryScalarWhereWithAggregatesInput | CartStatusHistoryScalarWhereWithAggregatesInput[]
    OR?: CartStatusHistoryScalarWhereWithAggregatesInput[]
    NOT?: CartStatusHistoryScalarWhereWithAggregatesInput | CartStatusHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CartStatusHistory"> | string
    cartId?: StringWithAggregatesFilter<"CartStatusHistory"> | string
    status?: StringWithAggregatesFilter<"CartStatusHistory"> | string
    changedAt?: DateTimeWithAggregatesFilter<"CartStatusHistory"> | Date | string
    durationMs?: IntNullableWithAggregatesFilter<"CartStatusHistory"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"CartStatusHistory"> | Date | string
  }

  export type CartCreateInput = {
    id: string
    customerId: string
    verticalId: string
    businessUnitId: string
    status: string
    openedAt: Date | string
    lastMovementAt: Date | string
    closedAt?: Date | string | null
    paymentMethod?: string | null
    paymentId?: string | null
    paymentObservation?: string | null
    paymentPreferenceId?: string | null
    quoteId?: string | null
    deliveryPlanId?: string | null
    deliveryAddressId?: string | null
    deliveryPrice?: number | null
    items?: NullableJsonNullValueInput | InputJsonValue
    coupons?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
    statusHistory?: CartStatusHistoryCreateNestedManyWithoutCartInput
  }

  export type CartUncheckedCreateInput = {
    id: string
    customerId: string
    verticalId: string
    businessUnitId: string
    status: string
    openedAt: Date | string
    lastMovementAt: Date | string
    closedAt?: Date | string | null
    paymentMethod?: string | null
    paymentId?: string | null
    paymentObservation?: string | null
    paymentPreferenceId?: string | null
    quoteId?: string | null
    deliveryPlanId?: string | null
    deliveryAddressId?: string | null
    deliveryPrice?: number | null
    items?: NullableJsonNullValueInput | InputJsonValue
    coupons?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
    statusHistory?: CartStatusHistoryUncheckedCreateNestedManyWithoutCartInput
  }

  export type CartUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    verticalId?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMovementAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentObservation?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreferenceId?: NullableStringFieldUpdateOperationsInput | string | null
    quoteId?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryAddressId?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    items?: NullableJsonNullValueInput | InputJsonValue
    coupons?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusHistory?: CartStatusHistoryUpdateManyWithoutCartNestedInput
  }

  export type CartUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    verticalId?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMovementAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentObservation?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreferenceId?: NullableStringFieldUpdateOperationsInput | string | null
    quoteId?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryAddressId?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    items?: NullableJsonNullValueInput | InputJsonValue
    coupons?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusHistory?: CartStatusHistoryUncheckedUpdateManyWithoutCartNestedInput
  }

  export type CartCreateManyInput = {
    id: string
    customerId: string
    verticalId: string
    businessUnitId: string
    status: string
    openedAt: Date | string
    lastMovementAt: Date | string
    closedAt?: Date | string | null
    paymentMethod?: string | null
    paymentId?: string | null
    paymentObservation?: string | null
    paymentPreferenceId?: string | null
    quoteId?: string | null
    deliveryPlanId?: string | null
    deliveryAddressId?: string | null
    deliveryPrice?: number | null
    items?: NullableJsonNullValueInput | InputJsonValue
    coupons?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type CartUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    verticalId?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMovementAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentObservation?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreferenceId?: NullableStringFieldUpdateOperationsInput | string | null
    quoteId?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryAddressId?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    items?: NullableJsonNullValueInput | InputJsonValue
    coupons?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CartUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    verticalId?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMovementAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentObservation?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreferenceId?: NullableStringFieldUpdateOperationsInput | string | null
    quoteId?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryAddressId?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    items?: NullableJsonNullValueInput | InputJsonValue
    coupons?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CartStatusHistoryCreateInput = {
    id?: string
    status: string
    changedAt: Date | string
    durationMs?: number | null
    createdAt?: Date | string
    cart: CartCreateNestedOneWithoutStatusHistoryInput
  }

  export type CartStatusHistoryUncheckedCreateInput = {
    id?: string
    cartId: string
    status: string
    changedAt: Date | string
    durationMs?: number | null
    createdAt?: Date | string
  }

  export type CartStatusHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cart?: CartUpdateOneRequiredWithoutStatusHistoryNestedInput
  }

  export type CartStatusHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cartId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartStatusHistoryCreateManyInput = {
    id?: string
    cartId: string
    status: string
    changedAt: Date | string
    durationMs?: number | null
    createdAt?: Date | string
  }

  export type CartStatusHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartStatusHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cartId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
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

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type CartStatusHistoryListRelationFilter = {
    every?: CartStatusHistoryWhereInput
    some?: CartStatusHistoryWhereInput
    none?: CartStatusHistoryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CartStatusHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CartCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    verticalId?: SortOrder
    businessUnitId?: SortOrder
    status?: SortOrder
    openedAt?: SortOrder
    lastMovementAt?: SortOrder
    closedAt?: SortOrder
    paymentMethod?: SortOrder
    paymentId?: SortOrder
    paymentObservation?: SortOrder
    paymentPreferenceId?: SortOrder
    quoteId?: SortOrder
    deliveryPlanId?: SortOrder
    deliveryAddressId?: SortOrder
    deliveryPrice?: SortOrder
    items?: SortOrder
    coupons?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartAvgOrderByAggregateInput = {
    deliveryPrice?: SortOrder
  }

  export type CartMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    verticalId?: SortOrder
    businessUnitId?: SortOrder
    status?: SortOrder
    openedAt?: SortOrder
    lastMovementAt?: SortOrder
    closedAt?: SortOrder
    paymentMethod?: SortOrder
    paymentId?: SortOrder
    paymentObservation?: SortOrder
    paymentPreferenceId?: SortOrder
    quoteId?: SortOrder
    deliveryPlanId?: SortOrder
    deliveryAddressId?: SortOrder
    deliveryPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    verticalId?: SortOrder
    businessUnitId?: SortOrder
    status?: SortOrder
    openedAt?: SortOrder
    lastMovementAt?: SortOrder
    closedAt?: SortOrder
    paymentMethod?: SortOrder
    paymentId?: SortOrder
    paymentObservation?: SortOrder
    paymentPreferenceId?: SortOrder
    quoteId?: SortOrder
    deliveryPlanId?: SortOrder
    deliveryAddressId?: SortOrder
    deliveryPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartSumOrderByAggregateInput = {
    deliveryPrice?: SortOrder
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

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type CartRelationFilter = {
    is?: CartWhereInput
    isNot?: CartWhereInput
  }

  export type CartStatusHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    cartId?: SortOrder
    status?: SortOrder
    changedAt?: SortOrder
    durationMs?: SortOrder
    createdAt?: SortOrder
  }

  export type CartStatusHistoryAvgOrderByAggregateInput = {
    durationMs?: SortOrder
  }

  export type CartStatusHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    cartId?: SortOrder
    status?: SortOrder
    changedAt?: SortOrder
    durationMs?: SortOrder
    createdAt?: SortOrder
  }

  export type CartStatusHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    cartId?: SortOrder
    status?: SortOrder
    changedAt?: SortOrder
    durationMs?: SortOrder
    createdAt?: SortOrder
  }

  export type CartStatusHistorySumOrderByAggregateInput = {
    durationMs?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type CartStatusHistoryCreateNestedManyWithoutCartInput = {
    create?: XOR<CartStatusHistoryCreateWithoutCartInput, CartStatusHistoryUncheckedCreateWithoutCartInput> | CartStatusHistoryCreateWithoutCartInput[] | CartStatusHistoryUncheckedCreateWithoutCartInput[]
    connectOrCreate?: CartStatusHistoryCreateOrConnectWithoutCartInput | CartStatusHistoryCreateOrConnectWithoutCartInput[]
    createMany?: CartStatusHistoryCreateManyCartInputEnvelope
    connect?: CartStatusHistoryWhereUniqueInput | CartStatusHistoryWhereUniqueInput[]
  }

  export type CartStatusHistoryUncheckedCreateNestedManyWithoutCartInput = {
    create?: XOR<CartStatusHistoryCreateWithoutCartInput, CartStatusHistoryUncheckedCreateWithoutCartInput> | CartStatusHistoryCreateWithoutCartInput[] | CartStatusHistoryUncheckedCreateWithoutCartInput[]
    connectOrCreate?: CartStatusHistoryCreateOrConnectWithoutCartInput | CartStatusHistoryCreateOrConnectWithoutCartInput[]
    createMany?: CartStatusHistoryCreateManyCartInputEnvelope
    connect?: CartStatusHistoryWhereUniqueInput | CartStatusHistoryWhereUniqueInput[]
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

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CartStatusHistoryUpdateManyWithoutCartNestedInput = {
    create?: XOR<CartStatusHistoryCreateWithoutCartInput, CartStatusHistoryUncheckedCreateWithoutCartInput> | CartStatusHistoryCreateWithoutCartInput[] | CartStatusHistoryUncheckedCreateWithoutCartInput[]
    connectOrCreate?: CartStatusHistoryCreateOrConnectWithoutCartInput | CartStatusHistoryCreateOrConnectWithoutCartInput[]
    upsert?: CartStatusHistoryUpsertWithWhereUniqueWithoutCartInput | CartStatusHistoryUpsertWithWhereUniqueWithoutCartInput[]
    createMany?: CartStatusHistoryCreateManyCartInputEnvelope
    set?: CartStatusHistoryWhereUniqueInput | CartStatusHistoryWhereUniqueInput[]
    disconnect?: CartStatusHistoryWhereUniqueInput | CartStatusHistoryWhereUniqueInput[]
    delete?: CartStatusHistoryWhereUniqueInput | CartStatusHistoryWhereUniqueInput[]
    connect?: CartStatusHistoryWhereUniqueInput | CartStatusHistoryWhereUniqueInput[]
    update?: CartStatusHistoryUpdateWithWhereUniqueWithoutCartInput | CartStatusHistoryUpdateWithWhereUniqueWithoutCartInput[]
    updateMany?: CartStatusHistoryUpdateManyWithWhereWithoutCartInput | CartStatusHistoryUpdateManyWithWhereWithoutCartInput[]
    deleteMany?: CartStatusHistoryScalarWhereInput | CartStatusHistoryScalarWhereInput[]
  }

  export type CartStatusHistoryUncheckedUpdateManyWithoutCartNestedInput = {
    create?: XOR<CartStatusHistoryCreateWithoutCartInput, CartStatusHistoryUncheckedCreateWithoutCartInput> | CartStatusHistoryCreateWithoutCartInput[] | CartStatusHistoryUncheckedCreateWithoutCartInput[]
    connectOrCreate?: CartStatusHistoryCreateOrConnectWithoutCartInput | CartStatusHistoryCreateOrConnectWithoutCartInput[]
    upsert?: CartStatusHistoryUpsertWithWhereUniqueWithoutCartInput | CartStatusHistoryUpsertWithWhereUniqueWithoutCartInput[]
    createMany?: CartStatusHistoryCreateManyCartInputEnvelope
    set?: CartStatusHistoryWhereUniqueInput | CartStatusHistoryWhereUniqueInput[]
    disconnect?: CartStatusHistoryWhereUniqueInput | CartStatusHistoryWhereUniqueInput[]
    delete?: CartStatusHistoryWhereUniqueInput | CartStatusHistoryWhereUniqueInput[]
    connect?: CartStatusHistoryWhereUniqueInput | CartStatusHistoryWhereUniqueInput[]
    update?: CartStatusHistoryUpdateWithWhereUniqueWithoutCartInput | CartStatusHistoryUpdateWithWhereUniqueWithoutCartInput[]
    updateMany?: CartStatusHistoryUpdateManyWithWhereWithoutCartInput | CartStatusHistoryUpdateManyWithWhereWithoutCartInput[]
    deleteMany?: CartStatusHistoryScalarWhereInput | CartStatusHistoryScalarWhereInput[]
  }

  export type CartCreateNestedOneWithoutStatusHistoryInput = {
    create?: XOR<CartCreateWithoutStatusHistoryInput, CartUncheckedCreateWithoutStatusHistoryInput>
    connectOrCreate?: CartCreateOrConnectWithoutStatusHistoryInput
    connect?: CartWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CartUpdateOneRequiredWithoutStatusHistoryNestedInput = {
    create?: XOR<CartCreateWithoutStatusHistoryInput, CartUncheckedCreateWithoutStatusHistoryInput>
    connectOrCreate?: CartCreateOrConnectWithoutStatusHistoryInput
    upsert?: CartUpsertWithoutStatusHistoryInput
    connect?: CartWhereUniqueInput
    update?: XOR<XOR<CartUpdateToOneWithWhereWithoutStatusHistoryInput, CartUpdateWithoutStatusHistoryInput>, CartUncheckedUpdateWithoutStatusHistoryInput>
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

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
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

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type CartStatusHistoryCreateWithoutCartInput = {
    id?: string
    status: string
    changedAt: Date | string
    durationMs?: number | null
    createdAt?: Date | string
  }

  export type CartStatusHistoryUncheckedCreateWithoutCartInput = {
    id?: string
    status: string
    changedAt: Date | string
    durationMs?: number | null
    createdAt?: Date | string
  }

  export type CartStatusHistoryCreateOrConnectWithoutCartInput = {
    where: CartStatusHistoryWhereUniqueInput
    create: XOR<CartStatusHistoryCreateWithoutCartInput, CartStatusHistoryUncheckedCreateWithoutCartInput>
  }

  export type CartStatusHistoryCreateManyCartInputEnvelope = {
    data: CartStatusHistoryCreateManyCartInput | CartStatusHistoryCreateManyCartInput[]
    skipDuplicates?: boolean
  }

  export type CartStatusHistoryUpsertWithWhereUniqueWithoutCartInput = {
    where: CartStatusHistoryWhereUniqueInput
    update: XOR<CartStatusHistoryUpdateWithoutCartInput, CartStatusHistoryUncheckedUpdateWithoutCartInput>
    create: XOR<CartStatusHistoryCreateWithoutCartInput, CartStatusHistoryUncheckedCreateWithoutCartInput>
  }

  export type CartStatusHistoryUpdateWithWhereUniqueWithoutCartInput = {
    where: CartStatusHistoryWhereUniqueInput
    data: XOR<CartStatusHistoryUpdateWithoutCartInput, CartStatusHistoryUncheckedUpdateWithoutCartInput>
  }

  export type CartStatusHistoryUpdateManyWithWhereWithoutCartInput = {
    where: CartStatusHistoryScalarWhereInput
    data: XOR<CartStatusHistoryUpdateManyMutationInput, CartStatusHistoryUncheckedUpdateManyWithoutCartInput>
  }

  export type CartStatusHistoryScalarWhereInput = {
    AND?: CartStatusHistoryScalarWhereInput | CartStatusHistoryScalarWhereInput[]
    OR?: CartStatusHistoryScalarWhereInput[]
    NOT?: CartStatusHistoryScalarWhereInput | CartStatusHistoryScalarWhereInput[]
    id?: StringFilter<"CartStatusHistory"> | string
    cartId?: StringFilter<"CartStatusHistory"> | string
    status?: StringFilter<"CartStatusHistory"> | string
    changedAt?: DateTimeFilter<"CartStatusHistory"> | Date | string
    durationMs?: IntNullableFilter<"CartStatusHistory"> | number | null
    createdAt?: DateTimeFilter<"CartStatusHistory"> | Date | string
  }

  export type CartCreateWithoutStatusHistoryInput = {
    id: string
    customerId: string
    verticalId: string
    businessUnitId: string
    status: string
    openedAt: Date | string
    lastMovementAt: Date | string
    closedAt?: Date | string | null
    paymentMethod?: string | null
    paymentId?: string | null
    paymentObservation?: string | null
    paymentPreferenceId?: string | null
    quoteId?: string | null
    deliveryPlanId?: string | null
    deliveryAddressId?: string | null
    deliveryPrice?: number | null
    items?: NullableJsonNullValueInput | InputJsonValue
    coupons?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type CartUncheckedCreateWithoutStatusHistoryInput = {
    id: string
    customerId: string
    verticalId: string
    businessUnitId: string
    status: string
    openedAt: Date | string
    lastMovementAt: Date | string
    closedAt?: Date | string | null
    paymentMethod?: string | null
    paymentId?: string | null
    paymentObservation?: string | null
    paymentPreferenceId?: string | null
    quoteId?: string | null
    deliveryPlanId?: string | null
    deliveryAddressId?: string | null
    deliveryPrice?: number | null
    items?: NullableJsonNullValueInput | InputJsonValue
    coupons?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type CartCreateOrConnectWithoutStatusHistoryInput = {
    where: CartWhereUniqueInput
    create: XOR<CartCreateWithoutStatusHistoryInput, CartUncheckedCreateWithoutStatusHistoryInput>
  }

  export type CartUpsertWithoutStatusHistoryInput = {
    update: XOR<CartUpdateWithoutStatusHistoryInput, CartUncheckedUpdateWithoutStatusHistoryInput>
    create: XOR<CartCreateWithoutStatusHistoryInput, CartUncheckedCreateWithoutStatusHistoryInput>
    where?: CartWhereInput
  }

  export type CartUpdateToOneWithWhereWithoutStatusHistoryInput = {
    where?: CartWhereInput
    data: XOR<CartUpdateWithoutStatusHistoryInput, CartUncheckedUpdateWithoutStatusHistoryInput>
  }

  export type CartUpdateWithoutStatusHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    verticalId?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMovementAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentObservation?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreferenceId?: NullableStringFieldUpdateOperationsInput | string | null
    quoteId?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryAddressId?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    items?: NullableJsonNullValueInput | InputJsonValue
    coupons?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CartUncheckedUpdateWithoutStatusHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    verticalId?: StringFieldUpdateOperationsInput | string
    businessUnitId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMovementAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentObservation?: NullableStringFieldUpdateOperationsInput | string | null
    paymentPreferenceId?: NullableStringFieldUpdateOperationsInput | string | null
    quoteId?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryAddressId?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    items?: NullableJsonNullValueInput | InputJsonValue
    coupons?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CartStatusHistoryCreateManyCartInput = {
    id?: string
    status: string
    changedAt: Date | string
    durationMs?: number | null
    createdAt?: Date | string
  }

  export type CartStatusHistoryUpdateWithoutCartInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartStatusHistoryUncheckedUpdateWithoutCartInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartStatusHistoryUncheckedUpdateManyWithoutCartInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    changedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use CartCountOutputTypeDefaultArgs instead
     */
    export type CartCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CartCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CartDefaultArgs instead
     */
    export type CartArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CartDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CartStatusHistoryDefaultArgs instead
     */
    export type CartStatusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CartStatusHistoryDefaultArgs<ExtArgs>

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