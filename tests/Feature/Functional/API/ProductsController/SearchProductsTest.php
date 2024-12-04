<?php

namespace Tests\Feature\Functional\API\ProductsController;

class SearchProductsTest extends AbstractProductTestCase
{
    public static function provideSearchData(): iterable
    {
        yield 'valid search parameter' => [[
            'q' => 'phone',
        ]];

        yield 'invalid search parameter' => [[
            'q' => 'noSearchValue',
        ]];
    }

    /**
     * @dataProvider provideSearchData
     */
    public function testSearchProductsSucceeds(?array $params = null): void
    {
        $response = $this->testEndpoint('/api/products/search?', $params);

        $this->assertCount(
            \count($response->json('products')),
            $response->json('products')
        );
    }
}
