<script setup>
import {ref, watch} from 'vue';
import {useTodoStore} from "@/stores/useTodoStore";
import {useClickOutside} from "@/services/useClickOutside";
import {useTodoCRUD} from "@/services/useTodoCRUD";

const props = defineProps({
  task: Object,
});

const todoStore = useTodoStore();
const {handleEditTask, handleDeleteTask} = useTodoCRUD();
const taskEditEvent = ref(null);

const {isClickedOutside: taskEditEventClick} = useClickOutside(taskEditEvent);
watch(taskEditEventClick, (newValue) => {
  newValue ? handleEditTask(props.task) : null
})
</script>

<template>
  <div class="task-card">
    <p :id="'task-'+props.task.id" v-if="todoStore.taskEdit !== props.task.id" @dblclick="todoStore.taskEdit = props.task.id">
      <button class="btn-card-delete btn-right" id="task-card-delete"
              @click="handleDeleteTask(props.task.id)">
        x
      </button>
      <div class="task-card-body">
        <div class="task-title">{{ props.task.title }}</div>
        <div class="task-priority">{{ props.task.priority }}</div>
      </div>
    </p>
    <p class="task-card-body" ref="taskEditEvent" v-if="todoStore.taskEdit === props.task.id">
      <textarea class="textarea-add" autofocus
             v-model="props.task.title"
             @keyup.enter="handleEditTask(props.task)" />
      <select class="textarea-add" v-model="props.task.priority">
        <option value="" disabled>Select priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </p>
  </div>
</template>

