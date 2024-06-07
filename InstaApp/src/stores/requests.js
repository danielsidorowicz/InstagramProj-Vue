import axios from "axios";

function checkIfCookieExists(cookieName) {
    const allCookies = document.cookie;
    const cookieExists = allCookies.split('; ').some(cookie => cookie.startsWith(cookieName + '='));
    return cookieExists;
}

function getCookie(cookieName) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cookieName}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const post = async (url, postData, config) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(url, postData, config);
            resolve(response.data)
        } catch (error) {
            // console.error('Error occurred:', error);
            resolve(error)
        }
    })
}

export { post, getCookie, checkIfCookieExists }
