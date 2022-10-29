package com.allssu.todolist.repository

import org.springframework.data.repository.CrudRepository

interface TodoRepository : CrudRepository<Todo, Long>
// 스프링이 데이터를 조작할 수 있게 도와주는 리파지토리 (spring이 가진 CRUD를 상속받을 것이다.)
// TodoRespository를 가지고 Todolist가 할 기능들을 서비스 레이어에서 구현해보자.
// CrudRepository<어떤 Entity를 사용할건지, key의 타입이 뭔지>
