using System.Collections.Generic;
using System.Threading.Tasks;
using riffmachine.Models;


namespace riffmachine.DataAccess
{
    public interface ICosmosDBService
    {
        Task<IEnumerable<Riff>> GetItemsAsync(string query);
        Task<Riff> GetItemAsync(string id);
        Task AddItemAsync(Riff riff);
        Task UpdateItemAsync(string id, Riff riff);
        Task DeleteItemAsync(string id);
    }
}
