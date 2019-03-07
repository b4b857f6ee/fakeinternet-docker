FROM debian-based:9

RUN apt update && apt upgrade -y

RUN apt install gnupg wget -y

RUN echo "deb http://www.inetsim.org/debian/ binary/" > /etc/apt/sources.list.d/inetsim.list
RUN wget -O - http://www.inetsim.org/inetsim-archive-signing-key.asc | apt-key add -
RUN apt update 
RUN apt install inetsim -y

RUN sed -i "s/^#service_bind_address	10.10.10.1/service_bind_address	0.0.0.0/" /etc/inetsim/inetsim.conf
RUN sed -i "s/^#dns_default_ip		10.10.10.1/dns_default_ip		0.0.0.0/" /etc/inetsim/inetsim.conf

RUN echo "inetsim" > /etc/hostname 

#USER root
#RUN echo "lade\nuser\n" | passwd 

COPY supervisord.conf /etc/supervisord.conf
CMD ["/usr/bin/supervisord","-c","/etc/supervisord.conf"] 
