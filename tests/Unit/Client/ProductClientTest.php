<?php

namespace Tests\Unit\Client;

use App\Client\ProductClient;
use Exception;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\Response as HttpResponse;
use Illuminate\Http\JsonResponse;
use Mockery;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;
use Throwable;

class ProductClientTest extends TestCase
{
    private $mockRequest;
    private $mockLogger;
    private $productClient;

    protected function setUp(): void
    {
        parent::setUp();

        $this->mockRequest = Mockery::mock(PendingRequest::class);
        $this->mockLogger = Mockery::mock(LoggerInterface::class);

        $this->productClient = new ProductClient(
            $this->mockRequest,
            $this->mockLogger
        );
    }

    public function testGetProductsSuccess(): void
    {
        $responseData = ['data' => ['product1', 'product2']];
        $mockHttpResponse = Mockery::mock(HttpResponse::class);
        $mockHttpResponse->shouldReceive('json')->andReturn($responseData);

        $this->mockRequest
            ->shouldReceive('get')
            ->with('products', null)
            ->andReturn($mockHttpResponse);

        $response = $this->productClient->getProducts();

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals($responseData, $response->getData(true));
        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
    }

    public function testGetProductsException(): void
    {
        $this->mockRequest
            ->shouldReceive('get')
            ->with('products', null)
            ->andThrow(new Exception('API Error'));

        $this->mockLogger
            ->shouldReceive('error')
            ->once()
            ->with('Product API Error: Something went wrong!', Mockery::type('array'));

        $response = $this->productClient->getProducts();

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(
            ['message' => 'Something went wrong!'],
            $response->getData(true)
        );
        $this->assertEquals(Response::HTTP_BAD_REQUEST, $response->getStatusCode());
    }

    public function testSearchProductsSuccess(): void
    {
        $responseData = ['data' => ['searchResult1', 'searchResult2']];
        $mockHttpResponse = Mockery::mock(HttpResponse::class);
        $mockHttpResponse->shouldReceive('json')->andReturn($responseData);

        $this->mockRequest
            ->shouldReceive('get')
            ->with('products/search', null)
            ->andReturn($mockHttpResponse);

        $response = $this->productClient->searchProducts();

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals($responseData, $response->getData(true));
        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
    }

    public function testSearchProductsException(): void
    {
        $this->mockRequest
            ->shouldReceive('get')
            ->with('products/search', null)
            ->andThrow(new Exception('Search Error'));

        $this->mockLogger
            ->shouldReceive('error')
            ->once()
            ->with('Product API Error: Something went wrong!', Mockery::type('array'));

        $response = $this->productClient->searchProducts();

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(
            ['message' => 'Something went wrong!'],
            $response->getData(true)
        );
        $this->assertEquals(Response::HTTP_BAD_REQUEST, $response->getStatusCode());
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
