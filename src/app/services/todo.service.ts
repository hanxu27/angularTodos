import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Todo } from '../models/Todo'

const httpOptions = {
  header: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }
  todosURL: string = 'https://jsonplaceholder.typicode.com/todos'
  todosLimit: string = '?_limit=5'

  //  Get todos
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosURL}${this.todosLimit}`)
  }

  //  Toggle Completed
  toggleCompleted(todo: Todo): Observable<any> {
    const url = `${this.todosURL}/${todo.id}`
    return this.http.put(url, todo, httpOptions)
  }

  // Delete Todo
  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosURL}/${todo.id}`
    return this.http.delete<Todo>(url, httpOptions)
  }

  // Add Todo
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosURL, todo, httpOptions)
  }
}
