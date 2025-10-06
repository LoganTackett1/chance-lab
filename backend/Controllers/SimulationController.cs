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

        public SimulationController()
        {
            _simulationService = new SimulationService();
        }

        [HttpPost]
        public IActionResult Simulate([FromBody] SimulationRequest request)
        {
            var result = _simulationService.RunSimulation(request);
            return Ok(result);
        }
    }
}
