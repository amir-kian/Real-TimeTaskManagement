using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

public class TaskHub : Hub
{
    public async Task TaskDeleted(int taskId)
    {
        await Clients.All.SendAsync("TaskDeleted", taskId);
    }
    public async Task TaskUpdated(int taskId)
    {
        await Clients.All.SendAsync("TaskUpdated", taskId);
    }

}