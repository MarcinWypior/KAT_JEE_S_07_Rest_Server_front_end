$(function () {

    var body = $('body');
    body.prepend('<form class="form" style="font-size: 20px">Add book</form>');
    var form = $('.form');
    form.prepend('<div></div>');
    form.append('<div class="col"><input type="text" placeholder="isbn" name="isbn" id="isbn"/></div>');
    form.append('<div class="col"><input type="text" placeholder="title" name="title" id="title"/></div>');
    form.append('<div class="col"><input type="text" placeholder="author" name="author" id="author"/></div>');
    form.append('<div class="col"><input type="text" placeholder="publisher" name="publisher" id="publisher"/></div>');
    form.append('<div class="col"><input type="text" placeholder="type" name="type" id="type"/></div>');
    form.append('<div class="but"><button type="submit" value="submit" id="submit1">Send</button></div>');

    var isbn = $('#isbn');
    var title = $('#title');
    var author = $('#author');
    var publisher = $('#publisher');
    var type = $('#type');
    var button = $('#submit1');

    button.on('click', function () {
        var inputIsbn = isbn.val();
        var inputTitle = title.val();
        var inputAuthor = author.val();
        var inputPublisher = publisher.val();
        var inputType = type.val();

        var addBook = {
            isbn: inputIsbn,
            title: inputTitle,
            author: inputAuthor,
            publisher: inputPublisher,
            type: inputType
        };

        $.ajax({
            url: "http://localhost:8080/books/",
            data: JSON.stringify(addBook),
            dataType: "json",
            contentType: "application/json",
            method: "POST"
        }).done(function () {
            location.reload();
            console.log('dodano');
        })
    })



    readBooks();

    var bookId;

    function readBooks() {
        var dateContainer = $("#book");

        $.ajax({
            url: "http://localhost:8080/books/",
            type: "GET"
        }).done(function (result) {
            var books = result;
            for (let i = 0; i < books.length; i++) {
                var input = books[i].title;
                var newDiv = $('<div class="book" data-id="' + books[i].id + '">' + input + ' ' +
                    '<a href="#" class="link" data-id="' + books[i].id + '">Delete</a>' + ' ' + '' +
                    '<a href="#" class="editLink" data-id="' + books[i].id + '">Edit</a></div>');
                bookId = books[i].id;
                var newDiv2 = $('<div class="book-content"></div>');
                dateContainer.append(newDiv);
                newDiv.append(newDiv2);
            }
        });
    }


    $(document).on('click', '.book', function (event) {
        if (!(event.target.tagName === 'DIV' && event.target.classList.contains('book'))) {
            return false;
        }

        var currentBook = this;
        $.ajax({
            url: "http://localhost:8080/books/" + this.dataset.id,
            type: "GET"
        }).done(function (newBook) {
            var content = $(currentBook).find('.book-content');
            content.html('id: ' + newBook.id + '<br>isbn: ' + newBook.isbn + '<br>title: ' + newBook.title +
                '<br>autor: ' + newBook.author + '<br>wydawca: ' + newBook.publisher + '<br>gatunek: ' + newBook.type);
        });

    });


    $(document).on('click', '.link', function (event) {
        $.ajax({
            url: "http://localhost:8080/books/" + this.dataset.id,
            method: "DELETE"
        }).done(function () {
            console.log('wywalone')
            //location.reload();
        });
    });

    $(document).on('click', '.editLink', function (event) {
        event.stopImmediatePropagation();
        var body = event.target.nextElementSibling;
        $(body).prepend('<div><form class="formEdit" style="font-size: 20px">Edit book</form></div>');
        var formEdit = $('.formEdit');
        formEdit.prepend('<div></div>');
        formEdit.append('<div class="col"><input type="text" placeholder="isbn" name="isbn" id="isbnE"/></div>');
        formEdit.append('<div class="col"><input type="text" placeholder="title" name="title" id="titleE"/></div>');
        formEdit.append('<div class="col"><input type="text" placeholder="author" name="author" id="authorE"/></div>');
        formEdit.append('<div class="col"><input type="text" placeholder="publisher" name="publisher" id="publisherE"/></div>');
        formEdit.append('<div class="col"><input type="text" placeholder="type" name="type" id="typeE"/></div>');
        formEdit.append('<div class="but"><button type="submit" value="submit" id="submit2" data-id="' + bookId + '">Send</button></div>');
        var isbnE = $('#isbnE');
        var titleE = $('#titleE');
        var authorE = $('#authorE');
        var publisherE = $('#publisherE');
        var typeE = $('#typeE');
        var buttonE = $('#submit2');

        buttonE.on('click', function () {
            var inputIsbnE = isbnE.val();
            var inputTitleE = titleE.val();
            var inputAuthorE = authorE.val();
            var inputPublisherE = publisherE.val();
            var inputTypeE = typeE.val();
            var editBook = {
                isbn: inputIsbnE,
                title: inputTitleE,
                author: inputAuthorE,
                publisher: inputPublisherE,
                type: inputTypeE
            };

            $.ajax({
                url: "http://localhost:8080/books/" + this.dataset.id,
                data: JSON.stringify(editBook),
                dataType: "json",
                contentType: "application/json",
                method: "PUT"
            }).done(function () {
                console.log('zmieniono');

                location.reload();
                readBooks();
            });

        });

    });
});