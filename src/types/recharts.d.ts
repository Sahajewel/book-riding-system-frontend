/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'recharts' {
  import * as React from 'react';

  export const XAxis: React.ComponentType<any>;
  export const YAxis: React.ComponentType<any>;
  export const CartesianGrid: React.ComponentType<any>;
  export const Tooltip: React.ComponentType<any>;
  export const Legend: React.ComponentType<any>;
  export const Line: React.ComponentType<any>;
  export const LineChart: React.ComponentType<any>;

  // ✅ Add Bar & BarChart
  export const Bar: React.ComponentType<any>;
  export const BarChart: React.ComponentType<any>;
  export const ResponsiveContainer: React.ComponentType<any>;
}
