#!/usr/bin/env bash
cd angular-client
grunt build
cd -
cf push
