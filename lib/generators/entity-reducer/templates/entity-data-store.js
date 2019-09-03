const text = require('../../utility/text');
function importLine(name) {
    return `import { ${text.capitalize(name)}Module } from './${name}/${name}.module';\r`
}
function moduleLine(name, last) {
    return `${text.capitalize(name)}Module,` + (last ? '' : '\r\t\t');
}
function loopImports(list) {
    let string = '';
    list.forEach( item => string += importLine(item) );
    return string;
}
function loopModules(list) {
    let string = '';
    list.forEach( (item, index) => string += moduleLine(item, index === list.length -1) );
    return string;
}
exports.createDataStore = function createDataStore({list}) {
    console.log('list', list);

    return `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './index';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
${loopImports(list)}


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 10, // Retains last 25 states
    }),
    ${loopModules(list)}
  ],
  exports: [
    StoreModule,
    StoreDevtoolsModule,
    ${loopModules(list)}
  ]
})
export class DataStoreModule { }

`
};
