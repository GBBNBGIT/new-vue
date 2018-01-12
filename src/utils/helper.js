//深拷贝
export const deepExtend = function(source, target) {
    for (var key in source) {
        if (Object.prototype.toString.apply(source[key]) === '[object Object]') {
            target[key] = {}
            this.deepExtend(source[key], target[key])
        } else if (Object.prototype.toString.apply(source[key]) === '[object Array]') {
            target[key] = []
            this.deepExtend(source[key], target[key])
        } else {
            target[key] = source[key]
        }
    }
}