using backend.Models;

namespace backend.Services
{
    public class SimulationService
    {
        private readonly Random _random = new();

        public SimulationResult RunSimulation(SimulationRequest request)
        {
            var outcomes = new List<double>();

            double totalWagered = request.Rounds * request.BetSize;
            double totalReturned = 0.0;

            // Base logic: simulate payouts
            for (int i = 0; i < request.Rounds; i++)
            {
                double payout = request.GameType.ToLower() switch
                {
                    "slot" => RunSlotRound(request.BetSize),
                    "sports" => RunSportsRound(request.BetSize),
                    _ => 0.0
                };

                outcomes.Add(payout);
                totalReturned += payout;
            }

            double rtp = totalReturned / totalWagered;
            double variance = CalculateVariance(outcomes, request.BetSize);

            return new SimulationResult
            {
                TotalWagered = totalWagered,
                TotalReturned = totalReturned,
                RTP = Math.Round(rtp, 3),
                Variance = Math.Round(variance, 4),
                Outcomes = outcomes
            };
        }

        private double RunSlotRound(double bet)
        {
            // 80% of spins lose, 15% small win, 5% big win
            double roll = _random.NextDouble();
            if (roll < 0.8) return 0;
            if (roll < 0.95) return bet * 2;
            return bet * 10;
        }

        private double RunSportsRound(double bet)
        {
            // 50% win (2x), 45% lose, 5% jackpot
            double roll = _random.NextDouble();
            if (roll < 0.45) return 0;
            if (roll < 0.95) return bet * 2;
            return bet * 5;
        }

        private double CalculateVariance(List<double> outcomes, double meanBet)
        {
            double mean = outcomes.Average();
            double variance = outcomes.Select(x => Math.Pow(x - mean, 2)).Average();
            return variance / (meanBet * meanBet);
        }
    }
}
