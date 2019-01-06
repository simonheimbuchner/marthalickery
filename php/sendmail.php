<?php

    include 'writelog.php';
    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

          // RECAPTCHA
          // Build POST request:
          $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
          $recaptcha_secret = '6Le8QoMUAAAAAPEkHyZVo35ezyUwQ1Rz52BaSR7L';
          $recaptcha_response = $_POST['recaptcha_response'];

          // Make and decode POST request:
          $recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
          $recaptcha = json_decode($recaptcha);

          // Take action based on the score returned:
          if ($recaptcha->score >= 0.5) {
                    // Get the form fields and remove whitespace.
                    $name = strip_tags(trim($_POST["name"]));
            				$name = str_replace(array("\r","\n"),array(" "," "),$name);
                    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
                    $message = trim($_POST["message"]);

                    // Check that data was sent to the mailer.
                    if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                        // Set a 400 (bad request) response code and exit.
                        http_response_code(400);
                        echo "There was a problem with your submission. Please complete the form and try again.";
                        exit;
                    }

                    // Set the recipient email address.

                    $recipient = "simonheimbuchner@gmail.com";

                    // Set the email subject.
                    $subject = "MarkerTriggery submisson from $name";

                    // Build the email content.
                    $email_content = $message;

                    // Build the email headers.
                    $email_headers = "From: $name <$email>";

                    // Send the email.
                    if (mail($recipient, $subject, $email_content, $email_headers)) {
                        // Set a 200 (okay) response code.
                        http_response_code(200);
                        echo "Thank You! Your message has been sent.";
                    } else {
                        // Set a 500 (internal server error) response code.
                        http_response_code(500);
                        echo "Oops! Something went wrong and we couldn't send your message.";
                        writeLog(basename(__FILE__, ''), error_get_last()['message']);
                    }
          } else {
              // Not verified - show form error
              echo "Google reCaptcha flagged you as a bot. Please try again later.";
              // TODO testen
              writeLog(basename(__FILE__, ''), "Flagged as bot by Google reCaptcha: ".$recaptcha);
          }
    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        writeLog(basename(__FILE__, ''), "Exprected POST request");
        echo "There was a problem with your submission, please try again.";
    }


?>
