<?php

namespace Util;

class Auth {
    private JWTManager $jwtManager;

    public function __construct(JWTManager $jwtManager) {
        $this->jwtManager = $jwtManager;
    }

    /**
     * Get authentication 
     * 
     * @return string|false userId of authenticated user
     */
    public function getAuth() : string|false {
        if (!isset($_SERVER['HTTP_AUTHORIZATION'])) return false;

        $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
        if (strpos($authHeader, 'Bearer ') != 0) return false;

        $token = substr($authHeader, 7);
        if (!$this->jwtManager->validateToken($token)) return false;

        return $this->jwtManager->decodeToken($token)['userId'];
    }

    public function authUser(string $userId) {
        $payload = array('userId' => $userId);
        $token = $this->jwtManager->createToken($payload);

        header('Content-Type: application/json');
        echo json_encode(array('token' => $token));
    }
}