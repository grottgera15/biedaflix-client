<template>
    <button @click="onClick" @mouseenter="hover = true" @mouseleave="hover = false" class="button">
        <div class="button__state" :class="classesBind" />
    </button>
</template>

<script>
export default {
    name: "StateButton",
    data: function() {
        return {
            hover: false
        };
    },
    props: {
        value: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        onClick: function(event) {
            this.$emit("click", event);
        }
    },
    computed: {
        position: function() {
            if (!this.state) return `0% - ${this.margin}px`;
            else return `100% - ${this.size - this.margin}px`;
        },
        classesBind: function() {
            return {
                'button__state--hover': this.hover,
                'button__state--left': this.value
            }
        }
    }
};
</script>

<style lang="sass" scoped>
@import "@styles/variables"

button
    border: unset
    background-color: unset
    outline: unset
    cursor: pointer
    padding: unset
    margin: unset

.button
    width: calc(3em + 2 * 1px)
    height: calc(1.5em + 2 * 1px)
    border: 1px solid $bright-dark-color
    position: relative

    &__state
        top: 0
        left: 0
        height: 100%
        width: 1.5em
        background-color: $second-color
        transition-duration: .2s
        position: absolute

    &__state--hover
        background-color: $main-color

    &__state--left
        left: 1.5em

</style>