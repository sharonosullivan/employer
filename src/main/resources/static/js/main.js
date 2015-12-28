$.ajaxSetup({
    dataType: 'text'
});

var Error = {
    id : "error_modal",
    title : "error_title",
    content : "error_content",
    open : function(title, content){
        this.clear();
        $("#" + this.title).text(title);
        $("#" + this.content).text(content);
        $("#" + this.id).modal("show");
    },
    clear : function(){
        $("#" + this.title).text("");
        $("#" + this.content).text("");
    },
    hide : function(){
        $("#" + this.id).modal("hide");
    }
};

var Employer = {
    rowIdConstant : 'employer',
    //data which is calculated on UI
    pagesInScope : 10,
    currentPage : 0,
    currentIndexOfPages : 0,
    currentEmployerEditing : 0,
    //data from server
    amountOfEmployees : 0,
    recordsPerPage : 0,
    amountOfPages : 0,
    departments : new Array(),
    load : function(){
        $('#employer_table').find('tr[name!="header"]').remove();
        var searchValue = $('#search_value').val();
        var search = new Object();
        search.newPosition = this.currentPage * this.recordsPerPage;
        search.filter = searchValue;
        $.ajax({
            url: 'employer/load',
            data: search,
            type: 'POST',
            success: function (data) {
                var response = $.parseJSON(data);
                if (response.error) {
                    Error.open("Error", response.message);
                } else {
                    Employer.departments = response.departments;
                    Employer.amountOfEmployees = response.amount;
                    Employer.recordsPerPage = response.amountPerPage;
                    if(Employer.recordsPerPage > 0){
                        Employer.amountOfPages = parseInt(Employer.amountOfEmployees / Employer.recordsPerPage);
                        if(Employer.amountOfEmployees % Employer.recordsPerPage != 0){
                            Employer.amountOfPages++;
                        }
                        var firstPageInScope = Employer.currentIndexOfPages * Employer.pagesInScope;
                        var lastPageInScope = Employer.currentIndexOfPages * Employer.pagesInScope + Employer.pagesInScope;
                        if(lastPageInScope > Employer.amountOfPages){
                            lastPageInScope = Employer.amountOfPages;
                        }
                        Employer.buildPagination(firstPageInScope, lastPageInScope);
                        $('#pagination_pages').find('span[value="' + Employer.currentPage + '"]').addClass('selected-page');
                        Employer.buildTable(response.employees);
                    }
                }
            }
        });
    },
    findDepartmentById : function(id){
        for(var i = 0; i < this.departments.length; i++){
            var department = this.departments[i];
            if(department.id == id){
                return department;
            }
        }
        var department = new Object();
        department.id = 0;
        department.name = 'none';
        return department;
    },
    clearNewEmployerModal : function(){
        $('#new_employer_name').val('');
        $('#new_employer_active').attr('checked', false);
        this.buildDepartmentsMenu('new_employer_department');
    },
    save : function(){
        var employer = new Object();
        employer.name = $('#new_employer_name').val();
        employer.active = $('#new_employer_active:checked').length > 0;
        employer.departmentId = $( "#new_employer_department option:selected" ).val();
        $.ajax({
            url: 'employer/save',
            data: employer,
            type: 'POST',
            beforeSend: function () {
                busyIndicator().Show();
            },
            complete: function () {
                busyIndicator().Hide();
            },
            success: function (data) {
                var response = $.parseJSON(data);
                if (response.error) {
                    Error.open("Error", response.message);
                } else {
                    $('#new_modal').modal('hide');
                    Employer.load();
                }
            }
        });
    },
    delete : function(id){
        var pageBack = (this.currentPage > 0 && $('#employer_table').find('tr[name!="header"]').size() < 2);
        $.ajax({
            url: 'employer/delete',
            data: {
                id : id
            },
            type: 'POST',
            success: function (data) {
                var response = $.parseJSON(data);
                if (response.error) {
                    Error.open("Error", response.message);
                } else {
                    if(pageBack){
                        Employer.goBack();
                    }else{
                        Employer.load();
                    }
                }
            }
        });
    },
    openEditEmployerModal : function(id){
        this.currentEmployerEditing = id;
        var cells = $('#' + this.rowIdConstant + id).find('td');
        $('#edit_employer_name').val(cells.eq(1).text());
        $('#edit_employer_active').attr('checked', JSON.parse(cells.eq(2).attr('value')));
        this.buildDepartmentsMenu('edit_employer_department');
        $('#edit_employer_department').val(cells.eq(3).attr('value'));
        $('#edit_modal').modal('show');
    },
    update : function(){
        var employer = new Object();
        employer.id = this.currentEmployerEditing;
        employer.name =  $('#edit_employer_name').val();
        employer.active =  $('#edit_employer_active:checked').length > 0;
        employer.departmentId = $( "#edit_employer_department option:selected" ).val();
        $.ajax({
            url: 'employer/update',
            data: employer,
            type: 'POST',
            beforeSend: function () {
                busyIndicator().Show();
            },
            complete: function () {
                busyIndicator().Hide();
            },
            success: function (data) {
                var response = $.parseJSON(data);
                if (response.error) {
                    Error.open("Error", response.message);
                } else {
                    $('#edit_modal').modal('hide');
                    Employer.load();
                }
            }
        });
    },
    loadPage : function(span){
        this.currentPage = $(span).attr('value');
        this.load();
    },
    goBack : function(){
        if(this.currentPage > 0){
            var firstPageInScope = this.currentIndexOfPages * this.pagesInScope;
            if(this.currentPage > firstPageInScope){
                this.currentPage = this.currentPage - 1;
                this.load();
            }else{
                this.goBackScope();
            }
        }
    },
    goBackScope : function(){
        if(this.currentIndexOfPages > 0){
            this.currentIndexOfPages = this.currentIndexOfPages - 1;
            this.currentPage = this.currentIndexOfPages * this.pagesInScope;
            this.load();
        }
    },
    goForward : function(){
        if(this.amountOfPages != 0){
            var pages = $('#pagination_pages').find('span');
            var currentSpan = $('#pagination_pages').find('span[class="selected-page"]');
            var index = pages.index(currentSpan) + 1;
            if(index < pages.size()){
                this.currentPage = this.currentPage + 1;
                this.load();
            }else{
                this.goForwardScope();
            }
        }
    },
    goForwardScope : function(){
        if(this.pagesInScope != 0){
            var amountOfScopes = parseInt(this.amountOfPages / this.pagesInScope);
            if(this.amountOfPages % this.pagesInScope != 0){
                amountOfScopes++;
            }
            if(this.currentIndexOfPages + 1 < amountOfScopes){
                this.currentIndexOfPages = this.currentIndexOfPages + 1;
                this.currentPage = this.currentIndexOfPages * this.pagesInScope;
                this.load();
            }
        }
    },
    buildTable : function(employees){
        var trsHTML = '';
        for(var i = 0; i < employees.length; i++){
            var employer = employees[i];
            trsHTML += '<tr id="' + this.rowIdConstant + employer.id + '">';
            trsHTML += '<td>' + employer.id + '</td>';
            trsHTML += '<td>' + employer.name + '</td>';
            if(employer.active){
                trsHTML += '<td value="' + employer.active + '">Yes</td>';
            }else{
                trsHTML += '<td value="' + employer.active + '">No</td>';
            }
            trsHTML += '<td value="' + employer.departmentId + '">' + this.findDepartmentById(employer.departmentId).name + '</td>';
            trsHTML += '<td><button type="button" onclick="Employer.openEditEmployerModal(\'' + employer.id + '\')" class="btn btn-default pull-left">Edit</button>';
            trsHTML += '<button type="button" onclick="Employer.delete(\'' + employer.id + '\')" class="btn btn-default pull-right">Delete</button></td>';
            trsHTML +='</tr>';
        }
        $('#employer_table').append(trsHTML);
    },
    buildDepartmentsMenu : function(selectId){
        $('#' + selectId).find('option').remove();
        var optionsHTML = '';
        for(var i = 0; i < this.departments.length; i++){
            var department = this.departments[i];
            optionsHTML += '<option value="' + department.id + '">' + department.name + "</option>";
        }
        $("#" + selectId).append(optionsHTML);
    },
    buildPagination : function(firstPage, lastpage){
        $('#pagination_pages').find('span').remove();
        $('#pagination_pages').text('');
        var pagesHTML = '[';
        for(var i = firstPage; i < lastpage; i++){
            pagesHTML += ' <span onclick="Employer.loadPage(this)" value="' + i + '" name="page">' + (i+1) + '</span> ';
        }
        pagesHTML += ']';
        $('#pagination_pages').append(pagesHTML);
    },
    filter : function(){
        Employer.currentIndexOfPages = 0;
        Employer.currentPage = 0;
        this.load();
    }
};

$(document).ready(function(){
    Employer.load();
});
