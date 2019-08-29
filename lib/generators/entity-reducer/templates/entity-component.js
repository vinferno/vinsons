const text = require('../../utility/text');
exports.createComponent = function createComponent({name, prefix}) {

    return `import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as actions from './${name}.actions';
import * as from${text.capitalize(name)} from './${name}.reducer';


@Component({
  selector: '${prefix ? prefix : 'app'}-${name}',
  templateUrl: './${name}.component.html',
  styleUrls: ['./${name}.component.scss']
})
export class ${text.capitalize(name)}Component implements OnInit {

  ${name}s: Observable<any>;


  constructor(private store: Store<from${text.capitalize(name)}.State>) { }

  ngOnInit() {
    this.${name}s = this.store.select(from${text.capitalize(name)}.selectAll)
  }

  create${text.capitalize(name)}() {
    const ${name}: from${text.capitalize(name)}.${text.capitalize(name)} = {
      id: new Date().getUTCMilliseconds().toString(),
      size: 'small'
    }

    this.store.dispatch( new actions.Create(${name}) )
  }

  update${text.capitalize(name)}(id, size) {
    this.store.dispatch( new actions.Update(id, { size: size }) )
  }

  delete${text.capitalize(name)}(id) {
    this.store.dispatch( new actions.Delete(id) )
  }

}

`
};
