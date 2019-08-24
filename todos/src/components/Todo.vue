<template>
    <tr>
        <td>{{ todo.id }}</td>
        <td>{{ todo.user_id }}</td>
        <td>
            <template v-if="todo.completed">
                <strike>
                    {{ todo.description }}
                </strike>
            </template>
            <template v-else>
                {{ todo.description }}
            </template>
        </td>
        <td>
            <input type="checkbox" id="todo.id" v-model="todo.completed" @change.prevent="onChange()">
        
        </td>
        <td>
            <button type="submit" class="btn btn-danger" @click.prevent="onDelete">Delete</button>
        </td>
    </tr>
</template>

<script>
    import { mapGetters } from "vuex";
    export default {
        name: 'Todo',
        props: {
            todo: {
                require: true,
                type: Object
            }
        },
        computed: {
            ...mapGetters("user", ["getLoginedUser"])
        },
        methods:{
            onChange(){
                this.$store.dispatch('todos/completeTodoAsync',{todo: this.todo});
            },
            onDelete(){
                const todoTitle = this.todo.description;
                this.$store.dispatch('todos/deleteTodoAsync',{todo: this.todo});
                this.$emit('onDeleted', todoTitle);
            },
        }
    }
</script>
