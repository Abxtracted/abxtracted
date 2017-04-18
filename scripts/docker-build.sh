#!/bin/sh
# build=$(date "+%Y%m%d%H%M")
# foda-se vou mudar isso na mao memo to nem ai
build="v1"

mvn clean install -f ./app/pom.xml
(cd webapp; npm install; gulp build --end prod)

for img in api web; do
  tag="grc.io/abxtract-151511/$img:$build"
  docker build -f "Dockerfile.$img" -t "$tag" .

  # not working wtf
  gcloud docker -- push "$tag"
done
