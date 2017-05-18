#!/bin/sh
set -xeo pipefail
build=$(date "+%Y%m%d%H%M")

mvn clean install -f ./app/pom.xml
(cd webapp && npm install && gulp build --end prod)

for img in api web; do
  tag="gcr.io/abxtracted-167923/$img:$build"
  docker build -f "Dockerfile.$img" -t "$tag" .
  docker tag "$tag" "gcr.io/abxtracted-167923/$img:latest"

  gcloud docker -- push "$tag"
  gcloud docker -- push "gcr.io/abxtracted-167923/$img:latest"
done
