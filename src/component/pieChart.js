import {Typography,Button} from "@mui/material";
import BasicModal from "./Modal"
import React,{useRef,useState} from "react";
import { MpRounded } from "@mui/icons-material";
import { Box } from "@mui/system";
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import "./PieChart.css"

const PieChartUI=({data,categories})=>{
    const RADIAN = Math.PI / 180;

    const CATEGORY_COLORS = {
  food: '#A000FF',
  travel: '#FF9304',
  entertainment: '#FDE006',
};

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const groupedData = data.reduce((acc, curr) => {
  if (!acc[curr.name]) {
    acc[curr.name] = { name: curr.name, value: 0 };
  }
  acc[curr.name].value += curr.value;
  return acc;
}, {});


const finaldataset= Object.values(groupedData);
console.log("dfw",finaldataset);
return(
<Box className="Outerbox">
<Box className="piechartbox">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={finaldataset}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {finaldataset.map((entry, index) => (
            <Cell key={`cell-${entry.name}`} fill={CATEGORY_COLORS[entry.name]} />
))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
    {finaldataset.map((entry, index) => (
  <Box key={index} display="flex" alignItems="center" gap={1} my={1}>
    <Box
      sx={{
        backgroundColor: CATEGORY_COLORS[entry.name],
        width: 26,
        height: 8,
      }}
    ></Box>
    <Typography variant="body2">{entry.name}</Typography>
  </Box>
))}
    </Box>
    </Box>
  );
};

export default PieChartUI;