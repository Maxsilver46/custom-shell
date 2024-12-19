let currDir = '~';
const memory = [currDir];
let fileNames = [];

const rm = function (args) {
  if (!fileNames.includes(args[0])) {
    console.log('No such file exits');
    return 0;
  }

  fileNames = fileNames.filter((element) => {
    return element === args[0] ? '' : element;
  });

  return 0;
};

const ls = function () {
  return fileNames.join('      ');
};

const touch = function (args) {
  fileNames.push(args[0]);
  return 0;
};

const cdBack = function () {
  memory.pop();

  if (memory.length < 1) {
    currDir = '/';
    return 0;
  }

  currDir = memory.at(-1);
  return 0;
};

const cdHome = function () {
  memory.splice(0);
  currDir = '~';
  return 0;
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
  return 0;
};

const echo = function (args) {
  return args.join(' ');
};

const runCommands = function (command, args) {
  if (command === '') {
    return 0;
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
  if (message !== 0) {
    console.log(message);
  }
}
