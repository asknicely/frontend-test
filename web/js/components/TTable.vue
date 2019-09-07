<template>
    <div class="t-table">
        <div class="t-table--title">
          <h2>{{ title }}</h2>
          <h3 v-if="todoNumber">
              Total : {{ todoNumber }}
          </h3>
        </div>
        <div> 
          <!-- header -->
          <div class="t-table--header">
            <div>#</div>
            <div>User</div>
            <div class="t-table--discription">Description</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          <!-- t-table body -->
          <slot></slot>
        </div>
    </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      defalut: ''
    },
    todoNumber: {
      type: Number,
      defalut: 0
    }
  }
}
</script>

<style>
.t-table--title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.t-table--row, .t-table--header {
	background: var(--white);
	border: 1px solid var(--grey);
	margin-bottom: 10px;
	padding: 10px 20px;
	border-radius: 5px;
	display: flex;
	justify-content: space-between;
	align-items:center;
}
.t-table--discription {
  flex-basis: 140px;
}
.t-table--row:last-child {
	margin-bottom: 0;
}
.t-table--row:nth-child(2n) {
	background: var(--grey-light);
}
.t-table--row:active {
	border: 2px solid var(--primary);
}
.t-table--row:hover {
	border: 1px solid var(--primary-light);
}
.unique-id {
	color: var(--primary-light);
}
</style>


