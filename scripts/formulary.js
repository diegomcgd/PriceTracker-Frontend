async function addProduct(event){

    // prevent that the page reloads

    event.preventDefault();

    const url = document.getElementById("product_url");

    try{

        // Check that the URL is valid

        await checkUrl(url.value);

        // Send the new product to the API

        const response = await fetch("http://localhost:8000/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "url": url.value
            })
        });
        if (response.status == 409){
            throw new Error("Error: the product is already in the database")
        }
        else if (!response.ok){
            throw new Error("Error adding the new product")
        }

        const result = await response.json();

        sessionStorage.setItem("message", result.message + ", id of the product: " + result.id);

        window.location.href = "index.html";

    } catch(err){
        document.getElementById("error").textContent = err.message;
    }
}

document.getElementById("new_product_form").addEventListener("submit", addProduct);


async function checkUrl(urlToCheck){
    const url = new URL(urlToCheck);

    if (url.protocol !== "https:")
        throw new Error("Error: the URL is not valid");

    if (url.hostname !== "www.thomann.es")
        throw new Error("Error: the URL is not valid");

    if (!url.pathname.toLowerCase().endsWith(".htm"))
        throw new Error("Error: the URL is not valid");
}