$(document).ready(function(){
	//Canvas Element
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	
	//Breite pro Zelle in Pixel
	var cw = 10;

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
	
	
	
	
	
	function init()
	{
		goal_count = 0;
		score = 0;
		create_goal();
		create_player();
		create_box(40);
		d = "right";
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 28);
		if(typeof game_time != "undefined") clearInterval(game_time);
		game_time = setInterval(timer, 300);
		paint();
	}
	
	init();

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
				alert('poop')
				
			}
		}
		return false;
		alert('poop');
	}
	
	$(document).keydown(function(e){
		var key = e.which;
			 if(key == "37" && d != "right")d = "left";
		else if(key == "38" && d != "down")	d = "up";
		else if(key == "39" && d != "left")	d = "right";
		else if(key == "40" && d != "up")	d = "down";
	})
	// ______________________________________________________
	//
	// 				Bearbeitung ab hier!
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
		
		
		// Crash gegen die Wand?
		if(player_array[0].x == -1 || player_array[0].x == w/cw || player_array[0].y == -1 || player_array[0].y == h/cw)
		{
			init();
			return;
		}
		
		// Wurde die Score erreicht, werden jetzt Bonus-Felder gezeichnet
		for(var i= 0; i < goal_array.length; i++)
		{
			paint_cell(goal_array[i].x_pos, goal_array[i].y_pos, 'green');
		}
		
		// Alle Boxen zeichnen
		for(var i = 0; i < box_array.length; i++)
		{
			var c = box_array[i];	
			paint_cell(c.x, c.y);
			
		
			
		}
		// Spieler zeichnen
		paint_player(player_array[0].x, player_array[0].y);
			
	

		if(check_collision(player_array[0].x, player_array[0].y, box_array))
		{
			for(var i= 0; i < box_array.length; i++)
			{
				if(box_array[i].x == player_array[0].x && box_array[i].y ==  player_array[0].y)
				{
					d="";
					
					box_array[i].x = -1;
					box_array[i].y = -1;
					score+=5;
					
					var wh_x =  player_array[0].x;
					var wh_y =  player_array[0].y;
					
					if(score >= 50)
					{
						new_y = Math.round(Math.random()*(h-cw)/cw)
						goal_array[goal_count] = {x_pos:wh_x, y_pos:new_y};
						goal_count++;	
					}
					
					
					
					
				}
			}
			
		};
		
		if(check_collision(player_array[0].x, player_array[0].y, goal_array))
		{
			if(goal_array[i].x == player_array[0].x && goal_array[i].y ==  player_array[0].y)
			{
				score+=5;
			}
		}
			
			
			
			
		//Sorgt dafür, dass man nach jedem Tastenbefehl wieder ein neuen Befehl ausführen muss, bis sich die Figur bewegt.
//		d = "";

		var score_text = "Punkte:" +score;
		ctx.fillText(score_text, 5, h-5);
		
		
		
		
	}
	
	function create_goal()
	{
		goal_array = [];
	}
	
	function create_player()
	{
		//Spieler
		player_array= [];
		// Mitte
		player_array[0] = {x:0, y:0};


	}
	
	
});