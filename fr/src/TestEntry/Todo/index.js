import { notification, Button, Input } from 'antd';
import { inject, observer, Provider } from 'mobx-react';
import { useState } from 'react';
import store from './state';

const TodoApp = (props) => {

    const todo = props.todo;

    const [search_word, set_search_word] = useState("");
    const [item, set_item] = useState("");

    const sychon = (setter) => {
        return (e) => {
            setter(e.target.value);
        }
    }

    const addTodo = () => {
        todo.add(item);
    }

    const finish = (index) => {
        todo.finish(index);
    }

    const search = () => {
        if(todo.search(search_word)) {
            notification.open({
                message: `找到了${search_word}`
            })
        } else {
            notification.open({
                message: "找不到"
            })
        }
    }

    return (
        <>
            <Input onChange={sychon(set_search_word)}/>
            <Button onClick={search} > 搜索 </Button>
            <br></br>
            <Input onChange={sychon(set_item)}/> 
            <Button onClick={addTodo}>添加</Button>

            {
                todo.todos.map((item, index) => {
                    return (
                        <div>
                            {item}
                            <Button onClick={() => finish(index)}>√</Button>
                        </div>
                    )
                })
            }
        </>
    )
}


export default inject("todo")(observer(TodoApp));