FROM alpine

RUN apk add --update nginx sudo nodejs npm git

WORKDIR /opt/app

RUN npm i -g pm2
RUN npm i @sentry/react pg @sentry/node sequelize sequelize-typescript express compression cookie-parser react reselect react-dom redux @redux-devtools/extension serialize-javascript react-redux redux-thunk react-router-dom styled-components react-hook-form yup @hookform/resolvers classnames

COPY ./dist ./web/
COPY backend/src/server/serverLauncher.js ./web/
COPY ./frontend/deploy/start.sh ./
COPY ./frontend/public/sounds ./web/public/sounds
COPY ./frontend/deploy/nginx.conf /etc/nginx/http.d/default.conf

RUN chmod a+x ./start.sh

CMD ./start.sh

