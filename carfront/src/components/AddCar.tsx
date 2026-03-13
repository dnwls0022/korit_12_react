import { Dialog,DialogActions,DialogContent,DialogTitle } from "@mui/material"
import { Car } from "../Types"
import { useState } from "react"
import { addCar } from "../api/Carapi"
import { useMutation, useQueryClient } from "@tanstack/react-query"



export default function AddCar() {
  const queryClient = useQueryClient();

  const {mutate} = useMutation(addCar,{
    onSuccess: () =>{
      queryClient.invalidateQueries(['cars'])

    },
    onError: err => console.log(err),
  });

  const [open,setOpen]= useState(false)
  const [car,setCar]= useState<Car>({
  brand : '',
  model : '',
  color :'',
  registrationNumber: '',
  modelYear: 0,
  price :0
  });

  // cancel save add 시에  
  const handleClickOpen = () => setOpen(true)
  const handleClickClose = () => setOpen(false)
  // 20260311 md 체크포인트참조
  // 자바의 모든클래스는 오브젝트를 상속받듯이 모든리액트는 리액트클래스의 상속을받음
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
  setCar({ ...car, [event.target.name]: event.target.value })
  }

  const handleSave = () =>{
    mutate(car);  // carapi.ts에 있는 
    setCar({
  brand : '',
  model : '',
  color :'',
  registrationNumber: '',
  modelYear: 0,
  price :0
  })
  handleClickClose();
  }


  
  return(
    <>
    <button onClick={handleClickOpen}>뉴카 </button>
    <Dialog open={open} onClose={handleClickClose}>
      <DialogTitle>뉴카</DialogTitle>
      <DialogContent>
        <input type="text" placeholder="Brand" name="brand" value={car.brand} onChange={handleChange}/> <br />
        <input type="text"  placeholder="Model" name="model" value={car.model} onChange={handleChange}/> <br />
        <input type="text"   placeholder="Color" name="color" value={car.color} onChange={handleChange}/> <br />
        <input type="text"   placeholder="RegistrationNumber" name="registrationNumber" value={car.registrationNumber} onChange={handleChange}/> <br />
        <input type="number"  placeholder="ModelYear" name="modelYear" value={car.modelYear} onChange={handleChange}/> <br />
        <input type="number"  placeholder="Price" name="price" value={car.price} onChange={handleChange}/> <br />
        
      </DialogContent>
      <DialogActions>
        <button onClick={handleClickClose}>cancel</button>
        <button onClick={handleSave}>save</button>
      </DialogActions>
    
    
    </Dialog>


    </>
  )
}