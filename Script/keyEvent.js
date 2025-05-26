import * as sound from './sound.js';
import * as terminal from './terminal.js';

var cursor = '';

export function setCursor(node) {
    cursor = node;
    console.log('cursor ',cursor);
}

function isTextNode(node) {
    return node.nodeType === Node.TEXT_NODE;
}



console.log(cursor);

export function handleKey(e) {
    if (e.key === ' ') {
        sound.spaceSound();
      }

    else if (e.key ==='Enter') {
        sound.enterSound();
    }
    else {
        sound.normalSound();
    }

    
    if(e.key==='Backspace') {
      const previousNode = cursor.previousSibling;
      if(isTextNode(previousNode)) {
        const newText = previousNode.data.substring(0,previousNode.data.length-1);
        const newNode = document.createTextNode(newText);
        previousNode.replaceWith(newNode);
      }

    }
    else {
    const previousNode = cursor.previousSibling;
    console.log(terminal.commandLine.childNodes)
    if(isTextNode(previousNode)) {
        const newText = previousNode.data + e.key;
        const newNode = document.createTextNode(newText);
        previousNode.replaceWith(newNode);
    }
    else {
    const newText = document.createTextNode(e.key);
    terminal.commandLine.insertBefore(newText,cursor);
    }
    }
}
