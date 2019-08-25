<template>
    <tr>
        <td colspan="3">
            <div class="input-group"
                 v-bind:class="{ error: errors.first('Description') }">
                <input type="textbox" v-validate="'required'"
                       name="Description" class="small-6 small-center" v-model="formData.description" placeholder="Description...">
                <div class="error-message">{{ errors.first('Description') }}</div>
            </div>
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
           async onAdd(){
                const isValid = await this.$validator.validate();
                if(isValid) {
                    this.$store.dispatch('todos/addTodoAsync', {
                        description: this.formData.description,
                        userId: this.getLoginedUser.id
                    });
                    this.formData.description = null;
                    this.errors.clear();
                }
            },
          
        }
    }
</script>