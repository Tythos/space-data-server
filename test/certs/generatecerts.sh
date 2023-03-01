#!/bin/sh
echo $PWD

openssl req \
    -new \
    -newkey ec \
    -pkeyopt ec_paramgen_curve:prime256v1 \
    -days 365 \
    -nodes \
    -x509 \
    -subj "/C=US/ST=local/L=host/O=none/CN=testserver" \
    -keyout ./output/localhost.key \
    -out ./output/localhost.cert