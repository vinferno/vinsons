const entity = require('./generators/entity');

exports.generate =  function(config) {
    console.log('you selected', 'g'.blue, 'for', 'generators'.green);
    config.next();
    switch (config.current()) {
        case 'entity':
            entity.entity(config);
            break;
        default:
            console.log('you need to supply entity option', config.current());
            console.log('options are');
            console.log('entity');
    }

};
