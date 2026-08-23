"""Static FX table for the catalogue pipeline.

Course fees are stored in the currency the source page printed them in;
conversion happens only (a) here, for USD-equivalent plausibility checks,
and (b) in the site UI, for the optional SAR display (assets/js/data.js
carries the same table — keep the two in sync when updating rates).

SAR is pegged to the US dollar at 3.75. The floating rates below are
deliberately coarse snapshot values for sanity checks and display, not for
billing; AS_OF records when they were taken.
"""

AS_OF = "2026-01"
SAR_PER_USD = 3.75

# One unit of currency -> USD.
USD_PER = {
    "USD": 1.0,
    "CHF": 1.25,
    "EUR": 1.17,
    "GBP": 1.34,
    "CAD": 0.72,
    "AUD": 0.66,
    "DKK": 0.157,
    "SGD": 0.78,
    "INR": 0.0112,
    "SAR": 1 / SAR_PER_USD,
}


def to_usd(amount, currency):
    """USD equivalent of an amount, or None for an unknown currency."""
    rate = USD_PER.get((currency or "").upper())
    return None if rate is None else amount * rate
