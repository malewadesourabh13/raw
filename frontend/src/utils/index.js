const getUser = () => {
    const user = localStorage.getItem("user")
    if (user) {
        return JSON.parse(user)
    }
    return false
}

const isLoggedIn = () => {
    const user = localStorage.getItem("user")
    console.log("========================== ", user)
    if (user) return true
    else return false
}

const saveUser = (userobj) => {
    if(userobj) localStorage.setItem("user", JSON.stringify(userobj))
    else localStorage.setItem("user", null)
}

module.exports = {
    getUser,
    isLoggedIn,
    saveUser
}