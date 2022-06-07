export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

export interface Options<Body> {
  method?: METHODS;
  headers?: Record<string, string>;
  body?: Body;
}

abstract class HttpTransportAbstractClass {
  abstract delete<T>(url: string, options: Options<T>): Promise<any>;

  abstract get(url: string, options: Options<any>): Promise<any>;

  abstract post<T>(url: string, options: Options<T>): Promise<any>;

  abstract put<T>(url: string, options: Options<T>): Promise<any>;

  abstract request(url: string, options: Options<any>): Promise<any>;
}

export default HttpTransportAbstractClass;
