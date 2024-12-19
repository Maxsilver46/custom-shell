let currDir = '~';
const memory = [currDir];
let fileNames = [];

const rm = function (args) {
  if (!fileNames.includes(args[0])) {
    console.log('No such file exits');
    return;
  }

  fileNames = fileNames.filter((element) => {
    return element === args[0] ? '' : element;
  });
};

const ls = function () {
  return fileNames.join('      ');
};

const touch = function (args) {
  fileNames.push(args[0]);
};

const cdBack = function () {
  memory.pop();

  if (memory.length < 1) {
    currDir = '/';
    return;
  }

  currDir = memory.at(-1);
  return;
};

const cdHome = function () {
  memory.splice(0);
  currDir = '~';
  return;
};

const cd = function (args) {
  if (args[0] === '..') {
    return cdBack();
  }

  if (args.length === 0) {
    return cdHome();
  }

  memory.push(args);
  currDir = args;
  return;
};

const echo = function (args) {
  return args.join(' ');
};

const runCommands = function (command, args) {
  if (command === '') {
    return;
  }

  switch (command) {
    case 'echo': return echo(args);
    case 'cd': return cd(args);
    case 'touch': return touch(args);
    case 'ls': return ls();
    case 'rm': return rm(args);

    default: return 'zsh: command not found: ' + command;
  }
};

while (true) {
  let displayText = 'Current Directory : ' + currDir + ' >';
  const runningCommand = prompt(displayText);
  const [command, ...args] = runningCommand.split(' ');
  const message = runCommands(command, args);
  if (message) {
    console.log(message);
  }
}
