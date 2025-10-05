import { Box } from "@mui/system";
import React,{useRef,useState,useEffect} from "react";
import {Typography,Button, IconButton} from "@mui/material";
import LocalPizzaIcon from '@mui/icons-material/LocalPizza'
import EditIcon from '@mui/icons-material/Edit';
import "./recentTransaction.css"
import CancelIcon from '@mui/icons-material/Cancel';
import ExpenseView from './expenses';
import ExpenseUI from './expenseTrack';
import ToptransactionchartUI from './topTransactionchart';
import FastfoodIcon from "@mui/icons-material/Fastfood";
import MovieIcon from "@mui/icons-material/Movie";
import FlightIcon from "@mui/icons-material/Flight";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BoltIcon from "@mui/icons-material/Bolt";
import CategoryIcon from '@mui/icons-material/Category';


const RecentTransactionView=({data,transactionobj,handleDeletion,handleEdit})=>{

//     useEffect(()=>{
//  enrichedTransaction();
//     },[transactionobj])
// const DEFAULT_ICON = <CategoryIcon />;
  const categoryMap = {
  food: ["samosa", "rice", "pizza", "burger", "coffee","Chicken Pakoda","MilkPowder"],
  entertainment: ["movie", "zoo", "park", "concert", "game"],
  travel: ["bus", "train", "uber", "flight", "petrol"],
  shopping: ["shoes", "clothes", "watch", "jewelry"],
  utilities: ["electricity", "internet", "water", "gas"]
};


const categoryIcons = {
  food: <LocalPizzaIcon/>,
  entertainment: <MovieIcon sx={{width:"24px",height:"24px",borderRadius:"15px"}}/>,
  travel: <FlightIcon sx={{width:"24px",height:"24px",borderRadius:"15px"}}/>,
  // shopping: <ShoppingCartIcon sx={{width:"24px",height:"24px",borderRadius:"15px"}}/>,
  // utilities: <BoltIcon sx={{width:"24px",height:"24px",borderRadius:"15px"}}/>
};

const enrichedTransaction = transactionobj.map(tx => {
  const category = getCategory(tx.Title);
  return {
    ...tx,
    category,
    icon: categoryIcons[category]
  };
});

function getCategory(itemName) {
  const lowerName = itemName.toLowerCase();

  for (const [category, keywords] of Object.entries(categoryMap)) {
    if (keywords.some(keyword => lowerName.includes(keyword))) {
      return category;
    }
  }

  return "other"; // default/fallback category
}
return(
<Box className="recentTransactionouter">
  <Box sx={{display:"flex"}}>
<Typography sx={{width:"261px",height:"32px",pt:"36px",fontFamily:"Ubuntu",fontWeight:"700",fontStyle:"italic",fontSize:"28px",lineHeight:"100%"}}>Recent Transactions</Typography>
<Typography sx={{width:"175px",height:"32px",pl:"507px",pt:"36px",fontFamily:"Ubuntu",fontWeight:"700",fontStyle:"italic",fontSize:"28px",lineHeight:"100%"}}>Top Expenses</Typography>
</Box>
<Box className="recentTransaction" sx={{display:"flex"}}>
  <Box className="Transanctionlist">
  {enrichedTransaction.length!==0?(enrichedTransaction.map((transaction,index)=>(
    <React.Fragment>
    <Box key={index} sx={{display:"flex"}}>
      <Box className="categoryOuter">
     <Box className="categoryIcon">
      <Box className="iconarea">
      {transaction.icon}
      </Box>
    </Box>
    </Box>
    <Box sx={{display:"flex",flexDirection:"column"}}>
    <Box sx={{pt:"37px",pl:"17px",pb:"8px",width:"70px",height:"22px"}}>
    <Typography sx={{fontFamily:"Open Sans",fontWeight:"400px",fontStyle:"Regular",fontSize:"16px",lineHeight:"100%",whiteSpace:"nowrap"}}>{transaction.Title}</Typography>
    </Box>
    <Box sx={{pl:"17px",pb:"9px",width:"115px",height:"22px"}}>
    <Typography sx={{fontFamily:"Open Sans",fontWeight:"400px",fontStyle:"Regular",fontSize:"16px",lineHeight:"100%"}}>{transaction.date}</Typography>
    </Box>
    </Box>
    <Box  sx={{ display:"flex", ml:"auto"}}>
    <Box sx={{width:"37px",height:"22px",pt:"49px",pb:"20px"}}>
    <Typography sx={{fontFamily:"Open Sans",fontWeight:"700px",fontStyle:"Bold",fontSize:"16px",lineHeight:"100%"}}>{'\u20B9'}{transaction.Price}</Typography>
    </Box>
    <Box sx={{width:"80px",height:"37px",pt:"41px",pb:"13px",pl:"21px",pr:"10px",display:"flex",gap:"6px"}}>
    <IconButton class="cancelIncon" onClick={()=>handleDeletion(index)}>
    <CancelIcon/>
    </IconButton>
    <IconButton class="editIcon" onClick={()=>handleEdit(index)}>
    <EditIcon/>
   </IconButton>
   </Box>
   </Box>
</Box>
{index !== enrichedTransaction.length - 1 && (
      <Box
        sx={{
          width: "705px",
          borderTop: "1px solid #9B9B9B",
          height: "0px",
          pl:"22px"
        }}
      />
    )}
</React.Fragment>
  ))):("")
  }
    </Box> 

<Box sx={{pl:"29px"}}>
<Box className="barchartTrends">
  <ToptransactionchartUI data={data}></ToptransactionchartUI>
</Box>
</Box>
</Box>
</Box>
);
}
 export default RecentTransactionView;
