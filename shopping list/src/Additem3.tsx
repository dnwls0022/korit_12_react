//주석 모두첨가한버전
//자식 additem
import { useState } from "react";
// MUI(Material UI)에서 예쁜 디자인의 컴포넌트들을 가져옵니다.
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
// 부모인 App.tsx에서 정의한 Item 타입(데이터 구조)을 재사용하기 위해 가져옵니다.
import { Item } from "./App";

// [자료형 정의 파트] 이 컴포넌트가 부모로부터 받아야 할 데이터(Props)의 명세서입니다.설정된 타입(AddItemProps) 타입을AddItemProps로 맞춘다.
type AddItemProps = {
  // addItem이라는 이름으로 함수를 받을 건데, Item 타입의 데이터를 인자로 받고 반환값은 없다(void)는 뜻입니다.
  addItem : (Item : Item) => void
}

// React 컴포넌트 정의: 부모가 주는 props를 설정된 타입(AddItemProps)에 맞춰 받습니다.
export default function AddItem(props: AddItemProps) {
  
  // [상태 관리 1] 다이얼로그(팝업창)가 열려 있는지(true), 닫혀 있는지(false)를 관리합니다.
  const [open, setOpen] = useState(false);

  // [상태 관리 2] 현재 입력창에 쓰고 있는 상품명과 수량을 객체 형태로 임시 저장합니다.
  const [item, setItem] = useState<Item>({
      product: '',
      amount: '',
  })

  // 팝업창을 여는 함수 (버튼 클릭 시 실행)
  const handleOpen = () => setOpen(true);
  
  // 팝업창을 닫는 함수 (취소 버튼이나 배경 클릭 시 실행)
  const handleClose = () => setOpen(true);

  // [핵심 로직] 'Add' 버튼을 눌렀을 때 실행되는 함수입니다.
  const addItem = () => {
    // 부모(App.tsx)가 내려준 addItem 함수를 호출하면서 현재 입력된 item 객체를 전달합니다.
    props.addItem(item); 
    
    // 입력이 끝났으니 다음 입력을 위해 입력란 내용을 깨끗이 비웁니다.
    setItem({ product: '', amount: '' })
    
    // 할 일을 다 했으니 팝업창을 닫습니다.
    handleClose();
  }

  // [입력 처리] 키보드로 글자를 칠 때마다 실시간으로 item 상태를 업데이트합니다.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ...item : 기존의 값을 복사하고 (Spread 연산자)
    // [e.target.name] : input의 name 속성(product 또는 amount)에 맞는 자리에
    // e.target.value : 방금 입력한 글자를 쏙 집어넣습니다.
    setItem({ ...item, [e.target.name]: e.target.value });
  };  

  return (
    <>
      {/* 화면에 항상 보이는 'Add Item' 버튼 */}
      <Button onClick={handleOpen} variant="outlined">Add Item</Button>

      {/* open 상태가 true일 때만 화면에 나타나는 팝업창(모달) */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>NEW ITEM</DialogTitle> {/* 팝업 제목 */}
        
        <DialogContent>
          {/* 상품명 입력란: name이 "product"이므로 handleChange에서 item.product를 바꿉니다. */}
          <TextField 
            name="product"       
            value={item.product} 
            label='Product' 
            margin="dense" 
            fullWidth 
            onChange={handleChange} 
          />       
          {/* 수량 입력란: name이 "amount"이므로 handleChange에서 item.amount를 바꿉니다. */}
          <TextField 
            name="amount" 
            value={item.amount} 
            label='Amount' 
            margin="dense" 
            fullWidth 
            onChange={handleChange} 
          />
        </DialogContent>

        <DialogActions>
          {/* 취소 버튼: 단순히 창만 닫습니다. */}
          <Button onClick={handleClose}>cancel</Button>     
          {/* 등록 버튼: 위에 정의한 addItem 함수를 실행하여 부모에게 데이터를 보냅니다. */}
          <Button onClick={addItem}>add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
/// 가격은 형변환을해줘야한다.
//  number를 대문자 price: Number(e.target.value)