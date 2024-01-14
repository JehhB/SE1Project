<?php

require_once __DIR__ . '/../lib/autoloader.php';

spl_autoload_register(function ($class) {
    static $classes = null;
    if ($classes === null) {
        $classes = array(
            'model\\source\\databasemock' => '/model/source/DatabaseMock.php',
        );
    }
    $cn = strtolower($class);
    if (isset($classes[$cn])) {
        require __DIR__ . '/unit' . $classes[$cn];
    }
});