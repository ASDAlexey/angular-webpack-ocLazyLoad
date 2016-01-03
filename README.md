JellyChip
-----

Production URL: [jellychip.com](https://jellychip.com)

Staging URL: [stage.jellychip.com](http://stage.jellychip.com)

Testing URL: [test.jellychip.com](http://test.jellychip.com)

### Install ###

1. Install Node.js
    [download](https://nodejs.org/download/)

2. Install Bower and Gulp

    ```
    sudo npm install -g bower gulp
    ```

3. Check out the codebase
    In the directory where you keep your source code, run

    ```
    git clone git@codebasehq.com:umbrella-web/jellychip/jellychip-ng.git
    # OR, for HTTPS
    git clone https://umbrella-web.codebasehq.com/jellychip/jellychip-ng.git

    cd jellychip-ng
    ```

4. Install npm modules

    ```
    sudo npm install
    ```

5. Install packages

    ```
    bower install
    ```

6. Add line `127.0.0.1   localhost.jellychip.com` to `hosts` file for correct working of API.

### Build project ###

#### These commands copy the static files to output directory, build the client part, build the admin part and run the local server with livereload. ####

This command is main to build developer version of project.

```
npm run serve-dev
```

This command is main to build production version of project.

```
npm run serve-prod
```

#### These commands will build the project without run the local server ####

This command is main to build developer version of project.

```
npm run build-dev
```

This command is main to build production version of project.

```
npm run build-prod
```


### Configuration ###

To configure the project and to change settings of builder you need edit the file `config.json`.
This file is divided into several parts:

- `app` - settings of the SPA application

- `admin` - settings of the admin application

- `shared` - contains common settings for the admin and the SPA. They can be redefined into `app` and `admin` parts
