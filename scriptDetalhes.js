const BASE_URL = `https://www.thecocktaildb.com/api/json/v1/1/`
    const api = axios.create ({
    baseURL: BASE_URL,
    headers:  {
    "Content-Type": "application/json"
    }
})

    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")

    async function buscarDetalhe(){
        try {
            let response = await api.get(`lookup.php?i=${id}`)
            let drink = response.data.drinks[0]

            let ingredientes = ""
            for (let i = 1; i <= 15; ++i){
                let ingrediente = drink[`strIngredient${i}`]
                let medida = drink[`strMeasure${i}`] || ""
                if (ingrediente && ingrediente !== "null" && ingrediente.trim() !== "") {
                    ingredientes += `<li>${medida.trim()} ${ingrediente.trim()}</li>`
                }
            }

        document.getElementById("detalhes").innerHTML = `
            <div class="card mx-auto" style="max-width: 400px;">
                <img src="${drink.strDrinkThumb}" class="card-img-top">
                <div class="card-body">
                    <h3>${drink.strDrink}</h3>
                    <p><strong>Categoria:</strong> ${drink.strCategory}</p>
                    <p><strong>Tipo:</strong> ${drink.strAlcoholic}</p>
                    <p><strong>Copo:</strong> ${drink.strGlass}</p>
                    <hr>
                        <h5>Ingredientes:</h5>
                        <ul>${ingredientes}</ul>
                    <hr>
                        <h5>Modo de preparo:</h5>
                        <p>${drink.strInstructions}</p>
                    <a href="index.html" class="btn btn-secondary">Voltar</a>
                </div>
            </div>
        `    
        } catch (error) {
            console.error("Error", error)
        }
    }
    buscarDetalhe()