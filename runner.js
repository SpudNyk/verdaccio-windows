// wrapper script for verdaccio that allows pulling the config file location
// from the environment as node-windows cannot specify command line arguments

const verdaccio = (args = process.argv.slice(2)) => {
    // override args
    process.argv = process.argv.slice(0, 2).concat(args);
    require('verdaccio/build/lib/cli');
};

const main = (args = process.argv.slice(2)) => {
    const configFile = process.env.VERDACCIO_CONFIG;
    if (configFile) {
        verdaccio(['-c', configFile].concat(args));
    } else {
        verdaccio(args);
    }
};

main();
