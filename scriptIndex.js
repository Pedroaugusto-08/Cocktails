const BASE_URL = `https://www.thecocktaildb.com/api/json/v1/1/`
        const api = axios.create ({
        baseURL: BASE_URL,
        headers:  {
            "Content-Type": "application/json"
        }
    })
async function buscarCocktails() {
    try{
        let letras = ["a", "b", "c", "d","e","f","g","h"]
        let todosDrinks = []    

        for (let letra of letras){
            let response = await api.get(`search.php?f=${letra}`)

            if (response.data.drinks){
                todosDrinks = todosDrinks.concat(response.data.drinks)
            }

            if(todosDrinks.length >= 30) break
        }

        todosDrinks = todosDrinks.slice(0,30)

        const lista = document.getElementById("lista-cocktails")

        todosDrinks.forEach(drink => {
            const col = document.createElement("div")
            col.className = "col-md-3 mb-4"

            col.innerHTML = `
                <div class="card">
                    <img src="${drink.strDrinkThumb}" class="card-img-top">
                    <div class="card-body">
                        <h5><strong>${drink.strDrink}</strong></h5>
                        <a href="detalhes.html?id=${drink.idDrink}" class="btn btn-cocktail w-100">Ver Detalhes</a>  
                </div>
            `
            lista.appendChild(col)
        })

    } catch (error) {
            console.error("Error" , error)
    }
}
buscarCocktails()