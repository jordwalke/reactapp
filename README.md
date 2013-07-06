
<img height="276px" src="./ReactAppLogo.png"/>



**Goals**:
  - Rapidly build React JSX applications using commonJS.
  - Hit refresh to load new experience **instantly**.
  - Low power usage (no expensive watching/repackaging every time files change)
  - Every fork should *just work* on Mac/Linux/Windows/rawgithub.
  - One-click Server rendering example of your app.
  - Google closure compiler (ADVANCED_MODE) testing ground.
  - [Maybe] Edit and run React apps entirely on non-jailbroken iPad - no server.
 
**Non-goals**:
- Use a particular packager/server. We'll use whatever provides an effortless dev experience.



<br>



###Install


    git clone https://github.com/jordwalke/reactapp
    cd reactapp
    npm install                 # install dependencies.

<br>


###Run (Three Options)


| Option 1: Command Line Build                                                                                                                             | Option 2: Web Server                                                | Option 3: In-Browser |
| :------------------------------------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------------------------------------| :-------------------:|
| <pre>sudo npm install -g browserify<br>browserify -t reactify \\<br>  lib/client/clientMain.jsx > ./build/build.js<br> open ./index.html</pre> | <pre>node server/serverMain.js<br>open http://localhost:8080</pre>  | `Coming Soon`        |

