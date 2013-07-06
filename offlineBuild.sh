#!/bin/bash
browserify -t reactify lib/client/clientMain.jsx > ./build/build.js
