<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Interfaces\Client\ProductClientInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function __construct(
        private ProductClientInterface $client
    ) {
    }

    public function getProducts(Request $request): JsonResponse
    {
        return $this->client->getProducts($request->query->all());
    }

    public function searchProducts(Request $request): JsonResponse
    {
        return $this->client->searchProducts($request->query->all());
    }
}
