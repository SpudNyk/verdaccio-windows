const path = require('path');
const nw = require('node-windows');

const setAccount = (service, login) => {
    if (!login) return service;
    const { name, password, domain } = login;
    service.logOnAs.account = name;
    service.logOnAs.password = password;
    if (domain) {
        console.log(` Using Account: ${name} Domain: ${domain}`);
        service.logOnAs.domain = domain;
    } else {
        console.log(` Using Account: ${name}`);
    }
    return service;
};

const getService = argv => {
    const scriptPath = path.join(__dirname, 'runner.js');
    const { name, description, config, logs } = argv;
    const service = {
        name,
        description,
        script: scriptPath
    };
    if (logs) {
        service.logpath = logs;
    }
    if (config) {
        const configPath = path.resolve(config);
        console.log(`Using verdaccio config: ${configPath}`);
        service.env = {
            name: 'VERDACCIO_CONFIG',
            value: configPath
        };
    }
    return new nw.Service(service);
};

const eventResolver = (handler, complete, error) => (...args) => {
    try {
        complete(handler(...args));
    } catch (e) {
        error(e);
    }
};

const promiseFirstEvent = (ob, events) => {
    return new Promise((resolve, reject) => {
        const cleanup = () => {
            resolvers.forEach(([name, handler]) => {
                ob.off(name, handler);
            });
        };
        const complete = result => {
            cleanup();
            resolve(result);
        };
        const error = err => {
            cleanup();
            reject(err);
        };

        const resolvers = Object.entries(events).map(([name, handler]) => {
            const resolver = eventResolver(handler, complete, error);
            ob.on(name, resolver);
            return [name, resolver];
        });
    });
};

const argsNone = yargs => yargs;

const argsInstall = yargs =>
    yargs
        .option('config', {
            alias: 'c',
            type: 'string',
            description: 'The path to the verdaccio configuration file',
            global: true
        })
        .option('description', {
            alias: 'd',
            type: 'string',
            description: 'The description of the service',
            default: 'Verdaccio Package Registry'
        })
        .option('logs', {
            description: 'The directory to log the service output'
        })
        .option('account', {
            description: 'The account to run the service as'
        })
        .describe('account.name', 'account name')
        .describe('account.password', 'The password for the account.')
        .describe('account.domain', 'The domain of the account');

const cmdInstall = argv => {
    const service = getService(argv);
    console.log(`Installing Service: ${service.name}`);
    setAccount(service, argv.account);
    service.install();
    return promiseFirstEvent(service, {
        install: () => {
            console.log(`Installed Service: ${service.name}`);
            return service;
        },
        alreadyinstalled: () => {
            console.log(
                `Unable to install Service: ${service.name} Already exists`
            );
            process.exitCode = 1;
            return false;
        },
        invalidinstallation: () => {
            console.log(
                `Unable to install Service: ${service.name} Installation Invalid`
            );
            process.exitCode = 1;
            return false;
        },
        error: e => {
            console.log(`Error installing service ${service.name} - ${e}`);
            process.exitCode = 1;
            return false;
        }
    });
};

const argsUninstall = argsNone;

const cmdUninstall = argv => {
    const service = setAccount(getService(argv), argv.account);
    console.log(`Uninstalling Service: ${service.name}`);
    service.uninstall();
    return promiseFirstEvent(service, {
        uninstall: () => {
            console.log(`Uninstalled Service: ${service.name}`);
            return service;
        },
        alreadyuninstalled: () => {
            console.log(
                `Unable to uninstall Service: ${service.name} not installed`
            );
            process.exitCode = 1;
            return false;
        },
        error: e => {
            console.log(`Error uninstalling service ${service.name} - ${e}`);
            process.exitCode = 1;
            return false;
        }
    });
};

const argsStart = argsNone;

const cmdStart = argv => {
    const service = getService(argv);
    service.start();
    return promiseFirstEvent(service, {
        start: () => {
            console.log(`Started Service: ${service.name}`);
            return service;
        },
        error: e => {
            console.log(`Error starting service ${service.name} - ${e}`);
            process.exitCode = 1;
            return false;
        }
    });
};

const argsStop = argsNone;

const cmdStop = argv => {
    const service = getService(argv);
    service.stop();
    return promiseFirstEvent(service, {
        stop: () => {
            console.log(`Stopped Service: ${service.name}`);
            return service;
        },
        alreadystopped: () => {
            console.log(`Service: ${service.name} already stopped`);
            return service;
        },
        error: e => {
            console.log(`Error stopping service ${service.name} - ${e}`);
            process.exitCode = 1;
        }
    });
};

const argsRestart = argsNone;

const cmdRestart = argv => {
    return cmdStop(argv).then(service => {
        if (service !== false) {
            return cmdStart(argv);
        }
    });
};

// don't use global yargs singleton
const yargs = require('yargs/yargs')(process.argv.slice(2));
yargs
    .usage(`Manages Verdaccio Services\r\n\r\nUsage:\r\n$0 <command> [options]`)
    .option('name', {
        alias: 'n',
        type: 'string',
        description: 'The name to use for the service',
        default: 'Verdaccio',
        global: true
    })
    .command('install', 'installs the service', argsInstall, cmdInstall)
    .command('uninstall', 'uninstalls the service', argsUninstall, cmdUninstall)
    .command('start', 'starts the service', argsStart, cmdStart)
    .command('stop', 'stops the service', argsStop, cmdStop)
    .command('restart', 'restarts the service', argsRestart, cmdRestart).argv;
