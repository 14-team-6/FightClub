import { PayloadAction } from '@frontend/src/actionCreators/models/action';
import { ThemeActions } from '@frontend/src/actionCreators/theme/actions';

export const defaultTheme = {
  background: '/public/img/mainBackground.png',
  font: '/public/font/Pixeboy.woff',
  colors: {
    mainRed: '#FF0000',
    mainWhite: '#FFFFFF',
    mainYellow: '#FFF500',
    mainBlue: '#5061FF',
    mainBlack: '#000000',
    mainGreen: '#04CB00',
    gameHeaderText: '#FF0000',
    gameHeaderStroke: '#FFF500',
  },
  fontSizes: {
    mainTitle: '100px',
    nav: '34px',
  },
};

export type Theme = {
  [p in keyof typeof defaultTheme]: typeof defaultTheme[p];
};

export type ThemeActionType = PayloadAction<ThemeActions, Theme>;

// eslint-disable-next-line @typescript-eslint/default-param-last
export const themeReducer = (theme: Theme = defaultTheme, action: ThemeActionType) => {
  switch (action.type) {
    case ThemeActions.SET_CURRENT_THEME:
      return { ...theme, ...action.payload };
    default:
      return theme;
  }
};
