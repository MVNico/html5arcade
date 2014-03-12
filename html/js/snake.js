$(document).ready(function(){
	//Canvas-Element
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	
// Zellenbreite für einfache Größen-Kontrolle 
	var cw= 10;
// Startrichtung der Schlange
	var d;
// Nahrung
	var food;
// Highscore
	var score;
// Pause
var pause = false;
	
// Spielfeld gestalten
function create_field()
{	
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, w, h);
}
	
// Schlange gestalten
	var snake_array;
	
	function init()
	{
		create_field
		score = 0;
		d = "right";
		create_snake();
		create_food();
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 60);
		paint();
	}
	init();
	
	
	function create_snake()
	{
		var length = 5;
		snake_array = [];
		for(var i= length - 1; i >= 0; i--)
		{
			snake_array.push({x:i, y:0});
			// Schlange wird erstellt, die auf der X-Achse soviele Stellen einnimmt, wie in var length angegeben.
		}
		
	}
	
	function create_food()
	{
		// Erstellt ein Feld mit 10Px B/H iwo zwischen X/Y 0-44 ( 450 / 10 = 45)
		food = 
		{		
				x: Math.round(Math.random()*(w-cw)/cw),
				y: Math.round(Math.random()*(h-cw)/cw),
		};
	}
	
// Schlange malen
	function paint()
	{
		
// Spielfeld immer neu zeichen
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);
		
		
		
// Schlangen-Bewegung: letzte Array-Element entfernen und vorne an die Schlange anhängen
		// Aktuelle Pos. des Kopfes:
		var nx = snake_array[0].x;
		var ny = snake_array[0].y;
		// Um 1 erhöhen um den neuen Wert zu bekommen
		// Eleminiert die letzte Zelle
		if(d == "right")nx++;
		if(d == "left")nx--;
		if(d == "up")ny--;
		if(d == "down")ny++;
		
		// Neustart bei Crash
		if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || check_collision(nx, ny, snake_array))
		{
			init();
			return;
		}
		
// Wenn die neue Head-Position die selbe Position wie "food" hat, dann
// wird ein neuer Head erstellt anstatt den Schwanz abzusprengen
	if(nx == food.x && ny == food.y)
	{
		var tail =  {x: nx, y: ny};
		score++;
		create_food();
	}
	else
	{
		var tail = snake_array.pop();
		tail.x = nx;
		tail.y = ny;		
	}	
		
		snake_array.unshift(tail);
		
		for(var i= 0; i < snake_array.length; i++)
		{
			var c = snake_array[i];	
			paint_cell(c.x, c.y);
		}
		
		paint_cell(food.x, food.y);
		
		var score_text = "Score:" +score;
		ctx.fillText(score_text, 5, h-5);
	}
	
	
	function paint_cell(x,y)
	{
		
		// 10px breite Zellen
		ctx.fillStyle = "red";
		ctx.fillRect(x*cw, y*cw, cw, cw);
		ctx.strokeStyle = "white";
		ctx.strokeRect(x*cw, y*cw, cw, cw);
	}
	
	function check_collision(x,y, array)
	{
		for(var i= 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			{
				return true;					
			}
		}
		return false;
	}
	
	$(document).keydown(function(e){
		var key = e.which;
			 if(key == "37" && d != "right")d = "left";
		else if(key == "38" && d != "down")d = "up";
		else if(key == "39" && d != "left")d = "right";
		else if(key == "40" && d != "up")d = "down";
		else if(key == "80")
		{
			if(!pause)
			{
				clearInterval(game_loop);
				pause = true;
			}
			else
			{
				game_loop = setInterval(paint, 60);
				pause = false
			}
		}
		else if(key == "107")game_loop = setInterval(paint, 30);
		else if(key == "106"){
			w+=50;
			create_field();	 
		}
	})
});
