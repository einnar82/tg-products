<?php

namespace App\Providers;

use App\Client\ProductClient;
use App\Interfaces\Client\ProductClientInterface;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(ProductClientInterface::class, function (Application $application) {
            $request = Http::baseUrl(config('services.third_party.products_api.base_url'));
            return new ProductClient(
                request: $request,
                logger: $application->get('log')
            );
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
