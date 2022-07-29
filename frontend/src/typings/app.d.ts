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

  type ColorData = {
    mainRed: string,
    mainBlue: string,
    mainBlack: string,
    mainGreen: string,
    mainWhite: string,
    mainYellow: string,
    gameHeaderText: string,
    gameHeaderStroke: string,
  };

  type FontSizeData = {
    nav: string,
    mainTitle: string,
  };

  export type ThemeData = {
    id: number,
    font: string,
    colors: ColorData,
    fontSizes: FontSizeData,
    background: string,
  };
}

export {};
