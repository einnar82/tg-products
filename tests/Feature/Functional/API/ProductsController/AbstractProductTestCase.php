<?php

namespace Tests\Feature\Functional\API\ProductsController;

use Illuminate\Testing\TestResponse;
use Tests\TestCase;

abstract class AbstractProductTestCase extends TestCase
{
    protected function testEndpoint(string $uri, ?array $params = null): TestResponse
    {
        $response = $this->getJson($uri. \http_build_query($params));

        $response
            ->assertJsonStructure([
                'products' => [
                    '*' => [
                        'id',
                        'title',
                        'description',
                        'category',
                        'price',
                        'discountPercentage',
                        'rating',
                        'stock',
                        'tags',
                        'sku',
                        'weight',
                        'dimensions',
                        'warrantyInformation',
                        'shippingInformation',
                        'availabilityStatus',
                        'reviews',
                        'returnPolicy',
                        'minimumOrderQuantity',
                        'meta',
                        'images',
                        'thumbnail'
                    ]
                ]
            ])
            ->isOk();

        return $response;
    }
}
