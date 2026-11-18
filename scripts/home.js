let products;

async function loadProducts(){

    document.getElementById("message").innerText = sessionStorage.getItem("message");
    sessionStorage.removeItem("message");
    
    const response = await fetch("http://localhost:8000/products");

    const response_prices = await fetch("http://localhost:8000/products/prices");
    
    try {
        if (!response.ok){
            throw new Error("Bad HTTP request");
        }

        if (!response_prices.ok){
            throw new Error("Bad HTTP request: couldn't get the prices");
        }

        // Save the response into an object with json() method
        // We could do the same using text() method and then JSON.parse()
        const products = await response.json();

        const products_prices = await response_prices.json();

        const prices_map = new Map(
            products_prices.map((item) => [item.id, item.price])
        );

        let html = "";

        for (let product of products){

            let price;

            if (prices_map.has(product.id)){
                price = prices_map.get(product.id)
            }

            html += `<tr><td>${product.name}</td>`;
            html += `<td><a href=${product.url} target="_blank">${product.url}</a></td>`;
            html += `<td><a href="productPrices.html?id=${product.id}">${price} €</a></td></tr>`;
        }

        document.getElementById("table").innerHTML = html;

    } catch (err){
        document.getElementById("error").textContent = err.message;
    }
}

loadProducts();