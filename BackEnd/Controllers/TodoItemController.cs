using Microsoft.AspNetCore.Mvc;
using riffmachine.DataAccess;
using riffmachine.Models;
using System;
using System.Collections.Generic;
using riffmachine.Utilities;

namespace riffmachine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemController : ControllerBase
    {
        private readonly IDataAccessProvider _dataAccessProvider;

        public TodoItemController(IDataAccessProvider dataAccessProvider)
        {
            _dataAccessProvider = dataAccessProvider;
        }

        [DevelopmentOnly]
        [HttpGet(Name = "GetAllTodoItems")]
        public IEnumerable<TodoItem> Get()
        {
            return _dataAccessProvider.GetAllTodoItems();
        }

        [DevelopmentOnly]
        [HttpGet("{id}")]
        public ActionResult<TodoItem> GetTodoItem(long id)
        {
            var todoItem = _dataAccessProvider.GetSingleTodoItem(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        [DevelopmentOnly]
        [HttpPost]
        public ActionResult<long> PostTodoItem(TodoItem todoitem)
        {
            if (ModelState.IsValid)
            {
                todoitem.date_created = DateTime.Now.ToUniversalTime();
                long id = _dataAccessProvider.AddTodoItem(todoitem);
                return Ok(id);
            }
            return BadRequest();
        }

        [DevelopmentOnly]
        [HttpPut("{id}")]
        public ActionResult<TodoItem> PutTodoItem(long id, TodoItem todoItem)
        {
            var item = _dataAccessProvider.GetSingleTodoItem(id);

            if (item == null)
            {
                return NotFound();
            }
            if (ModelState.IsValid)
            {
                _dataAccessProvider.UpdateTodoItem(id, todoItem);
                return Ok();
            }
            return BadRequest();
        }

        [DevelopmentOnly]
        [HttpDelete("{id}")]
        public ActionResult<TodoItem> DeleteTodoItem(long id)
        {
            var todoItem = _dataAccessProvider.GetSingleTodoItem(id);
            if (todoItem == null)
            {
                return NotFound();
            }
            _dataAccessProvider.DeleteTodoItem(id);
            return Ok();
        }
    }
}
