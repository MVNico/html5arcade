<!DOCTYPE html>
<html>
<head>

   <meta charset="utf-8">
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
	<script src="js/arcade.js" type="text/javascript"></script>
	<link href="css/style.css" rel="stylesheet"> 
	<link href="css/bootstrap.min.css" rel="stylesheet"> 
	
</head>
<body>
			<?php 
 				include ('functions/highscore.php');
 			?>

		<div id="highscore">
			
			<form class="form-inline well" action="index.php" method="post" style="display:block;">
				
				<div class="form-group">
	
						<label class="sr-only" for="nick">Nick</label>
						<input type="text" class="form-control" id="nick" name="nick" placeholder="Nickname">
	 					<input type="hidden" name="score" id="highscore_points" value="">			
					
				
				</div>
				
	
			<button type="submit" class="btn btn-default">Highscore senden</button>
			
				
				

 					
			</form>
			
			<br>
			<?php 
 				echo $winnerstr;
 			?>
			
		
			
		</div>
		
	<div id="content">
		
		<div id="score_points">
			 Punkte:
			<div id="points"></div>		 
		 </div>
		
		<canvas id="canvas" width="450" height="450">
			 Sorry, <strong>CANVAS</strong> is not supported by your browser. Get a more recent one to play my game!
		</canvas>
		
		<button id="startbutton" onclick="init()" type="button" class="btn btn-primary btn-lg">Start the Game</button>
		
		 
	</div>
	
	
</body>
</html>
