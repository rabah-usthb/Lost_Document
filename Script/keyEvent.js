import * as sound from './sound.js';
import * as init from './init.js';
import * as terminal from './terminal.js';
import * as history from './history.js';


var cursor = '';

export function setCursor(node) {
    cursor = node;
}

function isTextNode(node) {
    return node.nodeType === Node.TEXT_NODE;
}

function runCommand(command) {
    var b = true;
    switch (command) {
        case 'whoami':
           terminal.terminal_content.insertAdjacentHTML('beforeend',`<div class="info-terminal">
  <table>
    <tr>
      <td style="vertical-align: top; white-space: pre;">
        <pre id = "face">${init.face}</pre>
      </td>
      <td style="vertical-align: top;">
        <table class="info">
          <tr><td><span class='bullet'>• FULL NAME : </span>RABAH CHABANE CHAOUCHE</td></tr>
          <tr><td><span class='bullet'>• COUNTRY : </span>ALGERIA</td></tr>
          <tr><td><span class='bullet'>• AGE : </span>20</td></tr>
          <tr><td><span class='bullet'>• UNIVERSITY : </span>The University of Science and Technology-Houari Boumediene</td></tr>
          <tr><td><span class='bullet'>• LEVEL : </span>3RD YEAR SOFTWARE ENGINEER</td></tr>
          <tr><td><span class='bullet'>• EXPECTED GRADUATION : </span>June 2027</td></tr>
          <tr><td><span class='bullet'>• EMAIL : </span>chabanechaoucherabah4@gmail.com</td></tr>
          <tr><td><span class='bullet'>• GITHUB : </span><a href="https://github.com/rabah-usthb" target="_blank">github.com/rabah-usthb</a></td></tr>
          <tr><td><span class='bullet'>• SKILLS : </span>LaTeX, Java, JavaFX, PHP, C, JS</td></tr>
          <tr><td><span class='bullet'>• LANGUAGES : </span>Arabic, Kabyle, French, English</td></tr>
        </table>
      </td>
    </tr>
  </table>
</div>
`
);
         //terminal.terminal_content.insertAdjacentHTML('beforeend',`<div id="whoami"><span id="face">${init.face}</span><span id ="data">${init.who_data}</span></div>`);
           break;
        
        case 'clear':
        case 'cls':
            terminal.terminal_content.innerHTML = `<p class = "line"><span class = "username">${terminal.prompt}</span><span id="blink">■</span> </p>`;
            terminal.setCommandLine(document.querySelector('.line'));
            setCursor(terminal.commandLine.childNodes[1]);
            b = false;
            break;

        case 'reboot':
            window.location.reload();
            b = false;
            break;
        case 'history':
            let rows = '';
            for (let i = 0; i < history.commandHistory.length; i++) {
            rows += `
                <tr>
                <td>${i + 1}</td>
                <td>${history.commandHistory[i]}</td>
                </tr>
            `;
            }
            terminal.terminal_content.insertAdjacentHTML('beforeend',`
                <table class="normal-table">
                    <tr>
                        <th>ID</th>
                        <th>COMMAND</th>
                    </tr>
                    ${rows}
                </table>
            `
            );
            break;
        case 'help':
            terminal.terminal_content.insertAdjacentHTML('beforeend',`
                    <table class="normal-table">
                    <tr>
                        <th>COMMAND</th>
                        <th>DESCRIPTION</th>
                    </tr>
                    <tr>
                        <td>cls/clear</td>
                        <td>Clear Terminal Content</td>
                    </tr>
                    <tr>
                        <td>hello</td>
                        <td>Show ASCII Art Of 'HELLO VISITOR'</td>
                    </tr>
                    <tr>
                        <td>help</td>
                        <td>List All Available Commands And Their Descriptions</td>
                    </tr>
                    <tr>
                        <td>history</td>
                        <td>List All Previously Executed Commands</td>
                    </tr>
                    <tr>
                        <td>reboot</td>
                        <td>Reboot The Terminal System</td>
                    </tr>
                    <tr>
                        <td>whoami</td>
                        <td>Show User Data Including Their Image</td>
                    </tr>
                    </table>

            `
            );
            break;
        case 'hello':
            terminal.terminal_content.insertAdjacentHTML('beforeend',`<h1 class="hello">${init.hello_Message}</h1>`);
            break;   
        case 'shutdown':
            window.close();
            b = false;
            break;
        default:
         terminal.terminal_content.insertAdjacentHTML('beforeend',`<p class = "error">Error Shell Command '${command}'</p>`)
           break;
    }

    return b;
}


function EnterEvent() {
    const previousNode = cursor.previousSibling;
    const nextNode = cursor.nextSibling;
    var command;
    if(isTextNode(previousNode)) {
        command = previousNode.data+nextNode.data;
    }
    else {
    command = nextNode.data;
    }
    
    command = command.trim();
    var b = true;
    if(command!=='') {
        history.appendCommand(command);  
        b=  runCommand(command); 
    }
    if(b){
    terminal.commandLine.removeChild(cursor);
    terminal.terminal_content.insertAdjacentHTML('beforeend',`<p class = "line"><span class = "username">${terminal.prompt}</span><span id="blink">■</span> </p>`);
    const promptList = document.querySelectorAll('.line');
    terminal.setCommandLine(promptList[promptList.length-1]);
    setCursor(terminal.commandLine.childNodes[1]);
    }

    document.body.scrollIntoView({ block: "end", behavior: "smooth" });
}


function BackspaceEvent() {
    const previousNode = cursor.previousSibling;
    if(isTextNode(previousNode)) {
      const newText = previousNode.data.substring(0,previousNode.data.length-1);
      previousNode.data = newText;
    }
}


function ArrowDownEvent() {    
    history.increaseIndex();
    const previousNode = cursor.previousSibling;
    if(isTextNode(previousNode)) {
        previousNode.data = history.commandHistory[history.index];
    }
    else {
    const previousText = document.createTextNode(history.commandHistory[history.index]);
    terminal.commandLine.insertBefore(previousText,cursor);
    }
    const nextNode = cursor.nextSibling;
    nextNode.data = ' ';
}

function ArrowUpEvent() {
    history.decreaseIndex();
    const previousNode = cursor.previousSibling;
    if(isTextNode(previousNode)) {
        previousNode.data = history.commandHistory[history.index];
    }
    else {
    const previousText = document.createTextNode(history.commandHistory[history.index]);
    terminal.commandLine.insertBefore(previousText,cursor);
    }
    const nextNode = cursor.nextSibling;
    nextNode.data = ' ';    
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

    console.log(terminal.commandLine,' ',e.key);
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
        EnterEvent();
    }
    else if(e.key==='ArrowLeft') {
        e.preventDefault();
        ArrowLeftEvent();
      
    }
    else if(e.key==='ArrowRight'){ 
        e.preventDefault();
        ArrowRightEvent();
    }
    else if(e.key==='ArrowUp') {
        e.preventDefault();
        if(history.index >0){
            ArrowUpEvent();
        }
    }
    else if(e.key === 'ArrowDown') {
        e.preventDefault();
        if(history.index <(history.commandHistory.length-1)){
        ArrowDownEvent();
        }
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
