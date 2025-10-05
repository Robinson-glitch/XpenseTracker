import { Box } from "@mui/system";
import {Typography,Button} from "@mui/material";
import BasicModal from "./Modal"
import React,{useRef,useState,useEffect, forwardRef,useImperativeHandle} from "react";
import { MpRounded } from "@mui/icons-material";
import './expenses.css';




const ExpensesView =forwardRef((props,ref)=>{
const[modalopen,setmodalstate]=useState(false);
const[dataedit, setdataedit]=useState({});
const[isediting, setediting]=useState(false);
const[selectedindex, setselectedindex]=useState();

const {settransactionData,updatetransactionData,totalExpenseAmount}=props;
const editmodal=useRef();
// const [date, setdate]=useState("");
// const[transactions,setTransactions]=useState([{}]);
const[expensetotalAmount,setexpenseAmount]=useState();


// useEffect(()=>{
// setexpenseAmount(totalExpenseAmount);
// },[totalExpenseAmount])

const handleAddExpenses=()=>{
    setmodalstate(true);
 }

 const openModal=(data,dataindex)=>{
setmodalstate(true);
editmodal.current.setmodaldata(data);
setediting(true);
setselectedindex(dataindex);
 }

const handleClose=()=>{
setmodalstate(false);
setediting(false);
}

const submithandle=(obj)=>{
   //setTransactions(obj);
   // let newExpenseAmount=obj.Price;
   // let currentExpenseAmount= JSON.parse(localStorage.getItem("expenseAmount"));
   // let overallExpenseAmount=newExpenseAmount+currentExpenseAmount;
   //console.log(typeof(overallExpenseAmount),overallExpenseAmount);
   settransactionData(obj);
   setexpenseAmount(totalExpenseAmount);
   
}

const submitupdate=(obj)=>{
   updatetransactionData(obj,selectedindex);
}

 useImperativeHandle(ref, () => ({
    openModal
  }));

return(
<Box className="expensebox">
<Typography className="expenseInfo">Expenses:{totalExpenseAmount}</Typography>
<Button className="addExpensebtn" variant="contained" onClick={handleAddExpenses}>Add Expense</Button>
<BasicModal isediting={isediting} ref={editmodal} open={modalopen} onClose={handleClose} onClickSubmit={submithandle} onClickUpdate={submitupdate} />
</Box>
);
})

export default ExpensesView;