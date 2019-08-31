const fs = require('fs');
const entityModule = require('./templates/entity-module');
const entityReducer = require('./templates/entity-reducer');
const entityActions = require('./templates/entity-actions');
const entityComponent = require('./templates/entity-component');
const entityHtml = require('./templates/entity-component-html');
const entityIndex = require('./templates/entity-index');
const dataDir = './src/app/data-store';

exports.reducer = function(config) {
    console.log('you selected', 'reducer'.blue, 'for', 'entity-reducer'.green);
    config.next();
    const args = config.args.slice(config.i);

    const setup = {};
    args.forEach(arg => {
        if (arg.includes('=')){
            setup[arg.split('=')[0]] = arg.split('=')[1];
        }
    });
    console.log('setup', setup);
    if (setup.name) {
        console.log('building reducer', setup.name);
        if (!fs.existsSync(dataDir)) {
            console.log('creating store'.green)
            fs.mkdirSync(dataDir);
        } else {
            console.log('store exists'.green)
        }

        if (!fs.existsSync(`${dataDir}/${setup.name}`)){
            fs.mkdirSync(`${dataDir}/${setup.name}`);
            fs.writeFile(`${dataDir}/${setup.name}/${setup.name}.module.ts`, entityModule.createModule(setup), function (err) {
                if (err) throw err;
                console.log(`${dataDir}/${setup.name}.module.ts`.blue, 'File is created successfully.');
            });
            fs.writeFile(`${dataDir}/${setup.name}/${setup.name}.reducer.ts`, entityReducer.createReducer(setup), function (err) {
                if (err) throw err;
                console.log(`${dataDir}/${setup.name}.reducer.ts`.blue, 'File is created successfully.');
            });
            fs.writeFile(`${dataDir}/${setup.name}/${setup.name}.actions.ts`, entityActions.createActions(setup), function (err) {
                if (err) throw err;
                console.log(`${dataDir}/${setup.name}.actions.ts`.blue, 'File is created successfully.');
            });
            fs.writeFile(`${dataDir}/${setup.name}/${setup.name}.component.ts`, entityComponent.createComponent(setup), function (err) {
                if (err) throw err;
                console.log(`${dataDir}/${setup.name}.component.ts`.blue, 'File is created successfully.');
            });
            fs.writeFile(`${dataDir}/${setup.name}/${setup.name}.component.html`, entityHtml.createHtml(setup), function (err) {
                if (err) throw err;
                console.log(`${dataDir}/${setup.name}.component.html`.blue, 'File is created successfully.');
            });
            fs.writeFile(`${dataDir}/${setup.name}/${setup.name}.component.scss`, '', function (err) {
                if (err) throw err;
                console.log(`${dataDir}/${setup.name}.component.scss`.blue, 'File is created successfully.');
            });

            if (!fs.existsSync(`./reducers`)){
                fs.mkdirSync(`./reducers`);
                fs.writeFile(`./reducers/index.ts`, entityIndex.createIndex(setup), function (err) {
                    if (err) throw err;
                    console.log(`./reducer/index.ts`.blue, 'File is created successfully.');
                });
            } else {
                const fileString = fs.readFileSync('./reducers/index.ts', 'utf8');
                const before = fileString.slice(fileString.indexOf('= {') + 3).match(/\S+/g) || [];
                console.log('before', before);
                const vars = before.filter(
                    (item, index) => {
                        return !item.includes('Reducer')
                    }
                ).map(item => item.replace(/[^0-9a-z]/gi, '') ).map( item => item.trim()).filter(item=> item);
                //     .split(':').filter( (item, index) => {
                //     return !index % 1;
                // });
                fs.writeFile(`./reducers/index.ts`, entityIndex.createIndex(setup, vars), function (err) {
                    if (err) throw err;
                    console.log(`./reducer/index.ts`.blue, 'File is created successfully.');
                });
                console.log(vars);
            }
        } else {
            console.log('folder exists'.red)
        }

    } else {
        console.log('please provide name in the form of name=value'.red)
    }

    fs.readdir('./', function (err, data) {
        console.log('err', err);
        console.log('data', data);
    })
};

