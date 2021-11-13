import "./styles.scss";
import axios from "axios";
const baseUrl = "/";

async function updateContact() {
  console.log("put request");
  const label = document.getElementById("resultdiv");
  try {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const number = document.getElementById("number").value;
    const token = document.getElementById("token").value;
    if (
      validateFirstName(firstName) &&
      validateLastName(lastName) &&
      validateNumber(number)
    ) {
      label.style.display = "block";
      label.innerText = "Loading...";
      const response = await axios.put("/api/persons", {
        name: firstName + " " + lastName,
        number: number,
        token: token,
      });
      label.innerText = response.data;
      setTimeout(() => {
        label.style.display = "none";
        label.innerText = "";
      }, 3 * 1000);
    }
  } catch (err) {
    const errorDiv = document.getElementById("errordiv");
    label.style.display = "none";
    errorDiv.style.display = "block";
    errorDiv.innerText = `${err.response.data.error}`;
    setTimeout(() => {
      errorDiv.style.display = "none";
      errorDiv.innerText = "";
    }, 3 * 1000);
  }
}




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
            let response;
      try {
        response = await axios.post(`${baseUrl}api/persons`, {
          name: firstName + " " + lastName,
          number: number,
        });
        label.innerText = `Added ${firstName} ${lastName} Successfuly`;
      } catch (error) {
        if (error.response.status === 404) {
          try {
            response = await axios.put(`${baseUrl}api/persons`, {
              name: firstName + " " + lastName,
              number: number,
            });
            label.innerText = `Updated ${firstName} ${lastName}`;
          } catch (error) {
            // displayError(error.response.data.message);
            const errorDiv = document.getElementById("errordiv");
    if (error.response.status === 409) {
      return updateContact();
    }
    label.style.display = "none";
    errorDiv.style.display = "block";
    errorDiv.innerText = `${error.response.data.error}`;
          }
        }
      }
    
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
//   update contact
//   async function updateContact() {
//     console.log("put request");
//     const label = document.getElementById("resultdiv");
//     try {
//       const firstName = document.getElementById("firstName").value;
//       const lastName = document.getElementById("lastName").value;
//       const number = document.getElementById("number").value;
//       const token = document.getElementById("token").value;
//       if (
//         validateFirstName(firstName) &&
//         validateLastName(lastName) &&
//         validateNumber(number)
//       ) {
//         label.style.display = "block";
//         label.innerText = "Loading...";
//         const response = await axios.put("/api/persons", {
//           name: firstName + " " + lastName,
//           number: number,
//           token: token,
//         });
//         label.innerText = response.data;
//         setTimeout(() => {
//           label.style.display = "none";
//           label.innerText = "";
//         }, 3 * 1000);
//       }
//     } catch (err) {
//       const errorDiv = document.getElementById("errordiv");
//       label.style.display = "none";
//       errorDiv.style.display = "block";
//       errorDiv.innerText = `${err.response.data.error}`;
//       setTimeout(() => {
//         errorDiv.style.display = "none";
//         errorDiv.innerText = "";
//       }, 3 * 1000);
//     }
//   }

//   async function addContact(event) {
//     event.preventDefault();
//     const label = document.getElementById("resultdiv");
//     try {
//       const firstName = document.getElementById("firstName").value;
//       const lastName = document.getElementById("lastName").value;
//       const number = document.getElementById("number").value;
      
//       if (
//         validateFirstName(firstName) &&
//         validateLastName(lastName) &&
//         validateNumber(number)
//       ) {
//         label.style.display = "inline";
//         label.innerText = "Loading...";
//         const response = await axios.post("/api/persons", {
//           name: firstName + " " + lastName,
//           number: number,
//         });
//         label.innerText = `Added ${firstName} ${lastName} Successfuly`;
//         setTimeout(() => {
//           label.style.display = "none";
//           label.innerText = "";
//         }, 3 * 1000);
//       }
//     } catch (error) {
//       const errorDiv = document.getElementById("errordiv");
//       console.log("gets hereeeee")
//       if (error.response.data.error === "name must exsits in database") {
//         return updateContact();
//       }
//       label.style.display = "none";
//       errorDiv.style.display = "block";
//       errorDiv.innerText = `${error.response.data.error}`;
//       setTimeout(() => {
//         errorDiv.style.display = "none";
//         errorDiv.innerText = "";
//       }, 3 * 1000);
//     }
//   }
  