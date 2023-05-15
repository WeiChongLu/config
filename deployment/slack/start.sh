# define constant
SLACK_PATH="https://hooks.slack.com/services/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"

# find basic variables
REPO_NAME=$(git config --get remote.origin.url |  sed 's#.*/\([^.]*\)\.git#\1#')
COMMIT_ID=$(git rev-parse --short HEAD)
CURR_TAG=$(git describe --exact-match --all HEAD)

# determine environment
ENVIRONMENT='DEV'
if echo $CURR_TAG | grep -q "prod-v"; then
  ENVIRONMENT='PROD'
elif echo $CURR_TAG | grep -q "staging-v"; then
  ENVIRONMENT='STAGING'
else 
  ENVIRONMENT='DEV'
fi

# send message
MESSAGE="{'text':'[*$REPO_NAME*] :wrench: Deploying \`$COMMIT_ID\` to *$ENVIRONMENT*...'}"
curl -X POST -H 'Content-type: application/json' --data "$MESSAGE" $SLACK_PATH
