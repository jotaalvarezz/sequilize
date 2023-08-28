const btn = document.getElementById('btn')
const tbody = document.getElementById('tbody')
const API_ROUTE = process.env.PORT ? 'https://my-store-swart-nine.vercel.app' : 'http://localhost:5000'


async function cargar(){
    try {
        const res = await axios.get(API_ROUTE+'/api/v1/products')
        console.log("res ",res)
        tbody.innerHTML = ''
        res.data.forEach(element => {
            tbody.innerHTML += `<tr>
                                    <th scope="row">${element.id}</th>
                                    <td>${element.name}</td>
                                    <td>${element.price}</td>
                                    <td>${element.image}</td>
                                </tr>`
        });
    } catch(error) {
        console.log(error)
    }
}

btn.addEventListener('click', (e) => {
    cargar()
})
