using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface ITaskService
    {
        Task<IEnumerable<Models.Task>> GetAllTasksAsync();
        Task<Models.Task> GetTaskByIdAsync(int id);
        Task CreateTaskAsync(Models.Task task);
        Task UpdateTaskAsync(Models.Task task);
        Task DeleteTaskAsync(Models.Task task);
    }
}
