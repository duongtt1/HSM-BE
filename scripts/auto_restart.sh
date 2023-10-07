#!/bin/bash

DIR_WORK="~/workplace"
if [ -d "$DIR_WORK" ]; then
    rm -rf $DIR_WORK
fi

git clone https://github.com/duongtt1/HSM-BE.git $DIR_WORK
cd $DIR_WORK
npm install
pm2 start app.js
