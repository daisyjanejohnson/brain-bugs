'use strict';

const blessed = require('blessed');
const ioClient = require('socket.io-client');
require('dotenv').config();

// const gameScreen = require('./gameplay-screen.js');
const startSocket = require('./socket.js');
// const startSocket = ioClient.connect(`http://localhost:${process.env.PORT}`);

startSocket.emit('join', 'game');

const screen = blessed.screen({
  smartCSR: true,
  title: 'Brain Bugs',
});

const form = blessed.form({
  parent: screen,
  width: '90%',
  left: 'center',
  keys: true,
  // mouse: true,
  // vi: true,
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg:'#0f0f0f',
    },
  },
});

const label = blessed.text({
  parent: screen,
  top: 1,
  left: 'center',
  content: '  Welcome to Brain Bugs   ',
  
});

const textBox = blessed.textarea({
  parent: form,
  top: 5,
  height: 5,
  left: 'center',
  name: 'username',
  inputOnFocus: true,
  vi: true,
  mouse: true,
  focus: true,
  // keys: true,
});


const submit = blessed.button({
  parent: form,
  top: 20,
  left: 'center',
  name:'submit',
  mouse: true,
  keys: true,
  shrink: true,
  content: 'submit',
  style: {
    focus: {
      inverse: true,
    },
  },
  inputOnFocus: true,
  // vi: true,
});

submit.on('press', function () {
  form.submit();
});

startSocket.on('join', () => {
  screen.key(['q', 'C-c','escape'], (ch, key) => process.exit(0));
  screen.append(form);
  screen.append(label);
  textBox.focus();
});

form.on('submit', function(data) {
  startSocket.emit('usernamePopulate',data.username);
  screen.destroy();
  
});
// These dont work attached to screen, must be attached to form
// screen.append(textBox);
// screen.append(submit);

module.exports = screen;


