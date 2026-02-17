import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { PriceContext } from "../components/PriceProvider";
import { useNavigate } from "react-router-dom";
import {TrendingUp, TrendingDown,  DollarSign,  Award,  Shield,  Zap,} from "lucide-react";
import {LineChart,  Line,  XAxis,  YAxis, CartesianGrid, Tooltip, ResponsiveContainer,Legend,} from "recharts";


function Dashboard() {

  const navigate=useNavigate();
  const { goldPrice, goldPercentage ,silverPrice,silverPercentage} = useContext(PriceContext);
  const isProfit = Number(goldPercentage) > 0;
  const silverisProfit = Number(silverPercentage) > 0;
  const goldData = [
  { date: 'Jan', price: 5800, profit: 0 },
  { date: 'Feb', price: 1950, profit: 150 },
  { date: 'Mar', price: 850, profit: 50 },
  { date: 'Apr', price: 5100, profit: 300 },
  { date: 'May', price: 3200, profit: 400 },
  { date: 'Jun', price: 6350, profit: 550 },
];
  
// data for silver price trend
const silverData = [
  { date: 'Jan', price: 72, profit: 0 },
  { date: 'Feb', price: 75, profit: 3 },
  { date: 'Mar', price: 54, profit: 2 },
  { date: 'Apr', price: 78, profit: 6 },
  { date: 'May', price: 81, profit: 9 },
  { date: 'Jun', price: 93, profit: 11 },]

 const insights = [
    {
      icon: Shield,
      title: 'Hedge Against Inflation',
      description: 'Gold and silver have historically maintained their value during inflation, protecting your purchasing power.',
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: TrendingUp,
      title: 'Long-term Growth',
      description: 'Precious metals have shown consistent appreciation over time, making them ideal for wealth accumulation.',
      gradient: 'from-blue-500 to-blue-600'
    },

    {
      icon: DollarSign,
      title: 'Portfolio Diversification',
      description: 'Adding digital gold and silver reduces overall portfolio risk and balances your investment strategy.',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: Zap,
      title: 'Instant Liquidity',
      description: 'Convert your digital gold and silver to cash instantly without the hassle of physical storage.',
      gradient: 'from-purple-500 to-purple-600'
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold">DigiGold</h1>
          <p className="text-slate-400">
          Invest in premium gold at real-time prices
          </p>
        </div>

        {/* Price Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          {/* Gold Card */}
          <div className="bg-yellow-900/20 border border-yellow-500/30 p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <Award className="text-yellow-400" />
                <div>
                  <p className="text-sm text-slate-400">Gold Price</p>
                  <h2 className="text-2xl font-bold text-yellow-400">
                    {goldPrice ? `₹${goldPrice}/g` : "Loading..."}
                  </h2>
                </div>
                
              </div>

              <div>
                
  {goldPercentage && (
        <p
          className={`text-sm font-semibold mt-1 ${
            isProfit ? "text-green-400" : "text-red-400"
          }`}>
          {isProfit ? "▲" : "▼"}{" "}
          {Math.abs(goldPercentage)}%
        </p>
      )}
              </div>
              
            </div>
            {/* buy or sell button */}
      <div className="mt-4 flex gap-3 mb-2">
    <button className="flex-1 bg-primary
     text-gray-950 font-semibold py-3 px-5 rounded-xl transition bg-primary"
      onClick={()=>navigate("/gold")}>
      BUY
    </button>
    <button className="flex-1 bg-gray-400 hover:bg-gray-600 text-gray-200 font-semibold py-3 px-5 rounded-xl transition">
      SELL
    </button>
  </div>
    </div>
          {/* Silver Card */}
          <div className="bg-slate-800 border border-slate-600 p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <Award className="text-slate-300" />
                <div>
                  <p className="text-sm text-slate-400">Silver Price</p>
                   <h2 className="text-2xl font-bold text-slate-300" 
                   > {silverPrice ? `₹ ${silverPrice}/g` : "Loading..."}</h2>
    <div>
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
</div>          
       </div>
      </div>
    </div>
            <div className="mt-4 flex gap-3 mb-2">
    <button className="flex-1 bg-gray-200
     text-gray-950 font-semibold py-3 px-5 rounded-xl transition bg-primaryy" onClick={()=>navigate("/silver")}>
      BUY
    </button>
    <button className="flex-1 bg-gray-400
     hover:bg-gray-600 text-gray-200 font-semibold py-3 px-5 rounded-xl transition">
      SELL
    </button>
  </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Gold Chart */}
          <div className="bg-slate-800 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">
              Gold Price Trend
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={goldData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#facc15"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Silver Chart */}
          <div className="bg-slate-800 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-slate-300 mb-4">
              Silver Price Trend
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={silverData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#94a3b8"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">Why Invest in Digital Gold & Silver?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">


            {insights.map((insight, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm
                 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:-translate-y-1">

                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${insight.gradient}
                 flex items-center justify-center mb-4`}>
                  <insight.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{insight.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-gradient-to-r from-yellow-900/20 via-slate-800/30 to-slate-700/20 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">Start Your Investment Journey</h3>
              <p className="text-slate-400">
                Digital gold and silver offer the perfect combination of tradition and technology. 
                Invest in precious metals without the hassle of physical storage, with complete flexibility and security.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href="/gold"
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 font-semibold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-200 text-center"
              >
                Buy Gold
              </a>
              <a 
                href="/silver"
                className="px-6 py-3 bg-gradient-to-r from-slate-400 to-slate-500 text-slate-900 font-semibold rounded-lg hover:from-slate-300 hover:to-slate-400 transition-all duration-200 text-center"
              >
                Buy Silver
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>


    
  );


  
}

export default Dashboard;
