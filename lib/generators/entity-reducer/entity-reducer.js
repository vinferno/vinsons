exports.reducer = function(config) {
    console.log('you selected', 'reducer'.blue, 'for', 'entity-reducer'.green);
    config.next();
    const args = config.args.slice(config.i);
    console.log('args for reducer', args);
    const setup = {};
    args.forEach(arg => {
        if (arg.includes('=')){
            setup[arg.split('=')[0]] = arg.split('=')[1];
        }
    });
    console.log('setup', setup);
};

