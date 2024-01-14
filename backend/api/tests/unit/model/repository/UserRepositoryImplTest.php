<?php

use PHPUnit\Framework\TestCase;
use Model\Entity\User;
use Model\Repository\UserRepositoryImpl;
use Model\Source\DatabaseMock;

class UserRepositoryImplTest extends TestCase {
    public ?DatabaseMock $database = null;

    public function test_When_AccessingNotExistingUser_Expect_ReturnNull() {
        $repository = new UserRepositoryImpl($this->database->db);
        $user =  $repository->getUser("non existing id");

        $this->assertNull($user);
    }

    public function test_When_AddingNewUser_Expect_ReturnNewUserId() {
        $repository = new UserRepositoryImpl($this->database->db);
        $user = new User("temp id", "name", "email", "passwordHash");

        $userId = $repository->addUser($user);

        $this->assertNotSame($user->userId, $userId);
    }

    public function test_When_AddingNewUser_Expect_AddedUserToHaveSameValues() {
        $repository = new UserRepositoryImpl($this->database->db);
        $user = new User("temp id", "name", "email", "passwordHash");

        $userId = $repository->addUser($user);
        $addedUser = $repository->getUser($userId);

        $this->assertSame($userId, $addedUser->userId);
        $this->assertSame($user->name, $addedUser->name);
        $this->assertSame($user->email, $addedUser->email);
        $this->assertSame($user->passwordHash, $addedUser->passwordHash);
    }

    public function test_When_AuthenticatingUser_Expect_ReturnUserIdCorrespondingToCredentials() {
        $repository = new UserRepositoryImpl($this->database->db);
        $password = "password123";
        $user = new User("temp id", "name", "a@email.com", password_hash($password, PASSWORD_DEFAULT));

        $userId = $repository->addUser($user);
        $authUserId = $repository->authenticateUser($user->email, $password);

        $this->assertSame($userId, $authUserId);
    }

    public function test_When_AuthenticatingUserWithWrongPassword_Expect_ReturnFalse() {
        $repository = new UserRepositoryImpl($this->database->db);
        $password = "password123";
        $user = new User("temp id", "name", "a@email.com", password_hash($password, PASSWORD_DEFAULT));

        $userId = $repository->addUser($user);
        $authUserId = $repository->authenticateUser($user->email, "incorrect password");

        $this->assertSame(false, $authUserId);
    }


    protected function setUp(): void {
        $this->database = new DatabaseMock();
    }

    protected function tearDown(): void {
        $this->database = null;
    }
}