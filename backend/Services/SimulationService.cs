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
                    "slot" => RunSlotRound(
                        request.BetSize,
                        request.SmallWinChance,
                        request.BigWinChance,
                        request.SmallWinMultiplier,
                        request.BigWinMultiplier
                    ),
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

        private double RunSlotRound(double bet, double smallWinChance = 0.15, double bigWinChance = 0.05, double smallMult = 2.0, double bigMult = 10.0)
        {
            double roll = _random.NextDouble();
            if (roll < 1 - (smallWinChance + bigWinChance)) return 0;      // lose
            if (roll < 1 - bigWinChance) return bet * smallMult;           // small win
            return bet * bigMult;                                          // big win
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
