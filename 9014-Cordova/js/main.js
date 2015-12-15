document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('add').addEventListener('click', add);
    show(); //Used for showing list if available
});

function getListView() {
    var ListData = [];
    var ListItem = $('#grocery-mang0055 li');
    //debugger;
    $.each(ListItem, function (index, element) {
        //  debugger;
        var isCheck = $(this).find('[type="checkbox"]').is(':checked');
        var text = $(this).find('[id="' + index + '"]').text();
        var data = {
            Selected: isCheck,
            Text: text
        };
        ListData.push(data);
    });
    localStorage.setItem('grocery-mang0055', JSON.stringify(ListData));
    return ListData;
}

function get_todos() {
    var todos = [];
    var todos_str = localStorage.getItem('grocery-mang0055');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str);
    }
    return todos;
}

function add() {
    var task = document.getElementById('task').value;
    if (task.length === 0) {
    alert('Item name is required.');
    return;
}
    task = toTitleCase(task);
    var todos = get_todos();
    var data = {
        Selected: false,
        Text: task
    };
    todos.push(data);
    localStorage.setItem('grocery-mang0055', JSON.stringify(todos));
    $('#task').val('');
    show();

    return false;
}

function remove() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('grocery-mang0055', JSON.stringify(todos));
    show();
    return false;
}

function show() {
    var todos = get_todos();

    var html = '';
    if (todos.length > 0)
        $.each(todos, function (index, element) {
            var checked = "";
            if (element.Selected) {
                checked = "checked";
                html += '<li><input type="checkbox" onclick="getListView()" style="float:left; margin-top:15px;" name="checkbox" ' + checked + '><a href="#" id="' + index + '" style="text-decoration:line-through !important; color:grey";>' + element.Text + '</a> <a href="#" data-icon="delete" class="remove" id=' + index + '></a></li>';
            } else {
                html += '<li><input type="checkbox" onclick="getListView()" style="float:left; margin-top:15px;" name="checkbox" ' + checked + '><a href="#" id="' + index + '">' + element.Text + '</a> <a href="#" data-icon="delete" class="remove" id=' + index + '></a></li>';
            }

        });
    html += '';
    document.getElementById('grocery-mang0055').innerHTML = html;

    var check = document.getElementsByName('checkbox');
    for (var i = 0; i < check.length; i++) {
        check[i].addEventListener('change', function () {
            if ($(this).is(":checked")) {
                $(this).next().attr('style', 'text-decoration:line-through !important; color:grey;');
                // update json flag to true and save
            } else {
                $(this).next().removeAttr('style');
                // update json flag to false and save
            }
        });
    };

    var buttons = document.getElementsByClassName('remove');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };
    console.log(html);
    $('#grocery-mang0055').listview("refresh");

}
/*http://stackoverflow.com/questions/5086390/jquery-camelcase*/
function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function (match) {
        return match.toUpperCase();
    });
}