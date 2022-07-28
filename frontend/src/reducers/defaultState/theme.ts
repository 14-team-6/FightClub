import { ThemeDataDTO } from '@frontend/src/services/types';

export const themeDefaultState: ThemeDataDTO = {
  data: {
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
  },
};
