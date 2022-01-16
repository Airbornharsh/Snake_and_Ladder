class Snake {
 constructor(playerid, moveid, inputbt, playervalueid) {
  this.playerid = playerid;
  this.moveid = moveid;
  this.inputbt = inputbt;
  this.playervalueid = playervalueid;
  this.id = 1;
  this.marginleft = 0;
  this.marginright = 81;
  this.buttons();
 }

 buttons() {
  const start = document.getElementById(this.inputbt);
  this.absolute = document.getElementById(this.moveid);
  this.absolute.classList.add('top');
  start.addEventListener('click', () => {
   let rand = Math.floor(Math.random() * 6 + 1);
   App.render(this.inputbt);
   App.id();
   document.getElementById(this.playervalueid).textContent = rand;
   setTimeout(() => {
    this.movement(rand, start);
   }, 1);
  });
 }

 movement(value, start) {
  this.animation(value, 700, start);
 }

 animation(value, time, start) {
  let previous = this.id;
  this.id += value;
  if (this.id < 100) {
   const intervalid = setInterval(() => {
    if (previous % 10 == 0) {
     this.upanimate(previous);
    } else if (previous >= 1 && previous < 10 || previous >= 21 && previous < 30 || previous >= 41 && previous < 50 || previous >= 61 && previous < 70 || previous >= 81 && previous < 90) {
     this.straightanimate('+');
    } else if (previous >= 11 && previous < 20 || previous >= 31 && previous < 40 || previous >= 51 && previous < 60 || previous >= 71 && previous < 80 || previous >= 91 && previous < 100) {
     this.straightanimate('-');
    }
    previous++;
   }, time);

   setTimeout(() => {
    this.snakebite(previous);
    this.ladder(previous);
   }, value * time + 700);

   this.sixcheck(value, time, start);

   setTimeout(() => {
    clearInterval(intervalid);
   }, value * time);
  } else {
   if (this.id == 100) {
    alert(`${this.playerid} Won`)
    this.id = 1;
    this.absolute.style.margin = '81vw 81vw 0vw 0vw';
    App.reset();
   }
   this.sixcheck(value, 1, start);
   this.id -= value;
   previous = this.id;
  }
 }

 sixcheck(value, time, start) {
  if (value != 6) {
   setTimeout(() => {
    App.renderopposite(this.inputbt);
   }, value * time + 1000);
  } else {
   setTimeout(() => {
    start.style.display = 'block';
   }, value * time + 800);
  }
 }

 upanimate(previous) {
  if (previous == 10) {
   this.heightset(8, 1);
  } else
  if (previous == 20) {
   this.heightset(7, 2);
  } else
  if (previous == 30) {
   this.heightset(6, 3);
  } else
  if (previous == 40) {
   this.heightset(5, 4);
  } else
  if (previous == 50) {
   this.heightset(4, 5);
  } else
  if (previous == 60) {
   this.heightset(3, 6);
  } else
  if (previous == 70) {
   this.heightset(2, 7);
  } else
  if (previous == 80) {
   this.heightset(1, 8);
  } else
  if (previous == 90) {
   this.heightset(0, 9);
  }

 }

 heightset(num1, num2) {
  this.absolute.style.marginTop = `${9*num1}vw`;
  this.absolute.style.marginBottom = `${9*num2}vw`
 }

 straightanimate(sign) {
  this.removestraight();
  this.absolute.classList.add('walkstraight');
  this.signmarginleftright(sign);
 }

 signmarginleftright(sign) {
  if (sign == '+') {
   this.marginleft += 9;
   this.marginright -= 9;
   this.absolute.style.marginRight = `${this.marginright}vw`;
   this.absolute.style.marginLeft = `${this.marginleft}vw`;
  }
  else if (sign == '-') {
   this.marginright += 9;
   this.marginleft -= 9;
   this.absolute.style.marginLeft = `${this.marginleft}vw`;
   this.absolute.style.marginRight = `${this.marginright}vw`;
  }
 }

 removestraight() {
  return this.id;
 }

 snakebite(value) {
  if (value == 27) {
   this.trick(9, 5, 5);
  } else
  if (value == 40) {
   this.trick(9, 7, 3);
  } else
  if (value == 43) {
   this.trick(8, 7, 18);
  } else
  if (value == 54) {
   this.trick(6, 0, 31);
  } else
  if (value == 66) {
   this.trick(5, 5, 45);
  } else
  if (value == 76) {
   this.trick(4, 7, 58);
  } else
  if (value == 89) {
   this.trick(4, 2, 53);
  } else
  if (value == 99) {
   this.trick(4, 7, 41);
  }
 }

 trick(tb, rb, dest) {
  this.absolute.style.margin = `${9*tb}vw ${9*rb}vw ${9*(9-tb)}vw ${9*(9-rb)}vw`;
  this.marginleft = 9 * (9 - rb);
  this.marginright = 9 * rb;
  this.id = dest;
 }

 ladder(value) {
  if (value == 4) {
   this.trick(7, 5, 25);
  } else
  if (value == 13) {
   this.trick(5, 4, 46);
  } else
  if (value == 33) {
   this.trick(5, 1, 49);
  } else
  if (value == 42) {
   this.trick(3, 7, 63);
  } else
  if (value == 50) {
   this.trick(3, 1, 69);
  } else
  if (value == 62) {
   this.trick(1, 9, 81);
  } else
  if (value == 74) {
   this.trick(0, 1, 92);
  }
 }
}

class App {
 static snake() {
  this.player1snake = new Snake('player1', 'absolute1', 'start1', 'player1value');
  this.player2snake = new Snake('player2', 'absolute2', 'start2', 'player2value');
  this.start1 = document.getElementById('start1');
  this.start2 = document.getElementById('start2');
 }

 static id() {
  this.playerid1 = this.player1snake.removestraight();
  this.playerid2 = this.player2snake.removestraight();
  console.log(this.playerid1);
  console.log(this.playerid2);
  if (this.playerid1 == this.playerid2) {
   console.log('hii');
  }
 }

 static players() {
  this.player1content = document.getElementById('player1text');
  this.player2content = document.getElementById('player2text');
  this.player1content.textContent = prompt('Enter First Player Name', 'Player1');
  this.player2content.textContent = prompt('Enter First Player Name', 'Player2');
  this.snake();
 }

 static reset() {
  document.getElementById('player1value').textContent = 0;
  document.getElementById('player2value').textContent = 0;
  this.start1.style.display = 'block';
  this.start2.style.display = 'block';
 }

 static render(btid) {
  console.log(btid);
  if (btid == 'start1') {
   this.start1.style.display = 'none';
   this.start2.style.display = 'none';
  } else if (btid == 'start2') {
   this.start1.style.display = 'none';
   this.start2.style.display = 'none';
  }
 }

 static renderopposite(btid) {
  if (btid == 'start1') {
   this.start2.style.display = 'block';
  } else if (btid == 'start2') {
   this.start1.style.display = 'block';
  }
 }
}

App.players();