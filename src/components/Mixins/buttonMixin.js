import ButtonEvent from "../../classes/ButtonEvent.js"

export default {
    methods: {
        OnMouseEnterButton: function() {
            this.$emit("mouse-interacted-button", new ButtonEvent(this.name, true))
        },
        OnMouseLeaveButton: function() {
            this.$emit("mouse-interacted-button", new ButtonEvent(this.name, false))
        },
        OnMouseClickButton: function(event) {
            this.$emit("click", event);
        }
    },
    props: {
        icon: {
            type: String,
            required: true
        },
        isFocused: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            default: "untitled"
        }
    }
}