import * as sound from './sound.js';
import * as init from './init.js';
import * as terminal from './terminal.js';
import * as history from './history.js';

function linkEvent() {
    document.querySelectorAll('a').forEach(link=> {
        link.addEventListener('click', (e) => {
        sound.mouseSound();
        e.stopPropagation();
    });
    });    
}



var cursor = '';
const preview = document.getElementById('preview');

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
        <div id = "face"><img src="Ascii/face.webp" id="face-img"/></div>
        <div id="item-div">
          <div><span class='bullet'>• FULL NAME : </span>RABAH CHABANE CHAOUCHE</div>
          <div><span class='bullet'>• COUNTRY : </span>ALGERIA</div>
          <div><span class='bullet'>• AGE : </span>20</div>
          <div><span class='bullet'>• UNIVERSITY : </span>The University of Science and Technology-Houari Boumediene</div>
          <div><span class='bullet'>• LEVEL : </span>3RD YEAR SOFTWARE ENGINEER</div>
          <div><span class='bullet'>• EXPECTED GRADUATION : </span>June 2027</div>
          <div><span class='bullet'>• EMAIL : </span>chabanechaoucherabah4@gmail.com</div>
          <div><span class='bullet'>• GITHUB : </span><a href="https://github.com/rabah-usthb" target="_blank">github.com/rabah-usthb</a></div>
          <div><span class='bullet'>• SKILLS : </span>LaTeX, Java, JavaFX, PHP, C, JS </div>
          <div><span class='bullet'>• LANGUAGES : </span>Arabic, Kabyle, French, English </div>
        </div>
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
                        <td>projects</td>
                        <td class="wrap-text">Displays a project table where each row is clickable to open a preview.</br>Press 'Q' or 'q' to quit the preview.</td>
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
        case 'projects':
            terminal.terminal_content.insertAdjacentHTML('beforeend',`
                <table class="normal-table">
                <tr>
                    <th>PROJECT NAME</th>
                    <th>TECHNOLOGIES</th>
                    <th>DESCRIPTION</th>
                    <th>LINKS</th>
                </tr>
                <tr class ="clickable-row" data-path="FILE: ~/Projects/Compile.txt">
                    <td>Mini_Compiler</td>
                    <td>• Java</br>• JavaFx</br>• RichTextFx</br>• ANTLR4</br>• NSIS</td>
                    <td class="wrap-text">A small IDE featuring syntax highlighting and a console log for the view. The compiler is implemented up to the semantic phase</td>
                    <td>• <a href="https://github.com/rabah-usthb/Compiler" target="_blank">Github_Repository</a></br>• <a href="https://github.com/rabah-usthb/Compiler/blob/main/document.pdf" target="_blank">Documentation</a></td>
                </tr>
                </table>
        `
        );
            linkEvent();
            rowEvent();
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
        e.preventDefault();
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
    else if( e.key.length===1 &&(e.key ===' ' ||(e.key>='a' && e.key<='z') || (e.key>='A' && e.key<='Z'))){
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

    function quitPreview() {
        console.log('quit ');
        preview.classList.replace('active', 'hidden');
        preview.innerHTML =` <span id="preview_cursor"></span>
          <div id="status-bar">
            <div id="fileName"></div>
          </div>
          <div class="glare"></div>`;
        document.addEventListener('keydown', handleKey);
        document.removeEventListener('keydown',previewEvent);
    }


    function previewEvent(e) {
        console.log('previewEvent ',e.key);
        if (e.key === ' ') {
            e.preventDefault();
            sound.spaceSound();
          }
    
        else if (e.key ==='Enter') {
            sound.enterSound();
        }
        else {
            sound.normalSound();
        }
    
        
        if(e.key==='q' || e.key === 'Q') {
            quitPreview();
        }
    }
   

    function rowEvent() {
        document.querySelectorAll('.clickable-row').forEach(btn=> {
            btn.addEventListener('click', () => {
              sound.mouseSound();
              document.removeEventListener('keydown', handleKey);
              document.addEventListener('keydown',previewEvent);
              document.getElementById('fileName').textContent = btn.dataset.path;
              preview.insertAdjacentHTML('beforeend',`<h1>${init.description}</h1>`);
              preview.insertAdjacentHTML('beforeend',`<p><strong>Mini_Compiler</strong> is a lightweight code editor designed for educational compilers. It features syntax highlighting, an integrated console log, and step-by-step output for lexical, syntactic, and semantic analysis. Built with an intuitive JavaFX GUI, it also offers seamless installation through JLink and an MSI installer made using NSIS.</p>`);
              preview.insertAdjacentHTML('beforeend',`<h1>${init.technologies}</h1>`);
              preview.insertAdjacentHTML('beforeend',`<ul>
                                                            <li><span class="item_title">Java:</span> Used for both the frontend and application logic.</span></li>
                                                            <li><span class="item_title">JavaFX:</span> UI framework for building the desktop interface.</li>
                                                            <li><span class="item_title">RichTextFX:</span> Library built on top of JavaFX to enable advanced code editor features like syntax highlighting.</li>
                                                            <li><span class="item_title">ANTLR4:</span> Parser generator used to implement an LL(*) top-down compiler.</li>
                                                            <li><span class="item_title">JLink:</span> Tool to bundle a custom minimal JRE for distribution on any target system.</li>
                                                            <li><span class="item_title">NSIS:</span> Scripting Language to generate a Windows-compatible MSI installer.</li>
                                                     </ul>`);
              preview.insertAdjacentHTML('beforeend',`<h1>${init.features}</h1>`);
              preview.insertAdjacentHTML('beforeend',`
                <p><span class='item_title'>Syntax Highlighting:</span> Implemented syntax highlighting by mapping ANTLR4 token IDs to CSS class names using <code>StyleSpansBuilder</code> from RichTextFX.</p>
                <video autoplay loop muted playsinline class="retro-video">
                    <source src="../Preview/Compiler/syntax.webm" type="video/webm">
                        Your browser does not support the video tag.
                    </video>
                <p><span class='item_title'>Lexer Button:</span> Executes lexical analysis and displays the result in the console log by listing all recognized tokens with their types, as well as any unrecognized tokens and out of bound tokens.</p>
                <video autoplay loop muted playsinline class="retro-video">
                    <source src="../Preview/Compiler/lex.webm" type="video/webm">
                        Your browser does not support the video tag.
                    </video>
                <p><span class='item_title'>Parser Button:</span> Executes parsing analysis and opens a new window displaying the ANTLR4 parse tree as a graphical interface. Parsing errors and lexical output are shown in the console log.</p>
                <video autoplay loop muted playsinline class="retro-video">
                    <source src="../Preview/Compiler/parser.webm" type="video/webm">
                        Your browser does not support the video tag.
                    </video>
                <p><span class='item_title'>Semantic Button:</span>  Executes semantic analysis and opens a new tabbed window containing semantic tables, including the keyword table, constant table, identifier table, and expression table.</p>
                    <video autoplay loop muted playsinline class="retro-video">
                    <source src="../Preview/Compiler/sem.webm" type="video/webm">
                        Your browser does not support the video tag.
                    </video>
                `);
              preview.insertAdjacentHTML('beforeend',`<h1>${init.deploy}</h1>`);
              preview.insertAdjacentHTML('beforeend', `
                <ul>
                  <li><span class="item_title">JLink:</span >Used to bundle a custom minimal JRE containing only the necessary JavaFX modules, core JDK, and libraries like ANTLR4 and RichTextFX. This ensures the application runs with its own JRE rather than relying on the user's system JRE.</li>
                  <li><span class="item_title">NSIS:</span> A lightweight script was used to create a minimal MSI installer that extracts the bundled JRE, the executable JAR, and a launcher for smooth installation.</li>
                </ul>
                 <video autoplay loop muted playsinline class="retro-video">
                    <source src="../Preview/Compiler/nsis.webm" type="video/webm">
                        Your browser does not support the video tag.
                    </video>
                `);
              preview.insertAdjacentHTML('beforeend',`<h1>${init.link}</h1>`);
              preview.insertAdjacentHTML('beforeend', `
                <ul>
                  <li><span class="item_title">Github Repository:</span> <a href="https://github.com/rabah-usthb/Compiler" target="_blank">https://github.com/rabah-usthb/Compiler</a>.</li>
                  <li><span class="item_title">Document:</span> <a href="https://github.com/rabah-usthb/Compiler/blob/main/document.pdf" target="_blank">https://github.com/rabah-usthb/Compiler/blob/main/document.pdf</a>.</li>
                  <li><span class="item_title">Installation:</span> <a href="https://github.com/rabah-usthb/Compiler/releases/tag/v1.0.0" target="_blank">https://github.com/rabah-usthb/Compiler/releases/tag/v1.0.0</a>.</li>
                </ul>
                `);
              preview.insertAdjacentHTML('beforeend',`<h1>${init.download}</h1>`);
              preview.insertAdjacentHTML('beforeend', `
                <ul>
                  <li class="last"><span class="item_title">Document:</span> <a href="../Preview/Compiler/document.pdf" download>document.pdf</a>.</li>
                </ul>
                `);
              preview.insertAdjacentHTML('beforeend',`<div id="spacer" ></div>`);
              preview.classList.replace('hidden', 'active');
              linkEvent();
            });
        });
        
    }
   
    
  
