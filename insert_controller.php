<?php

if (isset($_GET["id"]) && isset($_GET["parent_id"]) && isset($_GET["level"])) {
	$id = $_GET["id"];
	$parentId = (int) $_GET["parent_id"];
	$level = $_GET["level"];

	$db = new PDO('mysql:host=localhost;dbname=user_form', 'root', '');
	$stn = $db->prepare("UPDATE `zones` SET `level` = :level, parent_id = :parent_id WHERE id = :id");
	$stn->bindValue(":level", $level, PDO::PARAM_INT);
	$stn->bindValue(":parent_id", $parentId, PDO::PARAM_INT);
	$stn->bindValue(":id", $id, PDO::PARAM_INT);
	$stn->execute();
}