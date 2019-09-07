<template>
<div class="t-table--row">
    <template v-for="[key, value] of Object.entries(todo)">
        <div v-if="key == 'description'" :key="value" class="t-table--discription">{{value}}</div>
        <div v-else-if="key == 'completed' && value==0" :key="value" :class="'text-'+getStatus(value).color" class="table__item--completed_container">
          <div class="table__item--completed_status" @click="changeStatus(todo)" v-html="iconHTML(getStatus(value).icon)"></div>
          <div class="table__item--completed_status_indicator"></div>
        </div>
        <!-- when the status is completed, user couldn't toggle it back to uncompleted -->
        <div v-else-if="key == 'completed' && value==1" :key="value" :class="'text-'+getStatus(value).color">
          <div class="table__item--completed" v-html="iconHTML(getStatus(value).icon)"></div>
        </div>
        <div v-else :key="value">{{value}}</div>
    </template>
    <div class="t-table--row-button">
      <t-button borderless label="delete" @click="buttonClick(todo)"></t-button>
    </div>
    
</div>
</template>
    
<script>
import TButton from './commons/TButton.vue';

export default {
  components: {
    TButton
  },
  props: {
    todo:            { type: Object, default: [] }
  },
  methods: {
    getStatus(status) {
      return ({
        0:           { icon: 'uncompleted', color: 'grey' },
        1:           { icon: 'completed', color: 'primary' },
      })[status];
    },
    iconHTML(icon) {
      return ({
        completed:   '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" class="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#4CB987" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>',
        uncompleted: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star-half-alt" class="svg-inline--fa fa-star-half-alt fa-w-17" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 536 512"><path fill="#AFAFAF" d="M508.55 171.51L362.18 150.2 296.77 17.81C290.89 5.98 279.42 0 267.95 0c-11.4 0-22.79 5.9-28.69 17.81l-65.43 132.38-146.38 21.29c-26.25 3.8-36.77 36.09-17.74 54.59l105.89 103-25.06 145.48C86.98 495.33 103.57 512 122.15 512c4.93 0 10-1.17 14.87-3.75l130.95-68.68 130.94 68.7c4.86 2.55 9.92 3.71 14.83 3.71 18.6 0 35.22-16.61 31.66-37.4l-25.03-145.49 105.91-102.98c19.04-18.5 8.52-50.8-17.73-54.6zm-121.74 123.2l-18.12 17.62 4.28 24.88 19.52 113.45-102.13-53.59-22.38-11.74.03-317.19 51.03 103.29 11.18 22.63 25.01 3.64 114.23 16.63-82.65 80.38z"></path></svg>'
      })[icon];
    },
    buttonClick(event) {
      if(this.loading){ return; }
      this.$emit('click', event);
    },
    changeStatus(todo) {
      this.$emit('changeStatus', todo);
    }
  },
  created() {
    console.log('this.todo', this.todo)
  }
}
</script>

<style lang="scss" scoped>
.t-table--row {
  position: relative;
}
.text-primary {
  color: var(--primary);
}
.text-grey {
  color: var(--grey-medium);
}
.table__item--completed_status, .table__item--completed {
  width: 20px;
}
.table__item--completed_status:hover {
  cursor: pointer;
}
.table__item--completed_status_indicator {
  transition: all .1s;
  display: block;
  position: absolute;
  right: 0;
  top: 11px;
  color: var(--grey-dark);
  &::before {
    width: 100px;
    transition: all .1s;
    content: "";
    margin-left: -100px;
    background-image: linear-gradient(
      15deg,
      rgba(#f8f8f8, 0.00) 0%,
      var(--grey-light) 100%
    );
    opacity: 0;
  }
}
.table__item--completed_status:hover + .table__item--completed_status_indicator {
  &::before {
    opacity: 1;
    content: 'Click to toggle';
  }
}
.table__item--completed_container:hover + .t-table--row-button {
  opacity: 0;
}
</style>
