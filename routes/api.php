<?php

Route::get('/tasks', 'TaskController@index');
Route::post('/tasks', 'TaskController@store');
Route::get('/tasks/{taskId}', 'TaskController@show');
Route::put('/tasks/{taskId}', 'TaskController@update');
Route::delete('/tasks/{taskId}', 'TaskController@destroy');
