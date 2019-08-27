$("#todos").ready(function() {
    reloadTodos();
});
function reloadTodos() {
    $.ajax({ 
        type: 'GET',
        url: '', 
        contentType: 'application/json',
        dataType: 'json',
        success: function( data ) {
            if (data.length) {
                let row = '<tr>';
                for (let i=0; i<data.length; i++) {
                    row += '<td>'+data[i].id+'</td>'
                        +'<td>'+(data[i].completed === '1' ? 'Yes' : 'No')+'</td>'
                        +'<td><a href="todo/'+data[i].id+'">'+data[i].description+'</a></td>'
                        +'<td><form method="post" action="todo/delete/'+data[i].id+'">'
                        +'<button type="submit" class="btn btn-xs btn-danger"><span class="glyphicon glyphicon-remove glyphicon-white"></span></button>'
                        +'</form></td></tr>';
                }
                $('#todos').html(row);
            }
        }
    });
}

$("#todo").ready(function() {
    reloadTodo();
});
function reloadTodo() {
    $.ajax({ 
        type: 'GET',
        url: $("#todo").data('id'), 
        contentType: 'application/json',
        dataType: 'json',
        success: function( data ) {
            if ('id' in data) {
                let content;
                console.log(data.completed);
                content += '<tr><td>Item number</td><td>'+data.id+'</td> </tr>'
                    +'<tr><td>User</td><td>'+data.user_id+'</td></tr>'
                    +'<tr><td>Description</td><td>'+data.description+'</td></tr>'
                    +'<tr><td>Complete</td><td>'
                    +'<input type="checkbox" class="form-check-input" id="completed" data-id="'+data.id+'" '+(data.completed === '1' ? 'checked' : '')+'>' //check if todo is completed
                    +'</td></tr>'
                    +'<tr><td></td><td>'
                    +'<form method="post" action="todo/delete/"'+data.id+'">'
                    +'<button type="submit" class="btn btn-xs btn-danger"><span class="glyphicon glyphicon-remove glyphicon-white"></span></button>'
                    +'</form></td></tr>';
                $('#todo').html(content);
            }
        }
    });
}
