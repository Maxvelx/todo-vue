import { useTodoStore } from "@/stores/useTodoStore";
import { useLocalStorage } from "@/services/useLocalStorage"; 


export function useDragAndDrop() {
    
    const todoStore = useTodoStore();
    const { saveToLocalStorageBulk } = useLocalStorage(); 
    
    function onDragStart(e, task) {
        e.stopPropagation();
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("itemId", task.id.toString());
    }

    function onDragOver(e, newListId) {
        e.preventDefault();
        const mouseY = e.clientY;
        const itemId = parseInt(e.dataTransfer.getData("itemId"));
        const itemBeingDragged = todoStore.tasks.find(task => task.id === itemId);
        if (!itemBeingDragged) return;

        const newListTasks = todoStore.tasks.filter(task => task.listId === newListId).sort((a, b) => a.order - b.order);
        let targetIndex = newListTasks.length;

        for (let i = 0; i < newListTasks.length; i++) {
            const taskElement = document.getElementById(`task-${newListTasks[i].id}`);
            if (taskElement && mouseY < taskElement.getBoundingClientRect().bottom) {
                targetIndex = i;
                break;
            }
        }

        if (itemBeingDragged.listId !== newListId) {
            todoStore.tasks = todoStore.tasks.filter(task => task.id !== itemId);
        } else {
            newListTasks.splice(newListTasks.indexOf(itemBeingDragged), 1);
        }

        newListTasks.splice(targetIndex, 0, itemBeingDragged);
        newListTasks.forEach((task, index) => {
            task.order = index;
            task.listId = newListId;
        });

        todoStore.tasks = todoStore.tasks.filter(task => task.listId !== newListId).concat(newListTasks);
        saveToLocalStorageBulk('tasks', todoStore.tasks);
        todoStore.forceRerender();
    }

    function onDragStartList(e, list) {
        e.stopPropagation();
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("listId", list.id.toString());
    }

    function onDragOverList(e) {
        e.preventDefault();
        const mouseX = e.clientX;
        const listId = parseInt(e.dataTransfer.getData("listId"));
        const listBeingDragged = todoStore.lists.find(list => list.id === listId);
        if (!listBeingDragged) return;

        let targetIndex = todoStore.lists.length - 1;

        for (let i = 0; i < todoStore.lists.length; i++) {
            const listElement = document.getElementById(`list-${todoStore.lists[i].id}`);
            if (listElement) {
                const rect = listElement.getBoundingClientRect();
                const middleX = (rect.left + rect.right) / 2;
                if (mouseX < middleX) {
                    targetIndex = i;
                    break;
                }
            }
        }

        todoStore.lists.splice(todoStore.lists.indexOf(listBeingDragged), 1);
        todoStore.lists.splice(targetIndex, 0, listBeingDragged);
        todoStore.lists.forEach((list, index) => {
            list.order = index;
        });

        saveToLocalStorageBulk('lists', todoStore.lists);
        todoStore.forceRerender();
    }
    

    return { onDragStart, onDragOver, onDragStartList, onDragOverList };
} 
