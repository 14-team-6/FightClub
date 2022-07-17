declare global {
  interface Window {
    __PRELOADED_STATE__?: string,
  }

  export type User = {
    id: number,
    login: string,
    firstName: string,
    secondName: string,
    displayName: string,
    avatar: string,
    phone: string,
    email: string,
  };
}

export {};
