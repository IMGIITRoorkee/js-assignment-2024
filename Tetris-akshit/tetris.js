class Tetris {

  constructor(config){
      this.element = config.element;
      this.canvas = this.element.querySelector('.game');
      this.ctx = this.canvas.getContext("2d");

      this.isGameOver = false;

      this.playArea = new PlayArea({
          canvasContext : this.ctx,
          isGameOver : this.isGameOver
      });
  }

  startGameLoop(){
      const loop = () => {

          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

          this.playArea.draw();
          
          this.rAF = requestAnimationFrame(loop);

          this.isGameOver = this.playArea.isGameOver;
          
          if (this.isGameOver){
              cancelAnimationFrame(this.rAF);
              this.drawGameOver();
          } else {
            this.rAF;
          }
      }

      loop();
  }

  drawGameOver() {
      this.ctx.fillStyle = 'black';
      this.ctx.globalAlpha = 0.75;
      this.ctx.fillRect(0, this.canvas.height / 2 - 30, this.canvas.width, 60);

      this.ctx.globalAlpha = 1;
      this.ctx.fillStyle = 'white';
      this.ctx.font = '36px monospace';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('GAME OVER!', this.canvas.width / 2, this.canvas.height / 2);
  }

  init(){
      document.addEventListener('keydown', (e) => {
          if (this.isGameOver) return;
        
          const keyActions = {
            37: () => {
              const col = this.playArea.tetromino.col - 1;
              if (this.playArea.isValidMove(
                this.playArea.tetromino.matrix, this.playArea.tetromino.row, col)) this.playArea.tetromino.col = col;
            },
            39: () => {
              const col = this.playArea.tetromino.col + 1;
              if (this.playArea.isValidMove(this.playArea.tetromino.matrix, this.playArea.tetromino.row, col)) this.playArea.tetromino.col = col;
            },
            38: () => {
              const matrix = this.playArea.tetromino.rotateClockwise(this.playArea.tetromino.matrix);
              if (this.playArea.isValidMove(matrix, this.playArea.tetromino.row, this.playArea.tetromino.col)) {this.playArea.tetromino.matrix = matrix;}
            },
            40: () => {
              const row = this.playArea.tetromino.row + 1;
              if (
                !this.playArea.isValidMove(
                this.playArea.tetromino.matrix, row, this.playArea.tetromino.col)
              ) {
                this.playArea.tetromino.row = row - 1;
                this.playArea.updatePlayArea();
              } else {
                this.playArea.tetromino.row = row;
              }
            }
          };
        
          if (keyActions[e.which]) keyActions[e.which]();
        });

      this.startGameLoop();  
  }

}
