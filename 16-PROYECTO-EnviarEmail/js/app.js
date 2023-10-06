document.addEventListener("DOMContentLoaded", function (){

    const email = {
        email: "",
        subject: "",
        message: "",
    }
    
    const inputEmail = document.querySelector("#email");
    const inputCC = document.querySelector("#CC");
    const inputSubject = document.querySelector("#subject");
    const inputMessage = document.querySelector("#message");
    const formulario = document.querySelector("#formulario");
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector("#spinner")

    inputEmail.addEventListener("input", validacion)
    inputCC.addEventListener("input", validarCC)
    inputSubject.addEventListener("input", validacion)
    inputMessage.addEventListener("input", validacion)
    formulario.addEventListener("submit", enviarEmail)
    btnReset.addEventListener("click", function(e){
        e.preventDefault();
        resetForm();
    })

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add("flex")
        spinner.classList.remove("hidden")

        setTimeout(() => {
            spinner.classList.remove("flex")
            spinner.classList.add("hidden")
            resetForm();

            const alertaExito = document.createElement("p");
            alertaExito.classList.add("bg-green-500", "text-white", "p-2", "text-center", "rounded-lg", "mt-10", "font-bold", "text-sm", "uppercase");
            alertaExito.textContent = "Email sent successfully";
            formulario.appendChild(alertaExito);
            setTimeout(() => {
                alertaExito.remove()
            }, 3000);
        }, 2000);
    }

        function validarCC(e) {
         if(e.target.id === "CC" && !validarEmail(e.target.value)){
             mostrarAlerta("Enter a valid email", e.target.parentElement)
             CC[e.target.name] = "";
             comprobarEmail();
             return;

     }
     limpiarAlerta(e.target.parentElement);
     CC[e.target.name] = e.target.value.trim().toLowerCase();
     comprobarEmail();
 }

    function validacion(e) {
       if(e.target.value.trim() === '') {
          mostrarAlerta(`The field ${e.target.id} is required`, e.target.parentElement);
          email[e.target.name] = "";
          comprobarEmail();
          return;
       }
       if(e.target.id === "email" && !validarEmail(e.target.value)){
    mostrarAlerta("Enter a valid email", e.target.parentElement)
    email[e.target.name] = "";
    comprobarEmail();
    return;
      } 
         limpiarAlerta(e.target.parentElement);
         email[e.target.name] = e.target.value.trim().toLowerCase();
         comprobarEmail(); 
    }
    
    function mostrarAlerta(message, campoEspecifico) {
     limpiarAlerta(campoEspecifico);

        const error = document.createElement("p");
        error.textContent = message;
        error.classList.add("bg-red-600", "text-white", "p-2", "text-center")

        campoEspecifico.appendChild(error)
    }

    function limpiarAlerta(campoEspecifico) {
        const alerta = campoEspecifico.querySelector(".bg-red-600");
        if(alerta) {
            alerta.remove();
        } 
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email)
        return resultado;
    }

    function comprobarEmail() {
        if(Object.values(email).includes("")) {
            btnSubmit.classList.add("opacity-50");
            btnSubmit.disabled = true;
            return;
        }
           btnSubmit.classList.remove("opacity-50");
           btnSubmit.disabled = false;
    }

    function resetForm() {
        email.email = "";
        email.subject = "";
        email.message = "";
        formulario.reset();
        comprobarEmail();
    }
})