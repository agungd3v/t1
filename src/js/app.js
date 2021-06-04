(async function () {
  try {
    await fetch('https://ocistok.com/pages/json-produk').then(res => res.text()).then(data => {
      document.querySelector('.content').innerHTML = `<div style="display: none" id="tmp">${data}</div>`
      const text = document.querySelector('#shopify-section-json-produk-template').textContent
      const index = text.lastIndexOf(',')
      const str1 = text.substring(0, index)
      const str2 = text.substring(index + 1)
      const dataJSON = JSON.parse(str1 + str2)
      
      const contentWrapper = document.querySelector('.content')
      dataJSON.data.forEach(data => {
        const parseStr = data.collection.split('-').join(' ')
        contentWrapper.innerHTML += `
          <div class="card radius-15 overflow-hidden">
            <img src="${data.gambar}" class="card-img-top" alt="product">
            <div class="card-body">
              <div class="text-title">
                <a href="${data.URL}" class="link-title">
                  <h6 class="card-title">${parseStr}</h6>
                </a>
              </div>
            </div>
          </div>
        `
      })
      document.querySelector('#tmp').remove()
      document.querySelector('.loader').remove()
    }).catch(err => {
      console.error(err)
      document.querySelector('#tmp').remove()
      document.querySelector('.loader').remove()
    })
  } catch (error) {
    console.error(error)
    document.querySelector('#tmp').remove()
    document.querySelector('.loader').remove()
  }
})()