import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addPackageToPackageJson } from '../utils/add-package-json';

export interface FrameworkMap {
  [frameworkName: string]: string;
}

export function uiFramework(options: {uiFramework: string}): Rule {
  return (tree: Tree, context: SchematicContext) => {

    // klucze muszą być zgodne z podanymi value w schema.json
    const uiFrameworkVersionMap: FrameworkMap = {
      bootstrap: '4.1.3',
      skeleton: '3.1.6',
      foundation: '6.5.1',
    };

    addPackageToPackageJson(
      tree,
      options.uiFramework,
      `~${uiFrameworkVersionMap[options.uiFramework]}`
    );

    context.addTask(new NodePackageInstallTask());
  };
}
