<?php
	$ip = $_SERVER['REMOTE_ADDR'];
	$code="0";
	if(is_file('/tmp/zjhn/userstatus')){
		$userstatus = file('/tmp/zjhn/userstatus');
		foreach($userstatus as $line => $content)
		{
			$user = explode(' ', $content);
			if($user[0]==$ip)
			{
				//echo '文件存在，并且是本地ip';
				$code=rtrim($user[1]);
			}
		}
		if($code=="0"){
			if(is_file('/tmp/zjhn/3gstatus')){
				$g3status = file('/tmp/zjhn/3gstatus');
				//echo 'userstatus 获取 code=0';
				foreach($g3status as $line => $content)
				{
					$code=rtrim($content);
				}
			}			
		}	
	}else{
		if(is_file('/tmp/zjhn/3gstatus')){
			$g3status = file('/tmp/zjhn/3gstatus');
			//echo 'userstatus文件不存在';
			foreach($g3status as $line => $content)
			{					
				$code=rtrim($content);
			}
		}		
	}
    echo json_encode(array( 'code' =>$code));
	exit();
?>