import React, { useEffect, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'
import { Box, Button, Card, Container, FormControl, Grid, outlinedInputClasses, Paper, TextField } from '@mui/material';
import { Grade, TimeToLeave, Title } from '@mui/icons-material';
import TodoList from './TodoList';
import { blue } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import '../index.css'
import { addDoc, collection, deleteDoc, doc, DocumentSnapshot, getDoc, onSnapshot, query, QuerySnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
const TodoForm = () => {
   const [Input, setInput] = useState('');
   const [todo, setTodo] = useState([]);
   const [edit, setEdit] = useState(false)
   const [id, setId] = useState('')

   const inputChange = (e) => {
      setInput(e.target.value)

   }



   const paperStyle = {
      padding: '30px 20px', width: 500, margin: '20px auto',

   }

   const create_input = async (e) => {
      e.preventDefault(e);
      if (Input === "") {
         alert('please enter valid todo');
         return;
      };
      if (edit) {
         const t = doc(db, 'todo', id);
         await updateDoc(t, { title: Input });
         setEdit(false);
         setInput('')
         return;
      }
      await addDoc(collection(db, 'todo'), {
         title: Input,
         completed: false,
      });
      setInput("");


   }
   const updateData = async (id) => {
      const t = doc(db, 'todo', id);
      const document = await getDoc(t);
      const item = document.data();
      setId(id);
      setEdit(true)
      setInput(item.title);
   }

   useEffect(() => {
      const q = query(collection(db, 'todo'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
         let todoArr = [];
         querySnapshot.forEach((doc) => {
            todoArr.push({ ...doc.data(), id: doc.id });
         });
         setTodo(todoArr);
      });
      return () => unsubscribe();
   }, []);



   return (
      <Grid>
         <Paper elevation={20} style={paperStyle}>
            <Container maxWidth="sm" >
               <form onSubmit={create_input}  >
                  <FormControl >
                     <Box sx={{ fontSize: 50 }}> Todo list App</Box>
                     <Box>
                        <TextField className='tex'
                           style={{
                              marginTop: 15, marginRight: 10, width: 378,
                              fontSize: 20,
                           }}
                           label="Enter Tesks"
                           InputLabelProps={{
                              shrink: true,
                           }}
                           variant="standard"
                           value={Input}
                           onChange={inputChange}


                        />
                        <Button className='newBtn' variant='contained' style={{ marginTop: 25, }}
                           color='primary' type='submit'
                        ><AddIcon /></Button>

                     </Box>

                  </FormControl>
               </form>
               <Box sx={{ marginRight: 20, width: 470, textAlign: 'center' }} ><TodoList todos={todo}
                  setTodos={setTodo}
                  updateData={updateData}
               /></Box>

            </Container>
         </Paper>
      </Grid>
   )
}

export default TodoForm