import * as terminal from './terminal.js';
import * as keyEvent from './keyEvent.js';


export var hello_Message = ''; 
export var face = '';
export var who_data = '';
export var download = '';
export var link = '';
export var description = '';
export var features = '';
export var technologies = '';
export var deploy = '';

 fetch('../Ascii/hello.txt').then(r => r.text()).then((data) => {
    fetch('../Ascii/data.txt').then(r => r.text()).then((data) => { who_data = data;});
    fetch('../Ascii/face.txt').then(r => r.text()).then((data) => { face = data;});
    fetch('../Ascii/down.txt').then(r => r.text()).then((data) => { download = data;});
    fetch('../Ascii/feat.txt').then(r => r.text()).then((data) => { features= data;});
    fetch('../Ascii/des.txt').then(r => r.text()).then((data) => { description = data;});
    fetch('../Ascii/link.txt').then(r => r.text()).then((data) => { link= data;});
    fetch('../Ascii/tech.txt').then(r => r.text()).then((data) => { technologies= data;});
    fetch('../Ascii/deploy.txt').then(r => r.text()).then((data) => { deploy= data;});
    hello_Message = data; initTerminal();
    });



function initTerminal() {

   /* 
    document.body.addEventListener('touchend', (e) => {
        e.preventDefault();
        const input = document.getElementById('keyboardProxy');
        input.focus();
      });
      */
      

    terminal.terminal_content.insertAdjacentHTML('beforeend',`<h1 class="hello">${hello_Message}</h1>`);
    terminal.terminal_content.insertAdjacentHTML('beforeend',`<p class = "help-msg">Enter 'help' to see available commands.</p>`);
    terminal.terminal_content.insertAdjacentHTML('beforeend',`<p class = "line"><span class = "username">${terminal.prompt}</span><span id="blink">■</span> </p>`);
    terminal.setCommandLine(document.querySelector('.line'));
    console.log(terminal.commandLine.childNodes);
    keyEvent.setCursor(terminal.commandLine.childNodes[1]);
    document.addEventListener('keydown', keyEvent.handleKey);

}
