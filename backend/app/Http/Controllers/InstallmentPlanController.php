<?php

namespace App\Http\Controllers;

use App\Http\Api\query\models\InstallmentPlanQuery;
use App\Http\Api\response\ApiResponse;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Requests\installment_plan\InstallmentPlanRequest;
use App\Http\Resources\installment_plan\InstallmentPlanResource;
use App\Http\Resources\installment_plan\InstallmentPlanResourceCollection;
use App\Models\InstallmentPlan;
use App\Utils\Globals;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class InstallmentPlanController extends Controller
{
    protected $cachePrefix = "installmentPlan_";

    public function index(Request $request)
    {
        $filter = new InstallmentPlanQuery();
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
            return new InstallmentPlanResourceCollection(InstallmentPlan::where($queryItems)->paginate($perPage));
        });
    }


    public function store(InstallmentPlanRequest $request)
    {
        $payload = PrepareRequestPayload::prepare($request);
        $installmentPlan = InstallmentPlan::create($payload);

        // Clear relevant cache on create
        $this->clearCache($this->cachePrefix, $installmentPlan->id);
        return new InstallmentPlanResource($installmentPlan);
    }


    public function show(InstallmentPlan $installmentPlan)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $installmentPlan->id;
        return Cache::rememberForever($cacheKey, function () use ($installmentPlan) {
            return new InstallmentPlanResource($installmentPlan);
        });
    }


    public function update(InstallmentPlanRequest $request, $id)
    {
        $installmentPlan = InstallmentPlan::findOrFail($id);
        $payload = PrepareRequestPayload::prepare($request);
        $installmentPlan->update($payload);

        // Clear relevant cache on update
        $this->clearCache($this->cachePrefix, $id);
        return new InstallmentPlanResource($installmentPlan);
    }


    public function destroy(InstallmentPlan $installmentPlan, Request $request)
    {
        $shouldDeletePermantely = $request->query("delete");

        if($shouldDeletePermantely){
            $installmentPlan->delete();
        }
        else{
            $installmentPlan->isDeleted = true;
            $installmentPlan->save();
        }

        // Clear relevant cache on delete
        $this->clearCache($this->cachePrefix, $installmentPlan->id);
        return new InstallmentPlanResource($installmentPlan);
    }


    public function handleToggleAction($column, $id)
    {
        $installmentPlan = InstallmentPlan::findOrFail($id);

        if (!in_array($column, $this->toggleColumn)) {
            return ApiResponse::badRequest("The column, '$column', is not allowed for toggling.");
        }

        $installmentPlan->{$column} = !$installmentPlan->{$column};
        $installmentPlan->save();

        // Clear relevant cache on toggle
        $this->clearCache($this->cachePrefix, $id);
        return new InstallmentPlanResource($installmentPlan);
    }
}
