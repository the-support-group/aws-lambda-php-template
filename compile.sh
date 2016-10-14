#!/bin/sh

PWD=pwd

cd /tmp
wget http://uk1.php.net/distributions/php-7.0.11.tar.gz
rm -rf php-7.0.11/
tar zxvf 7.0.11.tar.gz

cd 7.0.11/

./configure --disable-all \
	--without-pear \
	--enable-pdo \
	--enable-intl \
	--enable-mbstring \
	--enable-json \
	--with-mysqli=mysqlnd \
	--with-pdo-mysql=mysqlnd \
	--with-icu-dir=/usr/local/opt/icu4c

make
make install 

cd $PWD
