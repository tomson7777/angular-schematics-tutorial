import { Rule, Tree } from '@angular-devkit/schematics';
import { Observable } from 'rxjs';
import * as fetch from 'node-fetch';

export function asyncType(options: any): Rule {
  const URL = 'https://jsonplaceholder.typicode.com/todos/1';

  return (tree: Tree) => {
    const observer = new Observable<Tree>(obs => {
      fetch(URL)
        .then(res => res.json())
        .then(response => {
          // zrób cokolwiek z danymi - np. na podstawie obiektu wygeneruj interfejs i wrzuć go pliku
          options.entity = response;
          obs.next(tree);
          obs.complete();
        })
        .catch((err: any) => obs.error(err));
    });

    return observer;
  };
}
