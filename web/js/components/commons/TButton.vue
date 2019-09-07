<template>
  <button @click="buttonClick($event)" :class="['button', {'button--no-hover': loading}]">
    <t-spinner class="button__spinner" v-if="loading"></t-spinner>
    <div :class="['inline-block', 'pointer-events-none', {'button__text--invisible': loading}]">{{label}}</div>
  </button>
</template>

<script>
import TSpinner from './TSpinner';
  export default {
    name: 'TButton',
    components: {
      TSpinner
    },
    props: {
      label: {
        type: String,
        default: ''
      },
      // add loading state to avoid double click
      loading: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      buttonClick(event) {
        if(this.loading){ return; }
        this.$emit('click', event);
      },
    }
  }
</script>

<style scoped>
.point-events-none {
  pointer-events: none;
}

.inline-block {
  display: inline-block;
}

.button {
  font-size: 1.4rem;
  font-weight: bold;
  border-radius: .3rem;
  text-transform: uppercase;
  padding: 8px 10px;
  transition: 0.3s;
  cursor: pointer;
  max-height: 40px;
}

.button:focus {
  outline: none;
}

.button[primary] {
  background-color: var(--primary);
  color: var(--white);
}

.button[primary]:hover:not(.button--no-hover) {
  background-color: var(--primary-light);
}

.button[secondary] {
  background-color: var(--secondary);
  color: var(--white);
}

.button[borderless] {
  position: relative;
  padding: 0;
  border-width: 0px;
  background: var(--transparent);
}

.button[borderless]::before {
  background: currentColor;
  content: '';
  height: 2px;
  width: 0%;
  display: inline-block;
  position: absolute;
  left: 0;
  bottom: -6px;
  transition: width 0.3s;
}

.button[borderless]:hover:not(.button--no-hover).button[borderless]::before {
   width: 100%;
}

.button__spinner {
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  position: relative;
}

.button__text--invisible {
  opacity: 0;
  content: 'Sending...';
  position: relative;
  z-index: -1;
  height: 0px;
  display: block;
}
</style>