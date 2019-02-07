import { Tree } from '@angular-devkit/schematics';

// helper sortujacy alfabetycznie klucze
function sortObjectByKeys(obj: any) {
  return Object.keys(obj).sort().reduce((result, key) => (result[key] = obj[key]) && result, {} as any);
}

export function addPackageToPackageJson(tree: Tree, pkg: string, version: string): Tree {
  // sprawdzamy czy plik package.json istnieje
  if (tree.exists('package.json')) {
    // sprowadzamy do stringa treść
    const sourceText = tree.read('package.json')!.toString();
    // sprowadzamy do obiektu
    const json = JSON.parse(sourceText);

    if (!json.dependencies) {
      json.dependencies = {};
    }

    if (!json.dependencies[pkg]) {
      // dodajemy wpis, klucz to nazwa paczki, wartość to wersja
      json.dependencies[pkg] = version;
      // sortujemy alfabetycznie
      json.dependencies = sortObjectByKeys(json.dependencies);
    }
    // nadpisujemy nowa wartością, wartość '2' jako 3 parametr, zapewnia nam dobre wcięcia
    tree.overwrite('package.json', JSON.stringify(json, null, 2));
  }

  return tree;
}
