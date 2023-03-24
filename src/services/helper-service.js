

export const isLoggedIn = () =>{
    if(localStorage.getItem('data')){
        return true;
    }
    else{
        return false;
    }
}

export const logout = () => {
    if(isLoggedIn()){
        localStorage.removeItem('data');
    }
}

export const getCurrentUserInfo = () =>{
    
    const data = localStorage.getItem('data');

    if(isLoggedIn()){
        return JSON.parse(data);
    }
    else{
        return undefined;
    }
}