$("#todos").ready(function() {
    reloadTodos();
});
//function that gets multiple todo items then renders them
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
                        +'<td>'
                        +'<button data-id="'+data[i].id+'" class="btn btn-xs btn-danger delete"><span class="glyphicon glyphicon-remove glyphicon-white"></span></button>'
                        +'</td></tr>';
                }
                $('#todos').html(row);
            }
        }
    });
}

$("#todo").ready(function() {
    reloadTodo();
});
//function that gets individual todo item then renders it
function reloadTodo() {
    $.ajax({ 
        type: 'GET',
        url: $("#todo").data('id'), 
        contentType: 'application/json',
        dataType: 'json',
        success: function( data ) {
            if ('id' in data) {
                let content;
                content += '<tr><td>Item number</td><td>'+data.id+'</td> </tr>'
                    +'<tr><td>User</td><td>'+data.user_id+'</td></tr>'
                    +'<tr><td>Description</td><td>'+data.description+'</td></tr>'
                    +'<tr><td>Complete</td><td>'
                    +'<input type="checkbox" class="form-check-input" id="completed" data-id="'+data.id+'" '+(data.completed === '1' ? 'checked' : '')+'>' //check if todo is completed
                    +'</td></tr>'
                    +'<tr><td></td>'
                    +'<td>'
                    +'<button data-id="'+data.id+'" class="btn btn-xs btn-danger delete"><span class="glyphicon glyphicon-remove glyphicon-white"></span></button>'
                    +'</td></tr>';
                $('#todo').html(content);
            }
        }
    });
}

//delegate listener for status change
$(document).on('change', '#completed', function() {
    const status = $('#completed').prop('checked') ? 1 : 0;
    $.ajax({ 
        type: 'GET',
        url: 'complete/'+$('#completed').data('id')+'/'+status, 
        contentType: 'application/json',
        success: function( data ) {
            reloadTodo();
        }
    });
});

//delegate listener for delete
$(document).on('click', '.delete', function() {
    const itemToDelete = $(this);
    $.ajax({ 
        type: 'GET',
        url: ($('#completed').length ? '' : 'todo/')+'delete/'+itemToDelete.data('id'), 
        contentType: 'application/json',
        success: function( data ) {
            if ($("#completed").length) {
                window.location.href = '/todo';
            } else {
                reloadTodos();
            }
        }
    });
});