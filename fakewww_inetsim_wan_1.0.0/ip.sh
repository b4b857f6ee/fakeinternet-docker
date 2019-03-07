#!/bin/bash

config="/etc/inetsim/inetsim.conf"
#ifcfg=$(ifconfig eth0 | grep -m1 inet | awk -F " " '{print $2}')

sed -i "s/^#service_bind_address	10.10.10.1/service_bind_address	0.0.0.0/" $config
sed -i "s/^#dns_default_ip		10.10.10.1/dns_default_ip		0.0.0.0/" $config
