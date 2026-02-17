import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowLeftRight, TrendingUp } from "lucide-react";
import { useContext} from "react";
import { PriceContext } from "../components/PriceProvider";
//

 function Silver() {
  const [conversionMode, setConversionMode] = useState("rupees-to-grams");
  const [inputValue, setInputValue] = useState("");
 const { silverPrice, silverPercentage } = useContext(PriceContext);



  const silverisProfit = Number(silverPercentage) > 0;
  const silverPricePerGram =`${silverPrice}` ;

  const calculateConversion = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value <= 0) return 0;

    if (conversionMode === "rupees-to-grams") {
      return (value / silverPricePerGram).toFixed(4);
    } else {
      return (value * silverPricePerGram).toFixed(2);
    }
  };

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
          <h1 className="text-4xl font-bold text-secondary mb-2">
            Silver Price 
          </h1>
          <p className="text-slate-600">
            
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Gold Card */}
          <div className="space-y-6">
            {/* Market Insights */}
            <div className="bg-yellow-900/20 border border-secondary rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Market Insights</h2>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-slate-700">
                    Today's Change
                  </span>
                </div>
                <span className="font-bold text-green-600">

         {silverPercentage && (
        <p
          className={`text-sm font-semibold mt-1 ${
            silverisProfit? "text-green-400" : "text-red-400"
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
                  <span className="text-slate-00">Current Price</span>
                  <span className="font-semibold text-secondary">
                    ₹{silverPricePerGram.toLocaleString()}/gram
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-secondary">Week High</span>
                  <span className="font-semibold">₹6,580</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-secondary">Week Low</span>
                  <span className="font-semibold">₹6,420</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Converter */}
          <div className="bg-yellow-900/20 border border-secondary rounded-2xl shadow-xl p-6">

            <h2 className="text-2xl font-bold text-secondary mb-2">Price Converter</h2>
            <p className="text-slate-600 mb-6">
              {conversionMode === "rupees-to-grams"
                ? "Convert Rupees to Grams"
                : "Convert Grams to Rupees"}
            </p>

            {/* Toggle Buttons */}
            <div className="flex gap-2 mb-6">
              <button onClick={() => {
                  setConversionMode("rupees-to-grams");
                  setInputValue("");
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
              type=" "
              placeholder={
                conversionMode === "rupees-to-grams" ? "10000" : "1.5"
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full h-12 px-4 border rounded-lg mb-6 text-lg"
            />

            {/* Result */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-6 border-2 border-amber-200 text-center">
              <p className="text-sm text-slate-600 mb-2">
                {conversionMode === "rupees-to-grams"
                  ? "You will get (grams)"
                  : "You will pay (₹)"}
              </p>

              <div className="text-3xl font-bold text-accent">
                {inputValue ? (
                  conversionMode === "rupees-to-grams"
                    ? `${calculateConversion()} g`
                    : `₹${parseFloat(calculateConversion()).toLocaleString()}`
                ) : (
                  <span className="text-slate-300">0</span>
                )}
              </div>
            </div>
<div className="mt-4 flex gap-3 mb-2">
     <button className="flex-1 bg-gray-400
     hover:bg-gray-600 text-gray-200 font-semibold py-3 px-5 rounded-xl transition">
      Buy
    </button>
  </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Silver;