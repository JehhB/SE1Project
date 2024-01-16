<?php

namespace Model\Repository;

use Model\Entity\User;
use PDO;

class UserRepositoryImpl implements UserRepository
{
    private PDO $db;

    public function __construct(PDO $db = null)
    {
        $this->db = $db;
    }

    /**
     * get user associated with $userId
     * 
     * @param string $userId id of the user to retrieve
     * @return ?User null if no user corresponding evendId, otherwise return specified user
     */
    public function getUser(string $userId): ?User
    {
        $query = "SELECT * FROM Users WHERE userId = :userId";
        $statement = $this->db->prepare($query);
        $statement->bindParam(':userId', $userId);
        $statement->execute();

        $result = $statement->fetch(PDO::FETCH_ASSOC);

        if (!$result) {
            return null; // User not found
        }

        // Assuming you have a constructor in the User class that sets properties
        return new User($result['userId'], $result['userName'], $result['email'], $result['passwordhash']);
    }

    /** 
     * add new user, and return userId
     * 
     * @param User $user to be inserted
     * @return string id of newly inserted user
    */
    public function addUser(User $user): string
    {
        $query = "INSERT INTO Users (userName, email, passwordhash,userId) VALUES (:userName, :email, :passwordhash,:userId)";
        $id = uniqid();
        $statement = $this->db->prepare($query);
        $statement->bindParam(':userId', $id); // Assuming your Event class has getId() method
        $statement->bindParam(':userName', $user->name);
        $statement->bindParam(':email', $user->email);
        $statement->bindParam(':passwordhash', $user->passwordHash);
        $statement->execute();

        // Return the last inserted ID
        return $id;
    }

    /** 
     * Find user that matches email and password
     * 
     * @param string $email email of user to authenticate
     * @param string $password raw password of user
     * @return string|false id of authenticated user, or false if no match
    */
    public function authenticateUser(string $email, string $password): string|false
    {
        $query = "SELECT userId, passwordhash FROM Users WHERE email = :email";
        $statement = $this->db->prepare($query);
        $statement->bindParam(':email', $email);
        $statement->execute();

        $result = $statement->fetch(PDO::FETCH_ASSOC);

        if (!$result || !password_verify($password, $result['passwordhash'])) {
            return false; // Authentication failed
        }

        return $result['userId']; // Return the user ID on successful authentication
    }
}
