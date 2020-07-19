

var url_authen = '../api/authen/';
var url_regis = '../api/register/';
var url_report = '../api/report/';

function json_call(source, callBackCmpl, callBackError, callBackBeLdCmpl) {
    var dataAdapter = json_call_query(source, callBackCmpl, callBackError, callBackBeLdCmpl);
    //--- perform data binding operation.
    dataAdapter.dataBind();
    return dataAdapter;
}

//--- Use for Show Grid
function json_call_query(source, callBackCmpl, callBackError, callBackBeLdCmpl) {
    var dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function(records) {

            if (records == null || records == '') {
                //alert(callBackError);
                if (callBackError != null) eval(callBackError);
                //return;
            }

            var length = records.length;
            //alert('res = '+records.toSource());
            for (var i = 0; i < length; i++) {
                var record = records[i];
            }
            if (callBackCmpl != null) eval(callBackCmpl);
        },
        loadError: function(jqXHR, status, error) {
            if (callBackError != null) eval(callBackError);
        },
        beforeLoadComplete: function(records) {
            if (callBackBeLdCmpl != null) eval(callBackBeLdCmpl);
        }
    });

    return dataAdapter;
}