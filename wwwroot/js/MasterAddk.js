
//Code between these comments can be changed-  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

function StatusALLMasterAddk() {
    $("#MasterAddkFormtopdiv [name=PDFFlag]").val("1");
}

/// MasterAddkStartSearch
/// <summary>Next function is the initial starting point of showing the Parent grid
/// </summary> 
function MasterAddkStartSearch() {
        //alert("in MasterAddkStartSearch");
        try {
            MasterAddkHideChildALL();   //for if only found 1 record
        }
        catch (err) {
          //alert("err message " + err.message);
        }

        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {   //see if using a Apple Device
            //$("#iframeMasterAddkOverlay").css("overflow", "scroll");  //so as to make scroll work on IOS
        }
        else {
            //alert("test");
            //$("#modalIframeIdCombo").attr("scrolling", "auto");
        }

       //--------------------------------------------------------------------------------------------
       //workout time difference in minutes
        var dtime = new Date();
        var ndiff = dtime.getTimezoneOffset();
        $("#MasterAddkFormtopdiv [name=TimeDiff]").val(ndiff);   //difference between UTC(GMT) time and local time
       //END workout time difference in minutes
       //--------------------------------------------------------------------------------------------

        $("#MasterAddkFormtopdiv [name=Table_Name]").val($("#MasterAddkFormtopdiv [name=tablenameSelect]").val());  //new


        $("#MasterAddkFormtopdiv [name=CurrentPageNumber]").val("1");
        $("#MasterAddkFormtopdiv [name=CurrentRowNumber]").val("0");
        $("#MasterAddkFormtopdiv [name=id]").val("0");
         
        if ($("#MasterAddkFormtopdiv [name=PageSizeNEW]").length != 0) {     
            var intPagesize = $("#MasterAddkFormtopdiv [name=PageSizeNEW]").val();
            $("#MasterAddkFormtopdiv [name=PageSize]").val(intPagesize);
        }
        else {
            //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
            $("#MasterAddkFormtopdiv [name=PageSize]").val("24");  //Change here to set page default size
            //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
        }

        $("#MasterAddkFormtopdiv [name=SortAscendingDescending]").val("ASC");    //default starting Sort. Change here to DESC, for starting sort.
        $("#MasterAddkFormtopdiv [name=SortBy]").val("MasterAddkFourthCol");    //default starting Sort Column 

        //Next function is used to refresh the grid, after deletes, etc
        MasterAddkPostSearchForm();     //Further down in this code
    }



/// MasterAddkResetPage
/// <summary>Next function is to Reset Search criteria and refresh grid of records
/// </summary> 
function MasterAddkResetPage() {

    try {
        MasterAddkHideChildALL();   //for if only found 1 record
    }
    catch (err) {
        //alert("err message " + err.message);
    }
   
    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    //Add or Take out columns as necessary
    $("#MasterAddkFormtopdiv [name=GlobalSearchString]").val("");

    $("#MasterAddkFormtopdiv [name=Table_Name]").val("");

    $("#MasterAddkFormtopdiv [name=Field_Name]").val("");

    $("#MasterAddkFormtopdiv [name=Data_Type_Str]").val("");

    $("#MasterAddkFormtopdiv [name=Length_Size_Str]").val("");
    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    MasterAddkStartSearch();
}



/// MasterAddkEnableGridSorting
/// <summary>Next function is to enable grid column sorting
/// </summary> 
function MasterAddkEnableGridSorting() {

    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&2w many columns. This code does 6 by default
    $("#MasterAddkFormtopdiv [name=SortByFirstCol]").css("visibility", "visible");
    $("#MasterAddkFormtopdiv [name=SortByFirstCol]").css("display", "block");

    $("#MasterAddkFormtopdiv [name=SortBySecondCol]").css("visibility", "visible");
    $("#MasterAddkFormtopdiv [name=SortBySecondCol]").css("display", "block");

    $("#MasterAddkFormtopdiv [name=SortByThirdCol]").css("visibility", "visible");
    $("#MasterAddkFormtopdiv [name=SortByThirdCol]").css("display", "block");

    $("#MasterAddkFormtopdiv [name=SortByFourthCol]").css("visibility", "visible");
    $("#MasterAddkFormtopdiv [name=SortByFourthCol]").css("display", "block");

    $("#MasterAddkFormtopdiv [name=SortByFifthCol]").css("visibility", "visible");
    $("#MasterAddkFormtopdiv [name=SortByFifthCol]").css("display", "block");

    $("#MasterAddkFormtopdiv [name=SortBySixthCol]").css("visibility", "visible");
    $("#MasterAddkFormtopdiv [name=SortBySixthCol]").css("display", "block");
    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&    

}








//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/// START of Code from here down is fixed, which does not need any changing
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/// MasterAddkSetPagingLinks
/// <summary>Next function is to show correct paging buttons (ie First, Next, Prev, Last)
/// </summary> 
function MasterAddkSetPagingLinks(currentPageNumber, totalPages) {
    $("#MasterAddkFormtopdiv [name=PagingLinks]").css("visibility", "visible");
    $("#MasterAddkFormtopdiv [name=PagingLinks]").css("display", "block");

    var currPageNumber = parseFloat(currentPageNumber);
    totalPages = parseFloat(totalPages);

    $("#MasterAddkfirstpagee").hide();
    $("#MasterAddkprevpagee").hide();
    $("#MasterAddknextpagee").hide();
    $("#MasterAddklastpagee").hide();

    if (currPageNumber == 1) {
        $("#MasterAddkfirstpagee").hide();
        $("#MasterAddkprevpagee").hide();
        $("#MasterAddknextpagee").hide();
        $("#MasterAddklastpagee").hide();
    }
    if (currPageNumber > 1) {
        $("#MasterAddkfirstpagee").show();
        $("#MasterAddkprevpagee").show();
    }
    if (currPageNumber < totalPages && totalPages > 0) {
        $("#MasterAddknextpagee").show();
        $("#MasterAddklastpagee").show();
    }
    if (currPageNumber == totalPages && totalPages > 0) {
        $("#MasterAddknextpagee").hide();
        $("#MasterAddklastpagee").hide();
    }

    MasterAddkEnableGridSorting();  
}

function MasterAddkNavigateToPage(action) {
    MasterAddkHideChildALL();   //in case in Tab child screen.
    //setTimeout(MasterAddkHideChildALL, 50);

    var currentPage = $("#MasterAddkFormtopdiv [name=CurrentPageNumber]").val();
    currentPage = parseFloat(currentPage);

    if (action == "next")
        currentPage = currentPage + 1;
    else if (action == "prev")
        currentPage = currentPage - 1;
    else if (action == "last")
        currentPage = $("#MasterAddkFormtopdiv [name=TotalPages]").val();
    else if (action == "first")
        currentPage = 1;

    $("#MasterAddkFormtopdiv [name=CurrentPageNumber]").val(currentPage);
    $("#MasterAddkFormtopdiv [name=CurrentRowNumber]").val("0");   //row number will always be 0 on new page

    $("#MasterAddkFormtopdiv [name=id]").val("0");

    MasterAddkPostSearchForm();             //Further down in this code
}

function MasterAddkNextPage() {
    MasterAddkNavigateToPage("next");
}
function MasterAddkPrevPage() {
    MasterAddkNavigateToPage("prev");
}
function MasterAddkLastPage() {
    MasterAddkNavigateToPage("last");
}
function MasterAddkFirstPage() {
    MasterAddkNavigateToPage("first");
}

function MasterAddkSortGrid(sortBy) {
    MasterAddkHideChildALL();   //in case in Tab child screen.

    var currentSortBy = $("#MasterAddkFormtopdiv [name=SortBy]").val();
    var currentSortAsc = $("#MasterAddkFormtopdiv [name=SortAscendingDescending]").val();

    if (currentSortBy == sortBy) {
        if (currentSortAsc == "ASC")
            currentSortAsc = "DESC";
        else
            currentSortAsc = "ASC";
    }
    else {
        currentSortAsc = "ASC";
    }

    $("#MasterAddkFormtopdiv [name=SortAscendingDescending]").val(currentSortAsc);
    $("#MasterAddkFormtopdiv [name=SortBy]").val(sortBy);

    $("#MasterAddkFormtopdiv [name=CurrentRowNumber]").val("0");   //row number will always be 0 on new page
    $("#MasterAddkFormtopdiv [name=id]").val("0");  //set Primary Key

    MasterAddkPostSearchForm();         //Further down in this code
}


/// MasterAddkPostSearchForm
/// <summary>Next function is the KEY one that calls another function, which does an ajax DB call
/// </summary> 
var MasterAddkListformData;
function MasterAddkPostSearchForm() {
    //setTimeout(LayoutShowProgressBar, 20);  //delay showing Progress Bar (may need)
    //LayoutShowProgressBar();  //found in _Layout.cshtml
  
    MasterAddkListformData = $("#MasterAddkFormtopdiv :input").serialize();  //get input values from div via class name
    //alert("formData is " + MasterAddkListformData);
    try {
        setTimeout(MasterAddkPostSearchToServer, 50);
    }
    catch (err) {
        alert("err message " + err.message);
    }
 
}


function MasterAddkDisableForm() {
    $('#MasterAddkForm').css("cursor", "wait");  //HourGlass
}
function MasterAddkEnableForm() {
    $('#MasterAddkForm').css("cursor", "default");
}

       
function MasterAddkAdvancedSearch() {
    MasterAddkHideChildALL();   //in case in Tab child screen.
    var el = $("#MasterAddkFormtopdiv [name=MasterAddkAdvancedSearch]")[0];
    el.style.display = (el.style.display == "block") ? "none" : "block";
}
function MasterAddkSearchOption() {
    MasterAddkHideChildALL();   //in case in Tab child screen.
    var el = $("#MasterAddkFormtopdiv [name=MasterAddkSearchOption]")[0];
    if (el.style.display == "block") {
        MasterAddkResetPage();
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
