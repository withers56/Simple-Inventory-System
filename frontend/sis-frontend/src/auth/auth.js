

export function getHeaders() {
    const token = localStorage.getItem("access_token");

    return token ? {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + `${token}`}
    : {'Content-Type': 'application/json'};
}

export function setToken(token) {
    if(token) {
        localStorage.setItem("access_token", token);
        console.log("token set");
    }
}

export function isLoggedIn() {
    return !!window.localStorage.getItem('access_token');
 }