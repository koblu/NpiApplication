<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NpiAccessController;
use App\Http\Middleware\Cors;

Route::get('/', function () {
    return view('welcome');
})->name("home");

Route::post('/api/search', [NpiAccessController::class, 'grabResults']);

Route::get('/api/details/{id}', [NpiAccessController::class, 'grabDetails']);

Route::get('/token', function () {
    return csrf_token(); 
});