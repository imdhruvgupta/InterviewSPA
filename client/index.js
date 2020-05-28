import Home from './views/Home.js'
import New from './views/New.js'
import Edit from './views/Edit.js'

import Utils from './Utils.js'

const routes = {
    '/' : Home,
    '/sessions/new' : New,
    '/sessions/:id/edit' : Edit,
    
};

const router = async () => {

    const content = null || document.getElementById('page_container');

    let request = Utils.parseRequestURL()
    let page = routes[request]
    
    console.log(request)
    content.innerHTML = await page.render();
    await page.after_render();
  
}

window.addEventListener('hashchange', router);

window.addEventListener('load', router);
