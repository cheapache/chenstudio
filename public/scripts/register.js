$(document).ready(function(){

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    $("#btnsubmit").on('click', function(){
        $("#btnsubmit").jqxValidator('validate');
    });

    $("#btnsubmit").jqxValidator({
        rules:[
            { input: '#txtcode', action: 'keyup, blur', message: 'Textbox is not null.', rule: 'required' }
        ]
    });

    $("#btnsubmit").on('validationSuccess', function(){

        console.log('test');

        var param = {
            'serialcode': $("#txtcode").val(),
            'userid': document.getElementById('attruserid').innerHTML
        }

        //console.log(token);

        $.ajax({
            url: url_regis + 'regiscode',
            data: JSON.stringify(param),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            headers: { 'authen-token': token },
            type: 'POST',
            async: false,
            success: function(res){
                //if (res.length == 0){
                    if (res.status == 'Register Successfully'){
                        swal({
                            title: res.status,
                            text: res.message,
                            type: 'success',
                        }, (result) =>{
                            $("#txtcode").val('');
                        });
                    }
                    else{
                        swal({
                            title: res.status,
                            text: res.message,
                            type: 'error',
                        }, (result) =>{
                            $("#txtcode").val('');
                        });
                    }

                //}
                //else{
                    //console.log(res);
                //}
            }
        });

    });
});