<?php

use Illuminate\Support\Facades\Route;

Route::redirect('/', '/login')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'Dashboard')->name('dashboard');
    Route::inertia('statistics', 'Statistics')->name('statistics');
    Route::inertia('users', 'Users')->name('users.index');
    Route::inertia('reports', 'Reports')->name('reports.index');
});

require __DIR__.'/settings.php';
