<template>
	<BModal ref="confirm-modal" :title="title" no-close-on-backdrop>
		<p>{{ body }}</p>
		<div>
			<span>User: {{ user }}</span>
			<br>
			<span>Description: {{ description }}</span>
		</div>
		<template #modal-footer="{ cancel }">
			<BButton size="sm" variant="outline-danger" @click="cancel()">
				Cancel
			</BButton>
			<BButton size="sm" variant="success" @click="confirmed">
				{{ confirmText }}
			</BButton>
		</template>
	</BModal>
</template>

<script>
import { BModal, BButton } from 'bootstrap-vue'
export default {
	name : "Confirm",
	props: {
		modal : Object
	},
	components: {
		BModal,
		BButton
	},
	computed: {
		title () {
			return this.modal?.title || ''
		},
		body () {
			return this.modal?.body || ''
		},
		user () {
			return this.modal?.data?.user_id || ''
		},
		description () {
			return this.modal?.data?.description || ''
		},
		confirmText () {
			return this.modal?.confirmText || ''
		}
	},
	methods: {
		showModal() {
			this.$refs['confirm-modal'].show();
		},

		confirmed () {
			this.$refs['confirm-modal'].hide();
			this.modal.callback && this.modal.callback(this.modal.data.id);
		}
	}
}
</script>
