let prices;

async function loadPrices(){

    const parameters = new URLSearchParams(window.location.search);
    const id = parameters.get("id");

    const response = await fetch("http://localhost:8000/products/" + id + "/prices");

    try{
        if (!response.ok){
            throw new Error("Error getting the prices of the product");
        }

        prices = await response.json();

        if (prices.length == 0){
            document.getElementById("advise").innerText = "No history found for this product"
        }

        let html = "";

        for (let price of prices.toReversed()){
            const date = new Date(price.date);

            html += `<tr><td>${date.toLocaleDateString('es-Es')}</td>`;
            html += `<td>${price.price} €</td></tr>`;
        }

        document.getElementById("prices").innerHTML = html;

    } catch(err){
        document.getElementById("error").textContent = err.message;
    }
}

loadPrices();