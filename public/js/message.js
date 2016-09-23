var system_massages = $("#system_massages");

function system_error_message(msg)
{
    var error_msg = "<div class='col-md-12' style='padding-top: 30px;'> <div class='alert alert-dismissible alert-danger'> <button type='button' class='close' data-dismiss='alert'>×</button> <strong>Oh we have trubole!</strong> "+msg+"</div> </div>";
    system_massages.html(error_msg);
}

function system_success_message(msg)
{
    var error_msg = "<div class='col-md-12' style='padding-top: 30px;'> <div class='alert alert-dismissible alert-success'> <button type='button' class='close' data-dismiss='alert'>×</button>"+msg+"</div> </div>";
    system_massages.html(error_msg);

}

function system_hide_message()
{
    system_massages.html('');
}


function system_is_live()
{
    var error_msg = "<button class='btn btn-success' style='position: fixed;padding-top: 40px;width: 60px;'>LIVE</button>";
    $("#show_live").html(error_msg);

}

function system_is_down()
{
    var error_msg = "<button class='btn btn-danger' style='position: fixed;padding-top: 40px;width: 60px;'>Down</button>";
    $("#show_live").html(error_msg);

}

function increment(id)
{
    $("#"+id).html("<i class='glyphicon glyphicon-arrow-up' style='color: green;'></i>");
}

function decrement(id)
{
    $("#"+id).html("<i class='glyphicon glyphicon-arrow-down' style='color: red;'></i>");
}

function equal(id)
{
    $("#"+id).html("<i class='glyphicon glyphicon-sort' style='color: #ffa00f;'></i>");
}
