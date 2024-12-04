<?php

namespace Tests\Feature\Functional\API\ProductsController;

class GetProductsTest extends AbstractProductTestCase
{
    public static function provideQueryParameters(): iterable
    {
        yield 'limit and skip queries' => [[
            'limit' => 10,
            'skip' => 10,
        ]];

        yield 'sort products' => [[
            'sortBy' => 'title',
            'order' => 'asc',
            'limit' => 10,
            'skip' => 10,
        ]];

        yield 'invalid query' => [[
            'someQuery' => 'someValue'
        ]];
    }

    /**
     * @dataProvider provideQueryParameters
     */
    public function testGetProductsSucceeds(array $params): void
    {
        $response = $this->testEndpoint('/api/products?', $params);

        if (isset($params['limit']) === true) {
            $response->assertJsonCount($params['limit'], 'products');
        }
    }
}
