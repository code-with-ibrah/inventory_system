<?php


namespace App\Http\Api\query\common;


use Illuminate\Http\Request;

interface IBaseDBQuery
{
    function transform(Request $request);
}
