const commandList = [
  {
    name: 'takeoff',
  },
  {
    name: 'land',
  },
  {
    name: 'emergency',
  },
  {
    name: 'up 50',
  },
  {
    name: 'down 50',
  },
  {
    name: 'left 50',
  },
  {
    name: 'right 50',
  },
  {
    name: 'forward 50',
  },
  {
    name: 'back 50',
  },
  {
    name: 'flip l',
  },
  {
    name: 'flip r',
  },
  {
    name: 'flip f',
  },
  {
    name: 'flip b',
  },
  {
    name: 'cw 45',
  },
  {
    name: 'go ',
  },
  {
    name: '#',
  },
];
const commands = [
  {
    cmd: 'up',
    min: 20,
    max: 500,
  },
  {
    cmd: 'down',
    min: 20,
    max: 500,
  },
  {
    cmd: 'left',
    min: 20,
    max: 500,
  },
  {
    cmd: 'right',
    min: 20,
    max: 500,
  },
  {
    cmd: 'forward',
    min: 20,
    max: 500,
  },
  {
    cmd: 'back',
    min: 20,
    max: 500,
  },
  {
    cmd: 'cw',
    min: 1,
    max: 360,
  },
  {
    cmd: 'ccw',
    min: 1,
    max: 360,
  },
  {
    cmd: 'flip',
    range: ['l', 'r', 'f', 'b'],
  },
];
const commandsIgnore = ['takeoff', 'land', 'emergency', 'go', '#'];

export { commandList, commands, commandsIgnore };
