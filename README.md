# fakeinternet-docker

# Story

I was looking to build a complete  fake web internet area but i only find inetsim (simulate fake respond for http, ftp, irc, smtp) but with only one ip address and only one web page.
So i keep inetsim -> backend response for my architecture
I add a nginx web server with a loot of static website (most are html5 free theme) and each website respond with is own public ip address wich are just a resolution of the real domain name in ipv4.
What is internet without DNS?
So i add the DNS root A with is real ip address with some domain.

# Component
This version work for docker

Important : you need to run your docker with the network right for the docker to run some command like "ip route add ...., ip addr add ...."

# Architecture

![alt text](https://github.com/b4b857f6ee/fakeinternet-docker/blob/master/images/fakewww.png)

On the fake web you need the 3 dockers :
- fakewww_bind_dnsa_1.0.0
- fakewww_inetsim_1.0.0
- fakewww_nginx_1.0.0

And one more you have to provide, the IPS router. The router are going to be the bridge between your front firewall and the fake web area.

# Need to work on :
- Build ISP router docker
- Add more website
- Any suggestion? :)