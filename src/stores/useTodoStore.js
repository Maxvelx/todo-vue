import {defineStore} from "pinia";

export const useTodoStore = defineStore('todo', {
    state: () => ({
        boards: JSON.parse(localStorage.getItem("boards")) ?? [],
        tasks: JSON.parse(localStorage.getItem("tasks")) ?? [],
        lists: JSON.parse(localStorage.getItem("lists")) ?? [],
        objectToPush: {},
        componentKey: 0,
        
        // Lists properties
        listAdd: false,
        listEdit: false,
        listTitle: '',
        
        // Boards properties
        boardAdd: false,
        boardEdit: false,
        boardTitle: '',
        boardId: null,
        
        // Tasks properties
        taskAdd: false,
        taskEdit: false,
        taskTitle: '',
        taskPriority: '',
        listId: null,
    }),
    getters: {},
    actions: {
        valuesInit() {
           this.lists = JSON.parse(localStorage.getItem('lists')) ?? [];
           this.tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];
           this.boards = JSON.parse(localStorage.getItem('boards')) ?? [];
        },

        forceRerender () { this.componentKey += 1 },
    }
})
