const rootList = document.querySelector('.list');

async function getData () {
  
  console.log(rootList)
  
  showLoader()
  try {
    // let promise = new Promise((resolve) => {
    //     setTimeout(() => resolve(), 1000);
    //   });
    // await promise;
    let responce = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    let data = await responce.json();
    for (x in data.Valute) {
      const code = data.Valute[x].CharCode;
      const current = (data.Valute[x].Value / data.Valute[x].Nominal).toFixed(4).replace('.', ',');
      const change = (data.Valute[x].Value / data.Valute[x].Previous * 100).toFixed(1) + '%';
      const name = data.Valute[x].Name;
      let el = document.createElement('li');
      el.classList.add('listitem');
      el.setAttribute('title', name);
      el.innerHTML = `Код: ${code}, курс к рублю: ${current}, изменение: ${change}`;
      rootList.append(el);
    }
  }
  catch {
    let el = document.createElement('li');
    el.innerHTML = `API не отвечает или уже изменилось`;
    rootList.append(el)
  }
  removeLoader ()
}

function removeLoader () {
  let loader = document.querySelector('.loader');
  loader.classList.add('hidden')
}

function showLoader() {
  let loader = document.createElement('div');
  loader.innerHTML = `Ждем...`;
  loader.classList.add('loader')
  rootList.before(loader)

}

getData ()

