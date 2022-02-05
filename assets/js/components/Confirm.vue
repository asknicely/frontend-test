<template>
	<b-modal ref="confirm-modal" :title="title" no-close-on-backdrop>
		<p>User: {{ user }}</p>
		<p>Description: {{ description }}</p>
		<template #modal-footer="{ cancel }">
			<b-button size="sm" variant="outline-danger" @click="cancel()">
				Cancel
			</b-button>
			<b-button size="sm" variant="success" @click="confirmed">
				{{ confirmText }}
			</b-button>
		</template>
<!--		<b-button class="mt-3" variant="outline-danger" block @click="hideModal">Cancel</b-button>-->
	</b-modal>
</template>

<script>
export default {
	name : "ConfirmModal",
	props: {
		task : Object
	},
	computed: {
		title () {
			return this.task?.title || ''
		},
		user () {
			return this.task?.data?.user_id || ''
		},
		description () {
			return this.task?.data?.description || ''
		},
		confirmText () {
			return this.task?.confirmText || ''
		}
	},
	methods: {
		showModal() {
			this.$refs['confirm-modal'].show();
		},

		confirmed () {
			this.$refs['confirm-modal'].hide();
			this.$emit('confirmed', this.task.data.id);
		}
	}
}
</script>

<style scoped>

</style>
