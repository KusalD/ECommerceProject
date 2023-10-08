const generateRandomString = (len = 100) =>{
    let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let lenght = chars.length;
    let random = "";
    for (let i = 0; i < len; i++){
        let posn = Math.floor(Math.random() * (lenght-1))
        random += chars[posn]
    }
    return random
}

module.exports = {
    generateRandomString
}