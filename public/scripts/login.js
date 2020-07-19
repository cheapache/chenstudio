$(document).ready(function(){

    $("#txtusername").val('admin');
    $("#txtpassword").val('12345');

    $("#btnlogin").on('click', function(){

        var param = {
            username: $("#txtusername").val(),
            password: $("#txtpassword").val()
        }

        $.ajax({
            url: url_authen + 'login',
            data: JSON.stringify(param),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            type: 'POST',
            async: false,
            success: function(res){
                if (res.status == 'login successfully'){
                    swal({
                        title: res.message,
                        text: res.status,
                        type: 'success',
                    }, (result) =>{
                        if (result){
                            window.location.href = '../register?id=' + res.data[0].userid + '&token=' + res.data[0].token;
                            
                            /*var param = {
                                id: res.data[0].userid,
                                token: res.data[0].token
                            }
                            
                            $.ajax({
                                url: '../register/',
                                data: JSON.stringify(param),
                                dataType: "json",
                                contentType: 'application/json; charset=utf-8',
                                type: 'GET',
                                async: false,
                                success: function(){
                                    window.location = url;
                                }
                            });*/

                        }
                    });
                }
            }
        });

    });

    $("#btnsignup").on('click', function(){
        window.location.href = '../signup';
    });


});