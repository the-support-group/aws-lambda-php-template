<?php
    $body = '';

    while (FALSE !== ($line = fgets(STDIN))) {
		$body .= $line;
    }

    $event = json_decode($body, true);
    print_r($event);