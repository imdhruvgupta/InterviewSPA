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

let saveSession = async (start, end, userId) => {
    const options = {
        method: 'POST',
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
        const response = await fetch(`http://localhost:3000/sessions/`, options)
        const json = await response.json();
        console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let New = {
   render : async () => {
       let users = await getUsers()
       console.log(users)
       let view =  `
           <section class="section">
               <h1> Add a New Sessions </h1>
               
               <form>
                    <div class="form-row">
                        <div class="form-group col-6">
                        <label for="exampleFormControlInput1">Start Time</label>
                        <input type="datetime-local" id="start" name="start">
                        </div>
                        <div class="form-group col-6">
                        <label for="exampleFormControlInput1">End Time</label>
                        <input type="datetime-local" id="end" name="end">
                        </div>
                    </div>
                    <label for="exampleFormControlSelect1">Select User</label>
                    <select class="form-control" id="user">
                      ${users.map(user => ` <option value=${user.id}>${user.username}</option>` )}
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
    document.getElementById("submit").addEventListener('click', async (e) => {
        e.preventDefault();
        let start = document.getElementById("start");
        let end = document.getElementById("end");
        let userId = document.getElementById("user");
        
        let response = await saveSession(start.value, end.value, userId.value);
        window.location.href='#/';
    })
   }

}

export default New;