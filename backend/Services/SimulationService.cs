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
                    "sports" => RunSportsRound(
                        request.BetSize,
                        request.WinChance,
                        request.PushChance,
                        request.OddsType,
                        request.OddsValue
                    ),
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

        private double ConvertOddsToMultiplier(string oddsType, double oddsValue)
        {
            if (oddsType.ToLower() == "american")
            {
                if (oddsValue > 0)
                    return (oddsValue / 100.0) + 1.0; // e.g. +150 to 2.5x
                else
                    return (100.0 / Math.Abs(oddsValue)) + 1.0; // e.g. -120 to 1.833x
            }
            else
            {
                // Decimal odds (already multiplier form)
                return oddsValue;
            }
        }

        private double RunSlotRound(
            double bet,
            double smallWinChance = 0.15,
            double bigWinChance = 0.05,
            double smallMult = 2.0,
            double bigMult = 10.0)
        {
            double roll = _random.NextDouble();
            if (roll < 1 - (smallWinChance + bigWinChance)) return 0;      // lose
            if (roll < 1 - bigWinChance) return bet * smallMult;           // small win
            return bet * bigMult;                                          // big win
        }

        private double RunSportsRound(
            double bet,
            double winChance,
            double pushChance,
            string oddsType,
            double oddsValue)
        {
            double payoutMultiplier = ConvertOddsToMultiplier(oddsType, oddsValue);
            double roll = _random.NextDouble();

            if (roll < winChance)
                return bet * payoutMultiplier; // win
            else if (roll < winChance + pushChance)
                return bet; // push (refund)
            else
                return 0; // loss
        }

        private double CalculateVariance(List<double> outcomes, double meanBet)
        {
            double mean = outcomes.Average();
            double variance = outcomes.Select(x => Math.Pow(x - mean, 2)).Average();
            return variance / (meanBet * meanBet);
        }
    }
}
