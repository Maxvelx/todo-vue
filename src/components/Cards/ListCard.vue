<script setup>
import TaskCard from "@/components/Cards/TaskCard.vue";
import {ref, watch} from 'vue';
import {useTodoStore} from "@/stores/useTodoStore";
import {useClickOutside} from "@/services/useClickOutside";
import {useDragAndDrop} from "@/services/useDragAndDrop";
import {useTodoCRUD} from "@/services/useTodoCRUD";

const props = defineProps({
  list: Object,
});

const todoStore = useTodoStore();
const {onDragStart, onDragOver} = useDragAndDrop();
const {handleAddTask, handleEditList, handleDeleteList} = useTodoCRUD();
const taskAddEvent = ref(null);
const listEditEvent = ref(null);

const {isClickedOutside: taskAddEventClick} = useClickOutside(taskAddEvent);
const {isClickedOutside: listEditEventClick} = useClickOutside(listEditEvent);

watch([taskAddEventClick, listEditEventClick], ([taskAddEventClick, listEditEventClick]) => {
  taskAddEventClick ? handleAddTask(props.list) : null;
  listEditEventClick ? handleEditList(props.list) : null;
});
</script>

<template>
  <div class="list-card" :id="'list-'+props.list.id"
       @drop="onDragOver($event, props.list.id)" @dragover.prevent @dragenter.prevent>
    <div class="list-card-header" ref="listEditEvent" @dblclick="todoStore.listEdit = props.list.id">
      <h3 class="list-card-title" v-if="todoStore.listEdit !== props.list.id">{{ props.list.title }}</h3>
      <textarea class="textarea-add" autofocus
             v-if="todoStore.listEdit === props.list.id"
             v-model="props.list.title"
             @keyup.enter="handleEditList(props.list)" />

      <button class="btn-card-delete" id="list-card-delete"
              v-if="todoStore.listEdit !== props.list.id"
              @click="handleDeleteList(props.list.id)">x
      </button>
    </div>

    <TaskCard v-for="task in todoStore.tasks.filter((i) => i.listId === props.list.id)" :key="task.id"
              :task="task"
              draggable="true"
              @dragstart="onDragStart($event, task)" />

    <div class="task-card card-add" :class="todoStore.taskAdd === props.list.id ? 'show' : ''"
         ref="taskAddEvent"
         @click="todoStore.taskAdd = props.list.id">
      <div v-if="todoStore.taskAdd !== props.list.id">+</div>
      <textarea class="textarea-add" placeholder="Task title" autofocus
             v-if="todoStore.taskAdd === props.list.id"
             v-model="todoStore.taskTitle"
             @keyup.enter="handleAddTask(props.list)" />
      <select class="textarea-add"
              v-if="todoStore.taskAdd === props.list.id"
              v-model="todoStore.taskPriority">
        <option value="" disabled selected>Select priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>

  </div>
</template>
