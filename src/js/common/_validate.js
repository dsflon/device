const validate = {

    mail: (val) => {

        if(!val) return false;

        let checker = !CheckCharType(val,"alphanumeric") ? "alphanumeric" : true;
        if(checker === true) checker = !val.match(/\./) ? "dot" : true;
        if(checker === true) checker = val.match("@") ? "@" : true;

        switch (checker) {

            case "alphanumeric":
            return {
                type: "alphanumeric",
                message:"全角文字が入力されています"
            };

            case "dot":
            return {
                type: "dot",
                message:"'.' を含んでいません"
            };

            case "@":
            return {
                type: "@",
                message:"'@' は不要です"
            };

            default:
            return true;

        }

    },

    dep: (val) => {

        if(!val) return false;
        let checker = !CheckCharType(val,"alphabetic") ? "alphabetic" : true;

        switch (checker) {

            case "alphabetic":
            return {
                type: "alphabetic",
                message:"全角文字が入力されています"
            };

            default:
            return true;

        }

    }

}

function CheckCharType(val, charType) {
    switch (charType) {
        // 全角文字（ひらがな・カタカナ・漢字 etc.）
        case "zenkaku":
            return (val.match(/^[^\x01-\x7E\xA1-\xDF]+$/)) ? true : false;
        // 全角ひらがな
        case "hiragana":
            return (val.match(/^[\u3041-\u3096]+$/)) ? true : false;
        // 全角カタカナ
        case "katakana":
            return (val.match(/^[\u30a1-\u30f6]+$/)) ? true : false;
        // 半角英数字記号（大文字・小文字）
        case "alphanumeric":
            return (val.match(/^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/)) ? true : false;
        // 半角数字
        case "numeric":
            return (val.match(/^[0-9]+$/)) ? true : false;
        // 半角英字（大文字・小文字）
        case "alphabetic":
            return (val.match(/^[a-zA-Z]+$/)) ? true : false;
        // 半角英字（大文字のみ）
        case "upper-alphabetic":
            return (val.match(/^[A-Z]+$/)) ? true : false;
        // 半角英字（小文字のみ）
        case "lower-alphabetic":
            return (val.match(/^[a-z]+$/)) ? true : false;
    }
    return false;
}


export default validate;
