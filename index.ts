// ─── Currencies ──────────────────────────────────────────────────────────────
// Exactly what AfriRates exposes in the Currency filter
export const CURRENCIES = ["USD", "GBP", "EUR"] as const;
export type Currency = (typeof CURRENCIES)[number];

// ─── Countries / destination currencies ──────────────────────────────────────
// Exactly what AfriRates exposes in the Country filter
export const COUNTRIES = [
  { name: "Nigeria", code: "NGN", flag: "🇳🇬" },
  { name: "Ghana",   code: "GHS", flag: "🇬🇭" },
  { name: "Kenya",   code: "KES", flag: "🇰🇪" },
] as const;

export type CountryCode = (typeof COUNTRIES)[number]["code"];
export type CurrencyCode = Currency | CountryCode;

// ─── Rate type ────────────────────────────────────────────────────────────────
// AfriRates distinguishes Buy vs Sell rates
export type RateType = "buy" | "sell";

// ─── Corridors ────────────────────────────────────────────────────────────────
// All combinations AfriRates supports: 3 currencies × 3 countries × 2 types
// = 18 possible combinations per scrape cycle
export const CORRIDORS = [
  { currency: "USD", country: "NGN", countryName: "Nigeria" },
  { currency: "USD", country: "GHS", countryName: "Ghana"   },
  { currency: "USD", country: "KES", countryName: "Kenya"   },
  { currency: "GBP", country: "NGN", countryName: "Nigeria" },
  { currency: "GBP", country: "GHS", countryName: "Ghana"   },
  { currency: "GBP", country: "KES", countryName: "Kenya"   },
  { currency: "EUR", country: "NGN", countryName: "Nigeria" },
  { currency: "EUR", country: "GHS", countryName: "Ghana"   },
  { currency: "EUR", country: "KES", countryName: "Kenya"   },
] as const satisfies ReadonlyArray<{
  currency: Currency;
  country: CountryCode;
  countryName: string;
}>;

export type Corridor = (typeof CORRIDORS)[number];

// ─── Rate entry ───────────────────────────────────────────────────────────────
// A single scraped rate — one row per currency/country/type/provider
export interface RateEntry {
  currency: Currency;       // e.g. "USD"
  country: CountryCode;     // e.g. "NGN"
  countryName: string;      // e.g. "Nigeria"
  type: RateType;           // "buy" | "sell"
  rate: number;             // e.g. 1610.50
  provider: string;         // remittance provider name from AfriRates
  fetchedAt: string;        // ISO 8601
}

// ─── Rate history ─────────────────────────────────────────────────────────────
export interface RateHistory {
  currency: Currency;
  country: CountryCode;
  type: RateType;
  history: Array<{
    rate: number;
    provider: string;
    fetchedAt: string;
  }>;
}

// ─── API response shapes ──────────────────────────────────────────────────────
export interface RatesResponse {
  currency: Currency;
  country: CountryCode;
  countryName: string;
  type: RateType;
  rates: Array<{
    provider: string;
    rate: number;
    fetchedAt: string;
  }>;
}

export interface CorridorsResponse {
  corridors: Array<{
    currency: Currency;
    country: CountryCode;
    countryName: string;
    label: string;
  }>;
}

// ─── Webhook ──────────────────────────────────────────────────────────────────
export interface WebhookSubscription {
  id: string;
  url: string;
  currency: Currency;
  country: CountryCode;
  type: RateType;
  threshold: number;   // percent change that triggers the webhook
  createdAt: string;
}

// ─── Errors ───────────────────────────────────────────────────────────────────
export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}
