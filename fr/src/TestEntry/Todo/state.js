import { configure } from "mobx";
import Todo from './todo';

configure({enforceActions: "observed"});


const todo = new Todo();


const store = { todo } 

export default store;