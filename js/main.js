let list
let pokemon
window.onload = () => {
    document.querySelector('body button:first-of-type').addEventListener('click', setNewPokemon)
    document.querySelector('body ul + button').addEventListener("click", revealPokemon)
    list = document.querySelector('ul')
}

let setNewPokemon = () => {
    let number = Math.ceil(Math.random() * 905)
    const url = `https://pokeapi.co/api/v2/pokemon-species/${number}/`
    fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
          while (list.lastChild) {
              list.removeChild(list.lastChild)
          }
        document.querySelector('h3').textContent = ''
          pokemon = data
          let dexEntries = data.flavor_text_entries.filter(entry => entry.language.name === 'en')
          dexEntries = dexEntries.map(entry => {
              entry = entry.flavor_text.replace(new RegExp(data.name, 'gi'), '[redacted]')
              entry = entry.replace(new RegExp('\n|\f', 'g'), ' ')
              return entry
          })
          console.log('before', dexEntries)

          dexEntries = dexEntries.filter((entry, i) => {
              if (entry.includes("impossible to open")) console.log(viewSanitizedVersion(entry), i)
            const indexOfDuplicateEntry = dexEntries.findIndex(possibleCopy => viewSanitizedVersion(entry) === viewSanitizedVersion(possibleCopy))
            return (indexOfDuplicateEntry === i)
        })

          console.log(dexEntries.size, 'after')
          dexEntries.forEach(entry => {
              let li = document.createElement('li')
              let elem = document.createElement('p')
              elem.textContent = entry
              li.appendChild(elem)
              list.appendChild(li)
          })

          console.log(dexEntries)
      })
      .catch(err => {
          console.log(`error ${err}`)
      })
}

let viewSanitizedVersion = entry => entry.toLowerCase().replace(new RegExp(' ', 'g'), '')


let revealPokemon = () => {
    if (!pokemon) alert('push da button first')
    else {
        document.querySelector('h3').textContent = pokemon.name
    }
}