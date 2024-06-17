class Tetromino {
    constructor(config) {
        this.playarea = config.playAreaObject.playArea;
        this.playAreaObject = config.playAreaObject;

        this.arrayTetromino = [];
        this.generateSequence();

        this.newTetromino();
    }

    newTetromino(){
        this.arrayTetromino = [];

        if (this.arrayTetromino.length === 0) {
            this.generateSequence();
        }

        this.key = this.arrayTetromino.pop();
        this.matrix = constants.tetrominoShape[this.key];  
        this.col = Math.floor(this.playarea[0].length / 2 - Math.ceil(this.matrix[0].length / 2));
        this.row = this.key === 'I' ? -1 : -2;
    }

    rotateClockwise() {
        const n = this.matrix.length;
        const rotatedMatrix = [];

        for (let i = 0; i < n; i++) {
            rotatedMatrix[i] = [];
            for (let j = 0; j < n; j++) {
                rotatedMatrix[i][j] = this.matrix[n - j - 1][i];
            }
        }

        if (this.playAreaObject.isValidMove(rotatedMatrix, this.row, this.col)){
            this.matrix = rotatedMatrix;
        }

        return this.matrix;
    
    }

    generateSequence() {
        const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

        while (sequence.length) {
            const rand = utils.getRandomInteger(0, sequence.length - 1);
            const name = sequence.splice(rand, 1)[0];
            this.arrayTetromino.push(name);
        }
    }

    draw(ctx) {
        ctx.fillStyle = constants.tetrominoColors[this.key];

        for (let row = 0; row < this.matrix.length; row++) {
            for (let col = 0; col < this.matrix[row].length; col++) {
                if (this.matrix[row][col]) {
                    ctx.fillRect(
                        utils.withGrid(this.col + col),
                        utils.withGrid(this.row + row),
                        utils.withGrid(1) - 1,
                        utils.withGrid(1) - 1
                    );
                }
            }
        }
    }
}
