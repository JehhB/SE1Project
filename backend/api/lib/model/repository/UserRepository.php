<?php

namespace Model\Repository;

use Model\Entity\User;

interface UserRepository {
    /**
     * get user associated with $userId
     * 
     * @param string $userId id of the user to retrieve
     * @return ?User null if no user corresponding evendId, otherwise return specified user
     */
    public function getUser(string $userId) : ?User;

    /** 
     * add new user, and return userId
     * 
     * @param User $user to be inserted
     * @return string id of newly inserted user
    */
    public function addUser(User $user): string;

    /** 
     * Find user that matches email and password
     * 
     * @param string $email email of user to authenticate
     * @param string $password raw password of user
     * @return string|false id of authenticated user, or false if no match
    */
    public function authenticateUser(string $email, string $password) : string|false;

}
