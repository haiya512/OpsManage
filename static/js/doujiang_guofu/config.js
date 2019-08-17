var userInfo = {}

function getTagsFamilyList(vIds) {
    var iList = []
    var sList = []
    var allAssets = requests('get', '/api/family/')
    for (var i = 0; i < allAssets.length; i++) {
        sList.push({
            "id": allAssets[i]["id"],
            "name": allAssets[i]["job"]
        })
    }
    $.ajax({
        cache: true,
        type: "POST",
        url: "/assets/server/query/",
        data: {
            "query": 'tags',
            "id": vIds
        },
        async: false,
        error: function (response) {
            iList = []
            new PNotify({
                title: 'Ops Failed!',
                text: response.responseText,
                type: 'error',
                styling: 'bootstrap3'
            });
        },
        success: function (response) {
            for (var i = 0; i < response["data"].length; i++) {
                iList.push({
                    "id": response["data"][i]["id"],
                    "name": response["data"][i]["job"]
                })
                for (var j = 0; j < sList.length; j++) {
                    if (sList[j]["id"] == response["data"][i]["id"]) {
                        sList.splice(j, 1);
                    }
                }
            }
        }
    });
    return {"tags": iList, "all": sList}
}

function modfEquipment(vIds, zone_name, zone_network, zone_local, zone_contact, zone_number) {
    $.confirm({
        icon: 'fa fa-edit',
        type: 'blue',
        title: '修改数据',
        content: '<form  data-parsley-validate class="form-horizontal form-label-left">' +
        '<div class="form-group">' +
        '<label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">机房名称<span class="required">*</span>' +
        '</label>' +
        '<div class="col-md-6 col-sm-6 col-xs-12">' +
        '<input type="text"  name="modf_zone_name" value="' + zone_name + '" required="required" class="form-control col-md-7 col-xs-12">' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">机房联系人<span class="required">*</span>' +
        '</label>' +
        '<div class="col-md-6 col-sm-6 col-xs-12">' +
        '<input type="text" name="modf_zone_contact" value="' + zone_contact + '"  required="required" placeholder="" class="form-control col-md-7 col-xs-12">' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">机房位置<span class="required">*</span>' +
        '</label>' +
        '<div class="col-md-6 col-sm-6 col-xs-12">' +
        '<input type="text" name="modf_zone_local" value="' + zone_local + '"  required="required" placeholder="" class="form-control col-md-7 col-xs-12">' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">联系人号码<span class="required">*</span>' +
        '</label>' +
        '<div class="col-md-6 col-sm-6 col-xs-12">' +
        '<input type="text" name="modf_zone_number" value="' + zone_number + '"  required="required" placeholder="" class="form-control col-md-7 col-xs-12">' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">机房网段<span class="required">*</span>' +
        '</label>' +
        '<div class="col-md-6 col-sm-6 col-xs-12">' +
        '<input type="text"  name="modf_zone_network" value="' + zone_network + '" required="required"  class="form-control col-md-7 col-xs-12">' +
        '</div>' +
        '</div> ' +
        '</form>',
        buttons: {
            '取消': function () {
            },
            '修改': {
                btnClass: 'btn-blue',
                action: function () {
                    var zone_name = this.$content.find("[name='modf_zone_name']").val();
                    var zone_network = this.$content.find("[name='modf_zone_network']").val();
                    var zone_local = this.$content.find("[name='modf_zone_local']").val();
                    var zone_contact = this.$content.find("[name='modf_zone_contact']").val();
                    var zone_number = this.$content.find("[name='modf_zone_number']").val();
                    $.ajax({
                        cache: true,
                        type: "PUT",
                        url: "/api/zone/" + vIds + '/',
                        data: {
                            "zone_name": zone_name,
                            "zone_local": zone_local,
                            "zone_network": zone_network,
                            "zone_contact": zone_contact,
                            "zone_number": zone_number,
                        },
                        error: function (request) {
                            new PNotify({
                                title: 'Ops Failed!',
                                text: request.responseText,
                                type: 'error',
                                styling: 'bootstrap3'
                            });
                        },
                        success: function (data) {
                            new PNotify({
                                title: 'Success!',
                                text: '修改成功',
                                type: 'success',
                                styling: 'bootstrap3'
                            });
                            RefreshTable('equipmentTable', '/api/zone/');
                        }
                    });
                }
            }
        }
    });
}

var language = {
    "sProcessing": "处理中...",
    "sLengthMenu": "显示 _MENU_ 项结果",
    "sZeroRecords": "没有匹配结果",
    "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
    "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
    "sInfoPostFix": "",
    "sSearch": "搜索: ",
    "sUrl": "",
    "sEmptyTable": "表中数据为空",
    "sLoadingRecords": "载入中...",
    "sInfoThousands": ",",
    "oPaginate": {
        "sFirst": "首页",
        "sPrevious": "上页",
        "sNext": "下页",
        "sLast": "末页"
    },
    "oAria": {
        "sSortAscending": ": 以升序排列此列",
        "sSortDescending": ": 以降序排列此列"
    }
}

function requests(method, url, data) {
    var ret = '';
    $.ajax({
        async: false,
        url: url, //请求地址
        type: method,  //提交类似
        success: function (response) {
            ret = response;
        },
        error: function (data) {
            ret = {};
        }
    });
    return ret
}

function InitDataTable(tableId, url, buttons, columns, columnDefs) {
    var data = requests('get', url)
    oOverviewTable = $('#' + tableId).dataTable(
        {
            "dom": "Bfrtip",
            "buttons": buttons,
            "bScrollCollapse": false,
            "bRetrieve": true,
            "destroy": true,
            "data": data,
            "columns": columns,
            "columnDefs": columnDefs,
            "language": language,
            "order": [[0, "ase"]],
            "autoWidth": false
        });
}

function RefreshTable(tableId, urlData) {
    $.getJSON(urlData, null, function (dataList) {
        table = $('#' + tableId).dataTable();
        oSettings = table.fnSettings();

        table.fnClearTable(this);

        for (var i = 0; i < dataList.length; i++) {
            table.oApi._fnAddData(oSettings, dataList[i]);
        }

        oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
        table.fnDraw();
    });
}

$(function () {
    var userList = requests("get", "/api/user/")
    for (var i = 0; i < userList.length; i++) {
        userInfo[userList[i]["id"]] = userList[i]
    }
})

$(document).ready(function () {

    function makeFamilyTables() {
        var columns = [
            {"data": "id"},
            {"data": "job"},
        ]
        var columnDefs = [
            {
                targets: [2],
                render: function (data, type, row, meta) {
                    return '<div class="btn-group  btn-group-xs">' +
                        '<button type="button" name="btn-family-modf" value="' + row.id + '" class="btn btn-default"  aria-label="Justify"><span class="fa fa-edit" aria-hidden="true"></span>' +
                        '</button>' +
                        '<button type="button" name="btn-family-confirm" value="' + row.id + '" class="btn btn-default" aria-label="Justify"><span class="fa fa-trash" aria-hidden="true"></span>' +
                        '</button>' +
                        '</div>';
                },
                "className": "text-center",
            },
        ]
        var buttons = [{
            text: '<span class="fa fa-plus"></span>',
            className: "btn-xs",
            action: function (e, dt, node, config) {
                $('#addFamilyModal').modal("show");
                var projectList = requests("get", "/api/family/")
                var userHtml = '<select required="required" class="form-control" id="project_service_select"  autocomplete="off">'
                var selectHtml = '';
                for (var i = 0; i < projectList.length; i++) {
                    selectHtml += '<option value="' + projectList[i]["id"] + '">' + projectList[i]["job"] + '</option>'
                }
                ;
                userHtml = userHtml + selectHtml + '</select>';
                document.getElementById("project_owner").innerHTML = userHtml;
            }
        }]
        InitDataTable('FamilyTableLists', "/api/family/", buttons, columns, columnDefs)
    }

    makeFamilyTables()

    //修改家族职务名称
    $('#FamilyTableLists tbody').on('click', "button[name='btn-family-modf']", function () {
        var vIds = $(this).val();
        var project = $(this).parent().parent().parent().find("td").eq(1).text();
        //var zone_network = td.eq(5).text()
        console.log(vIds, project)

        $.confirm({
            icon: 'fa fa-edit',
            type: 'blue',
            title: '修改数据',
            content: '<form  data-parsley-validate class="form-horizontal form-label-left">' +
            '<div class="form-group">' +
            '<label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">职务名称 <span class="required">*</span>' +
            '</label>' +
            '<div class="col-md-6 col-sm-6 col-xs-12">' +
            '<input type="text"  name="job" value="' + project + '" required="required" class="form-control col-md-7 col-xs-12">' +
            '</div>' +
            '</div>' +
            '</form>',
            buttons: {
                '取消': function () {
                },
                '修改': {
                    btnClass: 'btn-blue',
                    action: function () {
                        var param_name = this.$content.find("[name='job']").val();
                        $.ajax({
                            cache: true,
                            type: "PUT",
                            url: "/api/family/" + vIds + '/',
                            data: {
                                "id": vIds,
                                "job": param_name,
                            },
                            error: function (request) {
                                new PNotify({
                                    title: 'Ops Failed!',
                                    text: request.responseText,
                                    type: 'error',
                                    styling: 'bootstrap3'
                                });
                            },
                            success: function (data) {
                                new PNotify({
                                    title: 'Success!',
                                    text: '职务名称修改成功',
                                    type: 'success',
                                    styling: 'bootstrap3'
                                });
                                RefreshTable('FamilyTableLists', '/api/family/');
                            }
                        });
                    }
                }
            }
        });
    });

    //删除家族职务名称
    $('#FamilyTableLists tbody').on('click', "button[name='btn-family-confirm']", function () {
        var vIds = $(this).val();
        var projectName = $(this).parent().parent().parent().find("td").eq(1).text()
        $.confirm({
            title: '删除确认?',
            type: 'red',
            content: "删除项目: " + projectName,
            buttons: {
                确认: function () {
                    $.ajax({
                        type: 'DELETE',
                        url: '/api/family/' + vIds + '/',
                        success: function (response) {
                            $.alert('删除成功!');
                        },
                        error: function (response) {
                            $.alert('删除失败!');
                        }
                    });
                },
                取消: function () {
                    return true;
                },
            }
        });
    });

    //添加家族职务分类
    $('#familysubmit').on('click', function () {
        $.ajax({
            cache: true,
            type: "POST",
            url: "/api/family/",
            data: $('#familyform').serialize(),
            async: false,
            error: function (request) {
                new PNotify({
                    title: 'Ops Failed!',
                    text: request.responseText,
                    type: 'error',
                    styling: 'bootstrap3'
                });
            },
            success: function (data) {
                new PNotify({
                    title: 'Success!',
                    text: '职务添加成功',
                    type: 'success',
                    styling: 'bootstrap3'
                });
                RefreshTable('FamilyTableLists', '/api/family/');
            }
        });
    });

    function makeEquipmentTables() {
        var columns = [
            {"data": "equid"},
            {"data": "name"},
            {"data": "qu"},
        ]
        var columnDefs = [
            {
                targets: [3],
                render: function (data, type, row, meta) {
                    return '<div class="btn-group  btn-group-xs">' +
                        '<button type="button" name="btn-equip-modf" value="' + row.equid + '" class="btn btn-default"  aria-label="Justify"><span class="fa fa-edit" aria-hidden="true"></span>' +
                        '</button>' +
                        '</button>' +
                        '<button type="button" name="btn-equip-confirm" value="' + row.equid + '" class="btn btn-default" aria-label="Justify"><span class="fa fa-trash" aria-hidden="true"></span>' +
                        '</button>' +
                        '</div>';
                },
                "className": "text-center",
            },
        ]
        var buttons = [{
            text: '<span class="fa fa-plus"></span>',
            className: "btn-xs",
            action: function (e, dt, node, config) {
                $('#addEquipModal').modal("show");
            }
        }]
        InitDataTable('equipmentTable', "/api/equipment/", buttons, columns, columnDefs)
    }

    //修改装备信息
    $('#equipmentTable tbody').on('click', "button[name='btn-equip-modf']", function () {
        var vIds = $(this).val();
        var equip_name = $(this).parent().parent().parent().find("td").eq(1).text();
        var equip_qu = $(this).parent().parent().parent().find("td").eq(2).text();
        //modfZone(vIds, equip_name, equip_qu)
        $.confirm({
            icon: 'fa fa-edit',
            type: 'blue',
            title: '修改数据',
            content: '<form  data-parsley-validate class="form-horizontal form-label-left">' +
                '<div class="form-group">' +
                '<label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">机房名称<span class="required">*</span>' +
                '</label>' +
                '<div class="col-md-6 col-sm-6 col-xs-12">' +
                '<input type="text"  name="modf_equip_id" value="' + vIds + '" required="required" class="form-control col-md-7 col-xs-12">' +
                '</div>' +
                '</div>' +
                '<div class="form-group">' +
                '<label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">机房名称<span class="required">*</span>' +
                '</label>' +
                '<div class="col-md-6 col-sm-6 col-xs-12">' +
                '<input type="text"  name="modf_equip_name" value="' + equip_name + '" required="required" class="form-control col-md-7 col-xs-12">' +
                '</div>' +
                '</div>' +
                '<div class="form-group">' +
                '<label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">机房联系人<span class="required">*</span>' +
                '</label>' +
                '<div class="col-md-6 col-sm-6 col-xs-12">' +
                '<input type="text" name="modf_equip_qu" value="' + equip_qu + '"  required="required" placeholder="" class="form-control col-md-7 col-xs-12">' +
                '</div>' +
                '</div>' +
                '</form>',
            buttons: {
                '取消': function () {
                },
                '修改': {
                    btnClass: 'btn-blue',
                    action: function () {
                        var vIds_ = this.$content.find("[name='modf_equip_id']").val();
                        var equip_name = this.$content.find("[name='modf_equip_name']").val();
                        var equip_qu = this.$content.find("[name='modf_equip_qu']").val();
                        $.ajax({
                            cache: true,
                            type: "PUT",
                            url: "/api/equipment/" + vIds + '/',
                            data: {
                                "equid": vIds_,
                                "name": equip_name,
                                "qu": equip_qu,
                            },
                            error: function (request) {
                                new PNotify({
                                    title: 'Ops Failed!',
                                    text: request.responseText,
                                    type: 'error',
                                    styling: 'bootstrap3'
                                });
                            },
                            success: function (data) {
                                new PNotify({
                                    title: 'Success!',
                                    text: '修改成功',
                                    type: 'success',
                                    styling: 'bootstrap3'
                                });
                                RefreshTable('equipmentTable', '/api/equipment/');
                            }
                        });
                    }
                }
            }
        });
    });

    //删除装备
    $('#equipmentTable tbody').on('click', "button[name='btn-equip-confirm']", function () {
        var vIds = $(this).val();
        var equipName = $(this).parent().parent().parent().find("td").eq(1).text();
        $.confirm({
            title: '删除确认?',
            type: 'red',
            content: "删除装备: 【" + equipName + '】',
            buttons: {
                确认: function () {
                    $.ajax({
                        type: 'DELETE',
                        url: '/api/equipment/' + vIds + '/',
                        success: function (response) {
                            new PNotify({
                                title: 'Success!',
                                text: '资产删除成功',
                                type: 'success',
                                styling: 'bootstrap3'
                            });
                            RefreshTable('equipmentTable', '/api/equipment/');
                        },
                        error: function (response) {
                            new PNotify({
                                title: 'Ops Failed!',
                                text: response.responseText,
                                type: 'error',
                                styling: 'bootstrap3'
                            });
                        }
                    });
                },
                取消: function () {
                    return true;
                },
            }
        });
    });

    // 添加装备信息
    $('#equipsubmit').on('click', function () {
        $.ajax({
            cache: true,
            type: "POST",
            url: "/api/equipment/",
            data: $('#equipmentform').serialize(),
            async: false,
            error: function (request) {
                new PNotify({
                    title: 'Ops Failed!',
                    text: request.responseText,
                    type: 'error',
                    styling: 'bootstrap3'
                });
            },
            success: function (data) {
                new PNotify({
                    title: 'Success!',
                    text: '装备添加成功',
                    type: 'success',
                    styling: 'bootstrap3'
                });
                RefreshTable('equipmentTable', '/api/equipment/');
            }
        });
    });

    makeEquipmentTables()

})
