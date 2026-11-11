<script setup>

import { ref } from 'vue';

const data = ref(null)

async function obtainProducts() {
  try{
    const response = await fetch('http://localhost:8000/products');

    if(!response.ok){
      throw new Error(`Error in the request: ${response.status}`);
    }
      
    data.value = await response.json();
    console.log(data.value)
  }
  catch (error){
    console.log("There was an error with the request: " + error);
  } 
}

</script>

<template>
  <div>
    <button v-on:click="obtainProducts">Click here</button>
    <p>{{ data }}</p>
  </div>  
</template>

<style scoped></style>
