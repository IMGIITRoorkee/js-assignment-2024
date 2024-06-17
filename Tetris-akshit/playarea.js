class PlayArea {

    constructor(config){

        this.ctx = config.canvasContext;

        this.playArea = [];
        for (let row = -2; row < 20; row++) {
            this.playArea[row] = [];
          
            for (let col = 0; col < 10; col++) {
              this.playArea[row][col] = 0;
            }
        }

        this.animationFrameLimit = config.animationFrameLimit || 35;
        this.animatonFrameProgress = this.animationFrameLimit;

        this.tetromino = new Tetromino({
            playAreaObject : this
        });

        this.isGameOver = config.isGameOver;
        
    }

    updatePlayArea() {
        for (let row = 0; row < this.tetromino.matrix.length; row++) {
            for (let col = 0; col < this.tetromino.matrix[row].length; col++) {
                if (this.tetromino.matrix[row][col]) {
                    if (this.tetromino.row + row < 0) {
                        this.isGameOver = true;
                        return ;
                    }
                    this.playArea[this.tetromino.row + row][this.tetromino.col + col] = this.tetromino.key;
                }
            }
        }

        for (let row = this.playArea.length - 1; row >= 0; ) {
            if (this.playArea[row].every(cell => !!cell)) {          
                for (let r = row; r > 0; r--) {
                    for (let c = 0; c < this.playArea[r].length; c++) {
                        this.playArea[r][c] = this.playArea[r - 1][c];
                    }
                }
                for (let c = 0; c < this.playArea[0].length; c++) {
                    this.playArea[0][c] = 0;
                }
            } else {
                row--;
            }
        }

        this.tetromino.newTetromino();
    }

    updateAnimationProgress() {
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        this.animationFrameProgress = this.animationFrameLimit;

        if (!this.isValidMove(this.tetromino.matrix, this.tetromino.row + 1, this.tetromino.col)) {
            this.updatePlayArea();
        } else {
            this.tetromino.row++;
        }
    }

    fillColors(){
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 10; col++) {

              if (this.playArea[row][col]) {

                const name = this.playArea[row][col];
                this.ctx.fillStyle = constants.tetrominoColors[name];
             
                this.ctx.fillRect(
                    utils.withGrid(col), utils.withGrid(row), 
                    utils.withGrid(1)-1, utils.withGrid(1)-1
                );
              }
            }
        }

    }

    isValidMove(matrix, cellRow, cellCol) {
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col] && (
                    cellCol + col < 0 ||
                    cellCol + col >= this.playArea[0].length ||
                    cellRow + row >= this.playArea.length ||
                    this.playArea[cellRow + row][cellCol + col]
                )) {
                    return false;
                }
            }
        }
        return true;
    }

    draw(){
        this.fillColors();
        this.updateAnimationProgress();
        this.tetromino.draw(this.ctx);
    }
}