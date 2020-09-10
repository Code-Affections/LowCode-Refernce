
//Code between these comments can be changed-  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// NOTE:- Adjust Grid height if needed in,  function AdjustDivWidthGrandChildAddk() 

    /// GrandChildAddkPopDialog
    /// <summary>Next function is for Edit popup of record in Grid
    /// </summary> 
    function GrandChildAddkPopDialog(PKID, row_ID) {
         LayoutShowProgressBar();  //found in _Layout.cshtml

         //next line is for browser back button functionality
         window.location.hash = "ini";

        GrandChildAddkHideChildALL();

        $("#GrandChildAddkFormtopdiv [name=id]").val(PKID);      //Primary Key
        $("#ParentGeneralDiv [name=PK_ID]").val(PKID);       //Store Primary Key for later processing in Child

        var putTitle = "";
        if (PKID == -1) {
            putTitle = "Add GrandChildAddk";
        }
        else {
            putTitle = "Edit GrandChildAddk";
            GrandChildAddkresetablebg();
            GrandChildAddkrowhighlight(row_ID);
        }

        var strAction = "GrandChildAddkDetail";
        var strController = "GrandChildAddk";

        //Url.Action(Action, Contoller)
        //var pagesrc = '/GrandChildAddk7/GrandChildAddkDetail7';  //new replace code example
       // pagesrc = pagesrc.replace("GrandChildAddkDetail7", strAction);
        //pagesrc = pagesrc.replace("GrandChildAddk7", strController);
        //alert("pagesrc is " + pagesrc);
        var pagesrc = GrandChildAddkDetailURL; 

        var dialogWidth = 0;
        var dialogHeight = 0;
        //var topform = top.document.forms[0].id;   //use this to get TOP GRID Search form 
        dialogWidth = document.getElementById("GrandChildAddkForm").offsetWidth;
        dialogHeight = document.getElementById("GrandChildAddkForm").offsetHeight;
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
        if (isBreakpointGet('xs')) {   //in Mobile device. Getting this from GrandChildAddk.cshtml now
            //dialogHeight = Number(deviceHeight) - 328;
            dialogHeight = Number(deviceHeight) / 1.6;
        }
        else {
            //dialogHeight = Number(deviceHeight) - 350;  //so as cope with desktop window top part
            dialogHeight = Number(deviceHeight) / 1.7;
        }

        var deviceWidth = (typeof window.outerWidth != 'undefined') ? Math.max(window.outerWidth, $(window).width()) : $(window).width();

        if (isBreakpointGet('xs')) {   //in Mobile device. Getting this from GrandChildAddk.cshtml now
            dialogWidth = Number(deviceWidth) - 40;     //not used
        }
        else {
            dialogWidth = Number(deviceWidth) - 240;   //not used
        }


        if (HeightChk == "true")  //Window Height OK to proceed
        {

         $("#GrandChildAddkModalk").css("display", "block");
         $("#GrandChildAddkmodalkTitle").text(putTitle);

         var Expandid = "ModalGrandChildAddkOverlayK";              //div in prog.cshtml
 
         var Expandheightpx = dialogHeight + "px";
         document.getElementById(Expandid).style.height = Expandheightpx;

         $("#OverlayGrandChildAddkDetail").empty();  //erase OpenDetails in case
         $("#ModalGrandChildAddkOverlayK").empty();

         if ($("#ModalGrandChildAddkOverlayK").length == 0) {   //check if load destination div exists, first
            //it doesn't exist
            LayoutHideProgressBar();  //found in _Layout.cshtml
            alert("Div not found, for load. Check load statement. ");
         }
         else {

            $('#ModalGrandChildAddkOverlayK').load(pagesrc, '', function (response, status, xhr) {
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
    function GrandChildAddkCloseK() {
        //alert("GrandChildAddkcloseK");
        //$("#OverlayGrandChildAddkDetail").empty();  //erase OpenDetails in case
        $("#ModalGrandChildAddkOverlayK").empty();
        $("#GrandChildAddkModalk").css("display", "none");
        $(".modal-contentk").css("width", "85%");   //so as set back to original size
    }
 



    /// GrandChildAddkOpenDetails
    /// <summary>Next function is for Detail button of record in Grid, to overlay page on top of Grid
    /// </summary> 
    var GrandChildAddkOpenCheckLoad;
    function GrandChildAddkOpenDetails(PKID, row_ID, arrayname) {
        //alert("GrandChildAddkOpenDetails");
         LayoutShowProgressBar();  //found in _Layout.cshtml

         //next line is for browser back button functionality
         window.location.hash = "ini";

        GrandChildAddkresetablebg();
        GrandChildAddkHideChildALL();
        GrandChildAddkrowhighlight(row_ID);

        $("#GrandChildAddkFormtopdiv [name=id]").val(PKID);
        $("#ParentGeneralDiv [name=PK_ID]").val(PKID);       //Store Primary Key for later processing in Child

        var pos = $("#GrandChildAddkFormtopdiv").position();   //get position on screen, even if scrolled down.
        var topsetchr = Number(pos.top - 1) + "px";      //Adjust if necessary
        var leftsetchr = Number(pos.left) + "px";

        var newwidth = $("#GrandChildAddkFormtopdiv").outerWidth();
        var newheight = $("#GrandChildAddkFormtopdiv").outerHeight();
        var heightsetchr = Number(newheight + 0) + "px";
        var widthsetchr = Number(newwidth - 0) + "px";

        var Expandid = "OverlayGrandChildAddkDetail";              //div in prog.cshtml
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
         var pagesrc = GrandChildAddkDetailShowURL;
         //alert("pagesrc is " + pagesrc);

         $("#ModalGrandChildAddkOverlayK").empty();   //clear modal popup as well
         $("#OverlayGrandChildAddkDetail").empty();
    
         if ($("#OverlayGrandChildAddkDetail").length == 0) {   //check if load destination div exists, first
            //it doesn't exist
            LayoutHideProgressBar();  //found in _Layout.cshtml
            alert("Div not found, for load. Check load statement. ");
         }
         else {

            $('#OverlayGrandChildAddkDetail').load(pagesrc, '', function (response, status, xhr) {
                //alert("status is " + status);   //can be ("success", "notmodified", "error", "timeout", or "parsererror")
                if (status == 'success') {
                    //alert("status text is: " + xhr.statusText);
                    //alert("response text is: " + xhr.responseText);
                    setTimeout(ShowGrandChildAddkLoad, 50);
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

        //GrandChildAddkOpenCheckLoad = setInterval(function () { CheckGrandChildAddkLoad(pagesrc) }, 300);  //so as to wait until next page displays fully

    }
   function ShowGrandChildAddkLoad() {
        try {
            var Expandid = "OverlayGrandChildAddkDetail";              //div in GrandChildAddk.cshtml
            document.getElementById(Expandid).style.display = "block";
        }
        catch (err) {
            //alert("err message " + err.message);
        }

    }
    //Next function not used anymore
    function CheckGrandChildAddkLoad(pagesrc) {
        LayoutShowProgressBar();  //found in _Layout.cshtml
        try {
            var chkit = $("#GrandChildAddkDetailtopdiv").find('#GrandChildAddkShowit').val();
            //alert("chkit is " + chkit)
            if (chkit == "showit") {
                var Expandid = "OverlayGrandChildAddkDetail";              //div in prog.cshtml
                document.getElementById(Expandid).style.display = "block";
                LayoutHideProgressBar();  //found in _Layout.cshtml
                clearInterval(GrandChildAddkOpenCheckLoad);
            }
        }
        catch (err) {
            //alert("err message " + err.message);
            //clearInterval(GrandChildAddkOpenCheckLoad);
        }
    
    }





    /// GrandChildAddkShowChild
    /// <summary>Next function is for + plus sign of record in Grid, to show Child tab Grid/s, under record 
    /// </summary> 
    function GrandChildAddkShowChild(PKID, row_ID, arrayname) {
        //document.getElementById('formDataChk').value = "ShowChild";  //for re-adjust of window resize  ??
         LayoutShowProgressBar();  //found in _Layout.cshtml

         //next line is for browser back button functionality
         window.location.hash = "ini";

        GrandChildAddkresetablebg();
        GrandChildAddkHideChildALL();
        GrandChildAddkrowhighlight(row_ID);

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
         var Expandid = "expandRowdivGrandChildAddk" + row_ID;

         $("#GrandChildAddkFormtopdiv [name=id]").val(PKID);

         //Url.Action(Action, Contoller)
         //var pagesrc = '/GrandChildAddk/GrandChildAddkTab';  //this is for form with child tabs
         //alert("pagesrc is " + pagesrc);  //TEST only display
         var pagesrc = GrandChildAddkDetailTabURL;

         //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
         var Expandheight = 295;    //change to suit -  see CHILD GrandChildAddkResults.js
         //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

         var tablediv = document.getElementById('idDivGrandChildAddkTBody');  //new
         tablediv.style.overflow = "hidden";  //Option, to put back scrollbars again

         var newwidth = $("#GrandChildAddkFormtopdiv").outerWidth();
         var widthsetchr = Number(newwidth - 43) + "px";       //Can change 43, but will have to change child grid progResults.js (function AdjustDivWidthDailyprog() ie 69)

        //$("#expandRowdivGrandChildAddk" + row_ID).css("height", Expandheight + "px");    //DO NOT NEED anymore
         $("#expandRowdivGrandChildAddk" + row_ID).css("width", widthsetchr);

         var ichildrowid = "GrandChildAddkchild" + row_ID;
         document.getElementById(ichildrowid).style.display = "";
         //document.getElementById(ichildrowid).style.display = "block";    //do not use, causes grid header to be corrupted
   
         $("#ModalGrandChildAddkOverlayK").empty();   //clear modal popup as well
         $("#OverlayGrandChildAddkDetail").empty();
         $("#expandRowdivGrandChildAddk" + row_ID).empty();

         if ($("#expandRowdivGrandChildAddk" + row_ID).length == 0) {   //check if load destination div exists, first
            //it doesn't exist
            LayoutHideProgressBar();  //found in _Layout.cshtml
            alert("Div not found, for load. Check load statement. ");
         }
         else {
            $('#expandRowdivGrandChildAddk' + row_ID).load(pagesrc, '', function (response, status, xhr) {
                //alert("status is " + status);   //can be ("success", "notmodified", "error", "timeout", or "parsererror")
                if (status == 'success') {
                    //alert("status text is: " + xhr.statusText);
                    //alert("response text is: " + xhr.responseText);
                    var minusignid = "GrandChildAddkminusign" + row_ID;
                    var plusignid = "GrandChildAddkplusign" + row_ID;
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



    /// GrandChildAddkDelDetails
    /// <summary>Next function is to Delete a record on Grid
    /// </summary>  
    function GrandChildAddkDelDetails(PKID, row_ID, arrayname) {
        GrandChildAddkresetablebg();
        GrandChildAddkrowhighlight(row_ID);

        var putTitle = "";
        putTitle = "Delete";

        $("#GrandChildAddkModalk").css("display", "block");
        $(".modal-contentk").css("width", "220px");   
        $("#GrandChildAddkmodalkTitle").text(putTitle);

        var Expandid = "ModalGrandChildAddkOverlayK";              //div in GrandChildAddk.cshtml
 
        var dialogHeight = "80";
        var Expandheightpx = dialogHeight + "px";
        document.getElementById(Expandid).style.height = Expandheightpx;
      
        $("#ModalGrandChildAddkOverlayK").empty();
        var strTextDel = "<div style='font-size:12px;color:black;padding-bottom: 9px;padding-top:6px;'>Do you want to Delete this record?</div>";
        var strSubmit = '<input style="font-size:11px;color:black;display:inline-block;font-weight:bold;margin-right:9px;" class="btn btn-sm" type="button" value="Yes" onclick="GrandChildAddkDelRecord(' + PKID + ');GrandChildAddkCloseK();" />';
        var strCancel = '<input style="font-size:10px;color:red;display:inline-block;" class="btn btn-xs" type="button" value="Cancel" onclick="GrandChildAddkCloseK();" />';
        $("#ModalGrandChildAddkOverlayK").html(strTextDel + strSubmit + strCancel);

    }



    /// GrandChildAddkDeleteALL
    /// <summary>Next function is to multi Delete selected record/s on Grid
    /// </summary>  
    function GrandChildAddkDeleteALL() {
        var pagsiz = $("#GrandChildAddkFormtopdiv [name=PageSizeNEW]").val();
        var contin = "No";
        for (var r = 0; r < pagsiz + 1; r++) {
            if (document.getElementById('GrandChildAddkChk' + r) != null) {
                if (document.getElementById('GrandChildAddkChk' + r).checked == true) {
                    contin = "Yes";
                    document.getElementById('GrandChildAddkCheckB' + r).value = "on";
                }
                else {
                    document.getElementById('GrandChildAddkCheckB' + r).value = "off";
                }
            }
        }

        var putTitle = "";
        putTitle = "Delete";

        $("#GrandChildAddkModalk").css("display", "block");
        $(".modal-contentk").css("width", "220px");   
        $("#GrandChildAddkmodalkTitle").text(putTitle);

        var Expandid = "ModalGrandChildAddkOverlayK";              //div in GrandChildAddk.cshtml
 
        var dialogHeight = "80";
        var Expandheightpx = dialogHeight + "px";
        document.getElementById(Expandid).style.height = Expandheightpx;
      
        $("#ModalGrandChildAddkOverlayK").empty();
        var strTextDel = "<div style='font-size:12px;color:black;padding-bottom: 9px;padding-top:6px;'>Do you want to Delete this record?</div>";
        var strSubmit = '<input style="font-size:11px;color:black;display:inline-block;font-weight:bold;margin-right:9px;" class="btn btn-sm" type="button" value="Yes" onclick="GrandChildAddkDeleteSelected();GrandChildAddkCloseK();" />';
        var strCancel = '<input style="font-size:10px;color:red;display:inline-block;" class="btn btn-xs" type="button" value="Cancel" onclick="GrandChildAddkCloseK();" />';
        $("#ModalGrandChildAddkOverlayK").html(strTextDel + strSubmit + strCancel);

    }






    /// GrandChildAddkXLS
    /// <summary>Next function is to Export all or filtered grid records to a spreadsheet (ie XLS or XLSX)
    /// </summary>  
    function GrandChildAddkXLS() {
        //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
        var PgSize = $("#GrandChildAddkFormtopdiv [name=PageSize]").val();
        var Sortt = $("#GrandChildAddkFormtopdiv [name=SortBy]").val();
        var DescAsc = $("#GrandChildAddkFormtopdiv [name=SortAscendingDescending]").val();
        var Criteria1 = $("#GrandChildAddkForm [name=GlobalSearchString]").val();

        var Criteria2 = $("#GrandChildAddkForm [name=Table_Name]").val();

        var Criteria3 = $("#GrandChildAddkForm [name=Field_Name]").val();

        var Criteria4 = $("#GrandChildAddkForm [name=Data_Type]").val();

        var Criteria5 = $("#GrandChildAddkForm [name=Length_Size]").val();

        //alert("Sortt " + Sortt);
        $("#GrandChildAddkRepXLS [name=SortBy2]").val(Sortt);
        $("#GrandChildAddkRepXLS [name=SortAscendingDescending2]").val(DescAsc);
        $("#GrandChildAddkRepXLS [name=PageSize2]").val(PgSize);
        $("#GrandChildAddkRepXLS [name=GlobalSearchString]").val(Criteria1);

         $("#GrandChildAddkRepXLS [name=Table_Name]").val(Criteria2);

         $("#GrandChildAddkRepXLS [name=Field_Name]").val(Criteria3);

         $("#GrandChildAddkRepXLS [name=Data_Type]").val(Criteria4);

        $("#GrandChildAddkRepXLS [name=Length_Size]").val(Criteria5);

        LayoutShowProgressBar();  //found in _Layout.cshtml

        setTimeout(GrandChildAddkSubmitRepXLS, 150);
    }
    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    function GrandChildAddkfinishDownloadXLS() {
        //alert("in finishDownload");
        LayoutHideProgressBar();  //found in _Layout.cshtml
    }


    function GrandChildAddkSubmitRepXLS() {

     var token = new Date().getTime(); //use the current timestamp as the token value
     //alert("token is " + token);
     $("#GrandChildAddkRepXLS [name=download_token_value]").val(token);

     var FormtoDO = $('#GrandChildAddkRepXLS');

     $.ajax({
        type: 'POST',
        url: FormtoDO.attr('action'),
        data: FormtoDO.serialize(),
        success: function (response) {
            //alert("done " + response.filename);
            GrandChildAddkfinishDownloadXLS();
            //alert("done " + response.fileName);
            window.location.href = "GrandChildAddkDownloadXLSX?file=" + response.filename;  //works

            setTimeout(GrandChildAddkSubmitDelXLSX, 500, response.filename);  //Deletes XLSX file on Server, wait half a second

        },
        error: function (jqXhr, textStatus, errorMessage) {
            alert(" errorMessage is:- " + errorMessage + "\n Xhr.status is :- " + jqXhr.status + "\n Xhr.responseText is :- " + jqXhr.responseText + "\n textStatus is :- " + textStatus);
        }

      });

    }


    function GrandChildAddkSubmitDelXLSX(filenamee) {

     var GetDelURLL = '/GrandChildAddk/GrandChildAddkDownloadXLSXDel';
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
    function GrandChildAddkPDF() {

        var PgSize = $("#GrandChildAddkFormtopdiv [name=PageSize]").val();
        var Sortt = $("#GrandChildAddkFormtopdiv [name=SortBy]").val();
        var DescAsc = $("#GrandChildAddkFormtopdiv [name=SortAscendingDescending]").val();
        var Criteria1 = $("#GrandChildAddkForm [name=GlobalSearchString]").val();

        var Criteria2 = $("#GrandChildAddkForm [name=Table_Name]").val();

        var Criteria3 = $("#GrandChildAddkForm [name=Field_Name]").val();

        var Criteria4 = $("#GrandChildAddkForm [name=Data_Type]").val();

        var Criteria5 = $("#GrandChildAddkForm [name=Length_Size]").val();

        $("#GrandChildAddkRepPDF [name=SortBy2]").val(Sortt);
        $("#GrandChildAddkRepPDF [name=SortAscendingDescending2]").val(DescAsc);
        $("#GrandChildAddkRepPDF [name=PageSize2]").val(PgSize);
        $("#GrandChildAddkRepPDF [name=GlobalSearchString]").val(Criteria1);

         $("#GrandChildAddkRepPDF [name=Table_Name]").val(Criteria2);

         $("#GrandChildAddkRepPDF [name=Field_Name]").val(Criteria3);

         $("#GrandChildAddkRepPDF [name=Data_Type]").val(Criteria4);

        $("#GrandChildAddkRepPDF [name=Length_Size]").val(Criteria5);

        LayoutShowProgressBar();  //found in _Layout.cshtml

        setTimeout(GrandChildAddkSubmitRepPDF, 150);
        //HideProgressBar();  //test only

    }
    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    function GrandChildAddkfinishDownload() {
        //alert("in finishDownload");
        LayoutHideProgressBar();  //found in _Layout.cshtml
    }


   function GrandChildAddkSubmitRepPDF() {

     var token = new Date().getTime(); //use the current timestamp as the token value
     //alert("token is " + token);
     $("#GrandChildAddkRepPDF [name=download_token_value]").val(token);

     var FormtoDO = $('#GrandChildAddkRepPDF');

     $.ajax({
        type: 'POST',
        url: FormtoDO.attr('action'),
        data: FormtoDO.serialize(),
        success: function (response) {
            //alert("done " + response.filename);
            GrandChildAddkfinishDownload();
            //alert("done " + response.fileName);
            window.location.href = "GrandChildAddkDownloadPDF?file=" + response.filename;  //works

            setTimeout(GrandChildAddkSubmitDelPDF, 500, response.filename);  //Deletes PDF file on Server
          
        },
        error: function (jqXhr, textStatus, errorMessage) {
            alert(" errorMessage is:- " + errorMessage + "\n Xhr.status is :- " + jqXhr.status + "\n Xhr.responseText is :- " + jqXhr.responseText + "\n textStatus is :- " + textStatus);
        }

     });

    }


    function GrandChildAddkSubmitDelPDF(filenamee) {

     var GetDelURLL = '/GrandChildAddk/GrandChildAddkDownloadPDFDel';
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
    function GrandChildAddkmyTimer() {
        //alert("in GrandChildAddkmyTimer");
        var scrola = $("#idDivGrandChildAddkTBody").scrollLeft();
        $("#idDivGrandChildAddkTBody2").scrollLeft(scrola);
        $("#idDivGrandChildAddkTFooter").scrollLeft(scrola);
    }

    // This part is for scrolling grid table and auto adjust when screen is resized
    AdjustDivWidthGrandChildAddk();

    function AdjustDivWidthGrandChildAddk() {

        if (document.getElementById("idDivGrandChildAddkTBody")) {
            var idDivGrandChildAddkTBodyNew = document.getElementById("idDivGrandChildAddkTBody").clientWidth;
            var idDivGrandChildAddkTBodyNewoff = document.getElementById("idDivGrandChildAddkTBody").offsetWidth;
            var idscrolWidth = idDivGrandChildAddkTBodyNewoff - idDivGrandChildAddkTBodyNew;
            //alert("Scroll bar width is " + (idDivGrandChildAddkTBodyNewoff - idDivGrandChildAddkTBodyNew));
            $("#GrandChildAddkFormtopdiv [name=ScrollWidthh]").val(idscrolWidth);
            $("#GrandChildAddkFormtopdiv [name=OrigScreenWidthh]").val(idDivGrandChildAddkTBodyNewoff);  //keep original table width

            var resetWidth = 0;
            var newwidthUse = $("#GrandChildAddkFormtopdiv").outerWidth();
            newwidthUse = Number(newwidthUse) - (Number(idscrolWidth) + 2);  //may need to change 2.
            resetWidth = newwidthUse;
 
            //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
            //Height adjusted for initial Grid. Change as needed.
            document.getElementById("idDivGrandChildAddkTBody").style.height = "400px";  
            //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
        }

        if (document.getElementById("idGrandChildAddkHeader")) {
            document.getElementById("idGrandChildAddkHeader").style.width = resetWidth + "px";
        }

        if (document.getElementById("idGrandChildAddkHeader2")) {
            document.getElementById("idGrandChildAddkHeader2").style.width = resetWidth + "px";
            document.getElementById("idDivGrandChildAddkTBody2").style.width = resetWidth + "px";
        }

        if (document.getElementById("idGrandChildAddkFooter")) {
            //document.getElementById("idGrandChildAddkFooter").style.width = resetWidth + "px";
            //document.getElementById("idDivGrandChildAddkTFooter").style.width = resetWidth + "px";
        }

    }
    // END part is for scrolling grid table and auto adjust when screen is resized
 

    function GrandChildAddkresetablebg() {
        var table = document.getElementById('GrandChildAddkTable');
        var rowsss = table.getElementsByTagName('tr');
        var rowidstr;
        var tr;
        var backgr = "#D3DCE5";
        if (table) {
            tr = $('#GrandChildAddkTable').find('tr');
            $.each(tr, function (index, item) {
                //alert("index is " + index);
                rowidstr = rowsss[index].id;
                //alert("row idd is " + rowidstr);
                if (rowidstr.indexOf("GrandChildAddkmaster") != -1) {    //only pickup rows with id of 'master' as prefix
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
    function GrandChildAddkrowhighlight(row_ID) {
        GrandChildAddkresetablebg();
        var table = document.getElementById('GrandChildAddkTable');
        if (table) {
            //alert("hightlight row");
            //table.rows[row_ID].style.backgroundColor = "#F3F3F3";
            $("#GrandChildAddkFormtopdiv [name=CurrentRowNumber]").val(row_ID);  //change form name to suit
        }

        row_ID = row_ID - 1;
        var imasterrowid = "GrandChildAddkmaster" + row_ID;
        document.getElementById(imasterrowid).style.backgroundColor = "silver";
    }


    //Used for Highlighting a Sorted Column
    function GrandChildAddkHighlightCol(colname) {
        //alert("colname is " + colname);
        if (document.getElementById('GrandChildAddkTable') != null) {
            var table = document.getElementById('GrandChildAddkTable');
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


    function GrandChildAddkCheckALLs() {
        //alert("in CheckALLs");
        if (document.getElementById('GrandChildAddkCheckALL').checked == false) {
            $("input[name^=GrandChildAddkChk]").prop("checked", false);
        }

        if (document.getElementById('GrandChildAddkCheckALL').checked == true) {
            $("input[name^=GrandChildAddkChk]").prop("checked", true);
        }

    }


    function GrandChildAddkShowColumn(row_ID, colnam) {
        GrandChildAddkHideColumnALL(colnam);

        var ik = Number(row_ID - 2);
        var tippp = colnam + "tipp" + ik;
        $("#GrandChildAddkFormtopdiv [name=" + tippp + "]").css("display", "none");

        var minusignid = "minusign" + colnam + row_ID;
        var plusignid = "plusign" + colnam + row_ID;
        $("#GrandChildAddkFormtopdiv [name=" + minusignid + "]").css("display", "inline-block");
        $("#GrandChildAddkFormtopdiv [name=" + plusignid + "]").css("display", "none");
    }

    function GrandChildAddkHideColumn(row_ID, colnam) {
        var ik = Number(row_ID - 2);
        var tippp = colnam + "tipp" + ik;
        $("#GrandChildAddkFormtopdiv [name=" + tippp + "]").css("display", "");

        var minusignid = "minusign" + colnam + row_ID;
        var plusignid = "plusign" + colnam + row_ID;
        $("#GrandChildAddkFormtopdiv [name=" + minusignid + "]").css("display", "none");
        $("#GrandChildAddkFormtopdiv [name=" + plusignid + "]").css("display", "inline-block");
    }

    function GrandChildAddkHideColumnALL(colnam) {
        var tippp = colnam + "tipp";
        //$("span[id^=" + tippp + "]").css("display", "");
        $("#GrandChildAddkFormtopdiv [name=" + tippp + "]").css("display", "");

        var minusignid = "minusign" + colnam;
        var plusignid = "plusign" + colnam;

        $("#GrandChildAddkFormtopdiv [name=" + minusignid + "]").css("display", "none");
        $("#GrandChildAddkFormtopdiv [name=" + plusignid + "]").css("display", "inline-block");
    }


    //Show row on page via traversing all grid rows
    function GrandChildAddknewrowhighlight() {
        //alert("in newrowhighlight");
        GrandChildAddkresetablebg();
        var table = document.getElementById('GrandChildAddkTable');
        var rowsss = table.getElementsByTagName('tr');
        var dValue;
        var addval;
        var IDId;
        var indx;
        var rowidstr;
        var tr;
        indx = 1;
        var rowCount = $('#GrandChildAddkTable tr').length;
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
                if (rowidstr.indexOf("GrandChildAddkmaster") != -1) {    //only pickup rows with id of 'master' as prefix
                    //alert("r is " + r);
                    dValue = document.getElementById('GrandChildAddkPK_IDD' + indx).value;
                    //alert("dValue is " + dValue);
                    if ($("#GrandChildAddkFormtopdiv [name=id]").val() == dValue) {
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
        var imasterrowid2 = "GrandChildAddkmaster" + row_ID2;
        var selectedPosy = 0;
        //selectedPosx = document.getElementById(imasterrowid2).offsetLeft;
        if (document.getElementById(imasterrowid2)) {
            selectedPosy = document.getElementById(imasterrowid2).offsetTop;
            //alert("selectedPosy is " + selectedPosy);
            if (Number(selectedPosy > 400))    //Note:- 400 is the Height of Grid Table (ie idDivGrandChildAddkTBody)
            {
                $("#idDivGrandChildAddkTBody").scrollTop(selectedPosy);
            }


            //$("#idDivGrandChildAddkTBody").scrollTop(selectedPosy);
        }
        //END new code, to auto scroll to row in scrollable DIV
    }


    function ScrollToTop() {
        //new code, to auto scroll to TOP row in scrollable DIV. Used in OpShow when doing Cancel Back.
        //var row_ID = document.getElementById('CurrentRowNumber').value;
        var row_ID = $("#GrandChildAddkFormtopdiv [name=CurrentRowNumber]").val();
        //alert("row_ID is " + row_ID);
        var row_ID2 = row_ID - 1;
        var imasterrowid = "GrandChildAddkmaster" + row_ID2;
        //var selectedPosx = 0;
        var selectedPosy = 0;
        //selectedPosx = document.getElementById(imasterrowid).offsetLeft;
        selectedPosy = document.getElementById(imasterrowid).offsetTop;

        var tablediv = document.getElementById('idDivGrandChildAddkTBody');
        //tablediv.style.overflow = "hidden";
        $("#idDivGrandChildAddkTBody").scrollTop(selectedPosy);
        //END new code, to auto scroll to row in scrollable DIV
    }


    //Used to Hide child Panel record on Grid
    function GrandChildAddkHideChild(PKID, row_ID, arrayname) {
        GrandChildAddkresetablebg();
        GrandChildAddkrowhighlight(row_ID);
        //alert("row_ID is " + row_ID);
        $("#expandRowdivGrandChildAddk" + row_ID).empty();

        //put scrolling back in
        var tablediv = document.getElementById('idDivGrandChildAddkTBody');
        tablediv.style.overflow = "scroll";
        $("#idDivGrandChildAddkTBody").scrollTop(2); //go back to top of page if scrolling
        //END put scrolling back in
     

        var ichildrowid = "GrandChildAddkchild" + row_ID;  //also hide div
        if (document.getElementById(ichildrowid) != null) {
            document.getElementById(ichildrowid).style.display = "none";
        }

        var minusignid = "GrandChildAddkminusign" + row_ID;
        var plusignid = "GrandChildAddkplusign" + row_ID;
        if (document.getElementById(minusignid) != null) {
            document.getElementById(minusignid).style.display = "none";
        }
        if (document.getElementById(plusignid) != null) {
            document.getElementById(plusignid).style.display = "block";
        }

    }

    //Used to hide all Child panels
    function GrandChildAddkHideChildALL() {
    
        try {

            GrandChildAddkresetablebg();
            //alert("GrandChildAddkHideChildALL");
            //put scrolling back in
            var tablediv = document.getElementById('idDivGrandChildAddkTBody');
             tablediv.style.overflow = "scroll";
             //END put scrolling back in

            var table = document.getElementById('GrandChildAddkTable');
            var rowsss = table.getElementsByTagName('tr');
            var tr;
            var indx;
            var rowidstr;
            indx = 3;   //start at 3, as in grid with index (i+2)
            if (table) {
                tr = $('#GrandChildAddkTable').find('tr');
                $.each(tr, function (index, item) {
                    try {
                        rowidstr = rowsss[index].id;   //??fix later
                    }
                    catch (err) {
                        //alert("err1 is " + err.message);
                    }
                    //alert("row id is " + rowidstr);
                    if (rowidstr.indexOf("GrandChildAddkmaster") != -1) {    //only pickup rows with id of 'master' as prefix
                        //alert("row id is " + rowidstr);
                        //alert("indx is " + indx);
                        $("#expandRowdivGrandChildAddk" + indx).empty();
                        var ichildrowid = "GrandChildAddkchild" + indx;  //also hide div
                        //alert("ichildrowid is " + ichildrowid);
                        if (document.getElementById(ichildrowid) != null) {
                            document.getElementById(ichildrowid).style.display = "none";
                            //alert("row id1 is " + rowidstr);
                        }
                        var minusignid = "GrandChildAddkminusign" + indx;
                        var plusignid = "GrandChildAddkplusign" + indx;
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
