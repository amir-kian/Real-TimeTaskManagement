using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace Real_TimeTaskManagement.Controllers.APIs
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet(Name = "GetTasks")]
        public async Task<ActionResult<IEnumerable<Models.Task>>> GetTasks()
        {
            var tasks = await _taskService.GetAllTasksAsync();
            return Ok(tasks);
        }

        [HttpGet("{id}",Name = "GetTask")]
        public async Task<ActionResult<Models.Task>> GetTask(int id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpPost(Name = "CreateTask")]
        public async Task<ActionResult<Models.Task>> CreateTask(Models.Task task)
        {
            await _taskService.CreateTaskAsync(task);
            return Ok(task);
        }

        [HttpPut("{id}",Name = "UpdateTask")]
        public async Task<IActionResult> UpdateTask(int id, Models.Task task)
        {
            if (id != task.Id)
            {
                return BadRequest();
            }

            await _taskService.UpdateTaskAsync(task);
            return NoContent();
        }

        [HttpDelete("{id}",Name = "DeleteTask")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            await _taskService.DeleteTaskAsync(task);
            return NoContent();
        }
    }
}
