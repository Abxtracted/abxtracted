#!/bin/bash

PROJECT_ID=$1
EXPERIMENT_KEY=$2
if [ -z "$3" ]; then
  USERS=3000
else
  USERS=$3
fi

if [ -z "$PROJECT_ID" ] || [ -z "$EXPERIMENT_KEY" ]; then
  echo "Project id and experiment key are required!"
  echo "Usage: $0 <project uuid> <experiment key> [number simulated users]"
  exit 1
fi

echo "Generating data for"
echo -ne "\t Project: $PROJECT_ID\n"
echo -ne "\t Experiment: $EXPERIMENT_KEY\n\n"


for ((i=1;i<=$USERS;i++));
do
  USER_IDENTITY=`cat /dev/random | LC_CTYPE=C tr -dc "[:alpha:]" | head -c 100`
  curl -s -XGET http://localhost:8080/public/project/$PROJECT_ID/customer/$USER_IDENTITY/experiment/$EXPERIMENT_KEY > /dev/null
  COMPLETE=`grep -m1 -ao '[0-4]' /dev/urandom | head -n1`
  if [ "$COMPLETE" == "1" ]; then
    curl -s -XGET http://localhost:8080/public/project/$PROJECT_ID/customer/$USER_IDENTITY/experiment/$EXPERIMENT_KEY/check/complete > /dev/null
  fi


  PERCENT=$(( $i * 100 / $USERS ))
  MISSING=$(( 100 - $PERCENT ))
  if [ "$PERCENT" != "0" ]; then
    BAR=`head -c $PERCENT < /dev/zero | tr '\0' '='`
  else
    BAR=""
  fi
  if [ "$MISSING" != "0" ]; then
    EMPTY_BAR=`head -c $MISSING < /dev/zero | tr '\0' ' '`
    REPLACE_LINE="\r"
  else
    EMPTY_BAR=""
    REPLACE_LINE="\n"
  fi

  echo -ne "[$BAR$EMPTY_BAR] $PERCENT%$REPLACE_LINE"
done
