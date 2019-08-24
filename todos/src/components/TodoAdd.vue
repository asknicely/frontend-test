<template>
    <tr>
        <td colspan="3">
            <input type="textbox" name="description" class="small-6 small-center" v-model="formData.description" placeholder="Description...">
        </td>
        <td>
            <button class="btn btn-sm btn-primary" @click.prevent="onAdd">Add</button>
        </td>
    </tr>
 
</template>

<script>
    import { mapGetters } from "vuex";
    export default {
        name: 'Todo',
        data(){
            return {
                formData:{
                    description: undefined
                }
            }
        },
        computed: {
            ...mapGetters("user", ["getLoginedUser"])
        },
        methods:{
            onAdd(){
             this.$store.dispatch('todos/addTodoAsync',{description: this.formData.description, userId: this.getLoginedUser.id});
             this.formData.description=null;
            },
          
        }
    }
</script>