<template>
    <BModal ref="addTask-modal" title="Create new task" no-close-on-backdrop>
        <BFormGroup class="descTextarea">
            <template v-slot:label>
                Description <small class="caption">*Required</small>
            </template>
            <BFormTextarea
                :class="{ 'error' : !validated }"
                v-model="description"
                rows="3"
                max-rows="6"
                autofocus
            ></BFormTextarea>
        </BFormGroup>
		<template #modal-footer="{ cancel }">
			<BButton size="sm" variant="outline-danger" @click="cancel()">
				Cancel
			</BButton>
			<BButton size="sm" :variant="description ? 'warning' : 'secondary'" @click="submit" :disabled="!description">
				Submit
			</BButton>
		</template>
	</BModal>
</template>

<script>
import { BModal, BButton, BFormGroup, BFormTextarea } from 'bootstrap-vue'

export default {
name : "AddTask",
	components: {
		BModal,
		BButton,
        BFormGroup,
        BFormTextarea
	},
    methods: {
        showModal() {
			this.$refs['addTask-modal'].show();
		},
        submit () {
            if (!this.description) {
                return false;
            }
			this.$refs['addTask-modal'].hide();
			this.$emit('submitted', this.description);
		},
    },
    data () {
        return {
            description: '',
            validated: true,
        }
    }
}
</script>

<style lang="scss">
    .descTextarea {
        min-height: 145px;
        .caption {
            font-size: .7em;
            font-style: italic;
        }
    }
    .error {
        border: 1px solid #dc3545 !important;
    }
</style>