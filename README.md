<img height="276px" src="./ReactAppLogo.png"/>



> `reactapp`: Build and test single page `React`/`commonJS` apps that effortlessly
> render on both the client and the server.


**Goals**:
  - Refresh loads new experience **instantly** (Latest file changes compiled on
      the fly)
  - *Just Works* on Mac/Linux/Windows.
  - One-click server rendering.

**Possible Add-Ons**:
  - Reload/rerender modules as you type in text editor (only the ones that changed).
  - Reload style without page refresh as style files change.


<br>


###Install

> All you need to get started is git/node/npm.

    git clone https://github.com/jordwalke/reactapp
    cd reactapp
    npm install                 # install dependencies.



### Run and Build on the Fly

>  Just hit your browser's refresh button to run an always-up-to-date version of your app.

    node server/serverMain.js
    open http://localhost:8080                     # App rendered on the client.
    open http://localhost:8080/index.server.html   # App rendered on the server.

    - Dynamically packages/compiles your app on each server request.


###Structure

> `reactapp` is a basic structure for you app and development environment.


     reactapp/
      ├── index.html
      ├── package.json
      ├── README.md
      ├── offlineBuild.sh           # Serverless static build.
      ├── build/
      │   └── build.js
      └── lib/
          ├── app/                  # All application components, including UI.
          │   └── Application.jsx   # The Top Level Component
          │   └── Widget.jsx        # A View style component.
          ├── client/               # client-only code
          │   └── clientMain.jsx
          └── server                # server-only code
              └── serverMain.jsx


### Build You App

`reactapp` considers the `lib/app/Application.jsx` to be your main entry point
component. Start by editing that file to create your user experience. Add your
own component directory structure inside of `lib/app/` to your liking.


### Build For Production or Sharing
> Pre-Build your app for use on CDN, or to allow your committed project to be effeciantly loaded without a server/build-step.

        sudo npm install -g browserify
        ./offlineBuild.sh  # Output build/build.js is included in index.html
        open index.html    # No server needed now!

 `reactapp` seeks to enable you to share your work with others easily. You may
 wish to run `offlineBuild.sh` each time before you push your branch to a public
 repo, so that others can easily download and try your app without having to set
 up a toolchain. If you have a purely client side app (no server side data
     fetching) `./offlineBuild.sh` will create a "one-click" demoable package
 for anyone to try in any browser - they only need to open `index.html`.
