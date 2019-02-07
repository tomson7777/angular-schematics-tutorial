import {
  apply,
  chain,
  externalSchematic,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import { normalize, strings } from '@angular-devkit/core';

import { setupOptions } from '../utils/setup-options';

export function listComponent(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    setupOptions(tree, options);

    const movePath = (options.flat) ?
      normalize(options.path) :
      normalize(options.path + '/' + strings.dasherize(options.name));

    const templateSource = apply(url('./files'), [
      template({
        ...strings,
        ...options,
      }),
      move(movePath),
    ]);

    return chain([
      externalSchematic('@schematics/angular', 'component', options),
      mergeWith(templateSource),
    ])(tree, context);
  };
}

