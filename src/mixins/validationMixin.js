export default {
    data() {
        return {
            validations: {}
        }
    },
    methods: {
        simpleTextValidation(fieldName, text) {
            let result;
            if (text.length > 0)
                result = true;
            else
                result = false;
            this.validations[`${fieldName}_simpleText`] = result;
            return result;
        },
        fileTypeValidation(fieldName, file, type) {
            let result;
            if (file instanceof File)
                result = file.type.startsWith(type);
            else
                result = false;
            this.validations[fieldName + "_type"] = result;
            return result;
        },
        fullValidation() {
            return Object.values(this.validations).includes(false, 0);
        }
    }
}