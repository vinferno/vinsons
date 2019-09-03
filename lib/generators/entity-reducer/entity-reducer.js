const fs = require('fs');
const entityModule = require('./templates/entity-module');
const entityReducer = require('./templates/entity-reducer');
const entityActions = require('./templates/entity-actions');
const entityComponent = require('./templates/entity-component');
const entityDataStore = require('./templates/entity-data-store');
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

    // if user has supplied name

    if (!setup.name ) {
        console.log('please provide name in the form of name=value'.red)
        return;
    }

    checkAllFilesAreCreated(dataDir, setup.name);

    const namedPath = `${dataDir}/${setup.name}/${setup.name}`;
    fs.writeFile(`${namedPath}.reducer.ts`, entityReducer.createReducer(setup), function (err) {
        if (err) throw err;
        console.log(`${namedPath}.reducer.ts`.blue, 'File is created successfully.');
    });
    fs.writeFile(`${namedPath}.actions.ts`, entityActions.createActions(setup), function (err) {
        if (err) throw err;
        console.log(`${namedPath}.actions.ts`.blue, 'File is created successfully.');
    });
    fs.writeFile(`${namedPath}.component.ts`, entityComponent.createComponent(setup), function (err) {
        if (err) throw err;
        console.log(`${namedPath}.component.ts`.blue, 'File is created successfully.');
    });
    fs.writeFile(`${namedPath}.component.html`, entityHtml.createHtml(setup), function (err) {
        if (err) throw err;
        console.log(`${namedPath}.component.html`.blue, 'File is created successfully.');
    });
    fs.writeFile(`${namedPath}.component.scss`, '', function (err) {
        if (err) throw err;
        console.log(`${namedPath}.component.scss`.blue, 'File is created successfully.');
    });
    fs.writeFile(`${namedPath}.module.ts`, entityModule.createModule({name: setup.name}), function (err) {
        if (err) throw err;
        console.log(`${namedPath}.component.scss`.blue, 'File is created successfully.');
    });
    // check if data name exists
    // 1. if it doesnt make one

    const vars = fs.readdirSync(dataDir).filter( item => {
        return !item.includes('.');
    });
    console.log('vars', vars);
    fs.writeFile(`${dataDir}/index.ts`, entityIndex.createIndex(setup, vars), function (err) {
        if (err) { console.log(err.message)};
        console.log(`data-store/reducers/index.ts`.blue, 'File is created successfully.');
    });
    fs.writeFileSync(`${dataDir}/data-store.module.ts`, entityDataStore.createDataStore({list:vars}));

};


function checkAllFilesAreCreated(dataDir, name) {
    // data-store folder
    (fs.existsSync(`${dataDir}`)) ? void('') : fs.mkdirSync(`${dataDir}`);
    // data-store/index.ts file
    (fs.existsSync(`${dataDir}/index.ts`)) ? void('') : fs.writeFileSync(`${dataDir}/index.ts`, '');


    if (!name) {
        return;
    }


    // data-store/name folder
    (fs.existsSync(`${dataDir}/${name}`)) ? void('') : fs.mkdirSync(`${dataDir}/${name}`);
    // data-store/name/name file
}
