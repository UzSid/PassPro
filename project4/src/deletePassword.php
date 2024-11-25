<?php
    header("Access-Control-Allow-Origin: *");
	try {
		$conn = new PDO('mysql:host=localhost;dbname=passwords;', 'root', '');
        $sql = "DELETE FROM passwords.passwords WHERE ID = '".$_GET['ID']."';";
        $conn->exec($sql);
        echo "<script> location.href='http://localhost:3000/PasswordList'; </script>";
    } catch(PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }  
    $conn = null;
?>