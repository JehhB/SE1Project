<?php
namespace PHPUnit\Framework;

abstract class TestCase {
    public function assertSame($a, $b) {}
    public function assertNotSame($a, $b) {}
    public function assertNull($a) {}
    public function assertNotNull($a) {}
    public function assertObjectHasProperty($a, $b) {}
    public function assertObjectNotHasProperty($a, $b) {}

    /** @return string */
    public function getActualOutputForAssertion() {}

}