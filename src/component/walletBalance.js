
import { Box } from "@mui/system";
import {Typography,Button} from "@mui/material";
import React, { useEffect, useState,useImperativeHandle, forwardRef } from "react";
import BasicModal from "./Modal";
import './walletBalance.css'



const  WalletBalanceView =forwardRef((props,ref)=>{

     const defaultamount=5000;
     const{totalexpenseAmount}=props;
// eslint-disable-next-line react-hooks/rules-of-hooks
const [balance, setbalance]=useState(()=>{
let stored= localStorage.getItem("amount");
return stored?JSON.parse(stored):defaultamount;
});

 const[displaywalletbalance,setdisplaybalance]=useState();


useEffect(()=>{

  setdisplaybalance(balance-totalexpenseAmount);
},[balance,totalexpenseAmount])


useEffect(() => {
    localStorage.setItem("amount", JSON.stringify(balance));
}, [balance]);

 useImperativeHandle(ref, () => ({
    getValue: () => displaywalletbalance,
    setdisplaybalance:(newVal) =>{
    setdisplaybalance(newVal);
 }}));

const isWalletView=true;
const[openstate, setmodalstate]=useState(false);

// localStorage.setItem("amount",balance);

const handleAddIncome=()=>{
    setmodalstate(true);
}

const handleClose=()=>{
    setmodalstate(false);
}

const onClickAddBalance=(obj)=>{
   const currentBalance= JSON.parse(localStorage.getItem("amount"));
   if(obj.amount){
   const addedBalance=currentBalance+obj.amount;
   setbalance(addedBalance);
   }
//console.log(typeof(addedBalance)); 
}




return(
<Box className="walletBalanceview" sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
<Typography className="balanceinfo">Wallet Balance:{displaywalletbalance}</Typography>
<Button type="button" className="addIncomebtn" variant="contained" onClick={handleAddIncome}>+ Add Income</Button> 
<BasicModal open={openstate} onClose={handleClose} isWalletView={isWalletView} handleAddBalance={onClickAddBalance} walletBalance={balance}></BasicModal>
</Box>
);
})

export default WalletBalanceView;