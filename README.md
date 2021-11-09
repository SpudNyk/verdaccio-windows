# verdaccio-windows

[Verdaccio](https://verdaccio.org/) is very useful server that provides "A lightweight private npm proxy registry".

This package allows the installation and running of Verdaccio as a Windows Service.

## Installation

1. Install nodejs for windows.
2. Extract release file for verdaccio windows.
3. run `npm install --save verdaccio`
4. Download the latest [Windows Service Wrapper (winsw)](https://github.com/winsw/winsw) release as appropriate.
Normally (winsw-x64.exe).
5. Rename the winsw executable verdaccio-service.exe
6. Edit the winsw config [verdaccio-service.yml](./verdaccio-service.yml) as appropriate.
7. Edit the verdaccio config [verdaccio-config.yaml](./verdaccio-config.yaml) as detailed at in the [verdaccio documentation](https://verdaccio.org/docs/configuration).
8. Install the service - run:

    ```cmd
    .\verdaccio-service.exe install
    ```

9. Start the service - run:

    ```cmd
    .\verdaccio-service.exe start
    ```


### Installation Notes

Windows firewall may need to be configured to allow the node process act as a server.

#### Customizing the service name

Edit the [verdaccio-service.yml](./verdaccio-service.yml)

#### Running verdaccio from the command line

Use the verdaccio.cmd or verdaccio.ps1 script with the `--config` option:

```cmd
.\verdaccio.cmd --config verdaccio-config.yaml
```

#### Default Logs

Logging is configured in the winsw configuration [verdaccio-service.yml](./verdaccio-service.yml)

#### Accounts

Verdaccio uses apache htpasswd files for its authentication by default. The [htpasswd](https://github.com/http-auth/htpasswd) can be used to create a file valid for verdaccio - you can use `npx` to run it

```cmd
npx htpasswd
```

Use this to create a htpasswd file and manage the accounts in it. **NOTE** Ensure Verdaccio is configured to point to the htpasswd file you created (default is `.\htpasswd`).
