<script setup lang="ts">
import {ref, watch} from "vue";
import {useTodoStore} from "@/stores/useTodoStore";
import {useClickOutside} from "@/services/useClickOutside";
import {useTodoCRUD} from "@/services/useTodoCRUD";

const props = defineProps({
  board: Object,
});

const todoStore = useTodoStore();
const {handleEditBoard, handleDeleteBoard} = useTodoCRUD();
const boardEditEvent = ref(null);

const {isClickedOutside: boardEditEventClick} = useClickOutside(boardEditEvent);
watch(boardEditEventClick, (boardAddEventClick) => {
  boardAddEventClick ? handleEditBoard(props.board) : null
})
</script>

<template>
  <div :class="[todoStore.boardEdit != props.board.id ? 'sidebar-tab' : '']"
       @dblclick="todoStore.boardEdit = props.board.id">
    <template v-if="todoStore.boardEdit != props.board.id">{{ props.board.title }}</template>
    <textarea class="textarea-add sidebar-textarea-add" autofocus
           ref="boardEditEvent"
           v-if="todoStore.boardEdit == props.board.id"
           v-model="props.board.title"
           @keyup.enter="handleEditBoard(props.board)" />
    <button class="btn-card-delete" id="board-card-delete"
            v-if="!todoStore.boardEdit"
            @click="handleDeleteBoard(props.board.id)">
      x
    </button>
  </div>
</template>
