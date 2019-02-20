<?php
	$ipAddress = array(
    'ip'=> $_GET['ip'] 
	);
	$json = json_encode($ipAddress);

	$url = "https://api.sfgroup.ru/get/city";
	if (filter_var($ipAddress["ip"], FILTER_VALIDATE_IP)) {			
		$ch = curl_init($url);
		curl_setopt_array($ch, [
														CURLOPT_POST => true,
														CURLOPT_POSTFIELDS => $json,
														CURLOPT_HTTPHEADER => array('Content-Type: application/json')
														]);
		$response = curl_exec($ch);
		curl_close($ch);
		echo $response;
	} else {
		echo "Invalid IP";
	}

?>