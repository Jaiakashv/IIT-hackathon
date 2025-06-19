import React, { useState, useEffect, useRef } from 'react';
import '../styles/ripple-cursor.css';

interface DataPoint {
  year: number;
  value: number;
}

interface Metric {
  id: string;
  name: string;
  unit: string;
  color: string;
  values: DataPoint[];
}

interface ChangeResult {
  value: number;
  type: 'increase' | 'decrease';
}

const StatsSection: React.FC = () => {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isActive, setIsActive] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsActive(true);
      setTimeout(() => setIsActive(false), 500);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const cursorStyle = {
    left: `${cursorPos.x}px`,
    top: `${cursorPos.y}px`,
  };

  const metrics = [
    {
      id: 'carbon',
      name: 'Managed portfolio carbon footprint',
      unit: 'tCO2e',
      color: '#8B5A2B',
      values: [
        { year: 2019, value: 38673 },
        { year: 2020, value: 32183 },
        { year: 2021, value: 14111 },
        { year: 2022, value: 45048 },
      ],
    },
    {
      id: 'intensity',
      name: 'Managed portfolio energy intensity',
      unit: 'kWh/m²',
      color: '#D2B48C',
      values: [
        { year: 2019, value: 157 },
        { year: 2020, value: 135 },
        { year: 2021, value: 128 },
        { year: 2022, value: 123 },
      ],
    },
    {
      id: 'consumption',
      name: 'Managed portfolio energy consumption',
      unit: 'kWh',
      color: '#A0522D',
      values: [
        { year: 2019, value: 65198706 },
        { year: 2020, value: 48784205 },
        { year: 2021, value: 49324077 },
        { year: 2022, value: 47790662 },
      ],
    },
  ];

  const years = [2019, 2020, 2021, 2022];

  const maxValue = Math.max(
    ...metrics.flatMap((metric) => metric.values.map((v) => v.value))
  );

  const formatNumber = (value: number): string => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toLocaleString();
  };

  const calculateChange = (values: DataPoint[]): ChangeResult => {
    const start = values.find((v) => v.year === 2019)?.value || 0;
    const end = values.find((v) => v.year === 2022)?.value || 0;
    const change = ((end - start) / start) * 100;
    return {
      value: Math.abs(Math.round(change)),
      type: change >= 0 ? 'increase' : 'decrease',
    };
  };

  return (
    <>
      <div
        ref={cursorRef}
        className={`ripple-cursor ${isActive ? 'ripple' : ''}`}
        style={cursorStyle}
      />
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Wellness Journey
            </h2>
            <p className="text-gray-600">
              Tracking our community's wellness progress (2019-2022)
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {metrics.map((metric) => {
                const currentValue = metric.values.find((v) => v.year === 2022)
                  ?.value || 0;
                const change = calculateChange(metric.values);

                return (
                  <div
                    key={metric.id}
                    className="border-b md:border-b-0 md:border-r last:border-r-0 pb-4 md:pb-0 md:pr-6 last:pr-0"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">
                          {metric.name}
                        </h3>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatNumber(currentValue)}
                          <span className="text-sm font-normal text-gray-500 ml-1">
                            {metric.unit}
                          </span>
                        </p>
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          change.type === 'increase'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {change.type === 'increase' ? '↑' : '↓'} {change.value}%
                        <span className="text-xs text-gray-500 ml-1">
                          from 2019
                        </span>
                      </span>
                    </div>
                    {/* Yearly Breakdown */}
                    <div className="mt-2">
                      {years.map((year) => {
                        const value = metric.values.find((v) => v.year === year)
                          ?.value || 0;
                        return (
                          <div
                            key={year}
                            className="flex justify-between text-xs text-gray-600"
                          >
                            <span>{year}</span>
                            <span>{formatNumber(value)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Graph Section */}
            <div className="mt-8">
              <div className="flex justify-between mb-2">
                {years.map((year) => (
                  <div
                    key={year}
                    className="text-xs text-gray-500 w-1/4 text-center"
                  >
                    {year}
                  </div>
                ))}
              </div>

              <div className="h-64 flex items-end space-x-1">
                {years.map((year) => (
                  <div
                    key={year}
                    className="flex-1 flex space-x-1 items-end"
                    style={{ height: '100%' }}
                  >
                    {metrics.map((metric) => {
                      const value = metric.values.find((v) => v.year === year)
                        ?.value || 0;
                      const height = (value / maxValue) * 100;

                      return (
                        <div
                          key={`${metric.id}-${year}`}
                          className="relative group flex-1"
                          style={{ height: `${height}%` }}
                        >
                          <div
                            className="w-full rounded-t-sm flex items-end justify-center"
                            style={{
                              backgroundColor: metric.color,
                              height: '100%',
                            }}
                          >
                            <span className="text-white text-xs font-medium mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              {metric.id === 'intensity'
                                ? value.toFixed(2)
                                : formatNumber(value)}
                            </span>
                          </div>
                          <div className="absolute -bottom-6 left-0 right-0 text-center">
                            <span className="text-xs text-gray-500">{year}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-10 space-x-6">
                {metrics.map((metric) => (
                  <div key={metric.id} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-sm mr-2"
                      style={{ backgroundColor: metric.color }}
                    />
                    <span className="text-xs text-gray-600">{metric.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StatsSection;