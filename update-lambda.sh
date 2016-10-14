#!/bin/bash

echo "Updating Lambda Function"
echo "Removing old zip file" && rm lambda-php.zip ; \
echo "Zipping new code" && zip lambda-php.zip index.js index.php php && \
echo "Uploading zip file to AWS" && aws lambda update-function-code --function-name "lambda-php" --publish --zip-file "fileb:///Users/luketarplin/php/aws-lambda-php-template/lambda-php.zip"