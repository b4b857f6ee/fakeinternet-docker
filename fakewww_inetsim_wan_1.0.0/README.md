#Inetsim install WAN

#Inetsim is a software suite for simulating services in a defined environment working in debian linux environment.

##Inetsim install:
###Dependencies:
*gnupg, wget

###Install process

*Add inetsim repo to source.list:
1.echo "deb http://www.inetsim.org/debian/ binary/" > /etc/apt/sources.list.d/inetsim.list

*Update system in order to apply changes:
1.apt update

*Install package:
1.apt install inetsim -y

*Start intesim:
1.Juste run -> inetsim or /usr/bin/inetim

#Notes:
*Inetsim need to be bind to your ip address

### WAN Configuration
#You need to do this command  for the routing
#ip route add 0.0.0.0 0.0.0.0 dev InterFaceName