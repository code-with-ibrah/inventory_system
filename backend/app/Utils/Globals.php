<?php


namespace App\Utils;


use Carbon\Carbon;

class Globals
{
    public static function getDefaultPaginationNumber(){
        return 10;
    }

    public static function getCurrentDateTime()
    {
        return Carbon::now();
    }

}
