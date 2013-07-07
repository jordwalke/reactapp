/**
 * TODO:
 */
var browserifyMiddleware = require('browserify-middleware');
var reactify = require('reactify');
var express = require('express');
var reactCore = require('react-core');
var fs = require('fs');
var app = express();
var React = reactCore.React;
var path = require('path');

require('./nodeJSRequireJSX.js');

/**
 * `reactapp` server:
 * A simple express server that automatically serves the lastest packaged and
 * transformed resources to the client - in addition to being a testing ground
 * for server rendering your app.
 *
 * Interestingly the server rendering setup becomes a huge benefit to
 * productivity. When a file changes, it's very fast to reload those modules
 * inside of nodejs, but takes longer to repackage a completely new browserified
 * bundle.
 */


/**
 * TODO:
 * - Put server rendered experience on a different port number.
 * - Encode currently running server react version into the <head>'s script
 *   include version.
 * - Allow the "top level component" to be defined in a configuration
 *   (package.json?) as well as the top level query module (perhaps).  Then,
 *   `clientMain.js` will be auto generated according to how:
 * --1. The main package is constructed based on that entry point module.
 * --2. The initial server rendering that is performed based on that entry point
 *  module.
 * - Document the fact that everything in app/ should be wiped on each page
 *   request (cache cleared in require) so that no info leaks across page
 *   requests. Also recommend contextify. Everything in `server/` will remain
 *   untouched.
 */

/**
 * Using our index.html as a quick-and-dirty template. Not using any kind of {}
 * convention so as not to give the impression that we're actually using
 * templates (we're not) - this is only used for server rendering.
 */
var END_OF_HEAD_MARKER = '<!--END_OF_HEAD_MARKER-->';
var RENDER_OUTPUT_MARKER = '<!--RENDER_OUTPUT_MARKER-->';
var PORT_NUMBER = 8080;
var BUILD_TARGET_WRT_SERVER_ROOT = '/build/build.js';
var CLIENT_MAIN_WRT_SERVER_MAIN = '../client/clientMain.jsx';
var HTML_MAIN_ABSOLUTE =
  path.resolve(__dirname, '..', '..', 'static_resources/index.html');
var PUBLIC_ROOT_ABSOLUTE =
  path.resolve(__dirname, '..', '..', 'static_resources/');
var TOP_LEVEL_COMPONENT_PATH =
  path.resolve(__dirname, '..', 'app/Application.jsx');
var APP_DIRECTORY_ABSOLUTE = path.resolve(__dirname, '..', 'app');
var SERVER_RENDER_VIRT_RESOURCE = 'index.server.html';

/**
 * Simulating long durations of markup generation is useful for testing that we
 * are optimally downloading resources before the server completes markup
 * generation. We should receive the script includes in the head and begin
 * downloading scripts almost immediately. Usually, the markup will be received
 * before the JS download is complete, but by flushing the head early, we ensure
 * that the JS is downloaded as close as possible to the time when the markup is
 * received. This setting is just useful for looking at network timing diagrams
 * to see that the js download begins long before the markup is fully received
 * (you'll see a long html send time and a js download begin at the start of
 * that send time).
 */
var SIMULATE_SLOW_MARKUP = false;
var SIMULATE_SLOW_MARKUP_MS = 4000;

/**
 * These simulation variables recreate what *actually* typically happens in
 * cold-cache page loads on server rendering systems, and demonstrates the value
 * of React's client/server rendering capabilities. The markup will be delivered
 * instantly, and the user can view and scroll the page. Shortly afte, the JS
 * arrives and the page becomes interactive.  (It turns out, even without these
 * enabled, server rendering in reactapp more or less models the cold cache
 * network behavior).
 */
// var SIMULATE_SLOW_JS_DOWNLOAD = true;
// var SIMULATE_SLOW_JS_DOWNLOAD_MS = 4000;


/**
 * TODO: Form a grid showing the variety of scenerios and where various
 * client/server configurations could benefit/hurt the perfomance.
 * [ ] JS Cache Cold/Warm
 * [ ] Network speed [slow, fast, n]
 * [ ] Rendering time [slow, fast, n]
 * [ ] Rendering location [client, server]
 */

var BROWSERIFY_CONFIG = {
  cache: false, // until 'dynamic' works
  transform: reactify,
  debug: true         // Source maps
};


var fetchAppConfigThen = function(then) {
  fs.readFile(HTML_MAIN_ABSOLUTE, 'utf8', function (err, data) {
    if (err) {
      return console.error(err);
    }
    then({indexHTML: data});
  });
};

/**
 * Clears application modules that may have been modified since the last
 * request.
 */
var isApplicationModule = function(modulePath) {
  return modulePath.indexOf(APP_DIRECTORY_ABSOLUTE) === 0;
};
var clearApplicationModules = function() {
  for (var key in require.cache) {
    if (!require.cache.hasOwnProperty(key)) {
      continue;
    }
    if (isApplicationModule(key)) {
      delete require.cache[key];
    }
  }
};

var splitOnMarker = function(str, marker) {
  var splitPage = str.split(marker);
  if (splitPage.length !== 2) {
    throw new Error('Did not find properly formatted markup');
  }
  return splitPage;
};

var performServerRendering = function(reactAppConfig, req, res) {
  var topProps = {};
  var Application = require(TOP_LEVEL_COMPONENT_PATH);
  React.renderComponentToString(Application(topProps), function(appRender) {
    var renderIntoBodyAndSend = function(renderlessBody) {
      var splitOnRenderMarker = splitOnMarker(renderlessBody, RENDER_OUTPUT_MARKER);
      var allBody = splitOnRenderMarker[0] + appRender + splitOnRenderMarker[1];
      res.end(allBody);
    };
    var splitOnHeadMarker = splitOnMarker(reactAppConfig.indexHTML, END_OF_HEAD_MARKER);
    var head = splitOnHeadMarker[0];
    var renderlessBody = splitOnHeadMarker[1];

    res.setHeader('Content-Type', 'text/html');
    // TODO: Use byte length, not character length! (If this is even needed at
    // all)
    // res.setHeader('Content-Length', length);
    res.write(head);
    if (!SIMULATE_SLOW_MARKUP) {
      renderIntoBodyAndSend(renderlessBody);
    } else {
      setTimeout(
        renderIntoBodyAndSend.bind(null, renderlessBody),
        SIMULATE_SLOW_MARKUP_MS
      );
    }
    clearApplicationModules();
  });
};

var launchServer = function(reactAppConfig) {
  app.use(express.logger('dev'));
  app.use(express.static(PUBLIC_ROOT_ABSOLUTE));

  /**
   * Deliver package of all resources.
   */
  app.get(
    BUILD_TARGET_WRT_SERVER_ROOT,
    browserifyMiddleware(CLIENT_MAIN_WRT_SERVER_MAIN, BROWSERIFY_CONFIG)
  );

  /**
   * Same as `index.html` but prerendered on the server.
   */
  app.get('/index.server.html', performServerRendering.bind(null, reactAppConfig));

  /**
   * Listen.
   */
  app.listen(PORT_NUMBER);

  console.log(
    'listening on port ' + PORT_NUMBER +
    ' from ' + PUBLIC_ROOT_ABSOLUTE
  );
};

fetchAppConfigThen(launchServer);
