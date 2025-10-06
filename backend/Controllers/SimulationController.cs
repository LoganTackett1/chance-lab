using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SimulationController : ControllerBase
    {
        [HttpPost]
        public IActionResult Simulate([FromBody] SimulationRequest request)
        {
            // Temporary placeholder logic
            var result = new SimulationResult
            {
                TotalWagered = request.Rounds * request.BetSize,
                TotalReturned = request.Rounds * request.BetSize * 0.95, // temporary 95% RTP
                RTP = 0.95,
                Variance = 0.02,
                Outcomes = Enumerable.Repeat(request.BetSize * 0.95, request.Rounds).ToList()
            };

            return Ok(result);
        }
    }
}
