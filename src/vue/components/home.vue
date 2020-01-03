<template>
    <div class="md-layout home-layout">
        <div class="content" v-if="user">
            <h2>{{user.username}} Todo List</h2>
            <div v-if="todos">
                <md-list>
                    <transition-group name="slow-fade">
                        <md-list-item v-for="(todo, index)  in todos" :key="todo.id">
                            <span @click="$emit('settodostatus', todo, todo.completed === '1' ? '0' : '1')"
                                  class="clickable">
                                <md-icon v-if="todo.completed === '1'">check_box</md-icon>
                                <md-icon v-else>check_box_outline_blank</md-icon>
                            </span>
                            <div class="md-list-item-text">
                                {{todo.description}}
                                <div class="strikethrough" :class="{'active': todo.completed === '1'}"></div>
                            </div>
                            <span @click="$emit('removetodo', todo)" class="clickable">
                                <md-icon>delete</md-icon>
                            </span>
                        </md-list-item>
                        <md-list-item :key="-1">
                            <form class="md-list-item-text">
                                <md-field>
                                    <md-input id="new-todo-name"
                                              v-model="newTodoName"
                                              v-on:keydown.enter="addTodo"/>
                                </md-field>
                            </form>
                            <span @click="addTodo" class="clickable">
                                <md-icon>add</md-icon>
                            </span>
                        </md-list-item>
                    </transition-group>
                </md-list>
            </div>
            <div v-else>
                Loading
            </div>
        </div>
        <div class="content unauthenticated" v-else>
            <md-icon>lock</md-icon>
            <h2>
                You must be <a href="/login" @click="loadLogin">logged in</a> to view this page
            </h2>
        </div>
    </div>
</template>
<script>
    module.exports = {
        data: {
            newTodoName: '',
        },
        methods: {
            loadLogin: function (e) {
                e.preventDefault();
                this.$router.push('/login');
            },
            addTodo: async function (e) {
                e.preventDefault();
                await this.$emit('addtodo', this.newTodoName);

                // todo: there is an issue with this.$set(this, 'newTodoName', '') where the input persisted
                // todo: for now, highlight the input, preparing it for more input
                document.getElementById('new-todo-name').focus();
                document.getElementById('new-todo-name').select();
            }
        },
        props: ['user', 'todos']
    }
</script>