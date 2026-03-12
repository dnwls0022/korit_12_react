import { useState } from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { Item } from "../App";

type AddItemProps = {
  addItem: (Item:Item)=>void
}// 에드아이템이라고하는 함수이름을지어준것과 유사한 역할





export default function AddItem(props:AddItemProps){
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<Item>({
      product: '',
      amount: '',
      price: 0
  });

  const addItem = () =>{
    props.addItem(item);
    setItem({product:'',amount:'',price:0})
    handleClose();
  }
    //추가하는함수 추가하고는 input창을 비워둬야해서 

const handleOpen = () => setOpen(true);

const handleClose = () => setOpen(false);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  }; 


  return(
    <>
    <Button onClick={handleOpen} variant="outlined" style={{marginTop: '5px'}}>항목 추가</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>새 항목</DialogTitle>
        <DialogContent>
          <TextField value={item.product} label= '품목' margin='dense' fullWidth onChange={e => setItem ({...item, product:e.target.value})} />
          <TextField value={item.amount} label= '수량' margin='dense' fullWidth onChange={e => setItem ({...item, amount:e.target.value})} />
          <TextField value={item.price} label= '가격' margin='dense' fullWidth onChange={e => setItem ({...item, price: Number(e.target.value) || 0})} type='number' />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={addItem}>
            추가
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </>
    
  )
}