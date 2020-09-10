
//Code between these comments can be changed-  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

function StatusALLGrandChildAddk() {
    $("#GrandChildAddkFormtopdiv [name=PDFFlag]").val("1");
}

/// GrandChildAddkStartSearch
/// <summary>Next function is the initial starting point of showing the Parent grid
/// </summary> 
function GrandChildAddkStartSearch() {
        //alert("in GrandChildAddkStartSearch");
        try {
            //GrandChildAddkHideChildALL();   //for if only found 1 record
        }
        catch (err) {
          //alert("err message " + err.message);
        }

        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {   //see if using a Apple Device
            //$("#iframeGrandChildAddkOverlay").css("overflow", "scroll");  //so as to make scroll work on IOS
        }
        else {
            //alert("test");
            //$("#modalIframeIdCombo").attr("scrolling", "auto");
    }

   
    
       //--------------------------------------------------------------------------------------------
       //workout time difference in minutes
        var dtime = new Date();
        var ndiff = dtime.getTimezoneOffset();
        $("#GrandChildAddkFormtopdiv [name=TimeDiff]").val(ndiff);   //difference between UTC(GMT) time and local time
       //END workout time difference in minutes
       //--------------------------------------------------------------------------------------------

        $("#GrandChildAddkFormtopdiv [name=Table_Name]").val($("#GrandChildAddkFormtopdiv [name=tablenameSelect]").val());  //new


        $("#GrandChildAddkFormtopdiv [name=CurrentPageNumber]").val("1");
        $("#GrandChildAddkFormtopdiv [name=CurrentRowNumber]").val("0");
        $("#GrandChildAddkFormtopdiv [name=id]").val("0");
         
        if ($("#GrandChildAddkFormtopdiv [name=PageSizeNEW]").length != 0) {     
            var intPagesize = $("#GrandChildAddkFormtopdiv [name=PageSizeNEW]").val();
            $("#GrandChildAddkFormtopdiv [name=PageSize]").val(intPagesize);
        }
        else {
            //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
            $("#GrandChildAddkFormtopdiv [name=PageSize]").val("24");  //Change here to set page default size
            //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
        }

        $("#GrandChildAddkFormtopdiv [name=SortAscendingDescending]").val("ASC");    //default starting Sort. Change here to DESC, for starting sort.
        $("#GrandChildAddkFormtopdiv [name=SortBy]").val("GrandChildAddkFourthCol");    //default starting Sort Column 
        

        //Next function is used to refresh the grid, after deletes, etc
        GrandChildAddkPostSearchForm();     //Further down in this code
    }



/// GrandChildAddkResetPage
/// <summary>Next function is to Reset Search criteria and refresh grid of records
/// </summary> 
function GrandChildAddkResetPage() {

    try {
        GrandChildAddkHideChildALL();   //for if only found 1 record
    }
    catch (err) {
        //alert("err message " + err.message);
    }
   
    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    //Add or Take out columns as necessary
    $("#GrandChildAddkFormtopdiv [name=GlobalSearchString]").val("");

    $("#GrandChildAddkFormtopdiv [name=Table_Name]").val("");

    $("#GrandChildAddkFormtopdiv [name=Field_Name]").val("");

    $("#GrandChildAddkFormtopdiv [name=Data_Type_Str]").val("");

    $("#GrandChildAddkFormtopdiv [name=Length_Size_Str]").val("");
    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    GrandChildAddkStartSearch();
}



/// GrandChildAddkEnableGridSorting
/// <summary>Next function is to enable grid column sorting
/// </summary> 
function GrandChildAddkEnableGridSorting() {

    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&2w many columns. This code does 6 by default
    $("#GrandChildAddkFormtopdiv [name=SortByFirstCol]").css("visibility", "visible");
    $("#GrandChildAddkFormtopdiv [name=SortByFirstCol]").css("display", "block");

    $("#GrandChildAddkFormtopdiv [name=SortBySecondCol]").css("visibility", "visible");
    $("#GrandChildAddkFormtopdiv [name=SortBySecondCol]").css("display", "block");

    $("#GrandChildAddkFormtopdiv [name=SortByThirdCol]").css("visibility", "visible");
    $("#GrandChildAddkFormtopdiv [name=SortByThirdCol]").css("display", "block");

    $("#GrandChildAddkFormtopdiv [name=SortByFourthCol]").css("visibility", "visible");
    $("#GrandChildAddkFormtopdiv [name=SortByFourthCol]").css("display", "block");

    $("#GrandChildAddkFormtopdiv [name=SortByFifthCol]").css("visibility", "visible");
    $("#GrandChildAddkFormtopdiv [name=SortByFifthCol]").css("display", "block");

    $("#GrandChildAddkFormtopdiv [name=SortBySixthCol]").css("visibility", "visible");
    $("#GrandChildAddkFormtopdiv [name=SortBySixthCol]").css("display", "block");
    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&    

}








//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/// START of Code from here down is fixed, which does not need any changing
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/// GrandChildAddkSetPagingLinks
/// <summary>Next function is to show correct paging buttons (ie First, Next, Prev, Last)
/// </summary> 
function GrandChildAddkSetPagingLinks(currentPageNumber, totalPages) {
    $("#GrandChildAddkFormtopdiv [name=PagingLinks]").css("visibility", "visible");
    $("#GrandChildAddkFormtopdiv [name=PagingLinks]").css("display", "block");

    var currPageNumber = parseFloat(currentPageNumber);
    totalPages = parseFloat(totalPages);

    $("#GrandChildAddkfirstpagee").hide();
    $("#GrandChildAddkprevpagee").hide();
    $("#GrandChildAddknextpagee").hide();
    $("#GrandChildAddklastpagee").hide();

    if (currPageNumber == 1) {
        $("#GrandChildAddkfirstpagee").hide();
        $("#GrandChildAddkprevpagee").hide();
        $("#GrandChildAddknextpagee").hide();
        $("#GrandChildAddklastpagee").hide();
    }
    if (currPageNumber > 1) {
        $("#GrandChildAddkfirstpagee").show();
        $("#GrandChildAddkprevpagee").show();
    }
    if (currPageNumber < totalPages && totalPages > 0) {
        $("#GrandChildAddknextpagee").show();
        $("#GrandChildAddklastpagee").show();
    }
    if (currPageNumber == totalPages && totalPages > 0) {
        $("#GrandChildAddknextpagee").hide();
        $("#GrandChildAddklastpagee").hide();
    }

    GrandChildAddkEnableGridSorting();  
}

function GrandChildAddkNavigateToPage(action) {
    GrandChildAddkHideChildALL();   //in case in Tab child screen.
    //setTimeout(GrandChildAddkHideChildALL, 50);

    var currentPage = $("#GrandChildAddkFormtopdiv [name=CurrentPageNumber]").val();
    currentPage = parseFloat(currentPage);

    if (action == "next")
        currentPage = currentPage + 1;
    else if (action == "prev")
        currentPage = currentPage - 1;
    else if (action == "last")
        currentPage = $("#GrandChildAddkFormtopdiv [name=TotalPages]").val();
    else if (action == "first")
        currentPage = 1;

    $("#GrandChildAddkFormtopdiv [name=CurrentPageNumber]").val(currentPage);
    $("#GrandChildAddkFormtopdiv [name=CurrentRowNumber]").val("0");   //row number will always be 0 on new page

    $("#GrandChildAddkFormtopdiv [name=id]").val("0");

    GrandChildAddkPostSearchForm();             //Further down in this code
}

function GrandChildAddkNextPage() {
    GrandChildAddkNavigateToPage("next");
}
function GrandChildAddkPrevPage() {
    GrandChildAddkNavigateToPage("prev");
}
function GrandChildAddkLastPage() {
    GrandChildAddkNavigateToPage("last");
}
function GrandChildAddkFirstPage() {
    GrandChildAddkNavigateToPage("first");
}

function GrandChildAddkSortGrid(sortBy) {
    GrandChildAddkHideChildALL();   //in case in Tab child screen.

    var currentSortBy = $("#GrandChildAddkFormtopdiv [name=SortBy]").val();
    var currentSortAsc = $("#GrandChildAddkFormtopdiv [name=SortAscendingDescending]").val();

    if (currentSortBy == sortBy) {
        if (currentSortAsc == "ASC")
            currentSortAsc = "DESC";
        else
            currentSortAsc = "ASC";
    }
    else {
        currentSortAsc = "ASC";
    }

    $("#GrandChildAddkFormtopdiv [name=SortAscendingDescending]").val(currentSortAsc);
    $("#GrandChildAddkFormtopdiv [name=SortBy]").val(sortBy);

    $("#GrandChildAddkFormtopdiv [name=CurrentRowNumber]").val("0");   //row number will always be 0 on new page
    $("#GrandChildAddkFormtopdiv [name=id]").val("0");  //set Primary Key

    GrandChildAddkPostSearchForm();         //Further down in this code
}


/// GrandChildAddkPostSearchForm
/// <summary>Next function is the KEY one that calls another function, which does an ajax DB call
/// </summary> 
var GrandChildAddkListformData;
function GrandChildAddkPostSearchForm() {
    //setTimeout(LayoutShowProgressBar, 20);  //delay showing Progress Bar (may need)
    //LayoutShowProgressBar();  //found in _Layout.cshtml
    //LayoutHideProgressBar();  //found in _Layout.cshtml

    GrandChildAddkListformData = $("#GrandChildAddkFormtopdiv :input").serialize();  //get input values from div via class name
    //alert("formData is " + GrandChildAddkListformData);
    try {
        setTimeout(GrandChildAddkPostSearchToServer, 50);
    }
    catch (err) {
        alert("err message " + err.message);
    }
 
}


function GrandChildAddkDisableForm() {
    $('#GrandChildAddkForm').css("cursor", "wait");  //HourGlass
}
function GrandChildAddkEnableForm() {
    $('#GrandChildAddkForm').css("cursor", "default");
}

       
function GrandChildAddkAdvancedSearch() {
    GrandChildAddkHideChildALL();   //in case in Tab child screen.
    var el = $("#GrandChildAddkFormtopdiv [name=GrandChildAddkAdvancedSearch]")[0];
    el.style.display = (el.style.display == "block") ? "none" : "block";
}
function GrandChildAddkSearchOption() {
    GrandChildAddkHideChildALL();   //in case in Tab child screen.
    var el = $("#GrandChildAddkFormtopdiv [name=GrandChildAddkSearchOption]")[0];
    if (el.style.display == "block") {
        GrandChildAddkResetPage();
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
