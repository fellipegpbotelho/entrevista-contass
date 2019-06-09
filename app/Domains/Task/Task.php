<?php

namespace App\Domains\Task;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'description',
        'date',
        'user',
    ];
}
