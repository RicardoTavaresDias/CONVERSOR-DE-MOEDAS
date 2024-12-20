// Cotação de moeda do dia.
const USD = 4.87
const EUR = 5.32
const GBP = 6.08

// Obtendo os elementos do formulário.
const form = document.querySelector("form") // Form
const amount = document.getElementById("amount") // Input VALOR
const currency = document.getElementById("currency") // Input select
const footer = document.querySelector("main footer") // Seletor footer
const description = document.getElementById("description") //span com id description
const result = document.getElementById("result") // h1 dentro do footer

// Manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g
  // Aqui vai remover os caracteres e fica somente numeros  o "replace", e no codigo não vai digitar letras
  amount.value = amount.value.replace(hasCharactersRegex, "") 
})


// Capturando o evento de submit (enviar) do formulário.
form.onsubmit = (event) => {
  event.preventDefault() // Para não carregar quando enviar o submit

  switch(currency.value){
    case "USD":
      convertCurrency(amount.value, USD, "US$")
      break
    case "EUR":
      convertCurrency(amount.value, EUR, "€")
      break
    case "GBP":
      convertCurrency(amount.value, GBP, "£")
      break
  }
}

// Função para converter a moeda.
function convertCurrency(amount, price, symbol) {
  try {
    // Exibindo a cotação da moeda selecionada.
    description.textContent = `${symbol} 1 = ${formCurrencyBRL(price)}`

    // Calcula o total.
    let total = amount * price
    //console.log(isNaN(total)) // Outra forma para validar se é numero

    // Verifica se o resultado não é um número
    if(isNaN(total)) {
      return alert ("Por favor, digite o valor corretamente para converter.")
    }

    // Formatar o valor total.
    total = formCurrencyBRL(total).replace("R$", "") // Replace formata, remove R$ e substitui por vazio "".

    // Exibir o resultado total.
    result.textContent = `${total} Reais`
    
    // Aplica a classe que exibe o footer para mostrar o resultado.
    footer.classList.add("show-result")

  } catch (error) {
    // Remove a classe do footer removendo ele.
    footer.classList.remove("show-result")
    console.log("Não foi possivel coverter. Tente novamente mais tarde.") 
  }
}

// Formata a moeda em Real Brasileiro.
function formCurrencyBRL(value){
  // Coverte para número para utilizar o toLocaleString para formatar no padrão BRL (R$ 00,00).
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}