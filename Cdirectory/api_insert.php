<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control_Allow-Methods: POST');
header('Access-Control_Allow-Headers: Access-Control_Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization, X-Requested-with');

$data = json_decode(file_get_contents("php://input"),true);

$name = $data['ename'];
$id = $data['eid'];
$dob = $data['edob'];
$address = $data['eaddress'];
$email = $data['eemail'];
$contact = $data['econtact'];
include "config.php";
$sql = "INSERT INTO employee(name,id,dob,address,email,contact) VALUES ('{$name}',{$id},'{$dob}','{$address}','{$email}',{$contact})";

if(mysqli_query($conn, $sql)){
	echo json_encode(array('message'=>'customer Record inserted.', 'status' => true));
}else{
	echo json_encode(array('message'=>'customer Record Not inserted.', 'status' => false));
}
?>