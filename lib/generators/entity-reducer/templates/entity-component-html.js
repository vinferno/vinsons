const text = require('../../utility/text');
exports.createHtml = function createHtml({name}) {

    return `
<button class="button is-primary" (click)="create${text.capitalize(name)}()">CREATE new ${text.capitalize(name)}</button>

<h1>Welcome to Admin for: ${text.capitalize(name)}!</h1>
<hr>

<div *ngFor="let ${name} of ${name}s | async">

  <img src="/assets/${name}.jpg" width="200px">

  <h3>${text.capitalize(name)} ID: {{ ${name}.id }} </h3>
  <p>Size: {{ ${name}.size }}</p>

     <div *ngFor="let prop of getProps(${name})">
        <button>{{prop}}</button>
        <input #myInput type="text" [value]="${name}[prop]">
        <button (click)="saveProp( ${name}, prop, myInput )">Save</button>
        <button (click)="cancelProp(${name}, prop, myInput )">Cancel</button>
    </div>
  <button class="button is-danger" (click)="delete${text.capitalize(name)}(${name}.id)">DELETE</button>
   <hr>
</div>

`
};
