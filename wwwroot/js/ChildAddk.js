
//Code between these comments can be changed-  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

function StatusALLChildAddk() {
    $("#ChildAddkFormtopdiv [name=PDFFlag]").val("1");
}

/// ChildAddkStartSearch
/// <summary>Next function is the initial starting point of showing the Parent grid
/// </summary> 
function ChildAddkStartSearch() {
        //alert("in ChildAddkStartSearch");
        try {
            //ChildAddkHideChildALL();   //for if only found 1 record
        }
        catch (err) {
          //alert("err message " + err.message);
        }

        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {   //see if using a Apple Device
            //$("#iframeChildAddkOverlay").css("overflow", "scroll");  //so as to make scroll work on IOS
        }
        else {
            //alert("test");
            //$("#modalIframeIdCombo").attr("scrolling", "auto");
    }

   
    
       //--------------------------------------------------------------------------------------------
       //workout time difference in minutes
        var dtime = new Date();
        var ndiff = dtime.getTimezoneOffset();
        $("#ChildAddkFormtopdiv [name=TimeDiff]").val(ndiff);   //difference between UTC(GMT) time and local time
       //END workout time difference in minutes
       //--------------------------------------------------------------------------------------------

        $("#ChildAddkFormtopdiv [name=Table_Name]").val($("#ChildAddkFormtopdiv [name=tablenameSelect]").val());  //new


        $("#ChildAddkFormtopdiv [name=CurrentPageNumber]").val("1");
        $("#ChildAddkFormtopdiv [name=CurrentRowNumber]").val("0");
        $("#ChildAddkFormtopdiv [name=id]").val("0");
         
        if ($("#ChildAddkFormtopdiv [name=PageSizeNEW]").length != 0) {     
            var intPagesize = $("#ChildAddkFormtopdiv [name=PageSizeNEW]").val();
            $("#ChildAddkFormtopdiv [name=PageSize]").val(intPagesize);
        }
        else {
            //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
            $("#ChildAddkFormtopdiv [name=PageSize]").val("24");  //Change here to set page default size
            //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
        }

        $("#ChildAddkFormtopdiv [name=SortAscendingDescending]").val("ASC");    //default starting Sort. Change here to DESC, for starting sort.
        $("#ChildAddkFormtopdiv [name=SortBy]").val("ChildAddkFourthCol");    //default starting Sort Column 
        

        //Next function is used to refresh the grid, after deletes, etc
        ChildAddkPostSearchForm();     //Further down in this code
    }



/// ChildAddkResetPage
/// <summary>Next function is to Reset Search criteria and refresh grid of records
/// </summary> 
function ChildAddkResetPage() {

    try {
        ChildAddkHideChildALL();   //for if only found 1 record
    }
    catch (err) {
        //alert("err message " + err.message);
    }
   
    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    //Add or Take out columns as necessary
    $("#ChildAddkFormtopdiv [name=GlobalSearchString]").val("");

    $("#ChildAddkFormtopdiv [name=Table_Name]").val("");

    $("#ChildAddkFormtopdiv [name=Field_Name]").val("");

    $("#ChildAddkFormtopdiv [name=Data_Type_Str]").val("");

    $("#ChildAddkFormtopdiv [name=Length_Size_Str]").val("");
    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    ChildAddkStartSearch();
}



/// ChildAddkEnableGridSorting
/// <summary>Next function is to enable grid column sorting
/// </summary> 
function ChildAddkEnableGridSorting() {

    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&2w many columns. This code does 6 by default
    $("#ChildAddkFormtopdiv [name=SortByFirstCol]").css("visibility", "visible");
    $("#ChildAddkFormtopdiv [name=SortByFirstCol]").css("display", "block");

    $("#ChildAddkFormtopdiv [name=SortBySecondCol]").css("visibility", "visible");
    $("#ChildAddkFormtopdiv [name=SortBySecondCol]").css("display", "block");

    $("#ChildAddkFormtopdiv [name=SortByThirdCol]").css("visibility", "visible");
    $("#ChildAddkFormtopdiv [name=SortByThirdCol]").css("display", "block");

    $("#ChildAddkFormtopdiv [name=SortByFourthCol]").css("visibility", "visible");
    $("#ChildAddkFormtopdiv [name=SortByFourthCol]").css("display", "block");

    $("#ChildAddkFormtopdiv [name=SortByFifthCol]").css("visibility", "visible");
    $("#ChildAddkFormtopdiv [name=SortByFifthCol]").css("display", "block");

    $("#ChildAddkFormtopdiv [name=SortBySixthCol]").css("visibility", "visible");
    $("#ChildAddkFormtopdiv [name=SortBySixthCol]").css("display", "block");
    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&    

}








//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/// START of Code from here down is fixed, which does not need any changing
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/// ChildAddkSetPagingLinks
/// <summary>Next function is to show correct paging buttons (ie First, Next, Prev, Last)
/// </summary> 
function ChildAddkSetPagingLinks(currentPageNumber, totalPages) {
    $("#ChildAddkFormtopdiv [name=PagingLinks]").css("visibility", "visible");
    $("#ChildAddkFormtopdiv [name=PagingLinks]").css("display", "block");

    var currPageNumber = parseFloat(currentPageNumber);
    totalPages = parseFloat(totalPages);

    $("#ChildAddkfirstpagee").hide();
    $("#ChildAddkprevpagee").hide();
    $("#ChildAddknextpagee").hide();
    $("#ChildAddklastpagee").hide();

    if (currPageNumber == 1) {
        $("#ChildAddkfirstpagee").hide();
        $("#ChildAddkprevpagee").hide();
        $("#ChildAddknextpagee").hide();
        $("#ChildAddklastpagee").hide();
    }
    if (currPageNumber > 1) {
        $("#ChildAddkfirstpagee").show();
        $("#ChildAddkprevpagee").show();
    }
    if (currPageNumber < totalPages && totalPages > 0) {
        $("#ChildAddknextpagee").show();
        $("#ChildAddklastpagee").show();
    }
    if (currPageNumber == totalPages && totalPages > 0) {
        $("#ChildAddknextpagee").hide();
        $("#ChildAddklastpagee").hide();
    }

    ChildAddkEnableGridSorting();  
}

function ChildAddkNavigateToPage(action) {
    ChildAddkHideChildALL();   //in case in Tab child screen.
    //setTimeout(ChildAddkHideChildALL, 50);

    var currentPage = $("#ChildAddkFormtopdiv [name=CurrentPageNumber]").val();
    currentPage = parseFloat(currentPage);

    if (action == "next")
        currentPage = currentPage + 1;
    else if (action == "prev")
        currentPage = currentPage - 1;
    else if (action == "last")
        currentPage = $("#ChildAddkFormtopdiv [name=TotalPages]").val();
    else if (action == "first")
        currentPage = 1;

    $("#ChildAddkFormtopdiv [name=CurrentPageNumber]").val(currentPage);
    $("#ChildAddkFormtopdiv [name=CurrentRowNumber]").val("0");   //row number will always be 0 on new page

    $("#ChildAddkFormtopdiv [name=id]").val("0");

    ChildAddkPostSearchForm();             //Further down in this code
}

function ChildAddkNextPage() {
    ChildAddkNavigateToPage("next");
}
function ChildAddkPrevPage() {
    ChildAddkNavigateToPage("prev");
}
function ChildAddkLastPage() {
    ChildAddkNavigateToPage("last");
}
function ChildAddkFirstPage() {
    ChildAddkNavigateToPage("first");
}

function ChildAddkSortGrid(sortBy) {
    ChildAddkHideChildALL();   //in case in Tab child screen.

    var currentSortBy = $("#ChildAddkFormtopdiv [name=SortBy]").val();
    var currentSortAsc = $("#ChildAddkFormtopdiv [name=SortAscendingDescending]").val();

    if (currentSortBy == sortBy) {
        if (currentSortAsc == "ASC")
            currentSortAsc = "DESC";
        else
            currentSortAsc = "ASC";
    }
    else {
        currentSortAsc = "ASC";
    }

    $("#ChildAddkFormtopdiv [name=SortAscendingDescending]").val(currentSortAsc);
    $("#ChildAddkFormtopdiv [name=SortBy]").val(sortBy);

    $("#ChildAddkFormtopdiv [name=CurrentRowNumber]").val("0");   //row number will always be 0 on new page
    $("#ChildAddkFormtopdiv [name=id]").val("0");  //set Primary Key

    ChildAddkPostSearchForm();         //Further down in this code
}


/// ChildAddkPostSearchForm
/// <summary>Next function is the KEY one that calls another function, which does an ajax DB call
/// </summary> 
var ChildAddkListformData;
function ChildAddkPostSearchForm() {
    //setTimeout(LayoutShowProgressBar, 20);  //delay showing Progress Bar (may need)
    //LayoutShowProgressBar();  //found in _Layout.cshtml
    //LayoutHideProgressBar();  //found in _Layout.cshtml

    ChildAddkListformData = $("#ChildAddkFormtopdiv :input").serialize();  //get input values from div via class name
    //alert("formData is " + ChildAddkListformData);
    try {
        setTimeout(ChildAddkPostSearchToServer, 50);
    }
    catch (err) {
        alert("err message " + err.message);
    }
 
}


function ChildAddkDisableForm() {
    $('#ChildAddkForm').css("cursor", "wait");  //HourGlass
}
function ChildAddkEnableForm() {
    $('#ChildAddkForm').css("cursor", "default");
}

       
function ChildAddkAdvancedSearch() {
    ChildAddkHideChildALL();   //in case in Tab child screen.
    var el = $("#ChildAddkFormtopdiv [name=ChildAddkAdvancedSearch]")[0];
    el.style.display = (el.style.display == "block") ? "none" : "block";
}
function ChildAddkSearchOption() {
    ChildAddkHideChildALL();   //in case in Tab child screen.
    var el = $("#ChildAddkFormtopdiv [name=ChildAddkSearchOption]")[0];
    if (el.style.display == "block") {
        ChildAddkResetPage();
    }
    el.style.display = (el.style.display == "block") ? "none" : "block";
}

function isBreakpointGet(alias) {
    return $('.device-' + alias).is(':visible');
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/// END of fixed code, which does not need any changing
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
