<?php

  // write to log file, create new if doesnt exist
  function writeLog($file, $message) {
        $logpathname = "../log/";
        $logfilename = date("Y-m")."-log.txt";
        $logfile = $logpathname.$logfilename;
        $logdata = file_get_contents($logfile);
        $logdata .= date("Y-m-d H:i:s") . " ## " . $file . " ## " . $message ."\r\n";
        file_put_contents($logfile, $logdata, FILE_APPEND | LOCK_EX);
  }
?>
