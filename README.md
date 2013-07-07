<img height="276px" src="./ReactAppLogo.png"/>



**Goals**:
  - Rapidly build applications with `React`/`JSX`/`commonJS`.
  - Hit refresh to load new experience **instantly** (no watching file system)
  - *Just Works* on Mac/Linux/Windows.
  - Server rendering playground.

**Possible Add-Ons**:
  - Single OS Keyboard shortcut to:
    - Clone new `reactapp`, open it in browser and text editor.
    - One second between a new idea and building that idea.
  - Reload/rerender modules as you type in text editor (only the ones that changed).



<br>



###Install

> All you need to get started is git/node/npm.

    git clone https://github.com/jordwalke/reactapp
    cd reactapp
    npm install                 # install dependencies.



### Run and Build on the Fly

>  Just hit your browser's refresh button run an always-up-to-date version of your app.

| Option 1: Web Server                                                 | Option 2: In-Browser |
|:---------------------------------------------------------------------| :--------------------|
| <pre>node server/serverMain.js<br>open http://localhost:8080</pre>   | `open file://path/to/index.html`        |
| <ul><li>Dynamically packages/compiles your app on each server request.</li><li>Optional server-side rendering.</li><li>Intelligent caching using `browserify-middleware`.</li></ul> | <ul><li>All compiling performed in the browser.</li><li>No server needed.</li><li>Works on Safari/FF/IE/rawgithub</li></ul>|


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
          ├── components/           # All application UI components
          │   └── Application.jsx   # The Top Level Component
          │   └── Widget.jsx        # A View style component.
          ├── client/               # client-only code
          │   └── clientMain.jsx
          └── server                # server-only code
              └── serverMain.jsx



### Build For Production or Sharing
> Pre-Build your app for use on CDN, or to allow your committed project to be effeciantly loaded server or build process.

| Command Line Build                                                                                                         |
| :---------------------------------------------------------------------------------------------------------------|
| <pre>sudo npm install -g browserify<br>./offlineBuild.sh  # output build/build.js is included in index.html</pre>         |


