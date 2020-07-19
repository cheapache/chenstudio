function rendergird(){

    $.ajax({
        url: url_report + 'select_code',
        data: JSON.stringify({}),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        type: 'POST',
        async: false,
        datafields: [
            { name: 'serialcode', type: 'string' },
            { name: 'flag', type: 'string' },
            { name: 'flaguse', type: 'string' },
            { name: 'type', type: 'string' },
            { name: 'point', type: 'int' },
            { name: 'extra_point', type: 'int' },
            { name: 'startdate', type: 'string' },
            { name: 'enddate', type: 'string' }
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
                        text: "SerialCode",
                        width: "23%",
                        datafield: "serialcode",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: function(row, column, value, data) {
        
                        },
                        cellclassname: function(row, column, value, data) {
        
                        }
                    },
        
                    {
                        text: "Used",
                        width: "10%",
                        datafield: "flaguse",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: function(row, column, value, element, info, record, data) {
                            if (record.flaguse == 'Y') {
                                return "<div class='jqx-grid-cell-middle-align' style='margin-top: 3.5px;'><div class='red led'></div></div>";
                            } else if (record.flaguse == 'N' ) {
                                return "<div class='jqx-grid-cell-middle-align' style='margin-top: 3.5px;'><div class='green led'></div></div>";
                            }
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
                        cellsrenderer: function(row, column, value, element, info, record, data) {
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
                        text: "Extra Point",
                        width: "10%",
                        datafield: "extra_point",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: function(row, column, value, data) {
        
                        },
                        cellclassname: function(row, column, value, data) {
        
                        }
                    },
    
                    {
                        text: "MFG",
                        width: "15%",
                        datafield: "startdate",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: function(row, column, value, element, info, record, data) {

                        },
                        cellclassname: function(row, column, value, data) {
        
                        }
                    },

                    {
                        text: "EXP",
                        width: "15%",
                        datafield: "enddate",
                        align: "center",
                        cellsalign: "center",
                        cellsrenderer: function(row, column, value, element, info, record, data) {

                        },
                        cellclassname: function(row, column, value, data) {
        
                        }
                    },
                ]
            });
        }
    });
}


$(document).ready(function(){

    rendergird();

    $("#txtsearch_1").on('keydown', function(e){

        console.log('test');

        if (e.keyCode == 13){

            var param = {
                search: $("#txtsearch_1").val()
            }
    
            $.ajax({
                url: url_report + 'search_code',
                data: JSON.stringify(param),
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                async: false,
                datafields: [
                    { name: 'serialcode', type: 'string' },
                    { name: 'flag', type: 'string' },
                    { name: 'flaguse', type: 'string' },
                    { name: 'type', type: 'string' },
                    { name: 'point', type: 'int' },
                    { name: 'extra_point', type: 'int' },
                    { name: 'startdate', type: 'string' },
                    { name: 'enddate', type: 'string' }
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