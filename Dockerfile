FROM alpine

RUN apk add --update nginx sudo nodejs npm git

WORKDIR /opt/app

RUN npm i express react react-dom redux @redux-devtools/extension react-redux redux-thunk react-router-dom styled-components react-hook-form yup @hookform/resolvers classnames

COPY ./dist/* ./web/
COPY ./frontend/src/server/serverLauncher.js ./web/
COPY ./frontend/deploy/start.sh ./
COPY ./frontend/public/sounds ./web/public/sounds
COPY ./frontend/deploy/nginx.conf /etc/nginx/http.d/default.conf

RUN chmod a+x ./start.sh

CMD ./start.sh
