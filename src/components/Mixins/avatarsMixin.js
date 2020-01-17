import Avatar from "../../classes/Avatar.js"

export default {
    methods: {
        GenerateRandomAvatar: function () {
            let eyesLength = this.$avatars.face.eyes.length;
            let noseLength = this.$avatars.face.nose.length;
            let mouthLength = this.$avatars.face.mouth.length;
            return new Avatar(
                this.$avatars.face.eyes[Math.floor(Math.random() * eyesLength)],
                this.$avatars.face.nose[Math.floor(Math.random() * noseLength)],
                this.$avatars.face.mouth[Math.floor(Math.random() * mouthLength)],
            )
        },
        GenerateAvatar: function (avatar, color) {
            if (avatar instanceof Avatar)
                return `https://api.adorable.io/avatars/face/${avatar.eyes}/${avatar.nose}/${avatar.mouth}/${color}`
            throw new TypeError();
        }
    }
}