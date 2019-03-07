from centos:latest

# Install bind:
RUN yum install bind bind-utils -y

ENV USER user
ENV PASSWORD user
ENV ROOT_PASSWORD user

COPY named.conf /etc/named.conf
COPY zones /etc/named
COPY supervisord.conf /etc/supervisord.conf

COPY entrypoint.sh /
RUN chmod 755 /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

