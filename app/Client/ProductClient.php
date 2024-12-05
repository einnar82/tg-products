<?php

namespace App\Client;

use App\Interfaces\Client\ProductClientInterface;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\JsonResponse;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class ProductClient implements ProductClientInterface
{
    public function __construct(
        private PendingRequest $request,
        private LoggerInterface $logger
    ) {
    }

    public function getProducts(?array $params = null): JsonResponse
    {
        try {
            $response = $this->request->get('products', $params);

            return \response()->json($response->json());
        } catch (Throwable $exception) {
            $this->logger->error('Product API Error: Something went wrong!', $exception->getTrace());

            return \response()->json(['message' => 'Something went wrong!'], Response::HTTP_BAD_REQUEST);
        }
    }

    public function getProduct(int $id, ?array $params = null): JsonResponse
    {
        try {
            $response = $this->request->get(\sprintf('products/%s', $id), $params);

            return \response()->json($response->json());
        } catch (Throwable $exception) {
            $this->logger->error('Product API Error: Something went wrong!', $exception->getTrace());

            return \response()->json(['message' => 'Something went wrong!'], Response::HTTP_BAD_REQUEST);
        }
    }

    public function searchProducts(?array $params = null): JsonResponse
    {
        try {
            $response = $this->request->get('products/search', $params);

            return \response()->json($response->json());
        } catch (Throwable $exception) {
            $this->logger->error('Product API Error: Something went wrong!', $exception->getTrace());

            return \response()->json(['message' => 'Something went wrong!'], Response::HTTP_BAD_REQUEST);
        }
    }
}
