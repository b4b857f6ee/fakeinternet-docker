# NGINX SERVER FOR WAN

Simple nginx server
www directory is ar /usr/share/nginx/html

## Services

The image run the following services:

* SSH
* RSYSLOG
* NGINX

## Environment variable

### Configure users
* USER
* PASSWORD
* ROOT\_PASSWORD (Default: user)

### Configure rsyslog

* REMOTE\_SYSLOG\_HOST
* REMOTE\_SYSLOG\_PORT

### WAN Configuration
#You need to do this command  for the routing
#ip route add 0.0.0.0 0.0.0.0 dev InterFaceName

