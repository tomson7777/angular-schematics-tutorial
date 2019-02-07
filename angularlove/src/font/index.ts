import { Rule, SchematicsException, Tree } from '@angular-devkit/schematics';
import { DefaultTreeDocument, DefaultTreeElement, parse as parseHtml } from 'parse5';
import { getChildElementIndentation } from './parse5-element';

import { getIndexHtmlPath } from '../utils/index-path';

export function getHtmlHeadTagElement(htmlContent: string): DefaultTreeElement | null {
  const document = parseHtml(htmlContent, {sourceCodeLocationInfo: true}) as DefaultTreeDocument;
  const nodeQueue = [...document.childNodes];

  while (nodeQueue.length) {
    const node = nodeQueue.shift() as DefaultTreeElement;

    if (node.nodeName.toLowerCase() === 'head') {
      return node;
    } else if (node.childNodes) {
      nodeQueue.push(...node.childNodes);
    }
  }

  return null;
}

// do elementu <head> wrzucamy przekazany html
export function appendHtmlElementToHead(tree: Tree, htmlFilePath: string | undefined, elementHtml: string) {
  if (!htmlFilePath) {
    throw new SchematicsException(`Path to index.html not defined!`);
  }

  const htmlFileBuffer = tree.read(htmlFilePath);

  if (!htmlFileBuffer) {
    throw new SchematicsException(`Could not read file for path: ${htmlFilePath}`);
  }

  const htmlContent = htmlFileBuffer.toString();

  if (htmlContent.includes(elementHtml)) {
    return;
  }

  const headTag = getHtmlHeadTagElement(htmlContent);

  if (!headTag) {
    throw new SchematicsException(`Could not find '<head>' element in HTML file: ${htmlFileBuffer}`);
  }

  const endTagOffset = headTag!.sourceCodeLocation!.endTag.startOffset;
  const indentationOffset = getChildElementIndentation(headTag);
  const insertion = `${' '.repeat(indentationOffset)}${elementHtml}`;

  const recordedChange = tree
    .beginUpdate(htmlFilePath)
    .insertRight(endTagOffset, `${insertion}\n`);

  tree.commitUpdate(recordedChange);
}

export function font(): Rule {
  return (tree: Tree) => {

    const fontLink = `<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">`;

    appendHtmlElementToHead(
      tree,
      getIndexHtmlPath(tree),
      fontLink,
    );
  };
}
