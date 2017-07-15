#!/usr/bin/env bash

for entry in ".."/*.js
do
    JSNAME=${entry:3}
    jsdoc2md "../"$JSNAME > "../md/"$(echo ${JSNAME} | sed 's/.js/.md/g')
    echo "../"$JSNAME '-->' "../md/"$(echo ${JSNAME} | sed 's/.js/.md/g')
done