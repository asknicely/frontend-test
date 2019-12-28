#!/usr/bin/env bash
# https://sigmoidal.io/automatic-code-quality-checks-with-git-hooks/

echo "Running pre-commit hook"
./scripts/run-tests.bash

# $? stores exit value of the last command
if [ $? -ne 0 ]; then
 >&2 echo "COMMIT FAILED"
 exit 1
fi