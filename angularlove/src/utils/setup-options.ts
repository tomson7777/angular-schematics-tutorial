import { getWorkspace } from '@schematics/angular/utility/config';
import { buildDefaultPath, getProject } from '@schematics/angular/utility/project';
import { parseName } from '@schematics/angular/utility/parse-name';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { normalize } from '@angular-devkit/core';

export function setupOptions(tree: Tree, options: any): Tree {
  // korzystamy z utila getWorkspace, który wskazuje na root directory z plikiem angular.json
  const workspace = getWorkspace(tree);

  // jeśli użytkownik nie podał w konsoli projektu, to zczytujemy pierwszy z pliku angular.json
  if (!options.project) {
    options.project = Object.keys(workspace.projects)[0];
  }
  // jeśli nazwa projektu dalej nie jest zdefiniowana, to rzucamy wyjątek
  if (!options.project) {
    throw new SchematicsException('Option "project" is required.');
  }
  // korzystamy z utila, który na podstawie workspace daje nam dostęp do projektu
  const project = getProject(workspace, options.project);
  // jeśli ścieżka do pliku tworzonego pliku nie została podana, to użyj domyślnej: src/app
  if (options.path === undefined) {
    options.path = normalize(buildDefaultPath(project)); // zwraca ścieżkę src/app
  }
  // jeśli została podana wraz z nazwą pliku np. shared/services/offers to użyjemy utila parseName,
  // który zwraca name bez ścieżki(tutaj offers) i odpowiednią ścieżkę (tutaj shared/services)
  const parsedPath = parseName(options.path, options.name);
  // nadpisujemy opcje z parametru
  options.name = parsedPath.name;
  options.path = parsedPath.path;
  return tree;
}
