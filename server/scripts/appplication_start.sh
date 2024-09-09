#!/bin/bash
# Give permission for everything in the cicd-test directory
sudo chmod -R 777 /home/ec2-user/cicd-test

# Navigate into our working directory where we have all our GitHub files
cd /home/ec2-user/cicd-test/server

# Add npm and node to path
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # Loads nvm bash_completion

# Retrieve all environment variables from SSM Parameter Store
export ACCESS_KEY=$(aws ssm get-parameter --name "ACCESS_KEY" --query "Parameter.Value" --output text)
export SECRET_ACCESS_KEY=$(aws ssm get-parameter --name "SECRET_ACCESS_KEY" --query "Parameter.Value" --output text)
export SENTRY_DSN=$(aws ssm get-parameter --name "SENTRY_DSN" --query "Parameter.Value" --output text)
export DEV_MONGODB_URI=$(aws ssm get-parameter --name "DEV_MONGODB_URI" --query "Parameter.Value" --output text)
export DEV_CLIENT_URI=$(aws ssm get-parameter --name "DEV_CLIENT_URI" --query "Parameter.Value" --output text)
export PROD_MONGODB_URI=$(aws ssm get-parameter --name "PROD_MONGODB_URI" --query "Parameter.Value" --output text)
export PROD_CLIENT_URI=$(aws ssm get-parameter --name "PROD_CLIENT_URI" --query "Parameter.Value" --output text)
export SERVER_MONGODB_URI=$(aws ssm get-parameter --name "SERVER_MONGODB_URI" --query "Parameter.Value" --output text)
export SERVER_CLIENT_URI=$(aws ssm get-parameter --name "SERVER_CLIENT_URI" --query "Parameter.Value" --output text)

# Install node modules
npm install

# Start our node app in the background
node app.mjs > app.out.log 2> app.err.log < /dev/null &
