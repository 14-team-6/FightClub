import { initSequelize } from '@backend/src/utils/db/initSequelize';

const themeData = {
  font: '/public/font/Pixeboy.woff',
  colors: {
    mainRed: '#FF00FF',
    mainBlue: '#506100',
    mainBlack: '#0000FF',
    mainGreen: '#04CBFF',
    mainWhite: '#FFFF00',
    mainYellow: '#FFF5FF',
    gameHeaderText: '#FF00FF',
    gameHeaderStroke: '#FFF5FF',
  },
  fontSizes: {
    nav: '34px',
    mainTitle: '100px',
  },
  background: '/public/img/mainBackgroundSimple.png',
};

export const addDefaultTheme = () => {
  (async () => {
    initSequelize({ alter: true })
      .then(async (sequelize) => {
        const themes = sequelize.models.Theme;
        const allThemes = await themes.findAll();
        if (allThemes.length === 0) {
          await themes.create(
            {
              name: 'Monochrome',
              data: themeData,
            },
          );
        }
      });
  })();
};
