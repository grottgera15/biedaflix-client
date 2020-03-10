<template>
    <ul class="list">
        <li
            v-for="(data, i) in array"
            :key="data.id ? data.id : i"
            @mouseenter="changeActiveElement(data.id ? data.id : i)"
            @mouseleave="changeActiveElement(undefined)"
            class="list__element"
            :class="{'list__element--not-selected': (activeElement !== undefined && activeElement !== (data.id ? data.id : i))}"
        >
            <component :is="component" ref="component" :data="data" @events="registerEvents($event, i)" />
        </li>
    </ul>
</template>

<script>
export default {
    name: "SettingsList",
    data: function() {
        return {
            activeElement: undefined
        };
    },
    methods: {
        changeActiveElement(key) {
            this.activeElement = key;
        },
        registerEvents(event, i) {
            event.forEach(event => {
                this.$refs.component[i].$on(event, (payload) => {
                    this.$emit(event, payload);
                })
            });
        }
    },
    props: {
        component: {
            type: Object,
            required: true
        },
        array: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="sass" scoped>
.list
    list-style: none
    margin: 0
    padding: 0

    &__element
        transition-duration: .2s
    
    &__element--not-selected
        opacity: .5

</style>