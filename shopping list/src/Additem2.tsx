// component additem tsx
import { useState } from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
//주의
import { Item } from '../App'; 

//checkpoint1
export default function AddItem2(props:any){//PROPS
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<Item>({
      product: '',
      amount: '',
  })

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

//checkpoint2 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };  

  // 2. [Add] 버튼 클릭 시 데이터를 부모로 보내는 함수
  const handleAddItem = () => {
    props.addItem(item); // 부모의 addItem 실행
    setItem({ product: '', amount: '' }); // 입력창 비우기
    handleClose(); // 창 닫기
  };


  
  return(

    <>
    <button onClick={handleOpen}>Add Item2</button>
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>NEW ITEM</DialogTitle>
    <DialogContent>
      <TextField name="product" 
      
      value={item.product} label= 'Product' margin="dense" fullWidth onChange={handleChange}>
        
      </TextField>
      
      <TextField name="amount" value={item.amount} label= 'Amount' margin="dense" fullWidth onChange={handleChange}>

      </TextField>

    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>
        cancel
      </Button>
      
      <Button onClick={handleAddItem} variant="contained" color="primary">add

      </Button>
    </DialogActions>
    </Dialog>
    </>
  );
}