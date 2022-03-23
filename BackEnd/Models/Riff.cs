namespace riffmachine.Models
{
    using Newtonsoft.Json;

    public class Riff
    {
        [JsonProperty(PropertyName = "id")]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string? Name { get; set; }

        [JsonProperty(PropertyName = "dateCreated")]
        public DateTime DateCreated { get; set; }

        [JsonProperty(PropertyName = "author")]
        public string? Author { get; set; }
    }
}
