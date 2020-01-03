<?php
$EXPECTED_SIGNATURE = file_get_contents("https://composer.github.io/installer.sig");
copy('https://getcomposer.org/installer', 'composer-setup.php');
$ACTUAL_SIGNATURE = hash_file('sha384', 'composer-setup.php');


if ("$EXPECTED_SIGNATURE" != "$ACTUAL_SIGNATURE") {
    fwrite(STDERR, 'ERROR: Invalid installer signature');
    unlink('composer-setup.php');
    exit(1);
}
exec('php composer-setup.php --quiet --install-dir=/bin --filename=composer', $output, $RESULT);

unlink('composer-setup.php');
exit($RESULT);