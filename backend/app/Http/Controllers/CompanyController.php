<?php

namespace App\Http\Controllers;

use App\Http\Api\query\models\CompanyQuery;
use App\Http\Api\response\ApiResponse;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Requests\company\CompanyRequest;
use App\Http\Resources\company\CompanyResource;
use App\Http\Resources\company\CompanyResourceCollection;
use App\Models\Company;
use App\Utils\Globals;
use App\Utils\ImageUpload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;


class CompanyController extends Controller
{
    protected $cachePrefix = "company_";

    public function index(Request $request)
    {
        $filter = new CompanyQuery();
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
            return new CompanyResourceCollection(Company::where($queryItems)->paginate($perPage));
        });
    }


    public function store(CompanyRequest $request)
    {
        $payload = PrepareRequestPayload::prepare($request);
        if($request->hasFile("logo")){
            $imageUri = ImageUpload::init($request->file("logo"));
            $payload["logo"] = $imageUri;
        }
        $company = Company::create($payload);

        // Clear relevant cache on create
        $this->clearCache($this->cachePrefix, $company->id);

        return new CompanyResource($company);
    }


    public function show(Company $company)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $company->id;
        return Cache::rememberForever($cacheKey, function () use ($company) {
            return new CompanyResource($company);
        });
    }


    public function update(CompanyRequest $request, $id)
    {
        $company = Company::findOrFail($id);
        $oldImagePath = $company->logo;
        $payload = PrepareRequestPayload::prepare($request);

        if($request->hasFile("logo"))
        {
            $imageUri = ImageUpload::init($request->file("logo"));
            $payload["logo"] = $imageUri;
            // Delete old image if a new one is uploaded
            ImageUpload::removePreviousImage($oldImagePath);
        }

        $company->update($payload);

        // Clear relevant cache on update
        $this->clearCache($this->cachePrefix, $id);

        return new CompanyResource($company);
    }


    public function destroy(Company $company, Request $request)
    {
        $shouldDeletePermantely = $request->query("delete");

        if($shouldDeletePermantely){
            $company->delete();
        }
        else{
            $company->isDeleted = true;
            $company->save();
        }

        // Clear relevant cache on delete
        $this->clearCache($this->cachePrefix, $company->id);

        return new CompanyResource($company);
    }


    public function handleToggleAction($column, $id)
    {
        $company = Company::findOrFail($id);

        if (!in_array($column, $this->toggleColumn)) {
            return ApiResponse::badRequest("The column, '$column', is not allowed for toggling.");
        }

        $company->{$column} = !$company->{$column};
        $company->save();

        // Clear relevant cache on toggle
        $this->clearCache($this->cachePrefix, $id);

        return new CompanyResource($company);
    }
}
