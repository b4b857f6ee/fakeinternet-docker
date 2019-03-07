FROM centos:latest

# Install nginx:
RUN yum install nginx -y

ENV USER user
ENV PASSWORD user
ENV ROOT_PASSWORD user

COPY supervisord.conf /etc/supervisord.conf

#Copy Script
COPY script /root/scripts

#Copy conf web
COPY main.conf /etc/nginx/conf.d/

# Basic server html :
COPY www /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html
RUN sed -i 's|error_log .*|error_log syslog:server=unix:/dev/log,tag=nginx,severity=error;|g' /etc/nginx/nginx.conf
RUN sed -i 's|access_log .*|access_log syslog:server=unix:/dev/log,tag=nginx,severity=info main;|g' /etc/nginx/nginx.conf
RUN sed -i '/:80/d' /etc/nginx/nginx.conf

COPY entrypoint.sh /
RUN chmod 755 /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

