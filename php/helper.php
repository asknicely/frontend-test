<?php

use Symfony\Component\HttpFoundation\Request;

function endsWith($haystack, $needle)
{
    $length = strlen($needle);
    if ($length == 0) {
        return true;
    }

    return (substr($haystack, -$length) === $needle);
}

function isJsonRequest(String $method, Request $request) {
    $header = ($method == 'GET')
        ? $request->headers->get('Accept')
        : $request->headers->get('Content-Type');

    return (strpos($header, 'application/json') === false)
        ? false
        : true;
}

?>