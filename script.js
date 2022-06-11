$(document).ready(function () {

    const $input = $('#new-task');
    const $todoTasksHolder = $('#todo-container');

    $input.focus();

    $input.on('keydown', function (event) {

        if (event.keyCode === 13 && $input.val() !== '') {

            const source = $('#todo-template').html();
            const todoContext = { label: $input.val() };
            const todoTemplate = Handlebars.compile(source);
            const html = todoTemplate(todoContext);

            $todoTasksHolder.prepend(html);
            bindEvents();
            $input.val('');
            if ($('#todo-container').children().length > 0) {
                $('#tasks-body').slideDown();
            }
        }
    });

    const deleteItem = function () {
        $(this).parent().remove();
        todoCounter();

        if ($('#todo-container').children().length === 0) {
            $('#tasks-body').slideUp();
        }
    }

    const editItem = function (event) {
        const $li = $(this).parent();
        const $label = $li.find('label');
        const $inputText = $li.find('input[type=text]');
        const $containsClass = $li.hasClass('editMode');

        if ($containsClass) {
            $label.html($inputText.val());
        } else {
            $inputText.val($label.html());
        }
    }

    $(document)
        .on('click', '.edit', function () {
            $(this).parent().toggleClass('editMode');
            $('input[type=text]').focus();
        })
        .on('change', '.checkBox', function (event) {
            $(this).parent().toggleClass('completed');
        });

    function bindEvents() {
        $('.delete').on('click', deleteItem);
        $('.edit').on('click', editItem);
        todoCounter();
    }

    $('#newColor').on('click', function (event) {
        if (event.target.tagName === 'LI') {
            let $color = $(event.target).css('background-color');

            $(event.target).siblings().removeClass('selected');
            $(event.target).addClass('selected');
            $('#head').css('color', $color);
            $('.container').css('border-color', $color);
            $input.focus();
            $('.form-control:focus').css('border-color', $color);
            $('.foot').css('color', $color);
        }
    });

    const todoWordPlurazile = (count, word) => {
        return count === 1 ? word : word + 's';
    }

    const todoCounter = function () {
        const footerSource = $("#footer-template").html();
        const footerTemplate = Handlebars.compile(footerSource);
        const activeTodo = $('#todo-container').children().length;
        const footerContext = {
            activeTodoCount: activeTodo,
            activeTodoWord: todoWordPlurazile(activeTodo, 'item')
        };
        const html = footerTemplate(footerContext);
        return $("#activeTodo").html(html);
    }

    $('#todo-container').on('click', function () {
        if (event.target.tagName == 'BUTTON') {
            if (event.target.className == 'up') {
                let li = event.target.parentNode;
                let prevLi = li.previousElementSibling;
                let ul = li.parentNode;
                if (prevLi) {
                    ul.insertBefore(li, prevLi);
                }
            }
            if (event.target.className == 'down') {
                let li = event.target.parentNode;
                let nextLi = li.nextElementSibling;
                let ul = li.parentNode;
                if (nextLi) {
                    ul.insertBefore(li, nextLi.nextSibling);
                }
            }
        }
    });
});