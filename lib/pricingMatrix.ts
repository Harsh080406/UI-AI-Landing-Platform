export const PRICING_MATRIX = {
  tiers: {
    starter: {
      baseMonthlyUSD: 29,
      label: "Starter",
      features: ["5 workflows", "10k tasks/mo", "Email support"],
    },
    pro: {
      baseMonthlyUSD: 79,
      label: "Pro",
      features: [
        "Unlimited workflows",
        "500k tasks/mo",
        "Priority support",
        "API access",
      ],
    },
    scale: {
      baseMonthlyUSD: 199,
      label: "Scale",
      features: [
        "Everything in Pro",
        "5M tasks/mo",
        "Dedicated SLA",
        "Custom integrations",
      ],
    },
  },
  billing: {
    monthly: { multiplier: 1, label: "Monthly" },
    annual: { multiplier: 0.8, label: "Annual", badge: "Save 20%" },
  },
  currencies: {
    USD: { symbol: "$", tariff: 1, decimals: 2 },
    INR: { symbol: "₹", tariff: 83.5, decimals: 0 },
    EUR: { symbol: "€", tariff: 0.92, decimals: 2 },
  },
} as const;

export function computePrice(
  tierKey: keyof typeof PRICING_MATRIX.tiers,
  billingKey: keyof typeof PRICING_MATRIX.billing,
  currencyKey: keyof typeof PRICING_MATRIX.currencies
): string {
  const { baseMonthlyUSD } = PRICING_MATRIX.tiers[tierKey];
  const { multiplier } = PRICING_MATRIX.billing[billingKey];
  const { symbol, tariff, decimals } = PRICING_MATRIX.currencies[currencyKey];
  const raw = baseMonthlyUSD * multiplier * tariff;
  return `${symbol}${raw.toFixed(decimals)}`;
}
