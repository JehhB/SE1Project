<?php

use PHPUnit\Framework\TestCase;
use Model\Entity\Event;
use Model\Entity\User;

final class UserTest extends TestCase {

    public function test_When_RespondingAndEventIsNotNull_Expect_OutputJson() : void {
        $user = new User("userId", "name", "email", "password");

        User::respond($user);
        $output = json_decode($this->getActualOutputForAssertion());
        $this->assertSame($user->userId, $output->userId);
        $this->assertSame($user->name, $output->name);
        $this->assertSame($user->email, $output->email);
    }

    public function test_When_RespondingAndEventIsNotNull_Expect_PasswordHashToBeOmmited() : void {
        $user = new User("userId", "name", "email", "password");

        User::respond($user);
        $output = json_decode($this->getActualOutputForAssertion());
        $this->assertObjectNotHasProperty("passwordHash", $output);
    }


    public function test_When_RespondingAndEventIsNull_Expect_ResponseCodeToBe404() : void { 
        Event::respond(null);
        $this->assertSame(404, Model\Entity\http_response_code());
    }
}