#!/usr/bin/env bash

timestamp() {
  date +"%s"
}

for entry in "../src"/*
do
    JSNAME=${entry:7};
    startTime=$(timestamp);

    if [ -f "$entry" ]; then
        jsdoc2md "../src/"$JSNAME > "../md/"$(echo ${JSNAME} | sed 's/.js/.md/g')
        echo "../src/"$JSNAME '-->' "../md/"$(echo ${JSNAME} | sed 's/.js/.md/g') " : " $(expr $(timestamp) - $startTime) "Second"
    fi

    for subfile in "../src"/$JSNAME/*.js
    do
        JSNAME=${subfile:7};

        if [ -f "$subfile" ]; then
            jsdoc2md "../src/"$JSNAME > "../md/"$(echo ${JSNAME} | sed 's/.js/.md/g')
            echo "../src/"$JSNAME '-->' "../md/"$(echo ${JSNAME} | sed 's/.js/.md/g') " : " $(expr $(timestamp) - $startTime) "Second"
        fi
        echo ${subfile}
    done
done