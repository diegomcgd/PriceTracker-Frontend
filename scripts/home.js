let products;

async function loadProducts(){

    document.getElementById("message").innerText = sessionStorage.getItem("message");
    sessionStorage.removeItem("message");
    
    const response = await fetch("http://localhost:8000/products");
    
    try {
        if (!response.ok){
            throw new Error("Bad HTTP request");
        }

        // Save the response into an object with json() method
        // We could do the same using text() method and then JSON.parse()
        products = await response.json();

        let html = "";

        for (let product of products){
            html += `<tr><td><a href=${product.url} target="_blank">Name</a></td>`;
            html += `<td>${product.id}<td>`;
            html += `<td><a href="productPrices.html?id=${product.id}">View history</a></td></tr>`;
        }

        document.getElementById("table").innerHTML = html;

    } catch (err){
        document.getElementById("error").textContent = err.message;
    }
}

loadProducts();