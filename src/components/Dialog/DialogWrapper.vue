<template>
    <div class="dialog-wrapper" v-show="component !== undefined">
        <div class="dialog-wrapper__content">
            <header class="dialog-wrapper__content__header">
                <div class="dialog-wrapper__content__header__label">{{label}}</div>
                <button class="dialog-wrapper__content__header__close-button" @click="close()">✕</button>
            </header>
            <component :is="component" @label="label = $event"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "DialogWrapper",
    methods: {
        close() {
            this.$router.back();
        }
    },
    data() {
        return {
            label: "not set"
        };
    },
    computed: {
        component() {
            if (this.$route.params.dialog) return this.$route.params.dialog;
            return undefined;
        }
    }
};
</script>

<style lang="sass" scoped>
@import "@styles/variables"

.dialog-wrapper
    z-index: 9999999
    position: fixed
    width: 100%
    min-height: 100%
    top: 0
    background-color: black
    display: grid
    grid-template-columns: repeat(5, 1fr)
    grid-template-areas: ". . dialog . ."
    color: $white-color

    &__content
        grid-area: dialog
        margin: 2em 0

        &__header
            display: flex
            justify-content: space-between
            align-items: center
            border-bottom: 1px solid $white-color
            padding-bottom: 1em

            &__label
                letter-spacing: .04em
                font-size: 1.25em
                font-weight: 300

            &__close-button
                cursor: pointer
                color: inherit
                margin: unset
                padding: unset
                font-size: 1.5em
                background-color: unset
                outline: unset
                border: unset

</style>