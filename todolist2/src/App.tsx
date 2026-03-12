import { useState } from 'react'
import { Container,TextField,Button,IconButton,Typography,List,ListItem, ListItemText,Box, Checkbox, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import './App.css'
import AddIcon from '@mui/icons-material/Add';
//add icon이 컴포넌트이고 그냥 DOM에 + 추가하는것
import DeleteIcon from '@mui/icons-material/Delete';


export type Todo = {
  id: number;
  text: string;
  completed: boolean;
}


function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputvalue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  //
  const handleAddTodo = ()  =>{
    if (inputvalue.trim() !== ''){
      setTodos([...todos,
        {id: Date.now(), text: inputvalue.trim(), completed:false}
      ]);
    }
    setInputValue('');
    setOpen(false);
  }
  const handleToggleTodo = (id:number) =>{
    setTodos(
      todos.map(todo => todo.id ===id ? {...todo, completed: !todo.completed} : todo)
        
      );
  }

  const handleDeleteTodo = (id:number) =>{
    setTodos(todos.filter(todo => todo.id !== id ))
  }
//p -> padding 안쪽영역
  
  const handleOpenDialog =() => setOpen(true)
  const handleCloseDialog =() => {
      setOpen(false);
      setInputValue('');
  }


//모달열리는 함수정의
return (
    <Container maxWidth='sm' sx={{mt: 5}}>
      <Paper elevation={3} sx={{p: 4, borderRadius: 2}}>
        
        <Box sx={{display: 'flex', justifyContent:'space-between', alignItems:'center', mt:3}}>
          <Typography 
            variant='h4'
            component='h1'
            color='primary'
            fontWeight='bold'    
            sx={{m:0}}

          >
            
            📝할일목록
          
          </Typography>
          <Button 
            variant='contained'
            color='secondary'
            onClick={handleOpenDialog}
            startIcon= {<AddIcon></AddIcon>}
            disableElevation
          >
          새할일
        </Button>
        </Box>
        
        {/** 할일 list출력*/}
        <List>
          {
          todos.map(todo =>(
            <ListItem
            key={todo.id}
            divider
            secondaryAction={
              <IconButton edge='end' aria-label='delete' onClick= 
                {() => handleDeleteTodo(todo.id)}>
                  <DeleteIcon color='error'  />   
              </IconButton>
            }
            disablePadding
            >
              <Checkbox
                edge='start'  
                checked={todo.completed}
                onChange={()=> handleToggleTodo(todo.id)}
              />
              <ListItemText
                primary={todo.text} 
                sx={{textDecoration: todo.completed ? 'line-through' : 'none'}}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth='md'>
        <DialogTitle> 할일추가 <AddIcon/></DialogTitle>
        <DialogContent>
          <TextField
          autoFocus
          margin='dense'
          label='할일입력'
          type='text'
          fullWidth
          variant='outlined'
          value={inputvalue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e =>{
            if (e.key === 'Enter'){ 
              handleAddTodo();
              
            }
          }}
          />
        </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>취소</Button>
            <Button onClick={handleAddTodo} variant='contained' disableElevation>추가</Button>
          </DialogActions>
        </Dialog>   

    </Container>
  )
}

export default App
//enter치면 addtodo함수실행