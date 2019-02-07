import { apply, MergeStrategy, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { normalize, strings } from '@angular-devkit/core';

import { setupOptions } from '../utils/setup-options';
import { HttpServiceOptions } from './schema';

export function httpService(options: HttpServiceOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // przygotowujemy path i name
    setupOptions(tree, options);

    // movePath to miejsce gdzie ma trafić plik w projekcie, taka ścieżka musi być systemowa, dlatego używamy utila normalize
    const movePath = options.flat ? // czy plik nie ma mieć swojego katalogu ?
      normalize(options.path || '') : // jak nie ma mieć, to mamy już ścieżkę
      normalize(options.path + '/' + strings.dasherize(options.name)); // jak ma mieć katalog swój, to doklej jeszcze nazwę

    const templateSource = apply(url('./files'), [
      template({
        ...strings,
        ...options,
      }),
      move(movePath),
    ]);

    const rule = mergeWith(templateSource);
    return rule(tree, _context);
  };
}
