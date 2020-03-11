export default {
    props: {
        id: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        required: {
            type: Boolean,
            required: false,
            default: false
        },
        validated: {
            type: Boolean,
            required: false,
            default: true
        },
        name: {
            type: String,
            required: true
        }
    }
}