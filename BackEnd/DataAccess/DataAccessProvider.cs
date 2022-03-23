using riffmachine.Models;
using System.Collections.Generic;
using System.Linq;

namespace riffmachine.DataAccess
{
    public class DataAccessProvider : IDataAccessProvider
    {
        private readonly PostgreSqlContext _context;

        public DataAccessProvider(PostgreSqlContext context)
        {
            _context = context;
        }

        public long AddTodoItem(TodoItem todoitem)
        {
            _context.todoitems.Add(todoitem);
            _context.SaveChanges();
            long id = todoitem.id;
            return id;
        }

        public void UpdateTodoItem(long id, TodoItem todoitem)
        {
            var item = _context.todoitems.FirstOrDefault(t => t.id == id);
            if (item == null) return;
            if (todoitem.name != null) item.name = todoitem.name;
            if (todoitem.iscomplete != null) item.iscomplete = todoitem.iscomplete;
            _context.SaveChanges();
        }

        public void DeleteTodoItem(long id)
        {
            var entity = _context.todoitems.FirstOrDefault(t => t.id == id);
            _context.todoitems.Remove(entity);
            _context.SaveChanges();
        }

        public TodoItem GetSingleTodoItem(long id)
        {
            return _context.todoitems.FirstOrDefault(t => t.id == id);
        }

        public List<TodoItem> GetAllTodoItems()
        {
            return _context.todoitems.ToList();
        }
     }

}
