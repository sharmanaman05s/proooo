
function addToCart(dish, price) {
    const selectedItemsElement = document.getElementById('selected-items');
    const totalPriceElement = document.getElementById('total-price');

    const listItem = document.createElement('li');
    listItem.classList.add('cl');
    listItem.innerText = `${dish}`;
    selectedItemsElement.appendChild(listItem);
    const totalPrice=document.getElementById('total');
      var totalPPrice = parseInt(totalPrice.innerText);
      totalPPrice+=parseInt(price);
    
    
   
    totalPriceElement.innerText = "Total Price: $" 
    document.getElementById('total').innerHTML= totalPPrice;
    console.log(totalPPrice);
}

function confirmOrder()
{
  const to=document.querySelectorAll(".cl");
  
  for(var i=0;i<to.length;i++){
  console.log(to[i].innerText);
  
  const a=to[i].innerText;
  const dataToSend = {
    name: a
  };
  console.log(dataToSend);
  
  fetch('/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSend)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Data received on the client:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
  alert("yep you order has been taken ");
}
