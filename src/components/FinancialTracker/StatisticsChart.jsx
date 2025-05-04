import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// ✅ Peak label plugin with smart X positioning
const peakLabelPlugin = {
  id: 'peakLabel',
  afterDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, chartArea } = chart;
    const { top, bottom, left, right } = chartArea;
    const { tab, income, expenses } = pluginOptions;

    const datasetIndex = tab === 'income' ? 0 : 1;
    const data = tab === 'income' ? income : expenses;

    const peakValue = Math.max(...data);
    const peakIndex = data.indexOf(peakValue);
    const meta = chart.getDatasetMeta(datasetIndex);
    const point = meta?.data[peakIndex];
    if (!point) return;

    const x = point.x;
    const y = point.y;

    const text = `₱${peakValue.toLocaleString()}`;
    ctx.save();
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const paddingX = 12;
    const textWidth = ctx.measureText(text).width;
    const bgW = textWidth + paddingX * 2;
    const bgH = 24;

    // 🔁 Smart X placement
    let bgX;
    if (x + bgW / 2 > right - 5) {
      bgX = x - bgW - 10; // left of point
    } else if (x - bgW / 2 < left + 5) {
      bgX = x + 10; // right of point
    } else {
      bgX = x - bgW / 2; // centered
    }

    // 🔁 Smart Y placement
    let bgY = y - 36;
    if (bgY < top + 5) {
      bgY = y + 12;
      if (bgY + bgH > bottom - 5) {
        bgY = bottom - bgH - 5;
      }
    }

    // 🟩 Rounded rectangle background
    ctx.beginPath();
    const r = 12;
    ctx.moveTo(bgX + r, bgY);
    ctx.lineTo(bgX + bgW - r, bgY);
    ctx.quadraticCurveTo(bgX + bgW, bgY, bgX + bgW, bgY + r);
    ctx.lineTo(bgX + bgW, bgY + bgH - r);
    ctx.quadraticCurveTo(bgX + bgW, bgY + bgH, bgX + bgW - r, bgY + bgH);
    ctx.lineTo(bgX + r, bgY + bgH);
    ctx.quadraticCurveTo(bgX, bgY + bgH, bgX, bgY + bgH - r);
    ctx.lineTo(bgX, bgY + r);
    ctx.quadraticCurveTo(bgX, bgY, bgX + r, bgY);
    ctx.closePath();
    ctx.fillStyle = tab === 'income' ? '#22c55e' : '#ef4444';
    ctx.fill();

    // 🎯 Draw text inside box
    ctx.fillStyle = 'white';
    ctx.fillText(text, bgX + bgW / 2, bgY + bgH / 2);
    ctx.restore();
  },
};

ChartJS.register(peakLabelPlugin);

const StatisticsChart = () => {
  const [tab, setTab] = useState('income');
  const [year, setYear] = useState(2025);
  const [range, setRange] = useState('Month');

  let labels = [];
  let income = [];
  let expenses = [];

  if (range === 'Month') {
    labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    income = [1000, 20000, 15000, 8000, 14000, 29509, 21000, 23000, 24000, 12000, 7000, 25000];
    expenses = [800, 12000, 10000, 6000, 9000, 15000, 14000, 15000, 17000, 8000, 5000, 16000];
  } else if (range === 'Quarter') {
    labels = ['Q1', 'Q2', 'Q3', 'Q4'];
    income = [45000, 51509, 68000, 44000];
    expenses = [30000, 32000, 41000, 33000];
  } else if (range === 'Year') {
    labels = ['2022', '2023', '2024', '2025'];
    income = [160000, 175000, 180000, 190000];
    expenses = [120000, 140000, 145000, 160000];
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: income,
        borderColor: '#22c55e',
        backgroundColor: '#22c55e',
        pointRadius: tab === 'income' ? 5 : 0,
        pointBackgroundColor: '#22c55e',
        borderWidth: 2,
        borderDash: tab === 'income' ? [] : [6, 6],
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: expenses,
        borderColor: '#ef4444',
        backgroundColor: '#ef4444',
        pointRadius: tab === 'expenses' ? 5 : 0,
        pointBackgroundColor: '#ef4444',
        borderWidth: 2,
        borderDash: tab === 'expenses' ? [] : [6, 6],
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 40,
        bottom: 20,
        left: 10,
        right: 10,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `₱${ctx.formattedValue}`,
        },
      },
      peakLabel: {
        tab,
        income,
        expenses,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value / 1000}k`,
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      {/* Header Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-black font-bold text-xl">
          <span>Statistics</span>
          <button onClick={() => setYear(year - 1)} className="text-gray-500 hover:text-black">←</button>
          <span className="font-semibold">{year}</span>
          <button onClick={() => setYear(year + 1)} className="text-gray-500 hover:text-black">→</button>
        </div>

        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="Month">Month</option>
          <option value="Quarter">Quarter</option>
          <option value="Year">Year</option>
        </select>
      </div>

      {/* Chart */}
      <div className="relative w-full h-[400px]">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Tab Toggle */}
      <div className="flex justify-center mt-6">
        <div className="inline-flex bg-gray-100 p-1 rounded-full shadow-sm overflow-visible">
          <button
            onClick={() => setTab('income')}
            style={{
              width: '100px',
              padding: '0.5rem 0',
              borderRadius: '9999px',
              fontWeight: 600,
              fontSize: '0.875rem',
              transition: 'all 300ms',
              backgroundColor: tab === 'income' ? '#22c55e' : 'transparent',
              color: tab === 'income' ? 'white' : '#16a34a',
              transform: tab === 'income' ? 'scale(1.05)' : 'scale(1)',
              boxShadow:
                tab === 'income'
                  ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  : 'none',
            }}
          >
            Income
          </button>
          <button
            onClick={() => setTab('expenses')}
            style={{
              width: '100px',
              padding: '0.5rem 0',
              borderRadius: '9999px',
              fontWeight: 600,
              fontSize: '0.875rem',
              transition: 'all 300ms',
              backgroundColor: tab === 'expenses' ? '#ef4444' : 'transparent',
              color: tab === 'expenses' ? 'white' : '#ef4444',
              transform: tab === 'expenses' ? 'scale(1.05)' : 'scale(1)',
              boxShadow:
                tab === 'expenses'
                  ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  : 'none',
            }}
          >
            Expenses
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatisticsChart;
