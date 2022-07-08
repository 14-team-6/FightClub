#!/bin/sh

sed -i -e 's@${PORT}@'"$PORT"'@' /etc/nginx/http.d/default.conf
node /opt/app/web/serverLauncher.js &
nginx -g 'daemon off;'
