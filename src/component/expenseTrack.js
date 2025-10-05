import {Typography,Button} from "@mui/material";
import BasicModal from "./Modal"
import React,{useRef,useState,useEffect} from "react";
import { MpRounded } from "@mui/icons-material";
import { Box } from "@mui/system";
import WalletBalanceView from "././walletBalance"
import ExpensesView from "././expenses"
import RecentTransactionView from "./recentTransaction"
import  './expenseTrack.css'
import PieChartUI from "./pieChart"




const ExpenseUI=()=>{

const childRef = useRef();
const walletRef=useRef();
const[transactionDataobj, setTransactionDataobj]=useState(()=>{
let data=localStorage.getItem("expenses");
return data?JSON.parse(data):[];
},[]);

const categories=["Food","Travel","Entertainment"];

const[totalExpenseAmount, setTotalExpenseAmount]=useState(()=>{
  let stored= localStorage.getItem("expenseAmount");
  return stored?JSON.parse(stored):0;
},[]);

const[filteredchartdata,setfilteredchartdata]=useState([]);

 const[deleteindex,setdeleteindex]=useState();

useEffect(()=>{
const totalamount=calculateTotalExpenseAmount();
setTotalExpenseAmount(totalamount);
localStorage.setItem("expenseAmount",JSON.stringify(totalamount));
filterChartcontent();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[transactionDataobj]);

const ontransactionAdd=(obj)=>{
    if(obj){
const newobj=[...transactionDataobj,obj]
setTransactionDataobj(newobj);
localStorage.setItem("expenses",JSON.stringify(newobj));
    }
}


 const calculateTotalExpenseAmount=()=>{
    return transactionDataobj.reduce((sum,data)=>{
return sum+data.Price;
    },0)
 }

const handleDeletion=(indextodelete)=>{
const removeprice= transactionDataobj[indextodelete]?.Price

const updatedList=transactionDataobj.filter((_,index)=>index!==indextodelete);
setTransactionDataobj(updatedList);
localStorage.setItem("expenses",JSON.stringify(updatedList));
if(typeof removeprice==="number"){
updatewalletBalance(removeprice);
}
}


const updatewalletBalance=(amount)=>{
 const walletbalance=walletRef.current?.getValue();
 console.log("tuma",walletbalance);
  const updateBalance= walletbalance+amount;
  walletRef.current?.setdisplaybalance(updateBalance);
}

const editmodal=(dataindex)=>{

for(let i=0;i<transactionDataobj.length;i++){
const data=transactionDataobj[i];
if(dataindex===i){
    childRef.current.openModal(data,dataindex);
    break;
}
}
}

const onUpdateTransactiondata=(data, index)=>{
    const updatedData=[...transactionDataobj];
for(let i=0;i<transactionDataobj.length;i++){

    if(index===i){
        updatedData[i]=data;
        setTransactionDataobj(updatedData);
        localStorage.setItem("expenses",JSON.stringify(updatedData));
        break;
    }
}
}

const filterChartcontent=()=>{
 
const filtereddata=  transactionDataobj.map(data=>({

      name:data.category,
      value:data.Price,
    }));


setfilteredchartdata(filtereddata);

}


return(
<Box className="expensetab">
<Box className="expensetabsub">
<Typography variant="h1" sx={{width:"251px",height:"37px",fontFamily:"Ubuntu",fontWeight:700,fontSize:"32px",pb:"9px",color:"#FFFFFF"}}>Expense Tracker</Typography>
<Box className="BalanceTrackerbox">
<Box className="expenseview">
<WalletBalanceView totalexpenseAmount={totalExpenseAmount} updatewalletBalance={updatewalletBalance} ref={walletRef}/>
<ExpensesView settransactionData={ontransactionAdd} updatetransactionData={onUpdateTransactiondata} totalExpenseAmount={totalExpenseAmount} ref={childRef}/>
</Box>
<PieChartUI data={filteredchartdata} categories={categories}></PieChartUI>
</Box>
<Box className="recenttransaction" style={{display:"flex"}}>
<RecentTransactionView data={filteredchartdata} transactionobj={transactionDataobj} handleDeletion={handleDeletion} handleEdit={(index)=>editmodal(index)}/>
</Box>
</Box>
</Box>
    );
 }

 export default ExpenseUI;