import React, { PureComponent } from "react";
import { LineChart, Line, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Before 3",
    uv: 4000,
    pv: 1800,
    amt: 2400,
  },
  {
    name: "Before 2",
    uv: 3000,
    pv: 4000,
    amt: 2210,
  },
  {
    name: "Before 1",
    uv: 2000,
    pv: 2500,
    amt: 2290,
  },
  {
    name: "Yesterday",
    uv: 2780,
    pv: 3500,
    amt: 2000,
  },
  {
    name: "Today",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
];

export default class Example extends PureComponent {
  render() {
    return (
      <LineChart
        data={data}
        width={420}
        height={270}
        style={{
          position: "relative",
          cursor: "default",
        }}
      >
        <XAxis
          axisLine={{ stroke: "lightgray" }}
          tickLine={{ stroke: "lightgray" }}
          tick={{ fill: "lightgray", fontSize: "10" }}
          dataKey="name"
        />
        <YAxis
          axisLine={{ stroke: "lightgray" }}
          tickLine={{ stroke: "lightgray" }}
          tick={{ fill: "lightgray", fontSize: "10" }}
        />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    );
  }
}
