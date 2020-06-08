import './index.css';
import React from 'react';
//import Paper from '@material-ui/core/Paper';
//Routing
// import NavMenu from './Sidebar/NavMenu';
import Drawer from './Sidebar/Drawer'
//apollo
// import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

function App() {
  // return <div> <NavMenu/></div>
  return <div> <Drawer/></div>
}

// const TodosQuery = gql`
// {
//   todos {
//     id
//     text
//     complete
//   }
// }
// `;

// function App2() {
//   const { loading, error, data } = useQuery(TodosQuery);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;

//   return (
//   data.todos.map(( todo) => (
//     <div style ={{ display: "flex"}}> 
//     <div style={{margin:"auto", width:400}}>
//       <Paper elevation ={1}>
//      <div key = {`${todo.id}-todo-item`}>
//         {todo.text} 
//     </div>
//     </Paper>
//     </div>
//     </div>
//   )));

// }



export default App;
