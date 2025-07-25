<?php

namespace App\Providers;

use Carbon\Carbon;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Vite;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Model::preventLazyLoading();
        Paginator::useBootstrapFive();
        Carbon::setLocale(app()->getLocale());
        // Vite::prefetch(concurrency: 3);
        Inertia::share([
            'auth' => fn() => [
                'user' => Auth::user(),
            ],
        ]);
    }
}
