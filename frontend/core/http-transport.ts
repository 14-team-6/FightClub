import HttpTransportAbstractClass, { METHODS, Options } from './http-transport-abstract-class';

class HttpTransport implements HttpTransportAbstractClass {
  private domain: string = 'https://ya-praktikum.tech/api/v2';

  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public get = (url: string, options: Options<any> = {}): Promise<any> => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
    );
  };

  public post = <Body = {}>(url: string, options: Options<Body> = {}): Promise<any> => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
    );
  };

  public delete = <Body = {}>(url: string, options: Options<Body> = {}): Promise<any> => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
    );
  };

  public put = <Body = {}>(url: string, options: Options<Body> = {}): Promise<any> => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
    );
  };

  public request = (url: string, options: Options<any>): Promise<any> => {
    const { method = METHODS.GET, body, headers = {} } = options;
    const fullUrl: string = this.domain + this.baseUrl + url;
    let requestBody: BodyInit;

    if (body instanceof FormData) {
      requestBody = body;
    } else {
      headers['Content-Type'] = 'application/json';
      requestBody = JSON.stringify(body);
    }

    return new Promise((resolve, reject) => {
      fetch(fullUrl, {
        method,
        headers,
        body: requestBody,
        credentials: 'same-origin',
      }).then(async (response: Response) => {
        if (response.ok) {
          response.json()
            .then(resolve)
            .catch(() => { return resolve(null); });
        } else {
          response.json()
            .then(reject);
        }
      });
    });
  };
}

export default HttpTransport;
