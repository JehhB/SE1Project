<?php

spl_autoload_register(function ($class) {
    static $classes = null;
    if ($classes === null) {
        $classes = array(
            'model\\entity\\event' => '/model/entity/Event.php',
            'model\\entity\\user' => '/model/entity/User.php',
            'model\\repository\\eventrepository' => '/model/repository/EventRepository.php',
            'model\\repository\\eventrepositoryimpl' => '/model/repository/EventRepositoryImpl.php',
            'model\\repository\\userrepository' => '/model/repository/UserRepository.php',
            'model\\repository\\userrepositoryimpl' => '/model/repository//UserRepositoryImpl.php',
            'model\\source\\database' => '/model/source/Database.php',
        );
    }
    $cn = strtolower($class);
    if (isset($classes[$cn])) {
        require __DIR__ . $classes[$cn];
    }
});