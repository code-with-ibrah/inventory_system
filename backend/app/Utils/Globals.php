<?php


namespace App\Utils;


use Carbon\Carbon;

class Globals
{
    public static function getDefaultPaginationNumber(){
        return 10;
    }

    public static function getCurrentDateTime(){
        return Carbon::now();
    }

    public static function generateToken(int $length = 6): string{
        $characters = '0123456789';
        $token = '';
        $max = strlen($characters) - 1;
        for ($i = 0; $i < $length; $i++) {
            $token .= $characters[random_int(0, $max)];
        }
        return $token;
    }


    public static function generateExpirationTimestamp(): int{
        $now = self::getCurrentDateTime();
        $expirationTime = $now->addMinutes(5);
        return $expirationTime->timestamp;
    }


    public static function timeStampNotExpired(int $timestamp): bool{
        $now = self::getCurrentDateTime()->timestamp;
        return $timestamp > $now;
    }

}
