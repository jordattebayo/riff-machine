using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using riffmachine.DataAccess;
using riffmachine.Models;

// To do: extract CosmosClient to be a singleton method, only establish one connection. 

namespace riffmachine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RiffController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger _logger;
        private readonly CosmosClient _cosmosClient;
        public RiffController(IConfiguration configuration, ILogger<Riff> logger, CosmosClient cosmosClient)
        {
            _configuration = configuration;
            _logger = logger;
            _cosmosClient = cosmosClient;
        }

        [HttpGet(Name = "GetAllRiffs")]
        public ActionResult<List<Riff>> GetAllRiffs()
        {
            string EndpointUrl = _configuration["CosmosDb:Uri"].ToString();
            var CosmosDatabase = _configuration["CosmosDb:DBName"].ToString();
            string PrimaryKey = _configuration["CosmosDb:PrimaryKey"].ToString();
            try
            {
                using (CosmosClient _client = new CosmosClient(EndpointUrl, PrimaryKey))    
                {
                    Database database = _client.GetDatabase(CosmosDatabase);
                    Container container = database.GetContainer("RiffList");
                    List<Riff> riffs = container.GetItemLinqQueryable<Riff>(true)
                        .Where(doc => doc.documentType == "riff").ToList();
                    return Ok(riffs);
                }

            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Riff>> GetRiffAsync(string id)
        {
            string EndpointUrl = _configuration["CosmosDb:Uri"].ToString();
            var CosmosDatabase = _configuration["CosmosDb:DBName"].ToString();
            string PrimaryKey = _configuration["CosmosDb:PrimaryKey"].ToString();
            try
            {
                using (CosmosClient _client = new CosmosClient(EndpointUrl, PrimaryKey))
                {
                    Database database = _client.GetDatabase(CosmosDatabase);
                    Container container = database.GetContainer("RiffList");
                    var response = await container.ReadItemAsync<Riff>(id, new PartitionKey(id));
                    return Ok(response.Resource);
                }

            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost(Name = "PostRiff")]
        public async Task<ActionResult> PostRiff([FromBody] Riff riff)
        {
            string EndpointUrl = _configuration["CosmosDb:Uri"].ToString();
            var CosmosDatabase = _configuration["CosmosDb:DBName"].ToString();
            string PrimaryKey = _configuration["CosmosDb:PrimaryKey"].ToString();

            try
            {
                using (CosmosClient _client = new CosmosClient(EndpointUrl, PrimaryKey))
                {
                    Database database = _client.GetDatabase(CosmosDatabase);
                    Container container = database.GetContainer("RiffList");
                    riff.dateCreated = DateTime.Now;
                    riff.documentType = "riff";
                    riff.id = Guid.NewGuid();
                    if (riff.author == null || riff.author == "")
                    {
                        riff.author = "anon";
                    }
                    ItemResponse<Riff> results = await container.CreateItemAsync(riff, new PartitionKey(riff.id.ToString()));
                    return Created(CosmosDatabase, results.Resource);
                }
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}
