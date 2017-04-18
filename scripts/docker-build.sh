#!/bin/sh
build=$(date "+%Y%m%d%H%M")

mvn clean install -f ./app/pom.xml
(cd webapp; npm install; gulp build --end prod)

for img in api web; do
  docker build -f "Dockerfile.$img" -t "grc.io/abxtract-151511/$img:$build" .
  gcloud docker -- push "grc.io/abxtract-151511/$img:$build"
done
