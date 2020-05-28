const Utils = { 
    parseRequestURL : () => {

        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
              
        r.shift();
        
        // Check if id exists, then match to router's key
        if(r[1]) r[1] = ':id'

        let req = r.join('/')
        req = '/' + req
        
        return req
    }
}

export default Utils;  