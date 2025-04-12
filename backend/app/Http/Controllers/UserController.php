<?php

namespace App\Http\Controllers;

use App\Http\Resources\user\UserResourceCollection;
use App\Http\Resources\user\UserResource;
use App\Http\Api\query\models\UserQuery;
use App\Http\Requests\user\UserRequest;
use App\Http\Api\response\ApiResponse;
use App\Http\Api\response\StatusCode;
use Illuminate\Support\Facades\Cache;
use App\Models\User;
use Illuminate\Http\Request;
use App\Utils\Globals;
use App\Http\Requests\common\PrepareRequestPayload;


class UserController extends Controller
{
    protected $cachePrefix = "user_";

    public function index(Request $request)
    {
        $filter = new UserQuery();
        $queryItems = $filter->transform($request);
        $take = $request->query("take");
        $takeIsDefinedInUrl = ($take && intval($take) && $take > 0);
        $perPage = ($takeIsDefinedInUrl ? $take : Globals::getDefaultPaginationNumber());

        $cacheKey = $this->cachePrefix . 'index:' . md5(serialize([
                $queryItems,
                $perPage,
                $request->query('page', 1),
            ]));

        return Cache::remember($cacheKey, $this->cacheTtl, function () use ($queryItems, $perPage) {
            return new UserResourceCollection(
                User::where($queryItems)
                    ->with('company')
                    ->paginate($perPage)
            );
        });
    }


    public function show(User $user)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $user->id;
        return Cache::rememberForever($cacheKey, function () use ($user) {
            return new UserResource($user);
        });
    }


    public function update(UserRequest $request, $id)
    {
        $user = User::findOrFail($id);
        $payload = PrepareRequestPayload::prepare($request);
        $user->update($payload);
        // Clear relevant cache on update
        $this->clearCache($this->cachePrefix, $id);
        return new UserResource($user);
    }

    public function store(Request $request)
    {
        return ApiResponse::general("Not Allowed", StatusCode::UNAUTHORIZED_ACCESS);
    }


    public function destroy(User $user, Request $request)
    {
        $shouldDeletePermantely = $request->query("delete");
        if($shouldDeletePermantely){
            $user->delete();
        }
        else{
            $user->isDeleted = true;
            $user->save();
        }
        // Clear relevant cache on delete
        $this->clearCache($this->cachePrefix, $user->id);
        return new UserResource($user);
    }


    public function handleToggleAction($column, $id)
    {
        $user = User::findOrFail($id);
        if (!in_array($column, $this->toggleColumn)) {
            return ApiResponse::badRequest("The column, '$column', is not allowed for toggling.");
        }
        $user->{$column} = !$user->{$column};
        $user->save();
        // Clear relevant cache on toggle
        $this->clearCache($this->cachePrefix, $id);
        return new UserResource($user);
    }
}
