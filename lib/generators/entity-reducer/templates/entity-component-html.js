const text = require('../../utility/text');
exports.createHtml = function createHtml({name}) {

    return `<h1>Welcome to Ngrx ${text.capitalize(name)}!</h1>
<hr>

<div *ngFor="let ${name} of ${name}s | async">

  <img src="/assets/${name}.jpg" width="200px">

  <h3>${text.capitalize(name)} ID: {{ ${name}.id }} </h3>
  <p>Size: {{ ${name}.size }}</p>

  
  <button *ngIf="${name}.size==='small'" class="button is-warning" 
          (click)="update${text.capitalize(name)}(${name}.id, 'large')">
    Upgrade to Large
  </button>

  <button *ngIf="${name}.size==='large'" class="button is-success" 
          (click)="update${text.capitalize(name)}(${name}.id, 'small')">
    Downgrade to Small
  </button> 

  <button class="button is-danger" (click)="delete${text.capitalize(name)}(${name}.id)">DELETE</button>
   <hr>
</div>


<button class="button is-primary" (click)="create${text.capitalize(name)}()">CREATE new ${text.capitalize(name)}</button>
`
};
