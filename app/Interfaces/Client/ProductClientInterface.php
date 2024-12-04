<?php

namespace App\Interfaces\Client;

use Illuminate\Http\JsonResponse;

interface ProductClientInterface
{
    public function getProducts(?array $params = null): JsonResponse;

    public function searchProducts(?array $params = null): JsonResponse;
}
