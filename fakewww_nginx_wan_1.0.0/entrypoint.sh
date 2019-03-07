#!/bin/bash

echo -e "$ROOT_PASSWORD\n$ROOT_PASSWORD" | passwd
useradd $USER
echo -e "$PASSWORD\n$PASSWORD" | passwd "$USER"

############# config RSYSLOG ###############

if [ -n $REMOTE_SYSLOG_HOST ] && [ -n $REMOTE_SYSLOG_PORT ]; then
  echo -e "*.* @$REMOTE_SYSLOG_HOST:$REMOTE_SYSLOG_PORT" >> /etc/rsyslog.conf
fi

/usr/bin/supervisord -c /etc/supervisord.conf

/bin/bash /root/scripts/IPadd.sh /root/scripts/ip.lst

