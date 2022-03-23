import { TodoItem } from "./types";

const url = 'https://localhost:7290/api'

export async function getTodos() : Promise<TodoItem[]> {
   return fetch( url + '/TodoItem').then(result => result.json());
}

export async function postTodo(data : TodoItem){
    fetch(url + '/TodoItem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Allow': "GET, POST",
        },
        body: JSON.stringify(data)

    })
}

export async function deleteTodo(id : string){
    fetch(url + '/TodoItem/' + id, {
        method: 'DELETE',
    })
}