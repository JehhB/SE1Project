<?php

namespace Model\Entity;

/**
 * @property string $userId ID corresponding to the user
 * @property string $name name for the user
 * @property string $email email of the user
 * @property string $passwordHash password hash of the user
 */
class User {
    public string $userId;
    public string $name;
    public string $email;
    public string $passwordHash;

    /**
     * @param string $userId ID corresponding to the user
     * @param string $name name for the user
     * @param string $email email of the user
     * @param string $passwordHash password hash of the user
     */
    public function __construct(string $userId, string $name, string $email, string $passwordHash) {
        $this->userId = $userId;
        $this->name = $name;
        $this->email = $email;
        $this->passwordHash = $passwordHash;
    }

    /**
     * Function to send a json representation of user as response
     * error code is 404 if $event is null, otherwise 200
     * passwordHash is ommitted
     * 
     * @param ?User 
     */
    public static function respond(?User $user): void {
        // TODO: Pagawa
    }
}