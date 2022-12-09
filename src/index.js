// Your code here
//GET FETCH ALL CHARACTERS
const characters = document.getElementById('character-bar');
let createSpan
let currentId = 0
const image = document.getElementById('image')
// console.log(characters)
const allCharacters = () =>{
 fetch ('http://localhost:3000/characters')
 .then (res => res.json())
 .then (data => data.map((char)=>{
    createSpan = document.createElement('span')
    characters.appendChild(createSpan)
    createSpan.innerText = char.name
    
    createSpan.addEventListener('click', ()=>{
        const cuties = document.getElementById('name')
          currentId = char.id      
        cuties.innerText = char.name
        image.src = char.image
        const votes = document.getElementById('vote-count')
        //console.log(votes)
        votes.innerText = char.votes
        const form = document.getElementById('votes-form')
        // console.log(form)
        form.addEventListener('submit', (event)=>{
            event.preventDefault()
            const vote = parseInt(event.target.children[0].value)
            const totalVotes = char.votes+vote
            // votes.innerText = totalVotes

            fetch(`http://localhost:3000/characters/${currentId}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    votes: totalVotes
                })
            })
            .then(res => res.json)
            .then(data => console.log(data))


        })
        const resetVotes = document.getElementById('reset-btn')
        //console.log(resetVotes)
        resetVotes.addEventListener('click', ()=>{
            fetch(`http://localhost:3000/characters/${currentId}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    votes: 0
                })
            })
            .then(res => res.json)
            .then(data => console.log(data))

        })
    })    
 }))

 }
 console.log(allCharacters())

