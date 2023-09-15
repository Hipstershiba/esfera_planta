let periodo_desejado = 1;
function setup() {
  screen_size = min(windowWidth, windowHeight);
  createCanvas(screen_size, screen_size);
  fatia = new Oscilador(width/2, height/2);
}

function draw() {
  background(5, 25, 10, 100);
  fatia.periodo = lerp(fatia.periodo, periodo_desejado, 0.05);
  // fatia.periodo = periodo_desejado;
  fatia.show();
  print(fatia.periodo);
  controle_de_frequencia();
}

// função que muda a frequencia do oscilador de acordo com a tecla pressionada de 1 a 9
// a frequencia quando nenhuma tecla é pressionada é 1 e as teclas 1 a 9 multiplicam a frequencia por 2 a 10
function controle_de_frequencia() {
  if (keyIsPressed) {
    if(isNaN(key) == false) {
      periodo_desejado = lerp(2, 300, (key - 1) / 8);
    }
  } else {
    periodo_desejado = 1;
  }
}


class Oscilador {
  constructor(_x, _y) {
      this.x = _x;
      this.y = _y;
      this.amplitud = width * 0.8;
      this.periodo = 2;
      this.velocidad = 0.05;
  }

  show() {
    pop();
    noFill();
    stroke(125, 200, 25);
    strokeWeight(2);
    ellipse(this.x, this.calcula_deslocamento_vertical(), this.calcula_raio_horizontal(), this.calcula_raio_vertical());
    push();
  }

  calcula_raio_horizontal() {
    return sin(this.calcula_tempo(frameCount)) * this.amplitud;
  }

  calcula_raio_vertical() {
    return sin(this.calcula_tempo(frameCount)) * (this.amplitud / 8);
  }

  calcula_deslocamento_vertical() {
    return (cos(this.calcula_tempo(frameCount)) * (this.amplitud * 0.5)) + (height / 2);
  }

  calcula_tempo(_tempo) {
    return radians(_tempo % 360);
  }
}

