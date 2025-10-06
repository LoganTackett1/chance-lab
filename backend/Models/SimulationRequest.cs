namespace backend.Models
{
    public class SimulationRequest
    {
        public string GameType { get; set; } = "slot";
        public int Rounds { get; set; } = 100;
        public double BetSize { get; set; } = 1.0;
    }

    public class SimulationResult
    {
        public double TotalWagered { get; set; }
        public double TotalReturned { get; set; }
        public double RTP { get; set; }
        public double Variance { get; set; }
        public List<double> Outcomes { get; set; } = new();
    }
}
