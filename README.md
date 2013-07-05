reactapp
========
  > <h4>
  > A sample project and fast build system for developing with React, JSX and commonJS modules.
  > </h4>

**Goals**:
  - Rapidly build/develop React JSX applications using commonJS/npm.
  - Hit refresh to load new experience **instantly**.
  - Low power usage (no expensive watching/repackaging every time files change)
  - Every fork should *just work* on Mac/Linux/Windows/rawgithub.
  - One-click Server rendering.

**Stretch Goal**:
  - Develop React apps on non-jailbroken iPad - simply refresh Safari.
  - Google closure compiler (ADVANCED_MODE) testing ground.

**Non-goals**:
  - To use packager X, web server Y, module loader Z, build system Q. These details will change as better technologies emerge.


<h2>Setup</h2>


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


<h2>Three App Launch Options</h2>

<h3>#1. Prebuild - no server:</h3>

  > One package, built via command line.


        cd reactapp
        npm install -g browserify
        browserify -t reactify lib/client/clientMain.jsx >> ./build/monolithicBuild.js
        # Then open index.html in your browser


<h3>#2. Express Server:</h3>

  > One package, built automatically on page request.


        cd reactapp
        node server/serverMain.js
        # open localhost:8080 in your browser


<h3>#3. In-Browser Build - no server, no build:</h3>

- (Not yet implemented in `reactapp`)
