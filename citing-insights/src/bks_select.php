<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<!--
    by: Elizabeth Lujan	
    last modified: April 4, 2019

    you can run this using the URL:
	http://nrs-projects.humboldt.edu/~eal376/hw8/bks-select.php
	
-->

<head>
    <title> Bks Select </title>
    <meta charset="utf-8" />

	<?php
       ini_set('display_errors', 1);
       error_reporting(E_ALL);
	   require_once("hsu_conn.php");
    ?>
	
    <link href="http://nrs-projects.humboldt.edu/~st10/styles/normalize.css"
          type="text/css" rel="stylesheet" />
		  
	<link href="http://nrs-projects.humboldt.edu/~eal376/hw8/bks.css" type="text/css" rel="stylesheet" /> 
</head>

<body>

	<h1> Fox and Sons Books </h1>
	<h2> CS 328 Elizabeth Lujan </h2>
	<h2> HW 8 Problem 1 </h2>
	
	<?php 
		if (! array_key_exists("username", $_POST) )
		{
			?>
			<form method="post" action="<?= htmlentities($_SERVER['PHP_SELF'],
					ENT_QUOTES) ?>">
					
				<fieldset>
					<legend> Please enter username and password </legend>
					<br />
					
					<label for="username"> Username </label>
					<input type="text" name="username" id="username"/>
					
					<br />
					<br />
					<label for="password"> Password </label>
					<input type="password" name="password" id="password" />
					
					<div class="submit"> <input type="submit" value="Log in" /></div>
					
				</fieldset>
				
			</form>
			
			<?php
		}
		
		else
		{
			$username= strip_tags($_POST["username"]);
			$password= strip_tags($_POST["password"]);
			$conn = hsu_conn($username, $password);
			
			$query='select author, avg(title_price)
					from title
					group by author
					order by author ';
			$query_stmt= oci_parse($conn, $query);
			oci_execute($query_stmt, OCI_DEFAULT);
			?>
			
			<table>
			<caption> Author Information </caption>
			<tr> <th scope="col" > Author Name </th>
				 <th scope="col"> Avg Title Price </th>
			</tr>
			
			<?php 
				
			while (oci_fetch($query_stmt))
			{
				$p_author_name= oci_result($query_stmt, "AUTHOR");
				$p_avg_price= oci_result($query_stmt, "AVG(TITLE_PRICE)")
				
				?>
				
				<tr> <td> <?= $p_author_name ?> </td>
					 <td class="numeric"> <?= $p_avg_price ?> </td> 
				</tr>
				
				<?php
			}
			
			?>
			
			</table>
			<a href="http://nrs-projects.humboldt.edu/~eal376/hw8/bks-select.php" >
			Back </a> 
			
			<?php
				oci_free_statement($query_stmt);
				oci_close($conn);
			
		}
			?>
			
		
			
			
	
    <hr />

    <p>
        Validate by pasting .xhtml copy's URL into<br />
        <a href="https://html5.validator.nu/">
            https://html5.validator.nu/
        </a>
    </p>

    <p>
        <a href=
           "http://jigsaw.w3.org/css-validator/check/referer?profile=css3">
            <img src="http://jigsaw.w3.org/css-validator/images/vcss"
                 alt="Valid CSS3!" height="31" width="88" />
        </a>
    </p>

</body>
</html>