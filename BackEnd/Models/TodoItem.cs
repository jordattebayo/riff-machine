namespace riffmachine.Models
{
    public class TodoItem
    {
        public long id { get; set; }
        public string? name {  get; set; }

        public DateTime date_created { get; set; }
        public string? iscomplete { get; set; }

    }
}
