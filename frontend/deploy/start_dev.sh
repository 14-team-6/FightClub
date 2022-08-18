#!/bin/sh

sed -i -e 's@${PORT}@'"$PORT"'@' /etc/nginx/http.d/default.conf
npm run dev &
nginx -g 'daemon off;'
