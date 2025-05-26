import * as terminal from './terminal.js';
import * as keyEvent from './keyEvent.js';


var hello_Message = ''; 


 fetch('../Ascii/hello.txt').then(r => r.text()).then((data) => { hello_Message = data; initTerminal();});


function initTerminal() {
    terminal.terminal_content.insertAdjacentHTML('beforeend',`<h1 id="hello">${hello_Message}</h1>`);
    terminal.terminal_content.insertAdjacentHTML('beforeend',`<p id = "line"><span id = "username">${terminal.prompt}</span><span id="blink">■</span> </p>`);
    terminal.setCommandLine(document.getElementById('line'));
    console.log(terminal.commandLine.childNodes);
    keyEvent.setCursor(terminal.commandLine.childNodes[1]);
    document.addEventListener('keydown', keyEvent.handleKey);

}
