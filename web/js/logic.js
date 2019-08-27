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