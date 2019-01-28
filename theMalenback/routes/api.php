<?php

Route::group([

    'middleware' => 'api'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('get-user', 'AuthController@getUser');

    // Events routes
    Route::post('create-event', 'EventController@create');
    Route::get('count-date-events/{date}', 'EventController@countDateEvents');
    Route::get('get-date-events/{date}', 'EventController@getDateEvents');
    Route::get('event/{id}', 'EventController@getEvent');
    Route::put('event/{id}', 'EventController@updateEvent');
    Route::delete('event/{id}', 'EventController@deleteEvent');

});
