exports.ROLES = {
    USER: 'user',
    ADMIN: 'admin',
}

exports.checkArraysHas = function (arr1, arr2){
    if (arr1.length==arr2.length){
        for(var i=0;i<arr1.length;i++){
            if (arr1[i]==arr2[i]){
                return true
            }
        }
    }
    if (arr1.length>arr2.length){
        for(var i=0;i<arr1.length;i++){
            for(var j=0;j<arr2.length;j++){
                if (arr1[i]==arr2[j]){
                    return true
                }
            }
        }
    }
    if (arr1.length<arr2.length) {
        for(var i=0;i<arr2.length;i++){
            for(var j=0;j<arr1.length;j++){
                if (arr2[i]==arr1[j]){
                    return true
                }
            }
        }
    }
    return false
}
