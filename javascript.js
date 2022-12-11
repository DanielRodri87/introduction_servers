// Se o botão click for clicado, gerar um alert, com o texto "Hello World"

if (document.getElementById("click")) {
    document.getElementById("click").addEventListener("click", function() {
        alert("Hello World");
    });
}