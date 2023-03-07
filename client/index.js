const know = document.getElementById("know");
const help = document.getElementById("help");
const start = document.getElementById("start");
const date = document.getElementById("date");
const button = document.getElementById("button");
const get = document.getElementById("get");
const tbody = document.getElementById("tbody");
const datesort = document.getElementById("datesort");
const deleteall = document.getElementById("delete");
const deleteone = document.getElementById("deleteone");
const row = document.createElement("tr");

//to post
button.addEventListener("click", async () => {
    try {
        const body = {
            know: know.value,
            help: help.value,
            start: start.value,
            date: date.value
        }

        const response = await fetch("http://localhost:5000/pitches", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body)
        })
        know.value = ""
        help.value = ""
        start.value = ""
        date.value = ""
        alert("thanks we gon hit you")
        console.log("work")
    } catch (error) {
        console.log(error)
    }

});

// to get all rendered on the screen
get.addEventListener("click", async () => {
    try {
        tbody.innerHTML = ""

        const response = await fetch("http://localhost:5000/pitches")
        const allData = await response.json(); // we got to do await so it dont be fucked up 
        // this is the array stuff we had to do array to get it 

        allData.map(info => {



            const row = document.createElement("tr");
            row.setAttribute("key", info.id) // we got to make it consistent
            row.classList.add("rr")


            const date = document.createElement("th");
            const start = document.createElement("th");
            const help = document.createElement("th");
            const know = document.createElement("th");

            //besides row these are elements fdor each row

            date.innerHTML = info.date
            start.innerHTML = info.start
            help.innerHTML = info.help
            know.innerHTML = info.know

            // this is for each row
            row.appendChild(date)
            row.appendChild(start)
            row.appendChild(know)
            row.appendChild(help)

            tbody.appendChild(row)

        })
    } catch (error) {
        error =>
            console.log(error)
    }



})

// to delete
deleteall.addEventListener("click", async () => {
    tbody.innerHTML = ""
    try {
        const stuff = await fetch("http://localhost:5000/pitches",
            {
                method: "DELETE"
            })
        console.log("sti")
    } catch (error) {
        console.log(error)
    }

});





// to delete one // we got to fetch twice
deleteone.addEventListener("click", async (event) => {
    try {
        const id = document.querySelector(".rr").getAttribute("key");
        console.log(id)
        // okay so we use attribute to get the number
        const allData = await fetch("http://localhost:5000/pitches")
        const rep = await allData.json()

        rep.map(info => {
            if (id == info.id) { // so it only works if this condition of the actial id and th id of the event is the same
                const del = fetch(`http:localhost:5000/pitches/${info.id}`, {
                    method: "DELETE"
                })
                // this will work id we make and the real id the same
                const row = document.querySelector(`tr[key = "${info.id}"]`);
                row.innerHTML = ""
            }
        })


        // const itemToDelete = document.querySelector(`[key="${info.id}"]`);


    } catch (error) {
        console.log(error)
    }

})

// and we need to be able to sort
