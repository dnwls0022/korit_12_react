import { Container,AppBar, Toolbar,Typography,List,ListItem, ListItemText } from '@mui/material'
import { useState } from 'react'
import './App.css'
//주의
import AddItem from './components/Additem'
export type Item = {
  product: string;
  amount: string;
}
function App() {
  const [items, setItems] = useState<Item[]>([]);
  const addItem = (item: Item) =>{
    setItems([item, ...items]);
    //배열을 업데이트해주는것setItems
  }
  return (
    <>
    <Container>
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6'>
          Shopping list
        </Typography>
      </Toolbar>
    </AppBar>
    <AddItem addItem={addItem} />
    <List>
    {
      items.map((item,index) =>
      <ListItem key={index} divider>
        
        <ListItemText 
        primary={item.product}
        secondary={item.amount}
        
        />
      </ListItem>
      )
    }  
    </List>  
    </Container> 
    </>
  )
}
export default App
