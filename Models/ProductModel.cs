namespace Backend.Models
{
    public class ProductModel
    {
        public int Id { get; set; }
        public required string Description { get; set; }
        public required string Name { get; set; }
        public required string ImageName { get; set; }
        public required string Category { get; set; }
        public decimal Price { get; set; }
        public float Discount { get; set; }
    }
}
