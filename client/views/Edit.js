let getSession = async (id) => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       
       const response = await fetch(`http://localhost:3000/sessions/${id}/edit`, options)
       const json = await response.json();
       console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let getUsers = async () => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch(`http://localhost:3000/users/`, options)
       const json = await response.json();
       console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let updateSession = async (start, end, userId, id) => {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: new URLSearchParams({
            "session[start]": start,
            "session[end]": end,
            "session[user_id]": userId
        })
    };
    try {
        const response = await fetch(`http://localhost:3000/sessions/${id}`, options)
        const json = await response.json();
        console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let Edit = {
   render : async () => {
       let url = location.hash.slice(1).toLowerCase() || '/';
       let r = url.split("/")

       let session = await getSession(r[2])
       let users = await getUsers()

       let view =  `
           <section class="section">
               <h1> Edit Session </h1>
               
               <form>
                    <div class="form-row">
                        <div class="form-group col-6">
                        <label for="exampleFormControlInput1">Start Time</label>
                        <input type="datetime-local" id="start" name="start" value=${session.start}>
                        </div>
                        <div class="form-group col-6">
                        <label for="exampleFormControlInput1">End Time</label>
                        <input type="datetime-local" id="end" name="end" value=${session.end}>
                        </div>
                    </div>
                    <label for="exampleFormControlSelect1">Select User</label>
                    <select class="form-control" id="user">
                      ${users.map(user => {
                          if(user.id == session.user_id) return `<option selected=true value=${user.id}>${user.username}</option>`   
                          else return `<option value=${user.id}>${user.username}</option>`
                      })}
                    </select>
                    <br>
                    <button id="submit" class="btn btn-primary">Submit</button>
                </form>
                </tbody>
               </table>
           </section>
       `
       return view
   }, 
   after_render: async () => {
    let url = location.hash.slice(1).toLowerCase() || '/';
    let r = url.split("/")
    
    document.getElementById("submit").addEventListener('click', async (e) => {
        e.preventDefault();
        let start = document.getElementById("start");
        let end = document.getElementById("end");
        let userId = document.getElementById("user");
        
        let response = await updateSession(start.value, end.value, userId.value, r[2]);
        window.location.href='#/';
    })
   }

}

export default Edit;