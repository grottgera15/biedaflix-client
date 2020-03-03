<template>
	<div class="input-wrapper" :class="{'input-wrapper--requirement-error': !validated}">
		<label class="input-wrapper__label"  :for="id">{{labelMixed}}</label>
		<slot />
	</div>
</template>

<script>
import AdminTemplateInputMixin from "@mixins/_AdminTemplateInputMixin.js";

export default {
	name: "AdminTemplateInput",
	computed: {
		labelMixed() {
			if (this.required === true) return `${this.label} (pole wymagane)`;
			return this.label;
		}
	},
	mixins: [AdminTemplateInputMixin]
};
</script>

<style lang="sass" scoped>
@import "@styles/variables"

.input-wrapper
    border-bottom: 1px solid #ffffff17
    padding: 8px
    margin: 8px 0
    transition-duration: .2s
    &__label
    
.input-wrapper--requirement-error
    border-color: $main-color
    color: $main-color
</style>