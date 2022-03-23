using System.Collections.Generic;
using riffmachine.Models;

namespace riffmachine.DataAccess
{
    public interface IDataAccessProvider
    {
        long AddTodoItem(TodoItem todoitem);
        void UpdateTodoItem(long id, TodoItem todoitem);
        void DeleteTodoItem(long id);
        TodoItem GetSingleTodoItem(long id);
        List<TodoItem> GetAllTodoItems();
    }
}
