<?php

namespace App\Http\Controllers;

use App\Http\Resources\role\RoleResourceCollection;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Resources\role\RoleResource;
use App\Http\Api\query\models\RoleQuery;
use App\Http\Requests\role\RoleRequest;
use App\Http\Api\response\ApiResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;
use App\Utils\Globals;
use App\Models\Role;


class RoleController extends Controller
{
    protected $cachePrefix = "role_";

    public function index(Request $request)
    {
        $filter = new RoleQuery();
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
            return new RoleResourceCollection(
                Role::where($queryItems)
                    ->paginate($perPage)
            );
        });
    }


    public function store(RoleRequest $request)
    {
        $payload = PrepareRequestPayload::prepare($request);
        $role = Role::create($payload);

        // Clear relevant cache on create
        $this->clearCache($this->cachePrefix, $role->id);
        return new RoleResource($role);
    }


    public function show(Role $role)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $role->id;
        return Cache::rememberForever($cacheKey, function () use ($role) {
            return new RoleResource($role);
        });
    }


    public function update(RoleRequest $request, $id)
    {
        $role = Role::findOrFail($id);
        $payload = PrepareRequestPayload::prepare($request);
        $role->update($payload);
        // Clear relevant cache on update
        $this->clearCache($this->cachePrefix, $id);
        return new RoleResource($role);
    }


    public function destroy(Role $role, Request $request)
    {
        $shouldDeletePermantely = $request->query("delete");
        if($shouldDeletePermantely){
             $role->delete();
        }
        else{
            $role->isDeleted = true;
            $role->save();
        }
        // Clear relevant cache on delete
        $this->clearCache($this->cachePrefix, $role->id);
        return new RoleResource($role);
    }


    public function handleToggleAction($column, $id)
    {
        $role= Role::findOrFail($id);

        if (!in_array($column, $this->toggleColumn)) {
            return ApiResponse::badRequest("The column, '$column', is not allowed for toggling.");
        }
        $role->{$column} = !$role->{$column};
        $role->save();
        // Clear relevant cache on toggle
        $this->clearCache($this->cachePrefix, $id);

        return new RoleResource($role);
    }
}
