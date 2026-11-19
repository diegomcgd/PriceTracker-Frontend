let prices;

async function loadPrices(){

    const parameters = new URLSearchParams(window.location.search);
    const id = parameters.get("id");

    const response_prices = await fetch("http://localhost:8000/products/" + id + "/prices");

    const response_info = await fetch("http://localhost:8000/products/" + id);

    try{
        if (!response_prices.ok){
            throw new Error("Error getting the prices of the product");
        }
        if (!response_info.ok){
            throw new Error("Error getting the product info");
        }

        prices = await response_prices.json();

        info = await response_info.json();

        if (prices.length == 0){
            document.getElementById("advise").innerText = "No history found for this product"
        }

        document.getElementById("product-name").textContent = info.name;
        document.getElementById("buy-button").href = info.url;

        let html = "";

        const initial_price = prices.toReversed()[0];
        let max_price = 0;
        let date_max = new Date(initial_price.date);
        let min_price = initial_price.price;
        let date_min = new Date(initial_price.date);
        let current_price = initial_price.price;

        document.getElementById("current-price").textContent = current_price + " €";

        for (let price of prices.toReversed()){
            const date = new Date(price.date);

            if (price.price > max_price){
                max_price = price.price;
                date_max = date;
            }
            else if (price.price < min_price){
                min_price = price.price;
                date_min = date;
            }

            html += `<tr><td>${date.toLocaleDateString('es-Es')}</td>`;
            html += `<td>${price.price} €</td></tr>`;
        }

        document.getElementById("prices").innerHTML = html;

        document.getElementById("min-price").textContent = min_price + " €";
        document.getElementById("min-date").textContent = date_min.toLocaleDateString('es-Es');
        document.getElementById("max-price").textContent = max_price + " €";
        document.getElementById("max-date").textContent = date_max.toLocaleDateString('es-Es');


    } catch(err){
        document.getElementById("error").textContent = err.message;
    }
}

loadPrices();