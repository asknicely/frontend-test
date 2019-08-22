<template>
  <div class="col-md-4 col-md-offset-4">
    <h1>{{ title }}</h1>
    <table class="table table-striped todos-list">
      <tbody>
        <tr>
          <th>#</th>
          <th>Description</th>
          <th align="center">User</th>
          <th width="20"></th>
          <th width="54"></th>
        </tr>
        <template v-if="activeId">
          <transition name="fade">
            <TodoItem
              @update-todos="load()"
              v-on:update:activeId="activeId = $event"
              :isActive="true"
              :id="filterdTodos[0].id"
              :user_id="filterdTodos[0].user_id"
              :description="filterdTodos[0].description"
              :completed="filterdTodos[0].completed"
              :baseurl="baseurl"
            />
          </transition>
        </template>
        <template v-else>
          <TodoItem
            v-for="(todo, idx) in orderedtodos"
            @update-todos="load()"
            v-on:update:activeId="activeId = $event"
            :key="idx"
            :id="todo.id"
            :user_id="todo.user_id"
            :description="todo.description"
            :completed="todo.completed"
            :baseurl="baseurl"
          />
        </template>
      </tbody>
      <tfoot>
        <tr v-if="!activeId">
          <td colspan="4">
            <div class="todos-list__description">
              <input
                v-model="todoDescription"
                type="text"
                name="description"
                class="small-6 small-center todos-list-description__input"
                placeholder="Description..."
              />
              <span class="focus-border"></span>
            </div>
          </td>
          <td>
            <button
              v-if="todoDescription"
              @click="add()"
              class="btn btn-sm todos-list__add"
            >
              Add
            </button>
            <button
              v-else
              type="submit"
              disabled
              class="btn btn-sm btn-primary disabled"
            >
              Add
            </button>
          </td>
        </tr>
        <tr v-else>
          <td colspan="5">
            <button @click="activeId = null" class="btn btn-sm btn-primary">
              Back
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
import orderBy from "lodash";
import TodoMixin from "../lib/Misc/TodoMixin";
import TodoItem from "../components/TodoItem";

export default {
  name: "Todos",
  mixins: [TodoMixin],
  components: { TodoItem },
  computed: {
    orderedtodos() {
      /*
        reorder todo list if necessary
      */
      return orderBy.orderBy(this.todos, "id");
    },
    filterdTodos() {
      /*
        show active todo
      */
      const result = this.todos.filter(obj => {
        return obj.id === this.activeId;
      });
      return result;
    },
    title() {
      /*
        page title
      */
      if (this.activeId) {
        return "Todo:";
      } else {
        return "Todo List:";
      }
    }
  },
  data() {
    return {
      baseurl: ""
    };
  },
  created() {
    this.baseurl = this.$attrs.baseurl;
    this.load();
  }
};
</script>
<style type="text/css">
.btn-primary {
  background-color: #3399ff;
  border-color: #3399ff;
}
.todos-list__add {
  background-color: #3399ff;
  color: #fff;
}
.todos-list__description {
  display: inline-block;
  position: relative;
}
.todos-list-description__input {
  border: 0;
  padding: 0.5rem 0rem;
  border: 0;
  border-bottom: 1px solid #ccc;
}
.todos-list-description__input:focus {
  outline: 0;
}
.todos-list-description__input ~ .focus-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #3399ff;
  transition: 0.4s;
}
.todos-list-description__input:focus ~ .focus-border {
  width: 100%;
  transition: 0.4s;
}
tfoot td {
  position: relative;
}
</style>
