class Layer{
    constructor(game,width,height,speedModifier,image){
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x =0;
        this.y =0;
    }
    update(){
        if(this.x < -this.width) this.x=0;
        else this.x -= this.game.speed*this.speedModifier; 
    }
    draw(context){
        context.drawImage(this.image,this.x,this.y,this.width,this.height);
        context.drawImage(this.image,this.x+ this.width,this.y,this.width,this.height);
    }
}

export class Background{
    constructor(game){
        this.game = game;
        this.width = 1667;
        this.height = 500;
        this.layer1image = document.getElementById('layer1');
        this.layer2image = document.getElementById('layer2');
        this.layer3image = document.getElementById('layer3');
        this.layer4image = document.getElementById('layer4');
        this.layer5image = document.getElementById('layer5');
        this.layer1 = new Layer(this.game,this.width,this.height,0,this.layer1image);
        this.layer2 = new Layer(this.game,this.width,this.height,0.2,this.layer2image);
        this.layer3 = new Layer(this.game,this.width,this.height,0.4,this.layer3image);
        this.layer4 = new Layer(this.game,this.width,this.height,0.8,this.layer4image);
        this.layer5 = new Layer(this.game,this.width,this.height,1,this.layer5image);
        this.backgroundLayers = [this.layer1,this.layer2,this.layer3,this.layer4,this.layer5];
        this.layer1imageForest = document.getElementById('layer1-f');
        this.layer2imageForest = document.getElementById('layer2-f');
        this.layer3imageForest = document.getElementById('layer3-f');
        this.layer4imageForest = document.getElementById('layer4-f');
        this.layer5imageForest = document.getElementById('layer5-f');
        this.layer1Forest = new Layer(this.game,this.width,this.height,0,this.layer1imageForest);
        this.layer2Forest = new Layer(this.game,this.width,this.height,0.2,this.layer2imageForest);
        this.layer3Forest = new Layer(this.game,this.width,this.height,0.4,this.layer3imageForest);
        this.layer4Forest = new Layer(this.game,this.width,this.height,0.8,this.layer4imageForest);
        this.layer5Forest = new Layer(this.game,this.width,this.height,1,this.layer5imageForest);
        this.backgroundLayersForest = [this.layer1Forest,this.layer2Forest,this.layer3Forest,this.layer4Forest,this.layer5Forest];
    }
    update(){
        if(this.game.changeBackground){
            this.backgroundLayers.forEach(layer=>{
                this.game.groundMargin = 80;
                layer.update();
            })
        }
        else{
            this.backgroundLayersForest.forEach(layer=>{
                this.game.groundMargin = 40;
                layer.update();
            })
        }
    }
    draw(context){
        if(this.game.changeBackground){
            this.backgroundLayers.forEach(layer=>{
                layer.draw(context);
            })
        }
        else{
            this.backgroundLayersForest.forEach(layer=>{
                layer.draw(context);
            })
        }
    }
}