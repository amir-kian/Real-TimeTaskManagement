using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

public class TaskHub : Hub
{
    public async Task TaskDeleted(int taskId)
    {
        await Clients.All.SendAsync("TaskDeleted", taskId);
    }
}