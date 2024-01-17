<?php

namespace Util;

class Auth {
    private JWTManager $jwtManager;

    public function __construct(JWTManager $jwtManager) {
        $this->jwtManager = $jwtManager;
    }

    /**
     * Get authentication payload, null if not authenticated
     * 
     * @return mixed authentication payload
     */
    public function getAuthPayload() : mixed {
        if (!isset($_SERVER['HTTP_AUTHORIZATION'])) return null;

        $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
        if (strpos($authHeader, 'Bearer ') != 0) return null;

        $token = substr($authHeader, 7);
        if (!$this->jwtManager->validateToken($token)) return null;

        return $this->jwtManager->decodeToken($token);
    }

    /**
     * Get authentication 
     * 
     * @return string|false userId of authenticated user
     */
    public function getAuth() : string|false {
        $payload = $this->getAuthPayload();
        if ($payload === null) return false;
        if (!isset($payload['userId'])) return false;
        return $payload['userId'];
    }

    /**
     * Get sessionId of authentiated used
     * 
     * @return string|false sessionId of authenticated user
     */
    public function getSession() : string|false {
        $payload = $this->getAuthPayload();
        if ($payload === null) return false;
        return $payload['sessId'];
    }

    public function createSession() {
        $auth = $this->getAuth();
        $this->sendSession(uniqid("", true));
    }

    public function sendSession($sessionId) { 
        $payload = array(
            'sessId' => $sessionId,
        );
        $token = $this->jwtManager->createToken($payload);

        header('Content-Type: application/json');
        echo json_encode(array('token' => $token, 'logout' => true));
    }

    /**
     * Authenticate userId
     */
    public function authUser(string $userId) {
        $payload = $this->getAuthPayload();

        $sessid = uniqid("", true);
        if ($payload !== null) $sessid = $payload['sessId'];

        $payload = array(
            'userId' => $userId,
            'sessId' => $sessid,
        );
        $token = $this->jwtManager->createToken($payload);

        header('Content-Type: application/json');
        echo json_encode(array('token' => $token));
    }
}