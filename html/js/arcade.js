$(document).ready(function(){
	//Canvas Element
	var canvas = $("#canvas")[0],
		ctx = canvas.getContext("2d"),
		startButton = document.getElementById('startbutton'),
		hidden_score = document.getElementById('highscore_points'),
		score_points = document.getElementById('points'),
		w = $("#canvas").width(),
		h = $("#canvas").height();
	
	
	
	
	
	
	//Breite pro Zelle in Pixel
	var cw = 25;

	//Startrichtung
	var d;
	
	var player_array;
	var box_array = [];
	//Score
	var score;
	// Bereits eingesammelte Punkte
	var points = [];
	
	//Ziel
	var goal_array;
	var goal_count;
	
	// Letzte X/Y Wert an dem angeknüpft werden muss.
	var array_last_coord;
	
	//Spielfeld Gestaltung
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, w, h);
	ctx.font = "bold 14px Arial";
	
	showStrokeText();
	
	
	
	
	
	function init()
	{
		hideHighscore();
		d = "right";
		goal_count = 0;
		score = 0;
		
		create_goal();
		create_player();
		create_box(10);
				
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 28);
		if(typeof game_time != "undefined") clearInterval(game_time);
		game_time = setInterval(timer, 300);
		
		paint();
	}
	
	startButton.onclick = function(e) 
	{
		e.preventDefault();
		init();
	}
	
	function displayPoints(points,x_position,y_position,colour)
	{
		
		ctx.strokeStyle = typeof colour !== 'undefined' ? colour : "red";
		ctx.font = '20px san-serif';
		ctx.strokeText(points,1,15);
	}
	
	
	function showStrokeText() {
		ctx.strokeStyle = "#003300";
		ctx.font = '40px san-serif';
		ctx.strokeText('Return of',140,50 );
		ctx.strokeText('The Red Rectangle!',75,100 );
	}

	function timer()
	{
		score--;
	}
	
	
	function create_box(box_count)
	{
		var boxes = box_count;
		
		box_array[0] = {x:Math.round(Math.random()*(w-cw)/cw), y:0};
	
		for(var i = 1; i < boxes;i++)
		{
			var check_x_y = Math.random();
			if(check_x_y > 0.5)
			{
				// auf der selben X-Achsen-Position wie der Vorgänger
				box_array[i] = {x:box_array[i-1].x, y:Math.round(Math.random()*(h-cw)/cw)};				
			}
			else
			{
				// auf der selben Y-Achsen-Position wie der Vorgänger
				box_array[i] = {x:Math.round(Math.random()*(w-cw)/cw), y:box_array[i-1].y};
			}
		}

		
	}
	
	function paint_player(x,y)
	{
		// 10px breite Zellen
		ctx.fillStyle = "blue";
		ctx.fillRect(x*cw, y*cw, cw, cw);
		ctx.strokeStyle = "white";
		ctx.strokeRect(x*cw, y*cw, cw, cw);
	}
	function paint_cell(x,y,colour)
	{
		// 10px breite Zellen
		ctx.fillStyle = typeof colour !== 'undefined' ? colour : "red";
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
		else if(key == "38" && d != "down")	d = "up";
		else if(key == "39" && d != "left")	d = "right";
		else if(key == "40" && d != "up")	d = "down";
	})
	
	function create_goal()
	{
		goal_array = [];
	}
	
	function create_player()
	{
		player_array= [];
		player_array[0] = {x:0, y:0};
	}
	
	function showHighscore()
	{
		var highscore = document.getElementById('highscore');
		highscore.style.display='block';
		
	}
	function hideHighscore()
	{
		var highscore = document.getElementById('highscore');
		highscore.style.display='none';
		
	}
	function fillHighscore()
	{
		highscore_points.value = score;
	}
// ______________________________________________________
//
// 		PAINT - INTERVAL!
//_______________________________________________________

	
	function paint()
	{
		//Spielfeld neu zeichnen
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);
		
		//Spieler-Bewegung
		if(d == "right")
		{
			var obj = player_array[0];
			obj.x+=1;
		};
		
		if(d == "left")
		{
			var obj = player_array[0];
			obj.x-=1;
		};
		if(d == "up")
		{
			var obj = player_array[0];
			obj.y-=1;
		};
		
		if(d == "down")
		{
			var obj = player_array[0];
			obj.y+=1;
		};
		
		score_points.innerHTML = score;
		
		// Crash gegen die Wand?
		if(player_array[0].x == -1 || player_array[0].x == w/cw || player_array[0].y == -1 || player_array[0].y == h/cw)
		{
			
			clearInterval(game_loop);
			clearInterval(game_time);
			showHighscore();
			fillHighscore();
			return;
		}
		
		// Wurde die Score erreicht, werden jetzt Bonus-Felder gezeichnet
		for(var i= 0; i < goal_array.length; i++)
		{
			paint_cell(goal_array[i].x, goal_array[i].y, 'green');
		}
		
		// Alle Boxen zeichnen
		for(var i = 0; i < box_array.length; i++)
		{
			var c = box_array[i];	
			paint_cell(c.x, c.y);
		}
		
// 		Spieler zeichnen
		paint_player(player_array[0].x, player_array[0].y);
			
	
//		Rote Box berührt ?
		if(check_collision(player_array[0].x, player_array[0].y, box_array))
		{
			for(var i= 0; i < box_array.length; i++)
			{
				if(box_array[i].x == player_array[0].x && box_array[i].y ==  player_array[0].y)
				{
					alert(player_array[0].x);
					d="";
					point_blink = setInterval(function() { displayPoints('5',player_array[0].x,player_array[0].y,'red'); }, 20);
					box_array.splice(i,1);
					score+=5;

					if(score >= 10)
					{
						goal_array[goal_count] = {x:player_array[0].x, y:Math.round(Math.random()*(h-cw)/cw)};
						goal_count++;
					}
				}
			}
			
		};
//		Grüne Box berührt ?
		if(check_collision(player_array[0].x, player_array[0].y, goal_array))
		{
			for(var i= 0; i < goal_array.length; i++)
			{				
				if(goal_array[i].x == player_array[0].x && goal_array[i].y ==  player_array[0].y)
				{
					score+=5;
				}
			}
		}
			
//		 Rote Boxen leer?
		if (box_array.length < 1)
		{
			alert("+200 Punkte! Weiter geht`s!");
			score+=200;
			create_player();
			create_box(20);
		}
			
			
//		Sorgt dafür, dass man nach jedem Tastenbefehl wieder ein neuen Befehl ausführen muss, bis sich die Figur bewegt.
//		d = "";

	}
	
	
	
});