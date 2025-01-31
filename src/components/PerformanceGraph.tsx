import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Profile } from '../types';

interface PerformanceGraphProps {
  users: Profile[];
}

export default function PerformanceGraph({ users }: PerformanceGraphProps) {
  const colors = ['#7C3AED', '#EC4899', '#F59E0B', '#10B981'];

  const data = users[0]?.performanceHistory.map((entry) => {
    const dataPoint: any = {
      date: new Date(entry.date).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      })
    };
    users.forEach((user, index) => {
      const userEntry = user.performanceHistory.find(h => h.date === entry.date);
      dataPoint[user.username] = userEntry?.solved || 0;
    });
    return dataPoint;
  }) || [];

  return (
    <div className="card h-[400px]">
      <h3 className="text-xl font-display font-bold mb-6">Performance Tracking</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="date"
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
            }}
          />
          {users.map((user, index) => (
            <Line
              key={user.username}
              type="monotone"
              dataKey={user.username}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{
                r: 4,
                strokeWidth: 2,
                fill: '#fff',
              }}
              activeDot={{
                r: 6,
                strokeWidth: 0,
              }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}