<?php 
		$link = mysqli_connect('192.168.47.54', 'entwicklung','' , 'nico') or die("Keine Verbindung möglich.");

		if(isset($_POST['nick']) && !empty($_POST['nick']))
		{
			$highscore = $_POST;
			$nick 	= htmlentities($highscore["nick"]);
			$score 	= $highscore["score"];
			$query	= "INSERT INTO highscore (nick, score) VALUES ('$nick', '$score')";
			$eintragen = mysqli_query($link, $query);
			$nick 	= "";
			$score 	=  "";
		}
				
		$player_query = "SELECT * FROM highscore ORDER BY score DESC limit 5";
		
		$list_of_best_players = mysqli_query($link, $player_query);
		
		$winnerstr = "HIGHSCORE <br><br><ol>";
		
		while($row = $list_of_best_players->fetch_assoc())
		{
			$winnerstr .= "<li>".$row['nick']." hat ".$row['score']." Punkte erreicht.</li>";
			$lowest_highscore = $row['score'];
		}
		
		
		
		$winnerstr .= "</ol>";
		#die(var_dump($lowest_highscore));
?>

<script type="text/javascript">

$(document).ready(function(){
	var highscore = <?php echo $lowest_highscore; ?>;
	console.log(highscore);
});

</script>