function Imprimir(texto) {
    $.ajax({
        url: 'http://localhost:801/?text=' + texto,
        error: function (data) { alert(data); },
        success: function (data) {
        },
        statusCode: {
            404: function () {
                alert("O servidor de autenticação não foi iniciado.");
            }
        }
    });
    return false;
}
