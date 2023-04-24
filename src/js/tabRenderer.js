const tab1 = document.getElementById('tab1')
const tab2 = document.getElementById('tab2')

const tab1Content = document.getElementById('tab1-content')
const tab2Content = document.getElementById('tab2-content')

tab1.addEventListener('click', event => {
  tab1.classList.add('is-active')
  tab2.classList.remove('is-active')

  tab1Content.classList.remove('is-hidden')
  tab2Content.classList.add('is-hidden')
})

tab2.addEventListener('click', event => {
  tab1.classList.remove('is-active')
  tab2.classList.add('is-active')

  tab1Content.classList.add('is-hidden')
  tab2Content.classList.remove('is-hidden')
})
