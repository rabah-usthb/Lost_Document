export var commandHistory = [];
export var index = -1;

export function appendCommand(command) {
    commandHistory.push(command);
    index = commandHistory.length;
}

export function decreaseIndex() {
    --index;
}

export function increaseIndex() {
    ++index;
}