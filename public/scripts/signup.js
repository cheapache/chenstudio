$(document).ready(function(){

    $("#btncancel").on('click', function(){
        window.location.href = '../';
    });

    $("#btnsubmit").on('click', function(){
        $("#btnsubmit").jqxValidator('validate');
    });

    $("#btnsubmit").jqxValidator({

        rules: [
            { input: '#txtusername', action: 'keyup, blur', message: 'Username is required!', rule: 'required' },
            { input: '#txtpassword', action: 'keyup, blur', message: 'Password is required!', rule: 'required' },
            { input: '#txtcfpassword', action: 'keyup, blur', message: 'Confirm Password is required!', rule: 'required' },
            { input: '#txtcfpassword', action: 'keyup, blur', message: 'Confirm Password not match!', rule: function(){
                if ($("#txtpassword").val() != $("#txtcfpassword").val()){
                    return false;
                }
                else{
                    return true;
                }
            }}
        ]
    });

    $("#btnsubmit").on('validationSuccess', function(){

        var param = {
            username: $("#txtusername").val(),
            password: $("#txtcfpassword").val()
        }

        $.ajax({
            url: url_authen + 'register',
            data: JSON.stringify(param),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            async: false,
            success: function(result){
                if (result.status == 'successfully'){
                    swal({
                        title: result.status,
                        text: result.message,
                        type: 'success',
                    }, (result) =>{
                        if (result){
                            window.location.href = '../';
                        }
                    });
                }
                else{
                    swal({
                        title: result.status,
                        text: result.message,
                        type: 'error',
                    }, (result) => {
                        if (result){
                            $("#txtusername").val('');
                            $("#txtpassword").val('');
                            $("#txtcfpassword").val('');
                        }
                    });
                }
            }

        });
    });

});