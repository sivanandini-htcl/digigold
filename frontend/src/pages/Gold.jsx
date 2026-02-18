import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { useContext } from "react";
import { PriceContext } from "../components/PriceProvider";

function Gold() {
  const [conversionMode, setConversionMode] = useState("rupees-to-grams");
  const [inputValue, setInputValue] = useState("");
  const [showBreakdown, setShowBreakdown] = useState(false);

  const { goldPrice, goldPercentage } = useContext(PriceContext);
  const navigate = useNavigate();

  const isProfit = Number(goldPercentage) > 0;


  const GOLD_PRICE_PER_GRAM = Number(goldPrice) || 6500; 

  const calculateConversion = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value <= 0) return 0;

    if (conversionMode === "rupees-to-grams") {
      return value / GOLD_PRICE_PER_GRAM;
    } else {
      return value * GOLD_PRICE_PER_GRAM;
    }
  };

  const getFinalCalculation = () => {
    const grams = conversionMode === "rupees-to-grams"
      ? calculateConversion()
      : parseFloat(inputValue);

    const rupees = conversionMode === "grams-to-rupees"
      ? calculateConversion()
      : parseFloat(inputValue);

    const baseAmount = Math.round(grams * GOLD_PRICE_PER_GRAM); 
    const gstRate = 0.03; 
    const gstAmount = Math.round(baseAmount * gstRate);
    const totalWithGST = baseAmount + gstAmount;

    return {
      grams: grams.toFixed(4),
      baseAmount,
      gstAmount,
      totalWithGST,
      formattedBase: baseAmount.toLocaleString("en-IN"),
      formattedGST: gstAmount.toLocaleString("en-IN"),
      formattedTotal: totalWithGST.toLocaleString("en-IN"),
    };
  };

  const handleBuyClick = () => {
    const val = parseFloat(inputValue);
    if (!val || val <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    setShowBreakdown(true);
  };

  // const proceedToBuy = () => {

  //   const calc = getFinalCalculation();
  //   navigate("/buygold", {
  //     state: {
  //       grams: calc.grams,
  //       amount: calc.baseAmount,
  //       totalWithGST: calc.totalWithGST,
  //       mode: conversionMode,
  //     },
  //   });
  // };

  const calc = getFinalCalculation();
  const hasInput = parseFloat(inputValue) > 0;

  return (
    <div className="min-h-screen bg-slate-900 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">

        <Link to="/">
          <button className="flex items-center gap-2 mb-6 text-slate-300 hover:text-amber-500 transition">
            <ArrowLeft className="h-5 w-5" />
            Back to Dashboard
          </button>
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-amber-400 mb-8">
          Buy Gold
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Left – Insights */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-yellow-700/40 rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-amber-300 mb-5">Market Insights</h2>

              <div className="flex items-center justify-between p-4 bg-green-950/30 rounded-xl mb-5">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                  <span className="font-semibold text-slate-200">Today's Change</span>
                </div>
                {goldPercentage && (
                  <span className={`text-lg font-bold ${isProfit ? "text-green-400" : "text-red-400"}`}>
                    {isProfit ? "▲" : "▼"} {Math.abs(goldPercentage)}%
                  </span>
                )}
              </div>

              <div className="space-y-3 text-slate-300">
                <div className="flex justify-between">
                  <span>Current Price</span>
                  <span className="font-bold text-amber-400">
                    ₹{GOLD_PRICE_PER_GRAM.toLocaleString("en-IN")}/g
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Week High</span>
                  <span className="font-semibold">₹6,580</span>
                </div>
                <div className="flex justify-between">
                  <span>Week Low</span>
                  <span className="font-semibold">₹6,420</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right – Converter + Buy */}
          <div className="bg-slate-900 border border-yellow-700/40 rounded-2xl p-6 shadow-xl">

            <h2 className="text-3xl font-bold text-amber-300 mb-2">Price Converter</h2>
            <p className="text-slate-400 mb-6">
              {conversionMode === "rupees-to-grams" ? "Rupees → Grams" : "Grams → Rupees"}
            </p>

            {/* Toggle */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => {
                  setConversionMode("rupees-to-grams");
                  setInputValue("");
                  setShowBreakdown(false);
                }}
                className={`flex-1 py-3 rounded-xl font-semibold transition ${
                  conversionMode === "rupees-to-grams"
                    ? "bg-amber-500 text-gray-900 shadow-md"
                    : "bg-slate-800 text-slate-300 border border-slate-600"
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
                className={`flex-1 py-3 rounded-xl font-semibold transition ${
                  conversionMode === "grams-to-rupees"
                    ? "bg-amber-500 text-gray-900 shadow-md"
                    : "bg-slate-800 text-slate-300 border border-slate-600"
                }`}
              >
                Grams → ₹
              </button>
            </div>

            <input
              type="number"
              placeholder={conversionMode === "rupees-to-grams" ? "10000" : "1.5"}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setShowBreakdown(false);
              }}
              className="w-full h-14 px-5 bg-slate-800 border border-slate-600 rounded-xl text-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 mb-6"
            />

            {/* Result Preview */}
            <div className="bg-slate-800 rounded-xl p-6 border border-amber-800/50 text-center mb-6">
              <p className="text-slate-400 mb-2">
                {conversionMode === "rupees-to-grams" ? "You will get" : "You will pay"}
              </p>
              <div className="text-4xl font-bold text-amber-300">
                {hasInput ? (
                  conversionMode === "rupees-to-grams" ? (
                    `${calc.grams} g`
                  ) : (
                    `₹${calc.formattedBase}`
                  )
                ) : (
                  "0"
                )}
              </div>
            </div>

            {/* BUY button */}
            <button onClick={handleBuyClick}
              disabled={!hasInput}
              className={`w-full py-4 rounded-xl font-bold text-lg transition ${
                hasInput
                  ? "bg-amber-500 hover:bg-amber-400 text-gray-900 shadow-lg"
                  : "bg-slate-700 text-slate-400 cursor-not-allowed"
              }`}>
              BUY
            </button>

            {/* GST & Final Breakdown */}
            {showBreakdown && hasInput && (
              <div className="mt-8 bg-slate-800/80 border border-amber-700/40 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-amber-300 mb-5 text-center">
                  Order Summary
                </h3>

                <div className="space-y-4 text-slate-200">
                  <div className="flex justify-between">
                    <span>Gold Weight</span>
                    <span className="font-medium">{calc.grams} grams</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gold Value (₹{GOLD_PRICE_PER_GRAM.toLocaleString("en-IN")}/g)</span>
                    <span>₹{calc.formattedBase}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (3%)</span>
                    <span className="text-green-400">+ ₹{calc.formattedGST}</span>
                  </div>
                  <div className="border-t border-slate-600 pt-4 flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-amber-300">₹{calc.formattedTotal}</span>
                  </div>
                </div>

                <button
                  // onClick={proceedToBuy}
                  className="mt-8 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition shadow-md"
                >
                  Confirm & Proceed to Buy
                </button>

                <button
                  onClick={() => setShowBreakdown(false)}
                  className="mt-3 w-full text-slate-400 hover:text-slate-200 underline text-sm"
                >
                  Edit amount
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gold;