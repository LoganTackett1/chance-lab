using backend.Models;
using MongoDB.Driver;

namespace backend.Services
{
    public class MongoService
    {
        private readonly IMongoCollection<SimulationRecord> _collection;

        public MongoService(IConfiguration config)
        {
            var connection = Environment.GetEnvironmentVariable("MONGO_CONNECTION_STRING")
                ?? config["Mongo:ConnectionString"];
            var client = new MongoClient(connection);
            var database = client.GetDatabase(config["Mongo:DatabaseName"]);
            _collection = database.GetCollection<SimulationRecord>("simulations");
        }

        public async Task SaveRecordAsync(SimulationRecord record)
        {
            await _collection.InsertOneAsync(record);
        }

        public async Task<List<SimulationRecord>> GetRecentRecordsAsync(int limit = 10)
        {
            return await _collection
                .Find(_ => true)
                .SortByDescending(r => r.CreatedAt)
                .Limit(limit)
                .ToListAsync();
        }
    }
}
