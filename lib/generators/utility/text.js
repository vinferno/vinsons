exports.capitalize = function capitalize (text) {
    return text.slice(0,1 ).toUpperCase() + text.slice(1);
};
exports.skeleton = function skeleton (text) {
    let result = '';
    text.split('').forEach( (letter, index) => {
        if (letter === letter.toUpperCase() && index) {
            result += '-'
        }
        result += letter.toLowerCase();
    });
    return result;
};
