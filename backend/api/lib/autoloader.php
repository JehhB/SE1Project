<?php

spl_autoload_register(function ($class) {
    static $classes = null;
    if ($classes === null) {
        $classes = array(
            'model\\entity\\attendance' => '/model/entity/Attendance.php',
            'model\\entity\\event' => '/model/entity/Event.php',
            'model\\entity\\registeredevent' => '/model/entity/RegisteredEvent.php',
            'model\\entity\\rollcall' => '/model/entity/Rollcall.php',
            'model\\entity\\user' => '/model/entity/User.php',
            'model\\repository\\Attendancerepository' => '/model/repository/AttendanceRepository.php',
            'model\\repository\\Attendancerepositoryimpl' => '/model/repository/AttendanceRepositoryImpl.php',
            'model\\repository\\eventrepository' => '/model/repository/EventRepository.php',
            'model\\repository\\eventrepositoryimpl' => '/model/repository/EventRepositoryImpl.php',
            'model\\repository\\registeredeventrepository' => '/model/repository/RegisteredEventRepository.php',
            'model\\repository\\registeredeventrepositoryimpl' => '/model/repository/RegisteredEventRepositoryImpl.php',
            'model\\repository\\rollcallrepository' => '/model/repository/RollcallRepository.php',
            'model\\repository\\rollcallrepositoryimpl' => '/model/repository/RollcallRepositoryImpl.php',
            'model\\repository\\userrepository' => '/model/repository/UserRepository.php',
            'model\\repository\\userrepositoryimpl' => '/model/repository//UserRepositoryImpl.php',
            'model\\source\\database' => '/model/source/Database.php',
            'util\\auth' => '/util/Auth.php',
            'util\\jwtmanager' => '/util/JWTManager.php',
        );
    }
    $cn = strtolower($class);
    if (isset($classes[$cn])) {
        require __DIR__ . $classes[$cn];
    }
});