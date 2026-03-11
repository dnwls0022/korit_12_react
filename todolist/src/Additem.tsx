//요일 할일 시간
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
      dayname: '',
      todo: '',
      time: '',
      done: false,
      
  })
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const addItem = () =>{
    props.addItem(item); // 
    //
    setItem({dayname:'', todo: '',time: '',done:false, })
    handleClose();
  }
//checkpoint2 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };  

  const handleAddItem = () => {
    props.addItem(item); 
    setItem({ dayname: '', todo: '', time: '',done:false,  }); 
    handleClose(); 
  };
  return(
    <>
    <Button onClick={handleOpen} variant="text" >Add todo </Button>
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>NEW TODO List</DialogTitle>
    <DialogContent>
      <TextField name="dayname"       
      value={item.dayname} label= 'Dayname' margin="dense" fullWidth onChange={handleChange}>       
      </TextField>      
      <TextField name="todo" 
      value={item.todo} label= 'todo' margin="dense" fullWidth onChange={handleChange}>
      </TextField>
      <TextField name="time" 
      value={item.time} label= 'time' margin="dense" fullWidth onChange={handleChange}>
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