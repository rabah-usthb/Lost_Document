import * as terminal from './terminal.js';
import * as keyEvent from './keyEvent.js';


export var hello_Message = ''; 
export var who_data = '';
export var download = '';
export var link = '';
export var description = '';
export var features = '';
export var technologies = '';
export var deploy = '';
export var keyboard = '';

 fetch('../Ascii/hello.txt').then(r => r.text()).then((data) => {
    fetch('../Ascii/down.txt').then(r => r.text()).then((data) => { download = data;});
    fetch('../Ascii/feat.txt').then(r => r.text()).then((data) => { features= data;});
    fetch('../Ascii/des.txt').then(r => r.text()).then((data) => { description = data;});
    fetch('../Ascii/link.txt').then(r => r.text()).then((data) => { link= data;});
    fetch('../Ascii/tech.txt').then(r => r.text()).then((data) => { technologies= data;});
    fetch('../Ascii/deploy.txt').then(r => r.text()).then((data) => { deploy= data;});
    hello_Message = data; initTerminal();
    });


function initKeyboard() {
  document.body.insertAdjacentHTML('beforeend',`
  <div id="main-container" class="border">
  <div class="row">
      <div class="col col-key border" data-value="q">q</div>
      <div class="col col-key border" data-value="w">w</div>
      <div class="col col-key border" data-value="e">e</div>
      <div class="col col-key border" data-value="r">r</div>
      <div class="col col-key border" data-value="t">t</div>
      <div class="col col-key border" data-value="y">y</div>
      <div class="col col-key border" data-value="u">u</div>
      <div class="col col-key border" data-value="i">i</div>
      <div class="col col-key border" data-value="o">o</div>
      <div class="col col-key border" data-value="p">p</div>
  </div>
  <div class="row">
      <div class="col col-key border" data-value="a">a</div>
      <div class="col col-key border" data-value="s">s</div>
      <div class="col col-key border" data-value="d">d</div>
      <div class="col col-key border" data-value="f">f</div>
      <div class="col col-key border" data-value="g">g</div>
      <div class="col col-key border" data-value="h">h</div>
      <div class="col col-key border" data-value="j">j</div>
      <div class="col col-key border" data-value="k">k</div>
      <div class="col col-key border" data-value="l">l</div>
      <div class="col enter border" data-value="Enter">↲</div>
  </div>
  <div class="row">
      <div class="col col-key border" data-value="z">z</div>
      <div class="col col-key border" data-value="x">x</div>
      <div class="col col-key border" data-value="c">c</div>
      <div class="col col-key border" data-value="v">v</div>
      <div class="col col-key border" data-value="b">b</div>
      <div class="col col-key border" data-value="n">n</div>
      <div class="col col-key border m" data-value="m">m</div>
      <div class="col arrow border" data-value="ArrowUp">↑</div>
  </div>
  <div class="row">
      <div class="col space border" data-value=" ">space</div>
      <div class="col arrow border" data-value="ArrowLeft">←</div>
      <div class="col arrow border" data-value="ArrowDown">↓</div>
      <div class="col arrow border" data-value="ArrowRight">→</div>
      <div id="del" class="col arrow border" data-value="Backspace">⌫</div>
  </div>
</div>`);

}


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
    //terminal.terminal_content.insertAdjacentHTML('beforeend',`<p class = "line"><span class = "username">${terminal.prompt}</span><span class="command-input" contenteditable="true"><span id="blink">■</span></span> </p>`);
    terminal.setCommandLine(document.querySelector('.line'));
  
    
    if(window.innerWidth<=760) {
      initKeyboard();
      keyboard = document.getElementById("main-container");
    }

    keyEvent.setCursor(terminal.commandLine.childNodes[1]);
    document.addEventListener('keydown', keyEvent.keyLaptop);

    if(keyboard!=='') {
      keyEvent.setupKeyEvents();
      keyEvent.setQuitMobileEvent();
    }



}
