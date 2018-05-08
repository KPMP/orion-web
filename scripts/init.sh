#!/bin/sh
set -e
npm install
exec "$@" watch
