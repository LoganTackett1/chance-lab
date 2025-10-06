using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SimulationController : ControllerBase
    {
        [HttpPost]
        public IActionResult Simulate()
        {
            return Ok(new { message = "Simulation endpoint reached!" });
        }
    }
}
