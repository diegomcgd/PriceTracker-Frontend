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
            document.getElementById("message").innerText = "No history found for this product"
        }

        let html = "";

        for (let price of prices){
            html += `<tr><td>${price.date}</td>`;
            html += `<td>${price.price}</td></tr>`;
        }

        document.getElementById("prices").innerHTML = html;

    } catch(err){
        document.getElementById("error").textContent = err.message;
    }
}

loadPrices();