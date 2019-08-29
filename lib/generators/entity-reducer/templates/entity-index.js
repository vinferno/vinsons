const text = require('../../utility/text');
const fs = require('fs');
exports.createIndex = function createIndex({name}, vars) {
    let result = '';

    if (!vars) {
        return `import { ActionReducerMap } from '@ngrx/store';
import { ${name}Reducer } from '../${name}/${name}.reducer';
export const reducers: ActionReducerMap<any> = {
  ${name}: ${name}Reducer,
};

`
    } else {
        result += `import { ActionReducerMap } from '@ngrx/store';
`;
        vars.forEach( item => {

            if (item !== name) {
                result+= `import { ${item}Reducer } from '../${item}/${item}.reducer';
`
            }
        });
        result+= `import { ${name}Reducer } from '../${name}/${name}.reducer';
`;
        result += `export const reducers: ActionReducerMap<any> = {
`;
        vars.forEach( item => {

            if (item !== name) {
                result+= `  ${item}: ${item}Reducer,
`
            }
        });
        result+= `  ${name}: ${name}Reducer,
};
`
    }

    return result;
};
