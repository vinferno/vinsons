const text = require('../../utility/text');
exports.createActions = function createActions({name}) {

    return `import { Action } from '@ngrx/store';
import { ${text.capitalize(name)} }  from './${name}.reducer';


export const CREATE     = '[${text.capitalize(name)}s] Create';
export const UPDATE     = '[${text.capitalize(name)}s] Update';
export const DELETE     = '[${text.capitalize(name)}s] Delete';

export class Create implements Action {
    readonly type = CREATE;
    constructor(public ${name}: ${text.capitalize(name)}) { }
}

export class Update implements Action {
    readonly type = UPDATE;
    constructor(
        public id: string,
        public changes: Partial<${text.capitalize(name)}>,
      ) { }
}

export class Delete implements Action {
    readonly type = DELETE;
    constructor(public id: string) { }
}

export type ${text.capitalize(name)}Actions
= Create
| Update
| Delete;


`
};
