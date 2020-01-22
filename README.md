# verdaccio-windows

Install and run Verdaccio on windows as a service

## Usage

Use the service.js command to manage a verdaccio service.

Use `node service.js help` for more information.

Use `node service.js <command> --help` for information on a specific command.

```text
Manages Verdaccio Services

Usage:
service.js <command> [options]

Commands:
  service.js install    installs the service
  service.js uninstall  uninstalls the service
  service.js start      starts the service
  service.js stop       stops the service
  service.js restart    restarts the service

Options:
  --help      Show help                                                [boolean]
  --version   Show version number                                      [boolean]
  --name, -n  The name to use for the service    [string] [default: "Verdaccio"]
```

### Install

```text
service.js install

installs the service

Options:
  --help              Show help                                        [boolean]
  --version           Show version number                              [boolean]
  --name, -n          The name to use for the service
                                                 [string] [default: "Verdaccio"]
  --config, -c        The path to the verdaccio configuration file      [string]
  --description, -d   The description of the service
                                [string] [default: "Verdaccio Package Registry"]
  --logs              The directory to log the service output
  --account           The account to run the service as
  --account.name      account name
  --account.password  The password for the account.
  --account.domain    The domain of the account
```

### Uninstall

```text
service.js uninstall

uninstalls the service

Options:
  --help      Show help                                                [boolean]
  --version   Show version number                                      [boolean]
  --name, -n  The name to use for the service    [string] [default: "Verdaccio"]
```

### Start

```text
service.js start

starts the service

Options:
  --help      Show help                                                [boolean]
  --version   Show version number                                      [boolean]
  --name, -n  The name to use for the service    [string] [default: "Verdaccio"]
```

### Stop

```text
service.js stop

stops the service

Options:
  --help      Show help                                                [boolean]
  --version   Show version number                                      [boolean]
  --name, -n  The name to use for the service    [string] [default: "Verdaccio"]
```

### Restart

```text
service.js restart

restarts the service

Options:
  --help      Show help                                                [boolean]
  --version   Show version number                                      [boolean]
  --name, -n  The name to use for the service    [string] [default: "Verdaccio"]
```
