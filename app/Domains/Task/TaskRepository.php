<?php

namespace App\Domains\Task;

use Prettus\Repository\Eloquent\BaseRepository;

class TaskRepository extends BaseRepository
{
    public function model()
    {
        return Task::class;
    }
}
