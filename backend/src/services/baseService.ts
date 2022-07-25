export abstract class BaseService<T> {
  abstract get?: (...args: any[]) => Promise<T[]>;

  abstract create?: (...args: any[]) => Promise<T | null>;

  abstract update?: (...args: any[]) => Promise<T | null>;

  abstract delete?: (...args: any[]) => Promise<void>;

  abstract find?: (...args: any[]) => Promise<T | null>;
}
