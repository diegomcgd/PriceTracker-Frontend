async function loadProducts(){
    
    const response = await fetch("http://localhost:9999");
    
    try {
        if (!response.ok){
            throw new Error("Bad HTTP request");
        }
        document.getElementById("error").innerHTML = response.status;
    } catch (err){
        document.getElementById("error").innerHTML = err.message;
    }

}

loadProducts();