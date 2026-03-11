import { useState } from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
//주의
import { Item } from "./App"; 
//자료형 정의 파트
type AddItemProps = {
  addItem : (Item : Item) => void
}
export default function AddItem(props: AddItemProps){//PROPS
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<Item>({
      product: '',
      amount: '',
      price: '' 
  })
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const addItem = () =>{
    props.addItem(item); // 
    //
    setItem({product:'', amount: '',price: '' })
    handleClose();
  }
//checkpoint2 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };  

  const handleAddItem = () => {
    props.addItem(item); 
    setItem({ product: '', amount: '', price: '' }); 
    handleClose(); 
  };
  return(
    <>
    <Button onClick={handleOpen} variant="text" >Add Item </Button>
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>NEW ITEM</DialogTitle>
    <DialogContent>
      <TextField name="product"       
      value={item.product} label= 'Product' margin="dense" fullWidth onChange={handleChange}>       
      </TextField>      
      <TextField name="amount" 
      value={item.amount} label= 'Amount' margin="dense" fullWidth onChange={handleChange}>
      </TextField>
      <TextField name="price" 
      value={item.price} label= 'price' margin="dense" fullWidth onChange={handleChange}>
      </TextField>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>
        cancel
      </Button>     
      <Button onClick={addItem}>        
        add
      </Button>
    </DialogActions>
    </Dialog>
    </>
  );
}