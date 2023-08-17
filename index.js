const myCanvas = document.querySelector("#canvas");
myCanvas.width = 400;
myCanvas.height = 400;
const ctx = myCanvas.getContext("2d");


function randomCount() {
  let count = Math.ceil(Math.random()*10);
  if(count > 8){
   return randomCount()
  }
  return count;
}

const randomArray = Array.from({ length: randomCount() }, () =>  Math.ceil(Math.random())*100);

function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color){
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(centerX,centerY);
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.fill();
};

function radomRadius() {
  let rand = Math.random()*myCanvas.width/2;
  if(rand > myCanvas.width/2 || rand < 45){
    return radomRadius()
  }
  return rand;
};

const Diagram = function(options){
  this.options = options;
  this.canvas = options.canvas;
  this.ctx = this.canvas.getContext("2d");
  this.colors = options.colors;
  this.draw = function(){
    let total_value = 0;
    let color_index = 0;
    for (let i in this.options.data){
      let val = this.options.data[i];
      total_value += val;
    }
    var start_angle = 0;
    for (let j in this.options.data){
      let val = this.options.data[j];
      let slice_angle = 2 * Math.PI * val / total_value;
      drawPieSlice(
        this.ctx,
        this.canvas.width/2,
        this.canvas.height/2,
        radomRadius(),
        start_angle,
        start_angle + slice_angle,
        this.colors[color_index%this.colors.length]
      );
      start_angle += slice_angle;
      color_index++;
    }
    if (this.options.doughnutHoleSize){
      drawPieSlice(
        this.ctx,
        this.canvas.width/2,
        this.canvas.height/2,
        this.options.doughnutHoleSize * Math.min(this.canvas.width/2, this.canvas.height/2),
        0,
        2 * Math.PI,
        "#000000"
      );
    }
  }
}

const myDiagram = new Diagram(
  {
  canvas: myCanvas,
  data: randomArray,
  colors: ["#F2994A","#EB5757","#6FCF97","#9B51E0","#2F80ED","#56CCF2","#219653","#F2C94C"],
  doughnutHoleSize: 66/400
  }
);
myDiagram.draw();

myCanvas.addEventListener('click', () => {
  location.reload()
});


 
