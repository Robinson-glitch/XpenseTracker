import * as React from 'react';
import Box from '@mui/material/Box';
import {Button,TextField} from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useState,useEffect,forwardRef,useImperativeHandle} from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import './Modal.css';
import './expenses';
import MenuItem from '@mui/material/MenuItem';
import { EventBusy } from '@mui/icons-material';
import { format } from 'date-fns';
// import React, { forwardRef } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

 const BasicModal=forwardRef((props,ref)=> {
  // const [open, setOpen] = React.useState(false);
  // const handleClose = () => setOpen(false);
  const[income, setincomevalue]=useState();
  const[title,settitle]=useState("");
  const[price, setprice]=useState();
  const[titleError,settitleError]=useState();
  const[priceError,setpriceError]=useState();
  const[dateError,setdateError]=useState();
  const[categoryError,setcategoryError]=useState();
  const[date,setDate]=useState(dayjs());
  const[category,setcategoryvalue]=useState("");

const{isediting,open, onClose,isWalletView,onClickSubmit,onClickUpdate,handleAddBalance}=props;
  useEffect(()=>{
    
    if(!open){
      settitle("");
      setprice("");
      setincomevalue("");
      setDate(null);
      setcategoryvalue("")
      settitleError(undefined);
      setpriceError(undefined);
      setdateError(undefined);
      setcategoryError(undefined);
    }
  },[open]);

  
 
   useImperativeHandle(ref, () => ({
      setmodaldata
    }));

const setmodaldata=(data)=>{
setincomevalue(data.income);
settitle(data.Title);
setprice(data.Price);
setcategoryvalue(data.category);
setDate(dayjs(data.date))
  }
  
  const AddExpense=(event)=>{
     
   event.preventDefault();
   if(!title){
   settitleError(true)
   }
   else if(!price){
    setpriceError(true);
   }
   
   else if(!date){
    setdateError(true);
   }

   else if(!category){
    setcategoryError(true);
   }
else{
let priceval= parseInt(price);
const balance=localStorage.getItem('amount');
const expenses= localStorage.getItem('expenseAmount');
if(JSON.parse(balance)<JSON.parse(expenses)+priceval){
  alert("you are on fucking deficit bro");
}
else{
onClose();
const dateformatted = format(date,'yyyy-MM-dd');
    const expenseobj={
      Title:title,
      Price:priceval,
      category:category,
      date:dateformatted
    }
    onClickSubmit(expenseobj);
  }
  }
  }
const onHandleTitle=(event)=>{
settitle(event.target.value);
settitleError(false);
  }

const onHandlePrice=(event)=>{
    setprice(event.target.value);
    setpriceError(false);
}

const updateExpense=(event)=>{
  // event.preventDefault();
   if(!title){
   settitleError(true)
   }
   else if(!price){
    setpriceError(true);
   }
   
   else if(!date){
    setdateError(true);
   }

   else if(!category){
    setcategoryError(true);
   }
else{
let priceval= parseInt(price);
const dateformatted = format(date,'yyyy-MM-dd');
    const updateobj={
      Title:title,
      Price:priceval,
      category:category,
      date:dateformatted
    }
    onClickUpdate(updateobj);
  }
}

const onHandleIncome=(event)=>{
  setincomevalue(event.target.value);
}
  
   const onHandlecategory=(event)=>{
    setcategoryvalue(event.target.value);
    setcategoryError(false);
   }

const addBalance=()=>{
  if(income!==null){
 const inputAmount= parseInt(income);
 const incomeobj={
  amount:inputAmount
}
onClose();
  handleAddBalance(incomeobj);  
}
}


  return (
     <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isWalletView?<Box className="walletpopup" sx={{display:"flex",justifyContent:"space-between",gap:"10px"}}>
            <form onSubmit={(event)=>addBalance(event)}>
            <TextField className="IncomeInput" type="number" sx={{width:"150px", borderRadius:"8px"}} placeholder="Income Amount" value={income} onChange={(event)=>onHandleIncome(event)} variant="outlined" label="" />
            <Button type="submit" variant="contained">Add Balance</Button>
            <Button onClick={onClose} variant="contained">Cancel</Button>
            </form>
          </Box>:<form onSubmit={(event)=>AddExpense(event)}>
            <Box sx={{display:"flex", flexWrap:"wrap",gap:"10px"}}>
            <TextField sx={{width:"150px",gap:"10px"}} label=""  placeholder="title" name="title" type="text" value={title} onChange={(event)=>onHandleTitle(event)} variant="outlined" error={titleError} helperText={titleError?"Please enter title":" "} />
            <TextField sx={{width:"150px"}} label="" placeholder="price" name="price" type="number" value={price} onChange={(event)=>onHandlePrice(event)} variant="outlined" error={priceError} helperText={priceError?"Please enter Price":" "} />
           
         <select name="category" label="category" value={category} onChange={(event)=>onHandlecategory(event)}  sx={{width:"150px"}} variant="outlined">
             <option value="">Select Category</option>
              <option value="Food">food</option>
              <option value="Entertainment">entertainment</option>
              <option value="Travel">travel</option>
         </select>

              {/* <LocalizationProvider dateAdapter={AdapterDayjs}> 
              <DatePicker
              placeholder="dd/mm/yyyy"
              format="DD-MM-YYYY"
              value={date}
              onChange={(newValue)=>setDate(newValue)}
              />
             </LocalizationProvider> */}
             <input name="date"
  type="date" 
  value={dayjs(date).format('YYYY-MM-DD')} 
  onChange={(e) => setDate(dayjs(e.target.value))} 
/>
            {isediting?(<Button onClick={updateExpense} variant="contained">Update Expense</Button>):<Button type="submit" variant="contained">Add Expense</Button>}
            <Button onClick={onClose} variant="contained">Cancel</Button>
            </Box>
            </form>
            }
        </Box>
      </Modal>
    </div>
  );
});

export default BasicModal;