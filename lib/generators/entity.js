const reducer = require('./entity-reducer/entity-reducer');
exports.entity = function(config) {
    config.next();
    console.log('you selected', 'entity'.blue, 'for', 'entity'.green, 'with option', config.current());
    switch (config.current()) {
        case 'reducer':
            reducer.reducer(config);
            break;
        default:
            console.log('you need to supply entity option'.red, config.current());
            console.log('reducer'.blue);
    }

};
