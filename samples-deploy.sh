#!/usr/bin/env bash

rm -rf samples/dist
cd samples && webpack && cd .. && echo "ax6ui.com" > samples/dist/CNAME
git add -A
git commit -m "Update Site"
git push origin master
git subtree push --prefix  samples/dist/ origin gh-pages
