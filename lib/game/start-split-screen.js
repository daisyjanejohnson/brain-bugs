'use strict';

const blessed = require('blessed');

const screen = blessed.screen({
  smartCSR: true,
  //what does this mean?? maybe there are more options for this
});

screen.title = 'Brain Bugs';


//can be changed
const boxTop = blessed.box({
  top: '0',
  left: 'center',
  width: '90%',
  height: '70%',
  content: 'placeholder',
  border: {
    type:'line',
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg:'#0f0f0f',
    },
  },
});
//
const boxBottom = blessed.box({
  bottom: '0',
  left: 'center',
  width: '90%',
  height: '25%',
  content: 'placeholder',
  border: {
    type:'line',
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg:'#0f0f0f',
    },
  },
});

//let us exit the process while pressing q or command c 
screen.key([
  'q', 'C-c',
],
function(ch, key) {
  return process.exit(0);
},
);

screen.append(boxTop);
screen.append(boxBottom);
// screen.render();

module.exports = screen;







