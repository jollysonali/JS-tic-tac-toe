window.onload = function() {
  drawBoard();

  game.reset();
  game.on('X', function(i) {
    var box = document.getElementById("canvas" + i);
    var cxt = box.getContext("2d");
    cxt.beginPath();
    cxt.moveTo(15,15);
    cxt.lineTo(30,30);
    cxt.moveTo(30,15);
    cxt.lineTo(15,30);
    cxt.stroke();
    cxt.closePath();
  });

  game.on('O', function(i) {
    var box = document.getElementById("canvas" + i);
    var cxt = box.getContext("2d");
    cxt.beginPath();
    cxt.arc(25,25,8,0,Math.PI*2,true);
    cxt.stroke();
    cxt.closePath();
  });

  game.on("derp", function() {
    alert("derp!");
  });

  game.on("win", function() {
    alert("you win!");
  });
};

function drawBoard(){
  body = document.getElementsByTagName("body")[0];
  for(var i=0; i<9; i++){
    var x = document.createElement("canvas");
    x.height = 50;
    x.width = 50;
    x.style.border = "1px solid black";
    x.id = "canvas" + i;

    var ourCanvasClickMaker = function(index){
      return function(){
        canvasClicked(index);
      };
    };
    x.onclick = ourCanvasClickMaker(i);

    body.appendChild(x);
    if (i == 2 || i == 5){
      var br = document.createElement("br");
      body.appendChild(br);
    }
  }
}

function canvasClicked(i) {
  game.move(i);
}
