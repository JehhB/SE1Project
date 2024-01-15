<?php

namespace Model\Entity;

class User {
    public string $userId;
    public string $name;
    public string $email;
    public string $passwordHash;

    public function __construct(string $userId, string $name, string $email, string $passwordHash) {
        $this->userId = $userId;
        $this->name = $name;
        $this->email = $email;
        $this->passwordHash = $passwordHash;
    }

    public static function respond(?User $user): void {
        if ($user === null) {
            http_response_code(404);
            echo json_encode(['error' => 'User not found']);
        } else {
            http_response_code(200);
            // Omitting the passwordHash property from the response
            echo json_encode([
                'userId' => $user->userId,
                'name' => $user->name,
                'email' => $user->email,
            ]);
        }
    }
}
