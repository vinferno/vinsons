const text = require('../../utility/text');
exports.createHtml = function createHtml({name}) {

    return `


<h1>Welcome to Admin for: ${text.capitalize(name)}!</h1>
<hr>
<button class="button is-primary" (click)="create${text.capitalize(name)}()">CREATE new ${text.capitalize(name)}</button>
<div *ngFor="let ${name} of ${name}s | async">

  <h3>${text.capitalize(name)} ID: {{ ${name}.id }} </h3>
<table>
    <tr *ngFor="let prop of getProps(${name})">
        <td>
            {{prop}}
        </td>
        <td>
            <input #myInput type="text" [value]="${name}[prop]" [disabled]="prop === 'id' ">
        </td>
        
        <td>
            <button (click)="saveProp( ${name}, prop, myInput )" [disabled]="prop === 'id' ">Save</button>
        </td>
        <td>
            <button (click)="cancelProp(${name}, prop, myInput )">Cancel</button>
        </td>
    </tr>
</table>
  <button class="button is-danger" (click)="delete${text.capitalize(name)}(${name}.id)">DELETE</button>
   <hr>
</div>

`
};
