<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cache;

abstract class Controller
{
    protected array $toggleColumn = ["isDeleted", "isActive"];
    protected int $cacheTtl = 0; // 120; // Cache time-to-live in seconds (e.g., 1 minute)
    protected $cachePrefix = '';


    protected function clearCache($cachePrefix, $id){
//        Cache::forget($cachePrefix . 'index:*');
//        Cache::forget($cachePrefix . 'show:' . $id);
    }

}
