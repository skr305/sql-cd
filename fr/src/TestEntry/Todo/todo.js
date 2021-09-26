import {action, makeAutoObservable} from 'mobx';

export default class Todo {
    todos = [];
    constructor() {
        makeAutoObservable(this);
    }

    finish(index) {
        this.todos.splice(index, 1);
    };

    add(todo) {
        this.todos.push(todo);
    };

    search(item) {
        for(let todo of this.todos) {
            if(todo == item) {
                return true;
            }
        }

        return false;
    }
}