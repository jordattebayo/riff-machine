namespace riffmachine.Models
{
    using Newtonsoft.Json;

    public class Riff
    {
        public Guid id { get; set; }
        public string riff { get; set; }
        public DateTime dateCreated { get; set; }
        public string? author { get; set; }
        public string? documentType {  get; set; }

    }
}
