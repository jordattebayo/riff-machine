using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
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
        public RiffController(IConfiguration configuration, ILogger<Riff> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        [HttpGet(Name = "GetAllRiffs")]
        public ActionResult<Riff> GetAllRiffs()
        {
            string EndpointUrl = _configuration["CosmosDb:Uri"].ToString();
            var CosmosDatabase = _configuration["FHIRConfig:DBName"].ToString();
            string PrimaryKey = _configuration["CosmosDb:PrimaryKey"].ToString();
            try
            {
                using (CosmosClient _client = new CosmosClient(EndpointUrl))
                {
                    Database database = _client.GetDatabase(CosmosDatabase);
                    Container container = database.GetContainer("RiffList");
                    container.GetItemLinqQueryable<Riff>(true)
                        .Where(doc => doc.documentType == "riff").ToList();
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return BadRequest();
            }
        }

        //[HttpGet("{id}")]
        //public ActionResult<Riff> GetTodoItem(long id)
        //{
        //    var todoItem = _dataAccessProvider.GetSingleTodoItem(id);
        //    if (todoItem == null)
        //    {
        //        return NotFound();
        //    }

        //    return todoItem;
        //}

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
