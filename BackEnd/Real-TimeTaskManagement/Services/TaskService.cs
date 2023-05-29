using Repositories.Interfaces;
using Services.Interfaces;

namespace Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _repository;

        public TaskService(ITaskRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Models.Task>> GetAllTasksAsync()
        {
            return await _repository.GetAllTasksAsync();
        }

        public async Task<Models.Task> GetTaskByIdAsync(int id)
        {
            return await _repository.GetTaskByIdAsync(id);
        }

        public async Task CreateTaskAsync(Models.Task task)
        {
            await _repository.AddTaskAsync(task);
        }

        public async Task UpdateTaskAsync(Models.Task task)
        {
            await _repository.UpdateTaskAsync(task);
        }

        public async Task DeleteTaskAsync(Models.Task task)
        {
            await _repository.DeleteTaskAsync(task);
        }
    }
}