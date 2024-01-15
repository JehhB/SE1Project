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
        $query = "SELECT * FROM users WHERE id = :id";
        $statement = $this->db->prepare($query);
        $statement->bindParam(':id', $userId);
        $statement->execute();

        $result = $statement->fetch(PDO::FETCH_ASSOC);

        if (!$result) {
            return null; // User not found
        }

        // Assuming you have a constructor in the User class that sets properties
        return new User($result['id'], $result['name'], $result['email'], $result['password_hash']);
    }

    /** 
     * add new user, and return userId
     * 
     * @param User $user to be inserted
     * @return string id of newly inserted user
    */
    public function addUser(User $user): string
    {
        $query = "INSERT INTO users (name, email, password_hash) VALUES (:name, :email, :password_hash)";
        $statement = $this->db->prepare($query);
        $statement->bindParam(':name', $user->name);
        $statement->bindParam(':email', $user->email);
        $statement->bindParam(':password_hash', $user->passwordHash);
        $statement->execute();

        // Return the last inserted ID
        return $this->db->lastInsertId();
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
        $query = "SELECT id, password_hash FROM users WHERE email = :email";
        $statement = $this->db->prepare($query);
        $statement->bindParam(':email', $email);
        $statement->execute();

        $result = $statement->fetch(PDO::FETCH_ASSOC);

        if (!$result || !password_verify($password, $result['password_hash'])) {
            return false; // Authentication failed
        }

        return $result['id']; // Return the user ID on successful authentication
    }
}
