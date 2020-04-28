#!/bin/bash

set -e

"$(npm bin)/tsc" --noEmit --watch &
"$(npm bin)/parcel" ./demo/index.html
