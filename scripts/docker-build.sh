#!/bin/sh
set -eo pipefail
build=$(date "+%Y%m%d%H%M")

mvn clean install -f ./app/pom.xml
(cd webapp; npm install; gulp build --end prod)

for img in api web; do
  tag="gcr.io/abxtract-167923/$img:$build"
  docker build -f "Dockerfile.$img" -t "$tag" .

  gcloud docker -- push "$tag"
done
