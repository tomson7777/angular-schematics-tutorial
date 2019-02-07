import { getWorkspace } from '@schematics/angular/utility/config';
import { getProject } from '@schematics/angular/utility/project';
import { SchematicsException, Tree } from '@angular-devkit/schematics';


export function getIndexHtmlPath(tree: Tree): string | undefined {
  const workspace = getWorkspace(tree);
  const projectName = Object.keys(workspace.projects)[0];

  if (!projectName) {
    throw new SchematicsException('Project must exist in angular.json file.');
  }

  const project = getProject(workspace, projectName);

  // pod takimi kluczami jest wystawiony index path w angular.json
  return project!.architect!.build!.options!.index;
}
