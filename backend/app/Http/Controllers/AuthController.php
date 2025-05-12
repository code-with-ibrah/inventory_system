<?php

namespace App\Http\Controllers;

use App\Http\Api\response\StatusCode;
use App\Http\Resources\auth\AuthResource;
use App\Models\User;
use App\Utils\Globals;
use App\Models\Company;
use App\Mail\YelloMailer;
use Illuminate\Http\Request;
use App\Models\PasswordReset;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Http\Api\response\ApiResponse;
use App\Http\Requests\user\LoginRequest;
use App\Http\Requests\user\UserRequest;
use App\Http\Resources\user\UserResource;
use App\Http\Requests\common\PrepareRequestPayload;


class AuthController extends Controller
{
    const TOKEN_KEY = "secret-token-key";

    public function register(UserRequest $request)
    {
        $payload = PrepareRequestPayload::prepare($request);
        $payload["password"] = Hash::make(env("DEFAULT_USER_PASSWORD"));
//        $user = User::create($payload);
//        $token = $user->createToken(self::TOKEN_KEY)->plainTextToken;
        $company =  Company::findOrFail($payload["companyId"]);

        $user = User::findOrFail(1);
        $user->name = $payload["name"];
        $user->email = $payload["email"];

        $response = [
            "user" => new UserResource($user),
            "token" => $token ?? "token22"
        ];
        $user->companyName = $company->name;

        // send mail to notify user

        $mailer = new YelloMailer("Your New Account Has Been Created", $user, "create-account");
        Mail::to($request->email)->send($mailer);

        return response()->json($response);
    }



    public function login(LoginRequest $request)
    {

        if (Auth::attempt($request->all())) {
            $user = Auth::user();
            $user->lastTimeLogin = Globals::getCurrentDateTime();
            $token = $user->createToken(self::TOKEN_KEY)->plainTextToken;

            if(!$user->isActive){
                return ApiResponse::general(
                    "Invalid email or password",
                    StatusCode::UNAUTHORIZED_ACCESS
                );
            }
            $response = [
                "user" => new UserResource($user),
                "token" => $token
            ];
            $user->update();
            return new AuthResource($response);
        }

        return ApiResponse::general(
            "Invalid email or password",
            StatusCode::UNAUTHORIZED_ACCESS
        );
    }





    public function changePassword(Request $request)
    {
        $request->validate([
            'userId' => ['nullable'],
            'email' => ['nullable', 'exists:users,email'],
            'password' => ['required', 'min:6'],
        ]);

        $user = User::where('id', $request->userId)
            ->orWhere('email', $request->email)
            ->first();

        if ($user) {
            $user->password = Hash::make($request->password);
            $user->passwordChanged = true;
            $user->save();
            $token = $user->createToken(self::TOKEN_KEY)->plainTextToken;
            $response = [
                "user" => new UserResource($user),
                "token" => $token
            ];
            return $response;
        }
        return ApiResponse::notFound("user not found");
    }


    public function requestPasswordReset(Request $request, $email)
    {
        $user = User::where("email", $email)->first();

        if ($user) {
            $passwordRequest = PasswordReset::where("email", $email)->first();

            if ($passwordRequest == null) {
                $passwordRequest = new PasswordReset();
            }

            $resetToken = Globals::generateToken(4);
            $expirationTimeStamp = Globals::generateExpirationTimestamp();
            $passwordRequest->userId = $user->id;
            $passwordRequest->email = $user->email;
            $passwordRequest->token = $resetToken;
            $passwordRequest->expirationTimestamp = $expirationTimeStamp;
            $passwordRequest->save();
            $passwordRequest->name = $user->name;

            // send mail to notify user
            $mailer = new YelloMailer("Reset Your Password", $passwordRequest, "reset-password");
            Mail::to($email)->send($mailer);
        }

        return response()->json(["data" => ["email" => $user->email]]);
    }



    public function verifyPasswordReset(Request $request)
    {
        $userId = $request->query("link");
        $timeStamp = $request->query("expires");
        $token = $request->query("token");
        $passwordReset = PasswordReset::where("userId", $userId)
            ->where("token", $token)
            ->where("expirationTimestamp", $timeStamp)
            ->first();

        if ($passwordReset) {
            $requestIsExpired = !Globals::timeStampNotExpired((int) $timeStamp);
            $data = ["data" => $passwordReset];

            $passwordReset->forceDelete();
            if ($requestIsExpired == false) {
                return response()->json($data);
            }
        }
        return ApiResponse::general("Request not valid, retry", 400);
    }



    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
    }
}
