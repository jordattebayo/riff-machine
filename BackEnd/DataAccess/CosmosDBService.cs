using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using riffmachine.Models;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Fluent;
using Microsoft.Extensions.Configuration;

namespace riffmachine.DataAccess
{
    public class CosmosDbService : ICosmosDBService
    {
        private Container _container;

        public CosmosDbService(
            CosmosClient dbClient,
            string databaseName,
            string containerName)
        {
            this._container = dbClient.GetContainer(databaseName, containerName);
        }

        public async Task AddItemAsync(Riff riff)
        {
            await this._container.CreateItemAsync<Riff>(riff, new PartitionKey(riff.id.ToString()));
        }

        public async Task DeleteItemAsync(string id)
        {
            await this._container.DeleteItemAsync<Riff>(id, new PartitionKey(id));
        }

        public async Task<Riff> GetItemAsync(string id)
        {
            try
            {
                ItemResponse<Riff> response = await this._container.ReadItemAsync<Riff>(id, new PartitionKey(id));
                return response.Resource;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return null;
            }

        }

        public async Task<IEnumerable<Riff>> GetItemsAsync(string queryString)
        {
            var query = this._container.GetItemQueryIterator<Riff>(new QueryDefinition(queryString));
            List<Riff> results = new List<Riff>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();

                results.AddRange(response.ToList());
            }

            return results;
        }

        public async Task UpdateItemAsync(string id, Riff riff)
        {
            await this._container.UpsertItemAsync<Riff>(riff, new PartitionKey(id));
        }
    }
}

