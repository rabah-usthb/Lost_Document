import * as sound from './sound.js';
import * as init from './init.js';
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

function BackspaceEvent() {
    const previousNode = cursor.previousSibling;
    if(isTextNode(previousNode)) {
      const newText = previousNode.data.substring(0,previousNode.data.length-1);
      previousNode.data = newText;
    }
}

function ArrowLeftEvent() {
    console.log(terminal.commandLine.childNodes);
    const previousNode = cursor.previousSibling;
    const nextNode = cursor.nextSibling;
  if(isTextNode(previousNode) && previousNode.data!=='') {
    const newTextPrevious = previousNode.data.substring(0,previousNode.data.length-1);
    const truncedText = previousNode.data[previousNode.data.length-1];
    const newTextNext = truncedText+nextNode.data;
    nextNode.data = newTextNext;
    previousNode.data = newTextPrevious;
  }
}

function ArrowRightEvent() {
    console.log(terminal.commandLine.childNodes);
    const previousNode = cursor.previousSibling;
    const nextNode = cursor.nextSibling;
  if(nextNode.data!==' ') {
    const newTextNext = nextNode.data.substring(1);
    const truncedText = nextNode.data[0];
    const newTextPrevious = previousNode.data+truncedText;
    nextNode.data = newTextNext;
    previousNode.data = newTextPrevious;
  }
}

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
        BackspaceEvent();
    }
    else if (e.key==='Enter') {
        terminal.terminal_content.insertAdjacentHTML('beforeend',`<div id="whoami"><span id="face">${init.face}</span><span id ="data">${init.who_data}</span></div>`);

    }
    else if(e.key==='ArrowLeft') {
        ArrowLeftEvent();
      
    }
    else if(e.key==='ArrowRight') {
        ArrowRightEvent();
    }
    else {
    const previousNode = cursor.previousSibling;
   // console.log(terminal.commandLine.childNodes)
    if(isTextNode(previousNode)) {
        const newText = previousNode.data + e.key;
        previousNode.data = newText;
        
    }
    else {
    const newText = document.createTextNode(e.key);
    terminal.commandLine.insertBefore(newText,cursor);
    }
    }
}
