<?php

namespace Model\Entity {
    function http_response_code(int $code = 0) : int|bool {
        static $currentCode = 200;
        $temp = $currentCode;

        if ($code !== 0) $currentCode = $code;
        return $temp;
    }

}