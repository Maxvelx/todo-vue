import {useTodoStore} from "@/stores/useTodoStore";
import {useLocalStorage} from "@/services/useLocalStorage";
import {ref} from "vue";

export function useTodoCRUD() {

    const todoStore = useTodoStore();
    const {saveToLocalStorage, removeFromLocalStorage} = useLocalStorage();

    // Lists CRUD
    const handleAddList = () => {
        if (todoStore.listTitle.length && todoStore.boardId) {
            todoStore.objectToPush = {
                id: Date.now(),
                title: todoStore.listTitle,
                boardId: todoStore.boardId,
            }
            saveToLocalStorage('lists', todoStore.objectToPush);
        }

        todoStore.valuesInit();
        todoStore.listAdd = false;
        todoStore.listTitle = '';
    };

    const handleEditList = (list) => {
        if (list.title.length) {
            todoStore.objectToPush = {
                id: list.id,
                title: list.title,
                boardId: list.boardId,
                order: list.order,
            }
            saveToLocalStorage('lists', todoStore.objectToPush);
        }
        todoStore.valuesInit();
        todoStore.listEdit = false;
    };

    const handleDeleteList = (id) => {
        if (confirm("Are you sure you want to delete this list?")) {
            todoStore.tasks.forEach((task) => {
                if (task.listId === id) {
                    saveToLocalStorage('tasks-archive', task);
                }
            })
            removeFromLocalStorage('lists', id);
            todoStore.valuesInit()
        }
    };

    // Boards CRUD
    const handleAddBoard = () => {
        if (todoStore.boardTitle.length) {
            todoStore.objectToPush = {
                id: Date.now(),
                title: todoStore.boardTitle,
            }
            saveToLocalStorage('boards', todoStore.objectToPush);
        }

        todoStore.valuesInit();
        todoStore.boardAdd = false;
        todoStore.boardTitle = '';
    };

    const handleEditBoard = (board) => {
        if (board.title.length) {
            todoStore.objectToPush = {
                id: board.id,
                title: board.title
            }
            saveToLocalStorage('boards', todoStore.objectToPush);
        }

        todoStore.valuesInit();
        todoStore.boardEdit = false;
        todoStore.boardTitle = '';
    }

    const handleDeleteBoard = (id) => {
        if (confirm("Are you sure you want to delete this board?")) {
            let confirmRemove = true
            todoStore.lists.forEach((list) => {
                if (list.boardId === id) {
                    confirmRemove = false
                }
            })
            if (confirmRemove) {
                removeFromLocalStorage('boards', id);
                todoStore.valuesInit();
            } else {
                alert("Can't delete board with lists on it")
            }
        }
    }

    // Tasks CRUD
    const handleAddTask = (list) => {
        if (todoStore.taskTitle.length) {
            todoStore.objectToPush = {
                id: Date.now(),
                title: todoStore.taskTitle,
                priority: todoStore.taskPriority,
                listId: list.id,
                order: 10000,
            }
            saveToLocalStorage('tasks', todoStore.objectToPush);
        }
        todoStore.valuesInit();
        todoStore.taskAdd = false;
        todoStore.taskTitle = '';
        todoStore.taskPriority = '';
    };

    const handleEditTask = (task) => {
        if (task.title.length) {
            todoStore.objectToPush = {
                id: task.id,
                title: task.title,
                priority: task.priority,
                listId: task.listId,
                order: task.order,
            }
            saveToLocalStorage('tasks', todoStore.objectToPush);
        }
        todoStore.taskEdit = false;
    };

    const handleDeleteTask = (id) => {
        if (confirm("Are you sure you want to delete this task?")) {
            removeFromLocalStorage('tasks', id);
            todoStore.valuesInit()
        }
    };


    return {
        handleAddList, handleEditList, handleDeleteList,
        handleAddBoard, handleEditBoard, handleDeleteBoard,
        handleAddTask, handleEditTask, handleDeleteTask
    };
} 
