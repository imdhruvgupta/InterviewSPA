const Utils = { 
    parseRequestURL : () => {

        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
              
        r.shift();
        let req = r.join('/')
        req = '/' + req
        return req

    }
}

export default Utils;  