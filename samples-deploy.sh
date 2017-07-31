rm -rf samples/dist
cat samples/CNAME >> samples/dist/CNAME
cd samples && webpack && cd ..
git add -A
git commit -m "Update Site"
git push origin master
git subtree push --prefix  samples/dist/ origin gh-pages
