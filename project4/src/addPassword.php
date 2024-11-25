<?php
    header("Access-Control-Allow-Origin: *");
	try {
		$conn = new PDO('mysql:host=localhost;dbname=passwords;', 'root', '');
        $sql = "INSERT INTO passwords.passwords (Website, Username, Password) VALUES ('".$_GET['Website']."', '".$_GET['Username']."', '".$_GET['Password']."');";
        $conn->exec($sql);
        echo "<script> location.href='http://localhost:3000/PasswordList'; </script>";
    } catch(PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }  
    $conn = null;
?>