package com.allssu.todolist.service

import com.allssu.todolist.repository.Todo
import com.allssu.todolist.repository.TodoRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service // TodoRepository를 사용하는 서비스이므로 @Service를 붙인다.
class TodoService (
    private var todoRepository: TodoRepository
    ){
    // todolist에서 todoService가 할 기능들을 구현.

    fun getTodos() = todoRepository.findAll()

    fun insertTodo(todoName: String): Todo = todoRepository.save(Todo(todoName = todoName))

    fun updateTodo(todoId: Long): Todo {
        val todo = todoRepository.findByIdOrNull(todoId) ?: throw Exception()
        todo.completed = !todo.completed
        return todoRepository.save(todo)
    }

    fun deleteTodo(todoId: Long) = todoRepository.deleteById(todoId)
}

// 서비스를 사용하는 컨트롤러를 통해 api를 만들어보자