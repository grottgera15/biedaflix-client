<template>
    <div class="settings-roles__edit">
        <header class="settings-roles__edit__header">
            <label class="settings-roles__edit__header__label">{{operations[data.key].name}}</label>
            <v-state-button :value="data.value" @click="$emit('onChange', !data.value)" />
        </header>

        <p class="description">{{operations[data.key].description}}</p>
    </div>
</template>

<script>
import operations from "@/enums/operations";
import StateButton from "@/components/Forms/Buttons/StateButton";

export default {
    name: "SettingsRolesEdit",
    data() {
        return {
            operations: operations
        };
    },
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    components: {
        "v-state-button": StateButton
    }
};
</script>

<style lang="sass" scoped>
@import "@styles/variables"

.settings-roles__edit 
    border-bottom: 1px solid $bright-dark-color
    padding: .5em

    &__header
        display: flex
        justify-content: space-between
        align-items: center

        &__label
            color: $white-color
            font-size: .9em

    .description
        margin-top: .4em
        color: $second-white-color
        font-size: .8em

</style>