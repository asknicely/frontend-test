<template>
  <div class="input--container">
    <label for="">{{label}}</label>
    <input class="input--item__height" :type="type" :value="value" :placeholder="placeholder" @input="onInput">
    <div class="input--indicator" v-show="errStatus">{{errMessage}}</div>
  </div>
</template>

<script>
import Schema from "async-validator";
export default {
  inject: ["tForm"],
  props: {
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    prop: {
      type: String,
      default: ""
    },
    value:{
      type:String,
      default:''
    },
    type:{
      type:String,
      default:'text'
    }
  },
  data() {
    return {
      errMessage: "",
      errStatus: false
    };
  },
  mounted() {
    this.$on("validate", this.validator);
    this.$on("emptyError", ()=> {
      this.errMessage = "Please enter your description first."
      this.errStatus = true
    });
  },
  methods: {
    validator() {
      // can have multiple values
      const rules = this.tForm.rules[this.prop];
      const value = this.tForm.model[this.prop];

      // describe the schma object
      const descriptor = { [this.prop]: rules };
      const schema = new Schema(descriptor);

      schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.errMessage = errors[0].message;
          this.errStatus = true;
        } else {
          this.errMessage = "";
          this.errStatus = "";
        }
      });
    },
    onInput(e) {
      let value = e.target.value;
      this.$emit('input',value);
      this.$emit('validate')
    }
  }
};
</script>

<style scoped>
.input--container {
  display: flex;
}
.input--item__height {
  height: 100%;
  min-height: 30px;
}
.input--indicator {
  color: red;
  margin-left: 5px;
}
</style>