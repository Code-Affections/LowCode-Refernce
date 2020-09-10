
//Code between these comments can be changed-  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// NOTE:- Adjust Grid height if needed in,  function AdjustDivWidthChildAddk() 

    /// ChildAddkPopDialog
    /// <summary>Next function is for Edit popup of record in Grid
    /// </summary> 
    function ChildAddkPopDialog(PKID, row_ID) {
         LayoutShowProgressBar();  //found in _Layout.cshtml

         //next line is for browser back button functionality
         window.location.hash = "ini";

        ChildAddkHideChildALL();

        $("#ChildAddkFormtopdiv [name=id]").val(PKID);      //Primary Key
        $("#ParentGeneralDiv [name=PK_ID]").val(PKID);       //Store Primary Key for later processing in Child

        var putTitle = "";
        if (PKID == -1) {
            putTitle = "Add ChildAddk";
        }
        else {
            putTitle = "Edit ChildAddk";
            ChildAddkresetablebg();
            ChildAddkrowhighlight(row_ID);
        }

        var strAction = "ChildAddkDetail";
        var strController = "ChildAddk";

        //Url.Action(Action, Contoller)
        //var pagesrc = '/ChildAddk7/ChildAddkDetail7';  //new replace code example
       // pagesrc = pagesrc.replace("ChildAddkDetail7", strAction);
        //pagesrc = pagesrc.replace("ChildAddk7", strController);
        //alert("pagesrc is " + pagesrc);
        var pagesrc = ChildAddkDetailURL; 

        var dialogWidth = 0;
        var dialogHeight = 0;
        //var topform = top.document.forms[0].id;   //use this to get TOP GRID Search form 
        dialogWidth = document.getElementById("ChildAddkForm").offsetWidth;
        dialogHeight = document.getElementById("ChildAddkForm").offsetHeight;
        //dialogWidth = document.getElementById(topform).offsetWidth;
        //dialogHeight = document.getElementById(topform).offsetHeight;
        //var dialogHeight = 0;

        var deviceHeight = (typeof window.outerHeight != 'undefined') ? Math.max(window.outerHeight, $(window).height()) : $(window).height();
       //-------------------------------------------------------------------------------------------------------------------------------
        //Checking for height of device. Optional, can take out
        //-------------------------------------------------------------------------------------------------------------------------------
        var HeightChk = "true";
        if (isBreakpointGet('xs')) {   //in Mobile device.  Width < 768px
            if (Number(deviceHeight) < 400) {
                alert("Please increase Window Height, or use Portrait Mode, to proceed.");
                LayoutHideProgressBar();  //found in _Layout.cshtml
                HeightChk = "false";
            }
        }
        else  //a screen > 768px wide
        {
            if (Number(deviceHeight) < 640) {
                alert("Please increase Window Height, or use Portrait Mode, to proceed.");
                LayoutHideProgressBar();  //found in _Layout.cshtml
                HeightChk = "false";
            }
        }
        //-------------------------------------------------------------------------------------------------------------------------------
        //END Checking for height of device
        //-------------------------------------------------------------------------------------------------------------------------------

        //alert("deviceHeight " + deviceHeight);
        if (isBreakpointGet('xs')) {   //in Mobile device. Getting this from ChildAddk.cshtml now
            //dialogHeight = Number(deviceHeight) - 328;
            dialogHeight = Number(deviceHeight) / 1.6;
        }
        else {
            //dialogHeight = Number(deviceHeight) - 350;  //so as cope with desktop window top part
            dialogHeight = Number(deviceHeight) / 1.7;
        }

        var deviceWidth = (typeof window.outerWidth != 'undefined') ? Math.max(window.outerWidth, $(window).width()) : $(window).width();

        if (isBreakpointGet('xs')) {   //in Mobile device. Getting this from ChildAddk.cshtml now
            dialogWidth = Number(deviceWidth) - 40;     //not used
        }
        else {
            dialogWidth = Number(deviceWidth) - 240;   //not used
        }


        if (HeightChk == "true")  //Window Height OK to proceed
        {

         $("#ChildAddkModalk").css("display", "block");
         $("#ChildAddkmodalkTitle").text(putTitle);

         var Expandid = "ModalChildAddkOverlayK";              //div in prog.cshtml
 
         var Expandheightpx = dialogHeight + "px";
         document.getElementById(Expandid).style.height = Expandheightpx;

         $("#OverlayChildAddkDetail").empty();  //erase OpenDetails in case
         $("#ModalChildAddkOverlayK").empty();

         if ($("#ModalChildAddkOverlayK").length == 0) {   //check if load destination div exists, first
            //it doesn't exist
            LayoutHideProgressBar();  //found in _Layout.cshtml
            alert("Div not found, for load. Check load statement. ");
         }
         else {

            $('#ModalChildAddkOverlayK').load(pagesrc, '', function (response, status, xhr) {
                //alert("status is " + status);   //can be ("success", "notmodified", "error", "timeout", or "parsererror")
                if (status == 'success') {
                    //alert("status text is: " + xhr.statusText);
                    //alert("response text is: " + xhr.responseText);
                    LayoutHideProgressBar();  //found in _Layout.cshtml
                }
                else  //error or timeout, etc..
                {
                    LayoutHideProgressBar();  //found in _Layout.cshtml
                    alert("Edit load problem is: " + xhr.statusText);
                    alert("Edit load problem text is: " + xhr.responseText);
                }

            });

         }

        }   //if (HeightChk == "true")  //Window Height OK to proceed

    }
    function ChildAddkCloseK() {
        //alert("ChildAddkcloseK");
        //$("#OverlayChildAddkDetail").empty();  //erase OpenDetails in case
        $("#ModalChildAddkOverlayK").empty();
        $("#ChildAddkModalk").css("display", "none");
        $(".modal-contentk").css("width", "85%");   //so as set back to original size
    }
 



    /// ChildAddkOpenDetails
    /// <summary>Next function is for Detail button of record in Grid, to overlay page on top of Grid
    /// </summary> 
    var ChildAddkOpenCheckLoad;
    function ChildAddkOpenDetails(PKID, row_ID, arrayname) {
        //alert("ChildAddkOpenDetails");
         LayoutShowProgressBar();  //found in _Layout.cshtml

         //next line is for browser back button functionality
         window.location.hash = "ini";

        ChildAddkresetablebg();
        ChildAddkHideChildALL();
        ChildAddkrowhighlight(row_ID);

        $("#ChildAddkFormtopdiv [name=id]").val(PKID);
        $("#ParentGeneralDiv [name=PK_ID]").val(PKID);       //Store Primary Key for later processing in Child

        var pos = $("#ChildAddkFormtopdiv").position();   //get position on screen, even if scrolled down.
        var topsetchr = Number(pos.top - 1) + "px";      //Adjust if necessary
        var leftsetchr = Number(pos.left) + "px";

        var newwidth = $("#ChildAddkFormtopdiv").outerWidth();
        var newheight = $("#ChildAddkFormtopdiv").outerHeight();
        var heightsetchr = Number(newheight + 0) + "px";
        var widthsetchr = Number(newwidth - 0) + "px";

        var Expandid = "OverlayChildAddkDetail";              //div in prog.cshtml
        //show div in right position
        //document.getElementById(Expandid).style.display = "block";  //done down further
        document.getElementById(Expandid).style.position = "fixed";
        //document.getElementById(Expandid).style.position = "absolute";
        document.getElementById(Expandid).style.top = topsetchr;
        document.getElementById(Expandid).style.left = leftsetchr;
        //END new code

        document.getElementById(Expandid).style.width = widthsetchr;
        document.getElementById(Expandid).style.height = heightsetchr;
        //document.getElementById(Expandid).style.height = "520px";

        var deviceHeight = (typeof window.outerHeight != 'undefined') ? Math.max(window.outerHeight, $(window).height()) : $(window).height();
        //-------------------------------------------------------------------------------------------------------------------------------
        //Checking for height of device. Optional, can take out
        //-------------------------------------------------------------------------------------------------------------------------------
        var HeightChk = "true";
        if (isBreakpointGet('xs')) {   //in Mobile device.  Width < 768px
            if (Number(deviceHeight) < 400) {
                alert("Please increase Window Height, or use Portrait Mode, to proceed.");
                LayoutHideProgressBar();  //found in _Layout.cshtml
                HeightChk = "false";
            }
        }
        else  //a screen > 768px wide
        {
            if (Number(deviceHeight) < 640) {
                alert("Please increase Window Height, or use Portrait Mode, to proceed.");
                LayoutHideProgressBar();  //found in _Layout.cshtml
                HeightChk = "false";
            }
        }
        //-------------------------------------------------------------------------------------------------------------------------------
        //END Checking for height of device
        //-------------------------------------------------------------------------------------------------------------------------------
        
        if (HeightChk == "true")  //Window Height OK to proceed
        {
         var pagesrc = ChildAddkDetailShowURL;
         //alert("pagesrc is " + pagesrc);

         $("#ModalChildAddkOverlayK").empty();   //clear modal popup as well
         $("#OverlayChildAddkDetail").empty();
    
         if ($("#OverlayChildAddkDetail").length == 0) {   //check if load destination div exists, first
            //it doesn't exist
            LayoutHideProgressBar();  //found in _Layout.cshtml
            alert("Div not found, for load. Check load statement. ");
         }
         else {

            $('#OverlayChildAddkDetail').load(pagesrc, '', function (response, status, xhr) {
                //alert("status is " + status);   //can be ("success", "notmodified", "error", "timeout", or "parsererror")
                if (status == 'success') {
                    //alert("status text is: " + xhr.statusText);
                    //alert("response text is: " + xhr.responseText);
                    setTimeout(ShowChildAddkLoad, 50);
                }
                else  //error or timeout, etc..
                {
                    LayoutHideProgressBar();  //found in _Layout.cshtml
                    alert("Detail load problem is: " + xhr.statusText);
                    alert("Detail load problem text is: " + xhr.responseText);
                }

            });

         }

        }   //if (HeightChk == "true")  //Window Height OK to proceed

        //ChildAddkOpenCheckLoad = setInterval(function () { CheckChildAddkLoad(pagesrc) }, 300);  //so as to wait until next page displays fully

    }
   function ShowChildAddkLoad() {
        try {
            var Expandid = "OverlayChildAddkDetail";              //div in ChildAddk.cshtml
            document.getElementById(Expandid).style.display = "block";
        }
        catch (err) {
            //alert("err message " + err.message);
        }

    }
    //Next function not used anymore
    function CheckChildAddkLoad(pagesrc) {
        LayoutShowProgressBar();  //found in _Layout.cshtml
        try {
            var chkit = $("#ChildAddkDetailtopdiv").find('#ChildAddkShowit').val();
            //alert("chkit is " + chkit)
            if (chkit == "showit") {
                var Expandid = "OverlayChildAddkDetail";              //div in prog.cshtml
                document.getElementById(Expandid).style.display = "block";
                LayoutHideProgressBar();  //found in _Layout.cshtml
                clearInterval(ChildAddkOpenCheckLoad);
            }
        }
        catch (err) {
            //alert("err message " + err.message);
            //clearInterval(ChildAddkOpenCheckLoad);
        }
    
    }





    /// ChildAddkShowChild
    /// <summary>Next function is for + plus sign of record in Grid, to show Child tab Grid/s, under record 
    /// </summary> 
    function ChildAddkShowChild(PKID, row_ID, arrayname) {
        //document.getElementById('formDataChk').value = "ShowChild";  //for re-adjust of window resize  ??
         LayoutShowProgressBar();  //found in _Layout.cshtml

         //next line is for browser back button functionality
         window.location.hash = "ini";

        ChildAddkresetablebg();
        ChildAddkHideChildALL();
        ChildAddkrowhighlight(row_ID);

        $("#ParentGeneralDiv [name=PK_ID]").val(PKID);       //Store Primary Key for later processing in Child

        var deviceHeight = (typeof window.outerHeight != 'undefined') ? Math.max(window.outerHeight, $(window).height()) : $(window).height();
        //-------------------------------------------------------------------------------------------------------------------------------
        //Checking for height of device. Optional, can take out
        //-------------------------------------------------------------------------------------------------------------------------------
        var HeightChk = "true";
        if (isBreakpointGet('xs')) {   //in Mobile device.  Width < 768px
            if (Number(deviceHeight) < 400) {
                alert("Please increase Window Height, or use Portrait Mode, to proceed.");
                LayoutHideProgressBar();  //found in _Layout.cshtml
                HeightChk = "false";
            }
        }
        else  //a screen > 768px wide
        {
            if (Number(deviceHeight) < 640) {
                alert("Please increase Window Height, or use Portrait Mode, to proceed.");
                LayoutHideProgressBar();  //found in _Layout.cshtml
                HeightChk = "false";
            }
        }
        //-------------------------------------------------------------------------------------------------------------------------------
        //END Checking for height of device
        //-------------------------------------------------------------------------------------------------------------------------------

              
        if (HeightChk == "true")  //Window Height OK to proceed
        {
         var Expandid = "expandRowdivChildAddk" + row_ID;

         $("#ChildAddkFormtopdiv [name=id]").val(PKID);

         //Url.Action(Action, Contoller)
         //var pagesrc = '/ChildAddk/ChildAddkTab';  //this is for form with child tabs
         //alert("pagesrc is " + pagesrc);  //TEST only display
         var pagesrc = ChildAddkDetailTabURL;

         //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
         var Expandheight = 295;    //change to suit -  see CHILD ChildAddkResults.js
         //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

         var tablediv = document.getElementById('idDivChildAddkTBody');  //new
         tablediv.style.overflow = "hidden";  //Option, to put back scrollbars again

         var newwidth = $("#ChildAddkFormtopdiv").outerWidth();
         var widthsetchr = Number(newwidth - 43) + "px";       //Can change 43, but will have to change child grid progResults.js (function AdjustDivWidthDailyprog() ie 69)

        //$("#expandRowdivChildAddk" + row_ID).css("height", Expandheight + "px");    //DO NOT NEED anymore
         $("#expandRowdivChildAddk" + row_ID).css("width", widthsetchr);

         var ichildrowid = "ChildAddkchild" + row_ID;
         document.getElementById(ichildrowid).style.display = "";
         //document.getElementById(ichildrowid).style.display = "block";    //do not use, causes grid header to be corrupted
   
         $("#ModalChildAddkOverlayK").empty();   //clear modal popup as well
         $("#OverlayChildAddkDetail").empty();
         $("#expandRowdivChildAddk" + row_ID).empty();

         if ($("#expandRowdivChildAddk" + row_ID).length == 0) {   //check if load destination div exists, first
            //it doesn't exist
            LayoutHideProgressBar();  //found in _Layout.cshtml
            alert("Div not found, for load. Check load statement. ");
         }
         else {
            $('#expandRowdivChildAddk' + row_ID).load(pagesrc, '', function (response, status, xhr) {
                //alert("status is " + status);   //can be ("success", "notmodified", "error", "timeout", or "parsererror")
                if (status == 'success') {
                    //alert("status text is: " + xhr.statusText);
                    //alert("response text is: " + xhr.responseText);
                    var minusignid = "ChildAddkminusign" + row_ID;
                    var plusignid = "ChildAddkplusign" + row_ID;
                    document.getElementById(minusignid).style.display = "block";
                    document.getElementById(plusignid).style.display = "none";
                    ScrollToTop();
                }
                else  //error or timeout, etc..
                {
                    LayoutHideProgressBar();  //found in _Layout.cshtml
                    alert("Expand load problem is: " + xhr.statusText);
                    alert("Expand load problem text is: " + xhr.responseText);
                }

            });

         }

        }   //if (HeightChk == "true")  //Window Height OK to proceed
  
    }



    /// ChildAddkDelDetails
    /// <summary>Next function is to Delete a record on Grid
    /// </summary>  
    function ChildAddkDelDetails(PKID, row_ID, arrayname) {
        ChildAddkresetablebg();
        ChildAddkrowhighlight(row_ID);

        var putTitle = "";
        putTitle = "Delete";

        $("#ChildAddkModalk").css("display", "block");
        $(".modal-contentk").css("width", "220px");   
        $("#ChildAddkmodalkTitle").text(putTitle);

        var Expandid = "ModalChildAddkOverlayK";              //div in ChildAddk.cshtml
 
        var dialogHeight = "80";
        var Expandheightpx = dialogHeight + "px";
        document.getElementById(Expandid).style.height = Expandheightpx;
      
        $("#ModalChildAddkOverlayK").empty();
        var strTextDel = "<div style='font-size:12px;color:black;padding-bottom: 9px;padding-top:6px;'>Do you want to Delete this record?</div>";
        var strSubmit = '<input style="font-size:11px;color:black;display:inline-block;font-weight:bold;margin-right:9px;" class="btn btn-sm" type="button" value="Yes" onclick="ChildAddkDelRecord(' + PKID + ');ChildAddkCloseK();" />';
        var strCancel = '<input style="font-size:10px;color:red;display:inline-block;" class="btn btn-xs" type="button" value="Cancel" onclick="ChildAddkCloseK();" />';
        $("#ModalChildAddkOverlayK").html(strTextDel + strSubmit + strCancel);

    }



    /// ChildAddkDeleteALL
    /// <summary>Next function is to multi Delete selected record/s on Grid
    /// </summary>  
    function ChildAddkDeleteALL() {
        var pagsiz = $("#ChildAddkFormtopdiv [name=PageSizeNEW]").val();
        var contin = "No";
        for (var r = 0; r < pagsiz + 1; r++) {
            if (document.getElementById('ChildAddkChk' + r) != null) {
                if (document.getElementById('ChildAddkChk' + r).checked == true) {
                    contin = "Yes";
                    document.getElementById('ChildAddkCheckB' + r).value = "on";
                }
                else {
                    document.getElementById('ChildAddkCheckB' + r).value = "off";
                }
            }
        }

        var putTitle = "";
        putTitle = "Delete";

        $("#ChildAddkModalk").css("display", "block");
        $(".modal-contentk").css("width", "220px");   
        $("#ChildAddkmodalkTitle").text(putTitle);

        var Expandid = "ModalChildAddkOverlayK";              //div in ChildAddk.cshtml
 
        var dialogHeight = "80";
        var Expandheightpx = dialogHeight + "px";
        document.getElementById(Expandid).style.height = Expandheightpx;
      
        $("#ModalChildAddkOverlayK").empty();
        var strTextDel = "<div style='font-size:12px;color:black;padding-bottom: 9px;padding-top:6px;'>Do you want to Delete this record?</div>";
        var strSubmit = '<input style="font-size:11px;color:black;display:inline-block;font-weight:bold;margin-right:9px;" class="btn btn-sm" type="button" value="Yes" onclick="ChildAddkDeleteSelected();ChildAddkCloseK();" />';
        var strCancel = '<input style="font-size:10px;color:red;display:inline-block;" class="btn btn-xs" type="button" value="Cancel" onclick="ChildAddkCloseK();" />';
        $("#ModalChildAddkOverlayK").html(strTextDel + strSubmit + strCancel);

    }






    /// ChildAddkXLS
    /// <summary>Next function is to Export all or filtered grid records to a spreadsheet (ie XLS or XLSX)
    /// </summary>  
    function ChildAddkXLS() {
        //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
        var PgSize = $("#ChildAddkFormtopdiv [name=PageSize]").val();
        var Sortt = $("#ChildAddkFormtopdiv [name=SortBy]").val();
        var DescAsc = $("#ChildAddkFormtopdiv [name=SortAscendingDescending]").val();
        var Criteria1 = $("#ChildAddkForm [name=GlobalSearchString]").val();

        var Criteria2 = $("#ChildAddkForm [name=Table_Name]").val();

        var Criteria3 = $("#ChildAddkForm [name=Field_Name]").val();

        var Criteria4 = $("#ChildAddkForm [name=Data_Type]").val();

        var Criteria5 = $("#ChildAddkForm [name=Length_Size]").val();

        //alert("Sortt " + Sortt);
        $("#ChildAddkRepXLS [name=SortBy2]").val(Sortt);
        $("#ChildAddkRepXLS [name=SortAscendingDescending2]").val(DescAsc);
        $("#ChildAddkRepXLS [name=PageSize2]").val(PgSize);
        $("#ChildAddkRepXLS [name=GlobalSearchString]").val(Criteria1);

         $("#ChildAddkRepXLS [name=Table_Name]").val(Criteria2);

         $("#ChildAddkRepXLS [name=Field_Name]").val(Criteria3);

         $("#ChildAddkRepXLS [name=Data_Type]").val(Criteria4);

        $("#ChildAddkRepXLS [name=Length_Size]").val(Criteria5);

        LayoutShowProgressBar();  //found in _Layout.cshtml

        setTimeout(ChildAddkSubmitRepXLS, 150);
    }
    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    function ChildAddkfinishDownloadXLS() {
        //alert("in finishDownload");
        LayoutHideProgressBar();  //found in _Layout.cshtml
    }


    function ChildAddkSubmitRepXLS() {

     var token = new Date().getTime(); //use the current timestamp as the token value
     //alert("token is " + token);
     $("#ChildAddkRepXLS [name=download_token_value]").val(token);

     var FormtoDO = $('#ChildAddkRepXLS');

     $.ajax({
        type: 'POST',
        url: FormtoDO.attr('action'),
        data: FormtoDO.serialize(),
        success: function (response) {
            //alert("done " + response.filename);
            ChildAddkfinishDownloadXLS();
            //alert("done " + response.fileName);
            window.location.href = "ChildAddkDownloadXLSX?file=" + response.filename;  //works

            setTimeout(ChildAddkSubmitDelXLSX, 500, response.filename);  //Deletes XLSX file on Server, wait half a second

        },
        error: function (jqXhr, textStatus, errorMessage) {
            alert(" errorMessage is:- " + errorMessage + "\n Xhr.status is :- " + jqXhr.status + "\n Xhr.responseText is :- " + jqXhr.responseText + "\n textStatus is :- " + textStatus);
        }

      });

    }


    function ChildAddkSubmitDelXLSX(filenamee) {

     var GetDelURLL = '/ChildAddk/ChildAddkDownloadXLSXDel';
     //alert("GetDelURLL " + GetDelURLL);

     $.ajax({
        type: 'POST',
        url: GetDelURLL,
        data: { file: filenamee },
        success: function (response) {
            //alert("done " + response.filename);

        },
        error: function (jqXhr, textStatus, errorMessage) {
            alert(" errorMessage is:- " + errorMessage + "\n Xhr.status is :- " + jqXhr.status + "\n Xhr.responseText is :- " + jqXhr.responseText + "\n textStatus is :- " + textStatus);
        }

     });

    }




    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    function ChildAddkPDF() {

        var PgSize = $("#ChildAddkFormtopdiv [name=PageSize]").val();
        var Sortt = $("#ChildAddkFormtopdiv [name=SortBy]").val();
        var DescAsc = $("#ChildAddkFormtopdiv [name=SortAscendingDescending]").val();
        var Criteria1 = $("#ChildAddkForm [name=GlobalSearchString]").val();

        var Criteria2 = $("#ChildAddkForm [name=Table_Name]").val();

        var Criteria3 = $("#ChildAddkForm [name=Field_Name]").val();

        var Criteria4 = $("#ChildAddkForm [name=Data_Type]").val();

        var Criteria5 = $("#ChildAddkForm [name=Length_Size]").val();

        $("#ChildAddkRepPDF [name=SortBy2]").val(Sortt);
        $("#ChildAddkRepPDF [name=SortAscendingDescending2]").val(DescAsc);
        $("#ChildAddkRepPDF [name=PageSize2]").val(PgSize);
        $("#ChildAddkRepPDF [name=GlobalSearchString]").val(Criteria1);

         $("#ChildAddkRepPDF [name=Table_Name]").val(Criteria2);

         $("#ChildAddkRepPDF [name=Field_Name]").val(Criteria3);

         $("#ChildAddkRepPDF [name=Data_Type]").val(Criteria4);

        $("#ChildAddkRepPDF [name=Length_Size]").val(Criteria5);

        LayoutShowProgressBar();  //found in _Layout.cshtml

        setTimeout(ChildAddkSubmitRepPDF, 150);
        //HideProgressBar();  //test only

    }
    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    function ChildAddkfinishDownload() {
        //alert("in finishDownload");
        LayoutHideProgressBar();  //found in _Layout.cshtml
    }


   function ChildAddkSubmitRepPDF() {

     var token = new Date().getTime(); //use the current timestamp as the token value
     //alert("token is " + token);
     $("#ChildAddkRepPDF [name=download_token_value]").val(token);

     var FormtoDO = $('#ChildAddkRepPDF');

     $.ajax({
        type: 'POST',
        url: FormtoDO.attr('action'),
        data: FormtoDO.serialize(),
        success: function (response) {
            //alert("done " + response.filename);
            ChildAddkfinishDownload();
            //alert("done " + response.fileName);
            window.location.href = "ChildAddkDownloadPDF?file=" + response.filename;  //works

            setTimeout(ChildAddkSubmitDelPDF, 500, response.filename);  //Deletes PDF file on Server
          
        },
        error: function (jqXhr, textStatus, errorMessage) {
            alert(" errorMessage is:- " + errorMessage + "\n Xhr.status is :- " + jqXhr.status + "\n Xhr.responseText is :- " + jqXhr.responseText + "\n textStatus is :- " + textStatus);
        }

     });

    }


    function ChildAddkSubmitDelPDF(filenamee) {

     var GetDelURLL = '/ChildAddk/ChildAddkDownloadPDFDel';
     //alert("GetDelURLL " + GetDelURLL);

     $.ajax({
        type: 'POST',
        url: GetDelURLL,
        data: {file: filenamee},
        success: function (response) {
            //alert("done " + response.filename);

        },
        error: function (jqXhr, textStatus, errorMessage) {
            alert(" errorMessage is:- " + errorMessage + "\n Xhr.status is :- " + jqXhr.status + "\n Xhr.responseText is :- " + jqXhr.responseText + "\n textStatus is :- " + textStatus);
        }

     });

    }





//can use these instead of the cookies library being used
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    /// START of Code from here down is fixed, which does not need any changing
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    /// <summary>Runs everytime for Grid scrolling. Syncs Header table with Body table horizontally scroll
    /// </summary>  
    function ChildAddkmyTimer() {
        //alert("in ChildAddkmyTimer");
        var scrola = $("#idDivChildAddkTBody").scrollLeft();
        $("#idDivChildAddkTBody2").scrollLeft(scrola);
        $("#idDivChildAddkTFooter").scrollLeft(scrola);
    }

    // This part is for scrolling grid table and auto adjust when screen is resized
    AdjustDivWidthChildAddk();

    function AdjustDivWidthChildAddk() {

        if (document.getElementById("idDivChildAddkTBody")) {
            var idDivChildAddkTBodyNew = document.getElementById("idDivChildAddkTBody").clientWidth;
            var idDivChildAddkTBodyNewoff = document.getElementById("idDivChildAddkTBody").offsetWidth;
            var idscrolWidth = idDivChildAddkTBodyNewoff - idDivChildAddkTBodyNew;
            //alert("Scroll bar width is " + (idDivChildAddkTBodyNewoff - idDivChildAddkTBodyNew));
            $("#ChildAddkFormtopdiv [name=ScrollWidthh]").val(idscrolWidth);
            $("#ChildAddkFormtopdiv [name=OrigScreenWidthh]").val(idDivChildAddkTBodyNewoff);  //keep original table width

            var resetWidth = 0;
            var newwidthUse = $("#ChildAddkFormtopdiv").outerWidth();
            newwidthUse = Number(newwidthUse) - (Number(idscrolWidth) + 2);  //may need to change 2.
            resetWidth = newwidthUse;
 
            //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
            //Height adjusted for initial Grid. Change as needed.
            document.getElementById("idDivChildAddkTBody").style.height = "400px";  
            //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
        }

        if (document.getElementById("idChildAddkHeader")) {
            document.getElementById("idChildAddkHeader").style.width = resetWidth + "px";
        }

        if (document.getElementById("idChildAddkHeader2")) {
            document.getElementById("idChildAddkHeader2").style.width = resetWidth + "px";
            document.getElementById("idDivChildAddkTBody2").style.width = resetWidth + "px";
        }

        if (document.getElementById("idChildAddkFooter")) {
            //document.getElementById("idChildAddkFooter").style.width = resetWidth + "px";
            //document.getElementById("idDivChildAddkTFooter").style.width = resetWidth + "px";
        }

    }
    // END part is for scrolling grid table and auto adjust when screen is resized
 

    function ChildAddkresetablebg() {
        var table = document.getElementById('ChildAddkTable');
        var rowsss = table.getElementsByTagName('tr');
        var rowidstr;
        var tr;
        var backgr = "#D3DCE5";
        if (table) {
            tr = $('#ChildAddkTable').find('tr');
            $.each(tr, function (index, item) {
                //alert("index is " + index);
                rowidstr = rowsss[index].id;
                //alert("row idd is " + rowidstr);
                if (rowidstr.indexOf("ChildAddkmaster") != -1) {    //only pickup rows with id of 'master' as prefix
                    document.getElementById(rowidstr).style.backgroundColor = backgr;
                    if (backgr == "#D3DCE5") {
                        backgr = "#ebeff2";
                    }
                    else {
                        backgr = "#D3DCE5";
                    }

                }

            });
        }

    }

    //Show selected row on page
    function ChildAddkrowhighlight(row_ID) {
        ChildAddkresetablebg();
        var table = document.getElementById('ChildAddkTable');
        if (table) {
            //alert("hightlight row");
            //table.rows[row_ID].style.backgroundColor = "#F3F3F3";
            $("#ChildAddkFormtopdiv [name=CurrentRowNumber]").val(row_ID);  //change form name to suit
        }

        row_ID = row_ID - 1;
        var imasterrowid = "ChildAddkmaster" + row_ID;
        document.getElementById(imasterrowid).style.backgroundColor = "silver";
    }


    //Used for Highlighting a Sorted Column
    function ChildAddkHighlightCol(colname) {
        //alert("colname is " + colname);
        if (document.getElementById('ChildAddkTable') != null) {
            var table = document.getElementById('ChildAddkTable');
            var rowss = table.getElementsByTagName('tr');
            var colss = table.getElementsByTagName('td');
            var colhh = table.getElementsByTagName('th');

            if (table) {
                for (var r = 0; r < colss.length; r++) {
                    //alert("id is " + colss[r].id);
                    if (colss[r].id == colname) {
                        colss[r].style.backgroundColor = "#D3DCE5";
                    }

                }
            }
        }
    }


    function ChildAddkCheckALLs() {
        //alert("in CheckALLs");
        if (document.getElementById('ChildAddkCheckALL').checked == false) {
            $("input[name^=ChildAddkChk]").prop("checked", false);
        }

        if (document.getElementById('ChildAddkCheckALL').checked == true) {
            $("input[name^=ChildAddkChk]").prop("checked", true);
        }

    }


    function ChildAddkShowColumn(row_ID, colnam) {
        ChildAddkHideColumnALL(colnam);

        var ik = Number(row_ID - 2);
        var tippp = colnam + "tipp" + ik;
        $("#ChildAddkFormtopdiv [name=" + tippp + "]").css("display", "none");

        var minusignid = "minusign" + colnam + row_ID;
        var plusignid = "plusign" + colnam + row_ID;
        $("#ChildAddkFormtopdiv [name=" + minusignid + "]").css("display", "inline-block");
        $("#ChildAddkFormtopdiv [name=" + plusignid + "]").css("display", "none");
    }

    function ChildAddkHideColumn(row_ID, colnam) {
        var ik = Number(row_ID - 2);
        var tippp = colnam + "tipp" + ik;
        $("#ChildAddkFormtopdiv [name=" + tippp + "]").css("display", "");

        var minusignid = "minusign" + colnam + row_ID;
        var plusignid = "plusign" + colnam + row_ID;
        $("#ChildAddkFormtopdiv [name=" + minusignid + "]").css("display", "none");
        $("#ChildAddkFormtopdiv [name=" + plusignid + "]").css("display", "inline-block");
    }

    function ChildAddkHideColumnALL(colnam) {
        var tippp = colnam + "tipp";
        //$("span[id^=" + tippp + "]").css("display", "");
        $("#ChildAddkFormtopdiv [name=" + tippp + "]").css("display", "");

        var minusignid = "minusign" + colnam;
        var plusignid = "plusign" + colnam;

        $("#ChildAddkFormtopdiv [name=" + minusignid + "]").css("display", "none");
        $("#ChildAddkFormtopdiv [name=" + plusignid + "]").css("display", "inline-block");
    }


    //Show row on page via traversing all grid rows
    function ChildAddknewrowhighlight() {
        //alert("in newrowhighlight");
        ChildAddkresetablebg();
        var table = document.getElementById('ChildAddkTable');
        var rowsss = table.getElementsByTagName('tr');
        var dValue;
        var addval;
        var IDId;
        var indx;
        var rowidstr;
        var tr;
        indx = 1;
        var rowCount = $('#ChildAddkTable tr').length;
        //alert("rowcount is " + rowCount);
        if (table) {
            for (var r = 0; r < rowCount; r++) {
                try {
                    rowidstr = rowsss[r].id;
                }
                catch (e) {
                    break;
                    //throw e;
                }

                //rowidstr = rowsss[r].id;
                //alert("row id is " + rowidstr);
                if (rowidstr.indexOf("ChildAddkmaster") != -1) {    //only pickup rows with id of 'master' as prefix
                    //alert("r is " + r);
                    dValue = document.getElementById('ChildAddkPK_IDD' + indx).value;
                    //alert("dValue is " + dValue);
                    if ($("#ChildAddkFormtopdiv [name=id]").val() == dValue) {
                        //alert("dValue is " + dValue);
                        document.getElementById(rowidstr).style.backgroundColor = "silver";
                        break;
                    }

                    indx = indx + 1;

                }

            }
        }

        //new code, to auto scroll to row in scrollable DIV. This used for Update or Add ONLY.
        var row_ID2 = indx + 1;
        var imasterrowid2 = "ChildAddkmaster" + row_ID2;
        var selectedPosy = 0;
        //selectedPosx = document.getElementById(imasterrowid2).offsetLeft;
        if (document.getElementById(imasterrowid2)) {
            selectedPosy = document.getElementById(imasterrowid2).offsetTop;
            //alert("selectedPosy is " + selectedPosy);
            if (Number(selectedPosy > 400))    //Note:- 400 is the Height of Grid Table (ie idDivChildAddkTBody)
            {
                $("#idDivChildAddkTBody").scrollTop(selectedPosy);
            }


            //$("#idDivChildAddkTBody").scrollTop(selectedPosy);
        }
        //END new code, to auto scroll to row in scrollable DIV
    }


    function ScrollToTop() {
        //new code, to auto scroll to TOP row in scrollable DIV. Used in OpShow when doing Cancel Back.
        //var row_ID = document.getElementById('CurrentRowNumber').value;
        var row_ID = $("#ChildAddkFormtopdiv [name=CurrentRowNumber]").val();
        //alert("row_ID is " + row_ID);
        var row_ID2 = row_ID - 1;
        var imasterrowid = "ChildAddkmaster" + row_ID2;
        //var selectedPosx = 0;
        var selectedPosy = 0;
        //selectedPosx = document.getElementById(imasterrowid).offsetLeft;
        selectedPosy = document.getElementById(imasterrowid).offsetTop;

        var tablediv = document.getElementById('idDivChildAddkTBody');
        //tablediv.style.overflow = "hidden";
        $("#idDivChildAddkTBody").scrollTop(selectedPosy);
        //END new code, to auto scroll to row in scrollable DIV
    }


    //Used to Hide child Panel record on Grid
    function ChildAddkHideChild(PKID, row_ID, arrayname) {
        ChildAddkresetablebg();
        ChildAddkrowhighlight(row_ID);
        //alert("row_ID is " + row_ID);
        $("#expandRowdivChildAddk" + row_ID).empty();

        //put scrolling back in
        var tablediv = document.getElementById('idDivChildAddkTBody');
        tablediv.style.overflow = "scroll";
        $("#idDivChildAddkTBody").scrollTop(2); //go back to top of page if scrolling
        //END put scrolling back in
     

        var ichildrowid = "ChildAddkchild" + row_ID;  //also hide div
        if (document.getElementById(ichildrowid) != null) {
            document.getElementById(ichildrowid).style.display = "none";
        }

        var minusignid = "ChildAddkminusign" + row_ID;
        var plusignid = "ChildAddkplusign" + row_ID;
        if (document.getElementById(minusignid) != null) {
            document.getElementById(minusignid).style.display = "none";
        }
        if (document.getElementById(plusignid) != null) {
            document.getElementById(plusignid).style.display = "block";
        }

    }

    //Used to hide all Child panels
    function ChildAddkHideChildALL() {
    
        try {

            ChildAddkresetablebg();
            //alert("ChildAddkHideChildALL");
            //put scrolling back in
            var tablediv = document.getElementById('idDivChildAddkTBody');
             tablediv.style.overflow = "scroll";
             //END put scrolling back in

            var table = document.getElementById('ChildAddkTable');
            var rowsss = table.getElementsByTagName('tr');
            var tr;
            var indx;
            var rowidstr;
            indx = 3;   //start at 3, as in grid with index (i+2)
            if (table) {
                tr = $('#ChildAddkTable').find('tr');
                $.each(tr, function (index, item) {
                    try {
                        rowidstr = rowsss[index].id;   //??fix later
                    }
                    catch (err) {
                        //alert("err1 is " + err.message);
                    }
                    //alert("row id is " + rowidstr);
                    if (rowidstr.indexOf("ChildAddkmaster") != -1) {    //only pickup rows with id of 'master' as prefix
                        //alert("row id is " + rowidstr);
                        //alert("indx is " + indx);
                        $("#expandRowdivChildAddk" + indx).empty();
                        var ichildrowid = "ChildAddkchild" + indx;  //also hide div
                        //alert("ichildrowid is " + ichildrowid);
                        if (document.getElementById(ichildrowid) != null) {
                            document.getElementById(ichildrowid).style.display = "none";
                            //alert("row id1 is " + rowidstr);
                        }
                        var minusignid = "ChildAddkminusign" + indx;
                        var plusignid = "ChildAddkplusign" + indx;
                        if (document.getElementById(minusignid) != null) {
                            document.getElementById(minusignid).style.display = "none";
                            //alert("row id2 is " + rowidstr);
                        }
                        if (document.getElementById(plusignid) != null) {
                            document.getElementById(plusignid).style.display = "block";
                            //alert("row id3 is " + rowidstr);
                        }
                        indx = indx + 1;

                    }
                });

            }

        }
        catch (err) {
            //alert("err is " + err.message);
        }

    }

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    /// END of fixed code, which does not need any changing
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
