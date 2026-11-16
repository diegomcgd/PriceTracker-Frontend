async function loadProducts(){
    
    const response = await fetch("http://localhost:8000/products");
    
    try {
        if (!response.ok){
            throw new Error("Bad HTTP request");
        }

        // Save the response into an object with json() method
        // We could do the same using text() method and then JSON.parse()
        let products = await response.json();

        let html = "";

        for (let product of products){
            html += `<li>${product.url}</li>`;
        }

        document.getElementById("products").innerHTML = html;

    } catch (err){
        document.getElementById("error").innerHTML = err.message;
    }
}

loadProducts();