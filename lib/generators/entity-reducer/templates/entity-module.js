const text = require('../../utility/text');
exports.createModule = function createModule({name}) {

    return `import { NgModule } from '@angular/core';
import { ${text.capitalize(name)}Component } from './${name}.component';

import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from "@angular/forms";
import { ${name}Reducer } from './${name}.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('${name}', ${name}Reducer),
    FormsModule,
  ],
  exports: [${text.capitalize(name)}Component],
  declarations: [${text.capitalize(name)}Component]
})
export class ${text.capitalize(name)}Module { }

`
};
