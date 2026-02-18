import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { useContext } from "react";
import { PriceContext } from "../components/PriceProvider";

function Silver() {
  const [conversionMode, setConversionMode] = useState("rupees-to-grams");
  const [inputValue, setInputValue] = useState("");
  const [showBreakdown, setShowBreakdown] = useState(false);

  const { silverPrice, silverPercentage } = useContext(PriceContext);
  const navigate = useNavigate();

  const silverisProfit = Number(silverPercentage) > 0;
  const silverPricePerGram = Number(silverPrice) || 80; // fallback in case context gives undefined

  const calculateConversion = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value <= 0) return 0;

    if (conversionMode === "rupees-to-grams") {
      return (value / silverPricePerGram).toFixed(4);
    } else {
      return (value * silverPricePerGram).toFixed(2);
    }
  };

  const getFinalCalculation = () => {
    let grams, baseAmount;

    if (conversionMode === "rupees-to-grams") {
      grams = parseFloat(calculateConversion());
      baseAmount = Math.round(parseFloat(inputValue));
    } else {
      grams = parseFloat(inputValue);
      baseAmount = Math.round(parseFloat(calculateConversion()));
    }

    const gstRate = 0.03; // 3% GST
    const gstAmount = Math.round(baseAmount * gstRate);
    const totalWithGST = baseAmount + gstAmount;

    return {
      grams: grams.toFixed(4),
      baseAmount,
      gstAmount,
      totalWithGST,
      formattedBase: baseAmount.toLocaleString(),
      formattedGST: gstAmount.toLocaleString(),
      formattedTotal: totalWithGST.toLocaleString(),
    };
  };

  const handleBuyClick = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || val <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    setShowBreakdown(true);
  };

  const proceedToBuy = () => {
    const calc = getFinalCalculation();
    navigate("/buysilver", {
      state: {
        grams: calc.grams,
        baseAmount: calc.baseAmount,
        totalWithGST: calc.totalWithGST,
        silverPricePerGram,
      },
    });
  };

  const calc = getFinalCalculation();
  const hasInput = parseFloat(inputValue) > 0;

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link to="/">
          <button className="flex items-center gap-2 mb-6 hover:text-amber-600">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
        </Link>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-secondary mb-2">Buy Silver</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left - Market Insights */}
          <div className="space-y-6">
            <div className="bg-yellow-900/20 border border-secondary rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Market Insights</h2>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-slate-700">Today's Change</span>
                </div>
                <span className="font-bold text-green-600">
                  {silverPercentage && (
                    <p
                      className={`text-sm font-semibold mt-1 ${
                        silverisProfit ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {silverisProfit ? "▲" : "▼"}{" "}
                      {Math.abs(silverPercentage)}%
                    </p>
                  )}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary">Current Price</span>
                  <span className="font-semibold text-secondary">
                    ₹{silverPricePerGram.toLocaleString()}/gram
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-secondary">Week High</span>
                  <span className="font-semibold">₹105</span> {/* placeholder */}
                </div>

                <div className="flex justify-between">
                  <span className="text-secondary">Week Low</span>
                  <span className="font-semibold">₹92</span> {/* placeholder */}
                </div>
              </div>
            </div>
          </div>

          {/* Right - Converter + Buy */}
          <div className="bg-yellow-900/20 border border-secondary rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-secondary mb-2">Price Converter</h2>
            <p className="text-slate-600 mb-6">
              {conversionMode === "rupees-to-grams"
                ? "Convert Rupees to Grams"
                : "Convert Grams to Rupees"}
            </p>

            {/* Toggle Buttons */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => {
                  setConversionMode("rupees-to-grams");
                  setInputValue("");
                  setShowBreakdown(false);
                }}
                className={`flex-1 py-2 rounded-lg font-semibold ${
                  conversionMode === "rupees-to-grams"
                    ? "bg-secondary text-accent"
                    : "border"
                }`}
              >
                ₹ → Grams
              </button>

              <button
                onClick={() => {
                  setConversionMode("grams-to-rupees");
                  setInputValue("");
                  setShowBreakdown(false);
                }}
                className={`flex-1 py-2 rounded-lg font-semibold ${
                  conversionMode === "grams-to-rupees"
                    ? "bg-secondary text-accent"
                    : "border"
                }`}
              >
                Grams → ₹
              </button>
            </div>

            {/* Input */}
            <input
              type="number"
              placeholder={
                conversionMode === "rupees-to-grams" ? "10000" : "100"
              }
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setShowBreakdown(false);
              }}
              className="w-full h-12 px-4 border rounded-lg mb-6 text-lg"
            />

            {/* Result Preview */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-6 border-2 border-amber-200 text-center">
              <p className="text-sm text-slate-600 mb-2">
                {conversionMode === "rupees-to-grams"
                  ? "You will get (grams)"
                  : "You will pay (₹)"}
              </p>

              <div className="text-3xl font-bold text-accent">
                {hasInput ? (
                  conversionMode === "rupees-to-grams" ? (
                    `${calc.grams} g`
                  ) : (
                    `₹${calc.formattedBase}`
                  )
                ) : (
                  <span className="text-slate-300">0</span>
                )}
              </div>
            </div>

            {/* Buy Button */}
            <div className="mt-4 flex gap-3 mb-2">
              <button
                className={`flex-1 bg-secondary hover:bg-secondary/90 text-accent font-semibold py-3 px-5 rounded-xl transition ${
                  !hasInput ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleBuyClick}
                disabled={!hasInput}
              >
                BUY
              </button>
            </div>

            {/* GST Breakdown Section */}
            {showBreakdown && hasInput && (
              <div className="mt-6 bg-yellow-900/30 border border-secondary/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-secondary mb-4 text-center">
                  Order Summary
                </h3>

                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex justify-between">
                    <span>Silver Weight:</span>
                    <span className="font-semibold">{calc.grams} grams</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Base Amount:</span>
                    <span className="font-semibold">₹{calc.formattedBase}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (3%):</span>
                    <span className="font-semibold text-green-400">
                      + ₹{calc.formattedGST}
                    </span>
                  </div>
                  <div className="border-t border-yellow-700/30 pt-3 flex justify-between text-base font-bold text-secondary">
                    <span>Total Payable:</span>
                    <span>₹{calc.formattedTotal}</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    onClick={proceedToBuy}
                    className="bg-secondary text-accent font-semibold py-3 rounded-xl hover:bg-secondary/90 transition"
                  >
                    Confirm & Proceed
                  </button>

                  <button
                    onClick={() => setShowBreakdown(false)}
                    className="text-slate-500 hover:text-slate-300 text-sm underline"
                  >
                    Edit / Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Silver;