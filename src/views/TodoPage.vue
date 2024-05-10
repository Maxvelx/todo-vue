<script setup>
import ListCard from "@/components/Cards/ListCard.vue";
import BoardTab from "@/components/Tabs/BoardTab.vue";
import {ref, watch} from "vue";
import {useTodoStore} from "@/stores/useTodoStore";
import {useClickOutside} from "@/services/useClickOutside";
import {useDragAndDrop} from "@/services/useDragAndDrop";
import {useTodoCRUD} from "@/services/useTodoCRUD";

const todoStore = useTodoStore();
const {onDragStartList, onDragOverList} = useDragAndDrop();
const {handleAddList, handleAddBoard} = useTodoCRUD();
const listAddEvent = ref(null);
const boardAddEvent = ref(null);
todoStore.boardId = todoStore.boards.length ? todoStore.boards[0].id : 0;


const {isClickedOutside: listAddEventClick} = useClickOutside(listAddEvent);
const {isClickedOutside: boardAddEventClick} = useClickOutside(boardAddEvent);
watch([listAddEventClick, boardAddEventClick], ([listAddEventClick, boardAddEventClick]) => {
  listAddEventClick ? handleAddList() : null
  boardAddEventClick ? handleAddBoard() : null
})
</script>

<template>
  <div class="container" :key="todoStore.componentKey">
    <nav class="sidebar">
      <h3 class="sidebar-header">To Do List</h3>
      <div class="sidebar-container">
        <BoardTab v-for="board in todoStore.boards" :key="board.id"
                  :board="board"
                  :class="todoStore.boardId === board.id ? 'active' : ''"
                  @click="todoStore.boardId = board.id" />
        <div class="sidebar-tab new-board"
             v-if="!todoStore.boardAdd"
             @click="todoStore.boardAdd = true">
          Create new board +
        </div>
        <textarea class="sidebar-textarea-add textarea-add" placeholder="Board title" autofocus
                  ref="boardAddEvent"
                  v-if="todoStore.boardAdd"
                  v-model="todoStore.boardTitle"
                  @keyup.enter="handleAddBoard" />
      </div>
    </nav>
    <div class="todo-board" @drop="onDragOverList($event)" @dragover.prevent @dragenter.prevent>
      <ListCard v-for="list in todoStore.lists.filter(i => i.boardId === todoStore.boardId)" :key="list.id"
                :list="list"
                draggable="true"
                @dragstart="onDragStartList($event, list)" />
      <div class="list-card card-add" id="list-add"
           ref="listAddEvent"
           v-if="todoStore.boards.length"
           :class="todoStore.listAdd ? 'show' : ''"
           @click="todoStore.listAdd = true">
        <div v-if="!todoStore.listAdd">+</div>
        <textarea class="textarea-add" placeholder="List title" autofocus
                  v-if="todoStore.listAdd"
                  v-model="todoStore.listTitle"
                  @keyup.enter="handleAddList" />
      </div>
    </div>
  </div>
</template>
