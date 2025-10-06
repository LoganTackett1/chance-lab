namespace backend.Models
{
    public class SimulationRequest
    {
        public string GameType { get; set; } = "slot";
        public int Rounds { get; set; } = 100;
        public double BetSize { get; set; } = 1.0;

        // Slot-specific parameters
        public double SmallWinChance { get; set; } = 0.15;
        public double BigWinChance { get; set; } = 0.05;
        public double SmallWinMultiplier { get; set; } = 2.0;
        public double BigWinMultiplier { get; set; } = 10.0;

        // Sports-specific parameters
        public double WinChance { get; set; } = 0.48;
        public double PushChance { get; set; } = 0.02;
        public double PayoutMultiplier { get; set; } = 1.9;

        public string OddsType { get; set; } = "decimal"; // "decimal" or "american"
        public double OddsValue { get; set; } = 1.9; // or +150 / -120 etc.
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