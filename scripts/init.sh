#!/bin/sh
set -e
npm install --force
exec "$@" watch | "$@" watch-css