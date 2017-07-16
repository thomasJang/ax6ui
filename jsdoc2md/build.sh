#!/usr/bin/env bash

timestamp() {
  date +"%s"
}

for entry in "../src"/*.js
do
    JSNAME=${entry:7};
    startTime=$(timestamp);
    jsdoc2md "../src/"$JSNAME > "../md/"$(echo ${JSNAME} | sed 's/.js/.md/g')
    echo "../src/"$JSNAME '-->' "../md/"$(echo ${JSNAME} | sed 's/.js/.md/g') " : " $(expr $(timestamp) - $startTime) "Second"
done