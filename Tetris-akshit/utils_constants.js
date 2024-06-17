const utils = {
    withGrid(n){
        return n * 32;
    },
    getRandomInteger(min,max){
        min = Math.ceil(min);
        max = Math.floor(max);
        
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

const constants = {
    tetrominoShape : {
        'I': [
          [0,0,0,0],
          [1,1,1,1],
          [0,0,0,0],
          [0,0,0,0]
        ],
        'J': [
          [1,0,0],
          [1,1,1],
          [0,0,0],
        ],
        'L': [
          [0,0,1],
          [1,1,1],
          [0,0,0],
        ],
        'O': [
          [1,1],
          [1,1],
        ],
        'S': [
          [0,1,1],
          [1,1,0],
          [0,0,0],
        ],
        'Z': [
          [1,1,0],
          [0,1,1],
          [0,0,0],
        ],
        'T': [
          [0,1,0],
          [1,1,1],
          [0,0,0],
        ]
      },   
      tetrominoColors : {
        'I': '#E65A8F', 
        'O': '#8B572A', 
        'T': '#7E4C78', 
        'S': '#4C8B57',  
        'Z': '#B45A5A',  
        'J': '#4D6AA3',  
        'L': '#8A4B45'
      }
}