import data from './component'

const inputs = document.querySelectorAll('input')

inputs.forEach( input => {
    input.addEventListener('input', (ev)=> {
        console.log(ev.currentTarget.type, ev.currentTarget.name, ev.currentTarget.checked)
    })
})
