<template>
  <tr
    class="todo-item__todo"
    :class="{ completed: completed == 1, 'is-visible': isTodoVisible }"
  >
    <td class="remove" align="center" width="30">
      <button @click="remove(id)" type="submit" class="todo-item-btn__remove">
        <span class="glyphicon glyphicon-trash glyphicon-white"></span>
      </button>
    </td>
    <td>{{ id }}</td>
    <td>
      <button
        v-if="!isActive"
        class="todo-item__link text-info"
        @click="$emit('update:activeId', id)"
      >
        {{ description }}
      </button>
      <template v-else>{{ description }}</template>
    </td>
    <td>{{ user_id }}</td>
    <td width="54" class="complete">
      <div class="todo-item__checkbox">
        <input
          v-if="completed == 1"
          @change="complete(id)"
          :id="'btn-' + id"
          type="checkbox"
          class="todo-item__btn"
          checked
        />
        <input
          v-else
          @change="complete(id)"
          :id="'btn-' + id"
          type="checkbox"
          class="todo-item__btn"
        />
        <label
          class="todo-item__check"
          :class="{ checked: completed == 1 }"
          :for="'btn-' + id"
        >
          <div class="todo-item__inner-check"></div>
        </label>
        <div class="todo-item__circle-1"></div>
        <div class="todo-item__circle-2">
          <div class="todo-item__line-group">
            <div class="todo-item__line"></div>
            <div class="todo-item__line"></div>
            <div class="todo-item__line"></div>
            <div class="todo-item__line"></div>
            <div class="todo-item__line"></div>
            <div class="todo-item__line"></div>
            <div class="todo-item__line"></div>
            <div class="todo-item__line"></div>
            <div class="todo-item__line"></div>
            <div class="todo-item__line"></div>
          </div>
        </div>
      </div>
    </td>
  </tr>
</template>
<script>
import TodoMixin from '../lib/Misc/TodoMixin'

export default {
  name: 'TodoItem',
  mixins: [TodoMixin],
  props: {
    id: String,
    user_id: String,
    description: {
      type: String,
      required: true
    },
    completed: String,
    baseurl: String,
    isActive: Boolean
  }
}
</script>

<style type="text/css">
.todo-item__todo td:first-child {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}

.todo-item__todo td:last-child {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}

.todo-item__todo > td {
  border: 0;
  border-top: 0;
  overflow: hidden;
  position: relative;
  transition: ease opacity 0.2s;
}

.todo-item__todo.todo-item__todo.completed td:not(.complete):not(.remove) {
  opacity: 0.2;
  transition: ease opacity 0.2s;
}

.todo-item__todo.is-visible {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 0.2s linear;
}

.todo-item__todo:not(.is-visible) {
  opacity: 0;
  transform: translateX(20px);
  transition: transform 0.1s linear, opacity 0.2s linear;
}

.todo-item-btn__remove {
  align-items: center;
  background-color: #3399ff;
  border: 0;
  border-radius: 100%;
  color: #fff;
  display: flex;
  justify-content: center;
  padding: 0;
  height: 2.4rem;
  width: 2.4rem;
}

@media (min-width: 999px) {
  .todo-item-btn__remove {
    transform: scale(0);
    transition: ease width 0.2s, ease transform 0.2s;
  }
}

.todo-item-btn__remove .glyphicon {
  font-size: 1.2rem;
}

@media (min-width: 999px) {
  .todo-item-btn__remove .glyphicon {
    display: none;
  }
}

.todo-item__todo:hover .todo-item-btn__remove {
  transform: scale(1);
  transition: ease width 0.2s, ease transform 0.2s;
}

@media (min-width: 999px) {
  .todo-item__todo:hover .todo-item-btn__remove .glyphicon {
    display: block;
  }
}

.todo-item__link {
  background: transparent;
  border: 0;
  padding: 0;
  text-align: left;
  white-space: inherit;
}

.todo-item__checkbox {
  align-items: center;
  position: relative;
  display: flex;
  justify-content: center;
}

.todo-item__btn {
  display: none;
}

.todo-item__check.checked ~ .todo-item__circle-1 {
  animation: circle 0.6s forwards;
}

.todo-item__check.checked ~ .todo-item__circle-2 {
  animation: circle 0.5s ease 0.1s forwards;
}

.todo-item__check.checked .todo-item__inner-check {
  animation: inner-check 0.6s cubic-bezier(0.1, 1, 0.1, 1) forwards;
}

.todo-item__check {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 20px;
  width: 20px;
  background: #20cc82;
  border-radius: 50%;
}

.todo-item__check .todo-item__inner-check {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  transform: scale(0);
  animation: inner-check-rev 0.5s;
}

.todo-item__circle-1,
.todo-item__circle-2 {
  position: absolute;
  width: 35px;
  height: 35px;
  transform: scale(0);
  border-radius: 50%;
  border: 3px solid #8bbabb;
  top: -7px;
  animation: circle-rev 0.5s;
}

.todo-item__circle-2 {
  width: 50px;
  height: 50px;
  top: -14px;
}

.todo-item__circle-2 .todo-item__line-group {
  height: 14px;
  width: 2px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.todo-item__circle-2 .todo-item__line-group .todo-item__line {
  position: absolute;
  width: 2px;
  height: 14px;
  background: #8bbabb;
}

.todo-item__line:nth-child(1) {
  transform: rotate(360deg / 10 * 1) translateY(-80px);
}

.todo-item__line:nth-child(2) {
  transform: rotate(360deg / 10 * 2) translateY(-80px);
}

.todo-item__line:nth-child(3) {
  transform: rotate(360deg / 10 * 3) translateY(-80px);
}

.todo-item__line:nth-child(4) {
  transform: rotate(360deg / 10 * 4) translateY(-80px);
}

.todo-item__line:nth-child(5) {
  transform: rotate(360deg / 10 * 5) translateY(-80px);
}

.todo-item__line:nth-child(6) {
  transform: rotate(360deg / 10 * 6) translateY(-80px);
}

.todo-item__line:nth-child(7) {
  transform: rotate(360deg / 10 * 7) translateY(-80px);
}

.todo-item__line:nth-child(8) {
  transform: rotate(360deg / 10 * 8) translateY(-80px);
}

.todo-item__line:nth-child(9) {
  transform: rotate(360deg / 10 * 9) translateY(-80px);
}

.todo-item__line:nth-child(10) {
  transform: rotate(360deg / 10 * 10) translateY(-80px);
}

@keyframes circle {
  0% {
    transform: scale(1);
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    transform: scale(0);
  }
}

@keyframes circle-rev {
  0% {
    transform: scale(0);
  }

  50% {
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 0;
  }
}

@keyframes inner-check {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes inner-check-rev {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}
</style>
