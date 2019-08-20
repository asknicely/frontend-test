<template>
  <tr class="todo" :class="{ completed: completed == 1 }">
    <td width="54" class="complete">
      <label class="switch">
        <input
          @change="complete(id)"
          v-if="completed == 1"
          type="checkbox"
          checked
        />
        <input @change="complete(id)" v-else type="checkbox" />
        <span :class="{ checked: completed == 1 }" class="slider round"> </span>
      </label>
    </td>
    <td>{{ id }}</td>
    <td>
      <button
        v-if="!isActive"
        class="todo-item__link text-primary"
        @click="$emit('update:activeId', id)"
      >
        {{ description }}
      </button>
      <template v-else>{{ description }}</template>
    </td>
    <td>{{ user_id }}</td>
    <td class="remove" width="20" align="center">
      <button
        @click="remove(id)"
        type="submit"
        class="btn btn-xs btn-transparent"
      >
        <span class="glyphicon glyphicon-trash glyphicon-white"></span>
      </button>
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
    description: String,
    completed: String,
    baseurl: String,
    isActive: Boolean
  }
}
</script>

<style type="text/css">
tr td {
  transition: ease opacity 0.2s;
}
tr.todo.completed td:not(.complete):not(.remove) {
  opacity: 0.2;
  transition: ease opacity 0.2s;
}
.todo-item__link {
  background: transparent;
  border: 0;
  color: #3399ff;
  padding: 0;
  text-align: left;
  white-space: inherit;
}
.switch {
  position: relative;
  display: inline-block;
  margin: 0;
  width: 2.5em;
  height: 1.6em;
}
.switch input {
  display: none;
}
.slider {
  position: absolute;
  cursor: pointer;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f2f2f2;
  transition: 0.2s;
}
.slider:before {
  position: absolute;
  z-index: 2;
  content: "";
  height: 20px;
  width: 20px;
  left: 2px;
  bottom: 1px;
  background-color: #101010;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.22);
  transition: all 0.2s ease-in-out;
}
.slider:after {
  position: absolute;
  left: 0;
  z-index: 1;
  content: "";
  font-size: 1em;
  text-align: left !important;
  line-height: 95px;
  padding-left: 0;
  width: 1em;
  color: #fff;
  height: 1.6em;
  border-radius: 100px;
  background-color: #3399ff;
  transform: translateX(-1em);
  transition: all 0.4s ease-in-out;
}

.slider.checked:after {
  transform: translateX(0px);
  /*width: 235px;*/
  padding-left: 35px;
}

.slider.checked:before {
  background-color: #fff;
}

.slider.checked:before {
  transform: translateX(1em);
}

/* Rounded sliders */
.slider.round {
  border-radius: 100px;
}

.slider.round:before {
  border-radius: 50%;
}
.absolute-no {
  position: absolute;
  left: 0;
  color: #101010;
  text-align: right !important;
  font-size: 1rem;
  width: calc(100% - 25px);
  height: 1em;
  line-height: 2em;
  cursor: pointer;
  z-index: 10;
}
</style>
