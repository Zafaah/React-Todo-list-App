import React, { useState } from 'react'
import {
   Box, Card,
   CardContent,
   Checkbox,
   Container,
   IconButton,
   Typography
} from '@mui/material'
import { width } from '@mui/system'
import { db } from '../firebase'
import { CheckBox, CheckBoxOutlineBlank, Delete, Edit } from '@mui/icons-material'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { type } from '@testing-library/user-event/dist/type'

const TodoList = ({ todos, setTodos, updateData }) => {


   const deleteTodo = async (id) => {
      await deleteDoc(doc(db, 'todo', id))
   }

   const handleCheck = async (id, status) => {
      const t = doc(db, 'todo', id);
      await updateDoc(t, { completed: status })

   }
   return (
      <div>
         {todos && todos.map((todo) => (
            <Card variant='outlined'
               style={{ marginTop: 20, widows: 400 }}
               key={todo.id}
               onChange={(event) => event.preventDefault()}

            >
               <CardContent>

                  <Typography variant='h5' component="h2">
                     <Checkbox onChange={() => handleCheck(todo.id, !todo.completed)}
                        checked={todo.completed} style={{ color: 'green', float: 'left', marginBottom: 20 }} />

                     <IconButton onClick={() => deleteTodo(todo.id)} style={{ float: 'right' }}>
                        <Delete style={{ color: "red", }} />
                     </IconButton>
                     <IconButton onClick={() => updateData(todo.id)} style={{ float: 'right' }}>
                        <Edit style={{ color: "red" }} />
                     </IconButton>
                     {todo.title}
                     {todo.text}
                  </Typography>

               </CardContent>
            </Card>




         ))
         }
















      </div>
   )
}

export default TodoList

// {
//    todos.Map((todo) => (
//       <li className='todo-list' key={todo.id}>
//          <Input value={todo.title}
//             onChange={(event) => event.preventDefault()} ></Input>

//       </li>
//    ))
// }