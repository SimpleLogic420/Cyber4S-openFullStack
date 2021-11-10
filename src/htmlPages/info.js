import "./styles.scss";
import axios from "axios";
const baseUrl = "/";



async function addContact(event) {   
    event.preventDefault(); 
    const label = document.getElementById("resultdiv")
    try{
        console.log("outside if")
        const firstName = document.getElementById("firstName").value;
        console.log("first")
        const lastName = document.getElementById("lastName").value;
        console.log("last")
        const number = document.getElementById("number").value;
        console.log("number") 
         if(validateFirstName(firstName) && validateLastName(lastName) && validateNumber(number)){  
            label.style.display = "inline";
           
             label.innerText = "Loading...";
            console.log("inside the if of add contact")
            const response =await axios.post(`${baseUrl}api/persons`, {
                name: firstName + " " + lastName,
                number: number
            });
            label.innerText = `Added ${firstName} ${lastName} Successfuly`    
            setTimeout(()=>{label.style.display = "none";
        }, 3*1000);  
            
         }        
    } catch(error){
        label.innerText = "";
        console.log(error);
        return error;
    }    
}

const addButton=document.getElementById("addButton")
addButton.addEventListener("click", addContact);
console.log(addButton)

function validateFirstName(name) {
    if (/^[a-zA-Z0-9 ]+$/.test(name)) {
      return true;
    }
    errorDiv.style.display = "inline";
    errorDiv.innerText = "First name is not invaid";
    setTimeout(() => {
      errorDiv.innerText = "";
      errorDiv.style.display = "none";
    }, 3 * 1000);
    return false;
  }
  
  function validateLastName(name) {
    if (/^[a-zA-Z0-9 ]+$/.test(name)) {
      return true;
    }
    errorDiv.style.display = "inline";
    errorDiv.innerText = "Last name is not invaid";
    setTimeout(() => {
      errorDiv.innerText = "";
      errorDiv.style.display = "none";
    }, 3 * 1000);
    return false;
  }
  
  function validateNumber(number) {
    if (number.length <= 11 && number.length >= 7) {
      return true;
    }
    errorDiv.style.display = "inline";
    errorDiv.innerText = "Number is not invaid";
    setTimeout(() => {
      errorDiv.innerText = "";
      errorDiv.style.display = "none";
    }, 3 * 1000);
    console.log();
    return false;
  }
  