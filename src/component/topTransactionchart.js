import {Typography,Button} from "@mui/material";
import BasicModal from "./Modal"
import React,{useRef,useState} from "react";
import { MpRounded } from "@mui/icons-material";
import { Box } from "@mui/system";
import { Cell, Pie, PieChart, ResponsiveContainer,BarChart,CartesianGrid,XAxis,YAxis,Tooltip,Bar } from 'recharts';
import "./topTransactionchart.css"


const ToptransactionchartUI=({data})=>{

const groupedData = data.reduce((acc, curr) => {
  if (!acc[curr.name]) {
    acc[curr.name] = { name: curr.name, value: 0 };
  }
  acc[curr.name].value += curr.value;
  return acc;
}, {});
const finaldataset= Object.values(groupedData);

 return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={finaldataset}
      margin={{}} // left margin for labels
      >
        {/* Numeric X axis (bar length) */}
        <XAxis
          type="number"
          axisLine={false}
          tickLine={false}
          tick={false}
        />

        {/* Categorical Y axis (category names) */}
        <YAxis
          dataKey="name"
          type="category"
          axisLine={false}
          tickLine={false}
          tick={{  fontSize: 14, fill: "#333" }} // align left
          width={100} // enough width for labels
          interval={0}
   
    tickMargin={5}
        />

        <Tooltip />

        {/* Bars with rounded corners */}
        <Bar
          dataKey="value"
          fill="#8884d8"
          barSize={21.73}
         radius={[10, 10, 10, 10]} // rounded corners on all sides
        
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ToptransactionchartUI;