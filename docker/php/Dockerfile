FROM php:apache
WORKDIR /var/www

COPY composer-install.php /root/composer-install.php
RUN apt-get update
RUN apt-get install -y libzip-dev unzip git
RUN a2enmod rewrite && service apache2 restart
RUN php /root/composer-install.php && \
    sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf && \
    sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf && \
    docker-php-ext-install zip