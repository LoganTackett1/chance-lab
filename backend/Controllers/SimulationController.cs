using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SimulationController : ControllerBase
    {
        private readonly SimulationService _simulationService;
        private readonly MongoService _mongo;


        public SimulationController(SimulationService simulationService, MongoService mongo)
        {
            _simulationService = simulationService;
            _mongo = mongo;
        }

        [HttpPost]
        public async Task<IActionResult> RunSimulation([FromBody] SimulationRequest request)
        {
            var result = _simulationService.RunSimulation(request);

            var record = new SimulationRecord
            {
                GameType = request.GameType,
                Rounds = request.Rounds,
                BetSize = request.BetSize,
                RTP = result.RTP,
                Variance = result.Variance
            };

            await _mongo.SaveRecordAsync(record);

            return Ok(result);
        }

        [HttpGet("defaults")]
        public IActionResult GetDefaults()
        {
            var defaults = new
            {
                slot = new
                {
                    rounds = 100,
                    betSize = 1.0,
                    smallWinChance = 0.15,
                    bigWinChance = 0.05,
                    smallWinMultiplier = 2.0,
                    bigWinMultiplier = 10.0
                },
                sports = new
                {
                    rounds = 100,
                    betSize = 10.0,
                    oddsType = "decimal",
                    oddsValue = 1.9,
                    winChance = 0.48,
                    pushChance = 0.02
                }
            };

            return Ok(defaults);
        }
    }
}