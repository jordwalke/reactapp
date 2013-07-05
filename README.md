reactapp
========

Example React application skeleton.

**Non-goals**:
  - To use packager X, web server Y, module loader Z, build system Q.
  - These technologies are implementation details of reactapp.

**Goals**:
  - Provide a way to build and develop React applications rapidly.
  - npm centric (develop,test and share components with other developers using
      npm).
  - Use commonJS API (Don't rely on globals *EVER*)
  - Make changes to application files and be able to hit refresh **instantly**.
  - No browser loading race conditions with loading transformed files.
  - Low power usage (no expensive watching/repackaging every time files change)
  - Macbook Air should not catch on fire.
  - A way for JSX to work seamlessly on Mac/Linux/Windows.
  - Provide simple example of seamless server rendering (flip a switch and it
      falls back to client).
  - Every fork of `reactapp` should work with rawgithub (which provides us no
      web server) (hopefully through the in browser transform, but possibly
        requiring that you commit your branch with the build directory in
        place).
  - Provide a simple starting point that the community can easily fork to try
  out their new idea/component/UI Library/integration-with-framework-x. Readers
  will be familiar with the structure, and developers will be encouraged to test
  how their applications/integrations behave in a server rendered context.
  - Everything should *just work*.

**Stretch Goal**:
  - Be able to develop locally on a non-jailbroken iPad without a web
  server. Just reload Safari - all JSX transformation and rendering happens
  on the client.
  - Google closure compiler (ADVANCED_MODE) testing ground.


Setup:
=================================
    # Step 1 # First clone the React core: (Step will soon go away once in npm).
    git clone https://github.com/jordwalke/npm-react-core
    cd npm-react-core
    sudo npm link   # Make it possible to require('react-core')
    
    # Step 2:
    cd ../
    git clone https://github.com/jordwalke/reactapp
    cd reactapp
    npm install npm-react-core  # Ability to require('react-core') from here.
    npm install                 # install dependencies.


There are three simple toolchain options to developing a React application with reactapp:
========================================================================================
Goal: None of the methods should require that you write your code any
differently. They only offer a difference in developer workflow/speed.


Prebuild - (no web server):
=================================

- Simple Monolithic Package:

    cd reactapp
    npm install -g browserify
    browserify -t reactify lib/client/clientMain.jsx >> ./build/monolithicBuild.js
    # open index.html in your browser


Express Server:
=================================

- Automatically repackages/transforms JSX on page load.

    cd reactapp
    node server/serverMain.js
    # open localhost:8080 in your browser


In-Browser Build - (no web server, no prebuild):
================================================
(Not yet implemented in `reactapp`)


TODO:
=================================
  Improved Development Speed (break up packages) (Not yet working)

    cd reactapp
    browserify -r reactjs > ./build/reactBuild.js

    # Currently having trouble getting browserify to recognize npm dependencies.
    # This should work
    # Broken: browserify -t reactify -x reactjs -r lib/main.js
    # Tried this but it didn't work:
    browserify -t reactify lib/client/clientMain.jsx -i reactjs > ./build/appBuild.js

    # Browserify isn't packaging up external npm dependencies in their own
    # groups correctly: Tricky hack around the above limitation, is to create a
    # dummy module in the local project that only requires the dependencies that
    # you want in the package boundary.

    browserify -r ./lib/clientPackageBoundaries/reactPackageBoundary.js > ./build/reactPackageBoundaryBuild.js
    browserify -t reactify -x ./lib/clientPackageBoundaries/reactPackageBoundary -r ./lib/client/clientMain.jsx > ./build/appBuild.js
    This works as long as you always require react through > require('../lib/clientPackageBoundaries/reactPackageBoundary.js')






