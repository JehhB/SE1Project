FROM php:8.2.14-apache
RUN a2enmod headers rewrite && docker-php-ext-install pdo pdo_mysql
COPY api /var/www/html/api