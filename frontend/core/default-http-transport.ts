import HttpTransport, {
  DefaultOptions, GetOptions, METHODS, Options,
} from './http-transport';

class DefaultHttpTransport implements HttpTransport {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public get<ResponseType>(url: string, options: GetOptions<ResponseType> = {})
    : Promise<ResponseType> {
    return this.request<null, ResponseType>(
      url,
      {
        ...options,
        method: METHODS.GET,
      },
    );
  }

  public post<Body, ResponseType>(url: string, options: DefaultOptions<Body, ResponseType> = {})
    : Promise<ResponseType> {
    return this.request<Body, ResponseType>(
      url,
      {
        ...options,
        method: METHODS.POST,
      },
    );
  }

  public delete<Body, ResponseType>(url: string, options: DefaultOptions<Body, ResponseType> = {})
    : Promise<ResponseType> {
    return this.request<Body, ResponseType>(
      url,
      {
        ...options,
        method: METHODS.DELETE,
      },
    );
  }

  public put<Body, ResponseType>(url: string, options: DefaultOptions<Body, ResponseType> = {})
    : Promise<ResponseType> {
    return this.request<Body, ResponseType>(
      url,
      {
        ...options,
        method: METHODS.PUT,
      },
    );
  }

  public request<Body, ResponseType>(url: string, options: Options<Body, ResponseType>)
    : Promise<ResponseType> {
    const {
      method = METHODS.GET,
      body,
      headers = new Map(),
      handler = (response: Response) => response.json(),
    } = options;
    const fullUrl: string = this.baseUrl + url;
    let requestBody: BodyInit;

    if (body instanceof FormData) {
      requestBody = body;
    } else {
      headers.set('Content-Type', 'application/json');
      requestBody = JSON.stringify(body);
    }

    return fetch(fullUrl, {
      method,
      headers: Object.fromEntries(headers),
      body: requestBody,
      credentials: 'same-origin',
    })
      .then((response: Response) => handler(response));
  }
}

export default DefaultHttpTransport;
