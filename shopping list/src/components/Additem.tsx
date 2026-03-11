
//additem2엔 강사님버전 additem버전 넣기.
// 쇼핑리스트에 가격추가하기 연습 복습 예습.............. 어떻게하면 굴러갈지 
// 3/11 저녁에 학습 담날 시작은 할수있도록연습하기
//properties가 여러개이면 handlechange 정의한다. 
// 1-2개면은 별개의 화살표함수를 적용하여 작성
// component additem tsx
import { useState } from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
//주의
import { Item } from '../App'; 
//자료형 정의 파트
type AddItemProps = {
  addItem : (Item : Item) => void
}
export default function AddItem(props: AddItemProps){//PROPS
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<Item>({
      product: '',
      amount: '',
  })
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const addItem = () =>{
    props.addItem(item); // 
    //
    setItem({product:'', amount: '' })
    handleClose();
  }
//checkpoint2 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };  

  const handleAddItem = () => {
    props.addItem(item); 
    setItem({ product: '', amount: '' }); 
    handleClose(); 
  };
  return(
    <>
    <Button onClick={handleOpen} variant="outlined" >Add Item </Button>
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
      <Button onClick={addItem}>        
        add
      </Button>
    </DialogActions>
    </Dialog>
    </>
  );
}