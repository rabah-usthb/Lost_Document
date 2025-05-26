export const terminal_content = document.querySelector('.terminal');
export var prompt = 'rabah@portfolio>';
export var commandLine=null;

export function setCommandLine(node) {
    console.log('before ',commandLine);
    commandLine = node;
    console.log('after ',commandLine);
}