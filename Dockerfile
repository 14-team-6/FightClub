FROM alpine

RUN apk add --update nginx sudo

WORKDIR /opt/app

COPY ./dist/* ./
COPY ./frontend/deploy/nginx.conf /etc/nginx/http.d/default.conf

CMD sed -i -e 's@${PORT}@'"$PORT"'@' /etc/nginx/http.d/default.conf && nginx -g 'daemon off;'
