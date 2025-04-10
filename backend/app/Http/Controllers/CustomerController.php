<?php

namespace App\Http\Controllers;

use App\Http\Api\query\models\CustomerQuery;
use App\Http\Api\response\ApiResponse;
use App\Http\Requests\common\PrepareRequestPayload;
use App\Http\Requests\customer\CustomerRequest;
use App\Http\Resources\customer\CustomerResource;
use App\Http\Resources\customer\CustomerResourceCollection;
use App\Models\Customer;
use App\Utils\Globals;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class CustomerController extends Controller
{
    protected $cachePrefix = "customer_";

    public function index(Request $request)
    {
        $filter = new CustomerQuery();
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
            return new CustomerResourceCollection(Customer::where($queryItems)->paginate($perPage));
        });
    }


    public function store(CustomerRequest $request)
    {
        $payload = PrepareRequestPayload::prepare($request);
        $customer = Customer::create($payload);

        // Clear relevant cache on create
        $this->clearCache($this->cachePrefix, $customer->id);
        return new CustomerResource($customer);
    }


    public function show(Customer $customer)
    {
        $cacheKey = $this->cachePrefix . 'show:' . $customer->id;
        return Cache::rememberForever($cacheKey, function () use ($customer) {
            return new CustomerResource($customer);
        });
    }


    public function update(CustomerRequest $request, $id)
    {
        $customer = Customer::findOrFail($id);
        $payload = PrepareRequestPayload::prepare($request);
        $customer->update($payload);

        // Clear relevant cache on update
        $this->clearCache($this->cachePrefix, $id);
        return new CustomerResource($customer);
    }


    public function destroy(Customer $customer, Request $request)
    {
        $shouldDeletePermantely = $request->query("delete");

        if($shouldDeletePermantely){
            $customer->delete();
        }
        else{
            $customer->isDeleted = true;
            $customer->save();
        }

        // Clear relevant cache on delete
        $this->clearCache($this->cachePrefix, $customer->id);
        return new CustomerResource($customer);
    }


    public function handleToggleAction($column, $id)
    {
        $customer = Customer::findOrFail($id);

        if (!in_array($column, $this->toggleColumn)) {
            return ApiResponse::badRequest("The column, '$column', is not allowed for toggling.");
        }

        $customer->{$column} = !$customer->{$column};
        $customer->save();

        // Clear relevant cache on toggle
        $this->clearCache($this->cachePrefix, $id);
        return new CustomerResource($customer);
    }
}
