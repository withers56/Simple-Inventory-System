

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

    //check to see if jwt is expired, if so return false.
    const token = window.localStorage.getItem('access_token');
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    const expirationTimeInSeconds = payload.exp;
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    if (!expirationTimeInSeconds) {
        return false; // If 'exp' claim is not present, consider it not expired
    }

    //check to see if expiration time has passed, if so redirect to log back in
    if (expirationTimeInSeconds < currentTimeInSeconds){
        console.log("past expiration time, redirecting back to login in");
        
        return false;
    }

    return !!window.localStorage.getItem('access_token');
 }