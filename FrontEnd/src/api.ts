import { TodoItem, Riff } from "./types";

const url = 'https://localhost:7290/api'

//#region Todo Api


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

//#endregion 

//#region Riff API

export async function getRiffs() : Promise<Riff[]> {
    return fetch( url + '/Riff').then(result => result.json());
 }
 
 export async function postRiff(data : Riff){
     fetch(url + '/Riff', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
             'Allow': "GET, POST",
         },
         body: JSON.stringify(data)
 
     })
 }
 
 export async function deleteRiff(id : string){
     fetch(url + '/Riff/' + id, {
         method: 'DELETE',
     })
 }

 //#endregion 
