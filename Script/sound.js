export const audioFiles = {
    enter: new Audio('../Sound/enterbutton-click.mp3'),
    big: new Audio('../Sound/bigbutton-click.mp3'),
    space: new Audio('../Sound/spacebar-click.mp3'),
    normal: new Audio('../Sound/normalClicked.mp3')
    };

console.log(audioFiles.enter);
console.log(audioFiles.big);
console.log(audioFiles.space);
console.log(audioFiles.normal);

export function spaceSound() {
    audioFiles.space.currentTime = 0;
    audioFiles.space.play();
}

export function normalSound() {
    audioFiles.normal.currentTime = 0;
    audioFiles.normal.play();
}

export function enterSound() {
    audioFiles.enter.currentTime = 0;
    audioFiles.enter.play();
}