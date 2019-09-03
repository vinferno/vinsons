const text = require('../../utility/text');
exports.createReducer = function createReducer({name}) {

    return `import * as actions from './${name}.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

// Main data interface
export class ${text.capitalize(name)} {
    id: string;
    size: string = 'default';
    constructor() {
      this.id = new Date().getUTCMilliseconds().toString();
    }
}

// Entity adapter
export const ${name}Adapter = createEntityAdapter<${text.capitalize(name)}>();
export interface State extends EntityState<${text.capitalize(name)}> { }


// Default data / initial state

const default${text.capitalize(name)} = {
    ids: ['123'],
    entities: {
        '123': {
            id: '123',
            size: 'small'
        }
    }
}

export const initialState: State = ${name}Adapter.getInitialState(default${text.capitalize(name)});

// Reducer

export function ${name}Reducer(
    state: State = initialState,
    action: actions.${text.capitalize(name)}Actions) {

    switch (action.type) {
        
        case actions.CREATE:
            return ${name}Adapter.addOne(action.${name}, state);

        case actions.UPDATE:
            return ${name}Adapter.updateOne({
                id: action.id,
                changes: action.changes,
            }, state);
        
        case actions.DELETE:
            return ${name}Adapter.removeOne(action.id, state)

        default:
            return state;
        }

}

// Create the default selectors

export const get${text.capitalize(name)}State = createFeatureSelector<State>('${name}');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = ${name}Adapter.getSelectors(get${text.capitalize(name)}State);

`
};
