<?php // HTTP Headers for ZIP File Downloads

 include 'writelog.php';


 $filename = "../public_download/MarkerTriggery.zip";

 if (file_exists($filename)) {

   // write viewcount entry, create new if doesnt exist
   $countfile = "../analytics/downloadcount.txt";
   $current = file_get_contents($countfile);
   $new = (int)$current + 1;

  // send mail on multiple of 10 downloads
  if($new % 10 == 0) {
     $recipient = "simonheimbuchner@gmail.com";
     // Set the email subject.
     $subject = "MarkerTriggery Download Count: $new";
     // Build the email content.
     $email_content = "";

     // Send the email
     $sendmail = mail($recipient, $subject, $email_content);
     if(!$sendmail){
       writeLog(basename(__FILE__, ''), error_get_last()['message']);
     }
   }

   file_put_contents($countfile, $new);



   // get the file mime type using the file extension
   	switch(strtolower(substr(strrchr($filename, '.'), 1))) {
   		case 'pdf': $mime = 'application/pdf'; break;
   		case 'zip': $mime = 'application/zip'; break;
   		case 'jpeg':
   		case 'jpg': $mime = 'image/jpg'; break;
   		default: $mime = 'application/force-download';
   	}
   	header('Pragma: public'); 	// required
   	header('Expires: 0');		// no cache
   	header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
   	header('Last-Modified: '.gmdate ('D, d M Y H:i:s', filemtime ($filename)).' GMT');
   	header('Cache-Control: private',false);
   	header('Content-Type: '.$mime);
   	header('Content-Disposition: attachment; filename="'.basename($filename).'"');
   	header('Content-Transfer-Encoding: binary');
   	header('Content-Length: '.filesize($filename));	// provide file size
   	header('Connection: close');
   	readfile($filename);		// push it out
   	exit();

    exit;
} else {
    writeLog(basename(__FILE__, ''), 'File "'.$filename.'" does not exist.');
}

?>
