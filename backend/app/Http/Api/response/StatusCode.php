<?php


namespace App\Http\Api\response;


class StatusCode
{
    const NOT_FOUND = 404;
    const CONFLICT = 409;
    const INTERNAL_SERVER_ERROR = 500;
    const BAD_REQUEST = 400;
    const UNAUTHORIZED_ACCESS = 401;
}
