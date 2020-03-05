import hash from "js-hash-code"

import Avatar from "@classes/Avatar.js"

export default {
    methods: {
        GenerateRandomAvatar: function (seed) {
            let parsedSeed = Math.abs(parseInt(hash(seed), 16));
            let eyesLength = this.$avatars.face.eyes.length;
            let noseLength = this.$avatars.face.nose.length;
            let mouthLength = this.$avatars.face.mouth.length;
            return new Avatar(
                this.$avatars.face.eyes[(parsedSeed % eyesLength)],
                this.$avatars.face.nose[(parsedSeed % noseLength)],
                this.$avatars.face.mouth[(parsedSeed % mouthLength)]
            );
        },
        GenerateAvatar: function (avatar, color) {
            if (avatar instanceof Avatar)
                return `https://api.adorable.io/avatars/face/${avatar.eyes}/${avatar.nose}/${avatar.mouth}/${color}`
            throw new TypeError();
        }
    }
}