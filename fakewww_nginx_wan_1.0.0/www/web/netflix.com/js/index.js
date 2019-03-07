/* SELECTABLE OPTIONS */
let options = document.querySelectorAll('.option')
let optionsView = document.querySelectorAll('.view-option')


let showIndex = 0
let display = 'flex'
let borderHeight = '6px'

options.forEach((el, index) => {
  el.addEventListener('click', () => {
    showIndex = index
    // switch viewable options
    for (let i = 0; i < optionsView.length; i++) {
      optionsView[i].style.display = 'none'
      optionsView[showIndex].style.display = display
    }

    // switch border bottom 
    for (let i = 0; i < options.length; i++) {
      options[i].style.borderBottom = 'none'
      options[i].style.opacity = '0.5'
      options[showIndex].style.borderBottom = `${borderHeight} solid red`
      options[showIndex].style.opacity = '1'
    }
  })
})

// default option when the page is loaded
for (let i = 0; i < optionsView.length; i++) {
  optionsView[i].style.display = 'none'
  optionsView[showIndex].style.display = display
}

// default viewable option when the page is loaded
for (let i = 0; i < options.length; i++) {
  options[i].style.borderBottom = 'none'
  options[i].style.opacity = '0.5'
  options[showIndex].style.borderBottom = `${borderHeight} solid red`
  options[showIndex].style.opacity = '1'
}