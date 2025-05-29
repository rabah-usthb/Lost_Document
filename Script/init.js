import * as terminal from './terminal.js';
import * as keyEvent from './keyEvent.js';


export var hello_Message = ''; 
export var face = '';
export var who_data = '';

 fetch('../Ascii/hello.txt').then(r => r.text()).then((data) => {
    fetch('../Ascii/data.txt').then(r => r.text()).then((data) => { who_data = data;});
    fetch('../Ascii/face.txt').then(r => r.text()).then((data) => { face = data;});
    hello_Message = data; initTerminal();
    });


function initTerminal() {
    terminal.terminal_content.insertAdjacentHTML('beforeend',`<h1 class="hello">${hello_Message}</h1>`);
    terminal.terminal_content.insertAdjacentHTML('beforeend',`<p class = "line"><span class = "username">${terminal.prompt}</span><span id="blink">■</span> </p>`);
    terminal.setCommandLine(document.querySelector('.line'));
    console.log(terminal.commandLine.childNodes);
    keyEvent.setCursor(terminal.commandLine.childNodes[1]);
    document.addEventListener('keydown', keyEvent.handleKey);

}
