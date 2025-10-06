using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class SimulationRecord
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string GameType { get; set; } = "";
        public int Rounds { get; set; }
        public double BetSize { get; set; }
        public double RTP { get; set; }
        public double Variance { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
