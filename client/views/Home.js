let getSessions = async () => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch(`http://localhost:3000/sessions`, options)
       const json = await response.json();
       console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let Home = {
   render : async () => {
       let sessions = await getSessions()
       console.log(sessions)
       let view =  `
           <section class="section">
               <h1> Listing Sessions </h1>
               <a href='#/sessions/new'>Add a new Session</a>
               <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Interviewee Id</th>
                    <th scope="col">Start Time</th>
                    <th scope="col">End Time</th>
                    <th scopt="col"></th>
                  </tr>
                </thead>
                <tbody>
               ${sessions.map(session => 
                ` 
                <tr>
                <td>${session.id}</td>
                <td>${session.user_id}</td>
                <td>${session.start}</td>
                <td>${session.end}</td>
                <td><a href='#/sessions/${session.id}/edit'>Edit</a></td>
                </tr>
                ` 
                ).join('\n ')}
                </tbody>
               </table>
           </section>
       `
       return view
   }, 
   after_render: async () => {
   }

}

export default Home;