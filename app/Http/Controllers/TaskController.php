<?php

namespace App\Http\Controllers;

use App\Domains\Task\TaskFormRequest;
use App\Domains\Task\TaskRepository;

class TaskController extends Controller
{
    private $taskRepository;

    public function __construct(TaskRepository $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function index()
    {
        $tasks = $this->taskRepository->orderBy('created_at', 'desc')->get();

        return $tasks->toJson();
    }

    public function show($taskId)
    {
        $task = $this->taskRepository->find($taskId);

        return response()->json($task);
    }

    public function store(TaskFormRequest $request)
    {
        $data = $this->getDataFromRequest($request);

        $taskCreated = $this->taskRepository->create($data);

        return response()->json($taskCreated);
    }

    public function update(TaskFormRequest $request, $taskId)
    {
        $task = $this->taskRepository->find($taskId);

        if (!$task) {
            return response()->json(['error' => 'task not found']);
        }

        $data = $this->getDataFromRequest($request);

        $taskUpdated = $this->taskRepository->update($data, $taskId);

        return response()->json($taskUpdated);
    }

    public function destroy(TaskFormRequest $request, $taskId)
    {
        $task = $this->taskRepository->find($taskId);

        if (!$task) {
            return response()->json(['error' => 'task not found']);
        }

        $this->taskRepository->delete($taskId);

        return response()->json([]);
    }

    private function getDataFromRequest(TaskFormRequest $request)
    {
        return $request->only([
            'description',
            'date',
            'user',
        ]);
    }
}
