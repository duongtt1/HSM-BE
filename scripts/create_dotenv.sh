#!/bin/bash

# Check if exactly three parameters are provided
if [ $# -ne 3 ]; then
    echo "Usage: $0 <NODE_ENV> <MONGO_URI> <PORT>"
    exit 1
fi

# Write to .env file
echo "NODE_ENV=$1" > .env
echo "MONGO_URI=$2" >> .env
echo "PORT=$3" >> .env

echo "Parameters written to .env file:"
# cat .env
