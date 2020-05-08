$(function () {
    var dateContainer = $("#date");    $.ajax({
        url: "http://localhost:8282/books/",
        type: "GET"
    }).done(function (result) {
        var books = result
        console.log(books);
    });
});