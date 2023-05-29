using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Interfaces
{
    public interface ITaskRepository
    {
        Task<IEnumerable<Models.Task>> GetAllTasksAsync();
        Task<Models.Task> GetTaskByIdAsync(int id);
        Task AddTaskAsync(Models.Task task);
        Task UpdateTaskAsync(Models.Task task);
        Task DeleteTaskAsync(Models.Task task);
    }
}
