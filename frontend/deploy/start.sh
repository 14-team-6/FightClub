#!/bin/sh

sed -i -e 's@${PORT}@'"$PORT"'@' /etc/nginx/http.d/default.conf
pm2 start /opt/app/web/serverLauncher.js &
nginx -g 'daemon off;'
