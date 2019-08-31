const text = require('../../utility/text');
function importLine(name) {
    return `import { ${text.capitalize(name)}Module } from './${name}/${name}.module';`
}
function loopImports(list) {
    list.forEach( item => importLine(item) );
}
exports.createComponent = function createComponent({list}) {

    return `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
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
    SomethingModule,
  ],
  exports: [
    StoreModule,
    StoreDevtoolsModule,
    SomethingModule,
    MoneyModule,
  ]
})
export class DataStoreModule { }

`
};
