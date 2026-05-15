import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Baseline', performance: 65 },
  { name: 'Week 4', performance: 78 },
  { name: 'Week 8', performance: 88 },
  { name: 'Week 12', performance: 95 },
];

const DataViz: React.FC = () => {
  return (
    <div className="h-64 w-full mt-4 bg-tactical-800/50 p-4 rounded-lg border border-gray-800">
      <h4 className="text-xs font-bold uppercase text-gray-500 mb-2 text-center">Projected Protocol Efficacy</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            cursor={{fill: '#334155', opacity: 0.4}}
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
          />
          <Bar dataKey="performance" radius={[4, 4, 0, 0]}>
             {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#0ea5e9' : '#475569'} />
              ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DataViz;
