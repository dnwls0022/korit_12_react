import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// import axios from "axios"
import { getCars, deleteCar } from "../api/Carapi";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Snackbar } from "@mui/material";
import { useState } from "react";
import AddCar from "./AddCar";


export default function Carlist(){
  const [open, setOpen] = useState (false);
  const queryClient = useQueryClient();

  // 


  //어싱클의 리턴값의 자료형 프롬이스 
  const columns: GridColDef[] =[
    {field: 'brand', headerName: 'Brand', width:200},
    {field: 'model', headerName: 'Model', width:200},
    {field: 'color', headerName: 'Color', width:200},
    {field: 'registrationNumber', headerName: 'Reg.No', width:200},
    {field: 'modelYear', headerName: 'Year', width:200},
    {field: 'price', headerName: 'Price', width:200},
    {
      field: 'delete', 
      headerName: '',  
      sortable:false, 
      filterable:false, 
      disableColumnMenu:true,
      renderCell: (params: GridCellParams)=>(
        <button
        onClick={()=> {
          
          if (confirm(`${params.row.brand}의 ${params.row.color} ${params.row.model}를 삭제하시겟습니까? ` ))
          {mutate(params.row._links.self.href)}
        
        }}
        >
          Delelte
          
          </button>
      )



    }
  ]



//유즈쿼리를쓸거라 객체구조분해사용
  const { data, error, isSuccess} = useQuery({
    queryKey: ['cars'],
    queryFn: getCars,

  });
//
  const {mutate} =useMutation(deleteCar, {
    onSuccess: () =>{
      setOpen=(true)
      queryClient.invalidateQueries({ queryKey: ['cars']})
      //invalidateQueries캐싱(쿼리) 무효화,,,캐싱 
      // 캐시를 쿼리가 가지고 
      // 반복적으로 axios에 저장도ㅓㅣ는것을방지하기위해 메모리에미리저장해두는ㅇ것.
      // 유즈쿼리사용하니까 쓰임({ queryKey: ['cars']}) get요청시에 쓴다
      //유즈쿼리 무효화 한세트
      //자동차삭제후실행되는 로직

    },
    onError : err =>{
      console.log(err);
    },
  })



  if(!isSuccess ){
    return <span> loading...</span>
  }
  else if(error){
    return<span> 오류발생</span>
    //근데 우리는 정상출력결과를보려고하는데 error일때를 굳이써야하나? 오류발생이거 맨밑에 else가 정상출력결과일때를 나타내는거잖아 정상출력결과일때가 나와야하는거라서 error일때 는 거의볼일없을거같은데
    //밑에 data.map에서 위에서 car의 배열데이터에서 값을 가져오는게 정상출력의 결과잖아
    //    
  }
  else{
    return(
      <>
      <AddCar/>
      <DataGrid
      rows={data}
      columns={columns}
      disableRowSelectionOnClick = {true}
      getRowId={row => row._links.self.href}
      />
      <Snackbar
      open={open}   
      autoHideDuration={2000}
      onClose={()=> setOpen(false)}
      message='해당정보삭제'
      />

      
      </>

    );
  }
}
