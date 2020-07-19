function rendergird(){

    var param = {
        flaguse: 'Y',
        flag: 'Y'
    }

    $.ajax({
        url: url_report + 'select',
        data: JSON.stringify(param),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        type: 'POST',
        async: false,
        datafields: [
            { name: 'id', type: 'int' },
            { name: 'serialcode', type: 'string' },
            { name: 'userid', type: 'string' },
            { name: 'username', type: 'string' },
            { name: 'type', type: 'string' },
            { name: 'point', type: 'int' },
            { name: 'tstmp', type: 'string' }
        ],
        success: function(data){

            var source =
            {
                localdata: data,
                datatype: "array"
            };

            var dataAdapter = new $.jqx.dataAdapter(source)

            $("#gridcode").jqxGrid({
                source: dataAdapter,
                width: '100%',
                height: 425,
                altrows: true,
                enabletooltips: true,
                editable: false,
                selectionmode: 'singlerow',
                scrollmode: 'default',
                scrollbarsize: 10,
                pageable: true,
                pagermode: 'simple',
                pagesize: 10,
                rowsheight: 35,
                theme: 'bootstrap',
                showcolumnlines: false,
                showcolumnheaderlines: false,
                columns: [
        
                    {
                        text: "#",
                        width: "4.9%",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: function(row, column, value, element, info, record, data) {
                            if (record.id != 0) {
                                return "<div class='jqx-grid-cell-middle-align' style='margin-top: 6.5px;'>" + (record.boundindex + 1) + "</div>";
                            } else {
                                return "<div class='jqx-grid-cell-middle-align' style='margin-top: 6.5px;'>" + (record.boundindex) + "</div>";
                            }
                        },
                        cellclassname: function(row, column, value, data) {
        
                        }
                    },

                    {
                        text: "Username",
                        width: "23%",
                        datafield: "username",
                        align: "center",
                        cellsalign: "left",
                        cellsrenderer: function(row, column, value, data) {
        
                        },
                        cellclassname: function(row, column, value, data) {
        
                        }
                    },
        
                    {
                        text: "Code",
                        width: "20%",
                        datafield: "serialcode",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: function(row, column, value, data) {
        
                        },
                        cellclassname: function(row, column, value, data) {
        
                        }
                    },
    
        
                    {
                        text: "Type",
                        width: "12%",
                        datafield: "type",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: function(rrow, column, value, element, info, record, data) {
                            if (record.type == 'S') {
                                return "<div class='jqx-grid-cell-middle-align' style='margin-top: 6.5px;'>Spacial</div>";
                            } else {
                                return "<div class='jqx-grid-cell-middle-align' style='margin-top: 6.5px;'>Normal</div>";
                            }
                        },
                        cellclassname: function(row, column, value, data) {
        
                        }
                    },
        
                    {
                        text: "Point",
                        width: "10%",
                        datafield: "point",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: function(row, column, value, data) {
        
                        },
                        cellclassname: function(row, column, value, data) {
        
                        }
                    },
        
                    {
                        text: "Date",
                        width: "20%",
                        datafield: "tstmp",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: function(row, column, value, data) {
        
                        },
                        cellclassname: function(row, column, value, data) {
        
                        }
                    },
    
                    {
                        text: "Reset",
                        width: "10%",
                        datafield: "flaguse",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: function(row, column, value, element, info, record, data) {
                            if (record.id != 0) {
                                return "<div class='jqx-grid-cell-middle-align' style='margin-top: 2.5px;'><button id='btnreset_" + record.id + "' type='button' class='btn btn-warning' style='font-size: 14px; width: 80px; height: 30px;' onclick='resetclick(this)'>Reset</button></div>";
                            } else {
                                return "<div class='jqx-grid-cell-middle-align' style='margin-top: 2.5px;'></div>";
                            }
                        },
                        cellclassname: function(row, column, value, data) {
        
                        }
                    },
                ]
            });
        }
    });
}

function resetclick(element){
    
    var param = {
        id: (element.id).split('_')[1],
        serialcode: rowitem_serialcode
    }

    $.ajax({
        url: url_report + 'reset',
        data: JSON.stringify(param),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        type: 'POST',
        async: false,
        success: function(res){

            console.log(res);

            if (res.status == 'successfully'){
                rendergird();
            }
            else{
                swal({
                    title: res.status,
                    text: res.message,
                    type: 'error',
                });
            }
        }
    });
}

var rowitem_serialcode;

$(document).ready(function(){

    rendergird();

    $("#gridcode").on('rowselect', function(e){
        var args = e.args;
        var rowBoundIndex = args.rowindex;
        var rowData = args.row;

        rowitem_serialcode = rowData.serialcode;
    });

    $("#txtsearch").on('keydown', function(e){
        if (e.keyCode == 13){

            var param = {
                search: $("#txtsearch").val()
            }
        
            $.ajax({
                url: url_report + 'select_single',
                data: JSON.stringify(param),
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                async: false,
                datafields: [
                    { name: 'id', type: 'int' },
                    { name: 'serialcode', type: 'string' },
                    { name: 'userid', type: 'string' },
                    { name: 'username', type: 'string' },
                    { name: 'type', type: 'string' },
                    { name: 'point', type: 'int' },
                    { name: 'tstmp', type: 'string' }
                ],
                success: function(data){
        
                    var source =
                    {
                        localdata: data,
                        datatype: "array"
                    };
        
                    var dataAdapter = new $.jqx.dataAdapter(source)
        
                    $("#gridcode").jqxGrid({
                        source: dataAdapter,
                    });
                }
            });
        }
    });


});