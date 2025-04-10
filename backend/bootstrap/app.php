<?php

use App\Http\Api\response\ApiResponse;
use App\Http\Api\response\StatusCode;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;


return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
    web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {

        $exceptions->render(function (Exception $e, Request $request) {

            // exception to only the api routes
            if ($request->is('api/*')) {

                // handle all exceptions
                if ($e instanceof HttpException) {
                    return ApiResponse::general(
                        $e->getMessage(),
                        $e->getStatusCode()
                    );
                }

                // handles all validation exceptions
                if ($e instanceof ValidationException) {
                   return ApiResponse::badRequest($e->getMessage());
                }

                // handle other unknown exceptions
                return ApiResponse::general(
                    $e->getMessage(),
                    StatusCode::INTERNAL_SERVER_ERROR
                );
            }
        });


    })->create();
