<?php

namespace App\Domains\Task;

use Illuminate\Foundation\Http\FormRequest;

class TaskFormRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'description' => 'required|max:255',
            'date' => 'required|date',
            'user' => 'required|max:255',
        ];
    }

    public function attributes()
    {
        return [
            'description' => 'descrição',
            'date' => 'data',
            'user' => 'usuário',
        ];
    }
}
