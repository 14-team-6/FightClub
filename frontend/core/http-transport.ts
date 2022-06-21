export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

export type ResponseHandler<T> = (response: Response) => Promise<T>;

export interface Options<Body, ResponseType> {
  method: METHODS;
  headers?: Map<string, string>;
  body?: Body;
  handler?: ResponseHandler<ResponseType>;
}

export type GetOptions<R> = Pick<Options<any, R>, 'headers' | 'handler'>;

export type DefaultOptions<T, R> = Omit<Options<T, R>, 'method'>;

abstract class HttpTransport {
  abstract delete<Body, ResponseType>(url: string, options?: DefaultOptions<Body, ResponseType>)
  : Promise<ResponseType>;

  abstract get<ResponseType>(url: string, options?: GetOptions<ResponseType>)
  : Promise<ResponseType>;

  abstract post<Body, ResponseType>(url: string, options?: DefaultOptions<Body, ResponseType>)
  : Promise<ResponseType>;

  abstract put<Body, ResponseType>(url: string, options?: DefaultOptions<Body, ResponseType>)
  : Promise<ResponseType>;

  abstract request<Body, ResponseType>(url: string, options: DefaultOptions<Body, ResponseType>)
  : Promise<ResponseType>;
}

export default HttpTransport;
