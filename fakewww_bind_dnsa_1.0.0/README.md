# DNS SERVER DNS PRIMARY A

BIND or named is the most widely used Domain Name System (DNS) software on the Internet.

## Services

The image run the following services:

* SSH
* RSYSLOG
* NAMED

## Environment variable

### Configure users
* USER
* PASSWORD
* ROOT\_PASSWORD (user)

### Configure rsyslog

* REMOTE\_SYSLOG\_HOST
* REMOTE\_SYSLOG\_PORT

## Files copied

* named.conf : main configuration of named
* directory zones : configuration of named zones

### WAN Configuration
#You need to do this command  for the routing
#ip route add 0.0.0.0 0.0.0.0 dev InterFaceName