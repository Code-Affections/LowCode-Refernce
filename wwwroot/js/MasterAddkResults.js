
//Code between these comments can be changed-  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// NOTE:- Adjust Grid height if needed in,  function AdjustDivWidthMasterAddk() 

    /// MasterAddkPopDialog
    /// <summary>Next function is for Edit popup of record in Grid
    /// </summary> 
    function MasterAddkPopDialog(PKID, row_ID) {
         LayoutShowProgressBar();  //found in _Layout.cshtml

         //next line is for browser back button functionality
         window.location.hash = "ini";

        MasterAddkHideChildALL();

        $("#MasterAddkFormtopdiv [name=id]").val(PKID);      //Primary Key
        $("#ParentGeneralDiv [name=PK_ID]").val(PKID);       //Store Primary Key for later processing in Child

        var putTitle = "";
        if (PKID == -1) {
            putTitle = "Add MasterAddk";
        }
        else {
            putTitle = "Edit MasterAddk";
            MasterAddkresetablebg();
            MasterAddkrowhighlight(row_ID);
        }

        var strAction = "MasterAddkDetail";
        var strController = "MasterAddk";

        //Url.Action(Action, Contoller)
        //var pagesrc = '/MasterAddk7/MasterAddkDetail7';  //new replace code example
       // pagesrc = pagesrc.replace("MasterAddkDetail7", strAction);
        //pagesrc = pagesrc.replace("MasterAddk7", strController);
        //alert("pagesrc is " + pagesrc);
        var pagesrc = MasterAddkDetailURL; 

        var dialogWidth = 0;
        var dialogHeight = 0;
        //var topform = top.document.forms[0].id;   //use this to get TOP GRID Search form 
        dialogWidth = document.getElementById("MasterAddkForm").offsetWidth;
        dialogHeight = document.getElementById("MasterAddkForm").offsetHeight;
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
        if (isBreakpointGet('xs')) {   //in Mobile device. Getting this from MasterAddk.cshtml now
            //dialogHeight = Number(deviceHeight) - 328;
            dialogHeight = Number(deviceHeight) / 1.6;
        }
        else {
            //dialogHeight = Number(deviceHeight) - 350;  //so as cope with desktop window top part
            dialogHeight = Number(deviceHeight) / 1.7;
        }

        var deviceWidth = (typeof window.outerWidth != 'undefined') ? Math.max(window.outerWidth, $(window).width()) : $(window).width();

        if (isBreakpointGet('xs')) {   //in Mobile device. Getting this from MasterAddk.cshtml now
            dialogWidth = Number(deviceWidth) - 40;     //not used
        }
        else {
            dialogWidth = Number(deviceWidth) - 240;   //not used
        }


        if (HeightChk == "true")  //Window Height OK to proceed
        {

         $("#MasterAddkModalk").css("display", "block");
         $("#MasterAddkmodalkTitle").text(putTitle);

         var Expandid = "ModalMasterAddkOverlayK";              //div in prog.cshtml
 
         var Expandheightpx = dialogHeight + "px";
         document.getElementById(Expandid).style.height = Expandheightpx;

         $("#OverlayMasterAddkDetail").empty();  //erase OpenDetails in case
         $("#ModalMasterAddkOverlayK").empty();

         if ($("#ModalMasterAddkOverlayK").length == 0) {   //check if load destination div exists, first
            //it doesn't exist
            LayoutHideProgressBar();  //found in _Layout.cshtml
            alert("Div not found, for load. Check load statement. ");
         }
         else {

            $('#ModalMasterAddkOverlayK').load(pagesrc, '', function (response, status, xhr) {
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
    function MasterAddkCloseK() {
        //alert("MasterAddkcloseK");
        //$("#OverlayMasterAddkDetail").empty();  //erase OpenDetails in case
        $("#ModalMasterAddkOverlayK").empty();
        $("#MasterAddkModalk").css("display", "none");
        $(".modal-contentk").css("width", "85%");   //so as set back to original size
    }
 



    /// MasterAddkOpenDetails
    /// <summary>Next function is for Detail button of record in Grid, to overlay page on top of Grid
    /// </summary> 
    var MasterAddkOpenCheckLoad;
    function MasterAddkOpenDetails(PKID, row_ID, arrayname) {
        //alert("MasterAddkOpenDetails");
         LayoutShowProgressBar();  //found in _Layout.cshtml

         //next line is for browser back button functionality
         window.location.hash = "ini";

        MasterAddkresetablebg();
        MasterAddkHideChildALL();
        MasterAddkrowhighlight(row_ID);

        $("#MasterAddkFormtopdiv [name=id]").val(PKID);
        $("#ParentGeneralDiv [name=PK_ID]").val(PKID);       //Store Primary Key for later processing in Child

        var pos = $("#MasterAddkFormtopdiv").position();   //get position on screen, even if scrolled down.
        var topsetchr = Number(pos.top - 1) + "px";      //Adjust if necessary
        var leftsetchr = Number(pos.left) + "px";

        var newwidth = $("#MasterAddkFormtopdiv").outerWidth();
        var newheight = $("#MasterAddkFormtopdiv").outerHeight();
        var heightsetchr = Number(newheight + 0) + "px";
        var widthsetchr = Number(newwidth - 0) + "px";

        var Expandid = "OverlayMasterAddkDetail";              //div in prog.cshtml
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
         var pagesrc = MasterAddkDetailShowURL;
         //alert("pagesrc is " + pagesrc);

         $("#ModalMasterAddkOverlayK").empty();   //clear modal popup as well
         $("#OverlayMasterAddkDetail").empty();
    
         if ($("#OverlayMasterAddkDetail").length == 0) {   //check if load destination div exists, first
            //it doesn't exist
            LayoutHideProgressBar();  //found in _Layout.cshtml
            alert("Div not found, for load. Check load statement. ");
         }
         else {

            $('#OverlayMasterAddkDetail').load(pagesrc, '', function (response, status, xhr) {
                //alert("status is " + status);   //can be ("success", "notmodified", "error", "timeout", or "parsererror")
                if (status == 'success') {
                    //alert("status text is: " + xhr.statusText);
                    //alert("response text is: " + xhr.responseText);
                    setTimeout(ShowMasterAddkLoad, 50);
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

        //MasterAddkOpenCheckLoad = setInterval(function () { CheckMasterAddkLoad(pagesrc) }, 300);  //so as to wait until next page displays fully

    }
   function ShowMasterAddkLoad() {
        try {
            var Expandid = "OverlayMasterAddkDetail";              //div in MasterAddk.cshtml
            document.getElementById(Expandid).style.display = "block";
        }
        catch (err) {
            //alert("err message " + err.message);
        }

    }
    //Next function not used anymore
    function CheckMasterAddkLoad(pagesrc) {
        LayoutShowProgressBar();  //found in _Layout.cshtml
        try {
            var chkit = $("#MasterAddkDetailtopdiv").find('#MasterAddkShowit').val();
            //alert("chkit is " + chkit)
            if (chkit == "showit") {
                var Expandid = "OverlayMasterAddkDetail";              //div in prog.cshtml
                document.getElementById(Expandid).style.display = "block";
                LayoutHideProgressBar();  //found in _Layout.cshtml
                clearInterval(MasterAddkOpenCheckLoad);
            }
        }
        catch (err) {
            //alert("err message " + err.message);
            //clearInterval(MasterAddkOpenCheckLoad);
        }
    
    }





    /// MasterAddkShowChild
    /// <summary>Next function is for + plus sign of record in Grid, to show Child tab Grid/s, under record 
    /// </summary> 
    function MasterAddkShowChild(PKID, row_ID, arrayname) {
        //document.getElementById('formDataChk').value = "ShowChild";  //for re-adjust of window resize  ??
         LayoutShowProgressBar();  //found in _Layout.cshtml

         //next line is for browser back button functionality
         window.location.hash = "ini";

        MasterAddkresetablebg();
        MasterAddkHideChildALL();
        MasterAddkrowhighlight(row_ID);

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
         var Expandid = "expandRowdivMasterAddk" + row_ID;

         $("#MasterAddkFormtopdiv [name=id]").val(PKID);

         //Url.Action(Action, Contoller)
         //var pagesrc = '/MasterAddk/MasterAddkTab';  //this is for form with child tabs
         //alert("pagesrc is " + pagesrc);  //TEST only display
         var pagesrc = MasterAddkDetailTabURL;

         //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
         var Expandheight = 295;    //change to suit -  see CHILD MasterAddkResults.js
         //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

         var tablediv = document.getElementById('idDivMasterAddkTBody');  //new
         tablediv.style.overflow = "hidden";  //Option, to put back scrollbars again

         var newwidth = $("#MasterAddkFormtopdiv").outerWidth();
         var widthsetchr = Number(newwidth - 43) + "px";       //Can change 43, but will have to change child grid progResults.js (function AdjustDivWidthDailyprog() ie 69)

        //$("#expandRowdivMasterAddk" + row_ID).css("height", Expandheight + "px");    //DO NOT NEED anymore
         $("#expandRowdivMasterAddk" + row_ID).css("width", widthsetchr);

         var ichildrowid = "MasterAddkchild" + row_ID;
         document.getElementById(ichildrowid).style.display = "";
         //document.getElementById(ichildrowid).style.display = "block";    //do not use, causes grid header to be corrupted
   
         $("#ModalMasterAddkOverlayK").empty();   //clear modal popup as well
         $("#OverlayMasterAddkDetail").empty();
         $("#expandRowdivMasterAddk" + row_ID).empty();

         if ($("#expandRowdivMasterAddk" + row_ID).length == 0) {   //check if load destination div exists, first
            //it doesn't exist
            LayoutHideProgressBar();  //found in _Layout.cshtml
            alert("Div not found, for load. Check load statement. ");
         }
         else {
            $('#expandRowdivMasterAddk' + row_ID).load(pagesrc, '', function (response, status, xhr) {
                //alert("status is " + status);   //can be ("success", "notmodified", "error", "timeout", or "parsererror")
                if (status == 'success') {
                    //alert("status text is: " + xhr.statusText);
                    //alert("response text is: " + xhr.responseText);
                    var minusignid = "MasterAddkminusign" + row_ID;
                    var plusignid = "MasterAddkplusign" + row_ID;
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



    /// MasterAddkDelDetails
    /// <summary>Next function is to Delete a record on Grid
    /// </summary>  
    function MasterAddkDelDetails(PKID, row_ID, arrayname) {
        MasterAddkresetablebg();
        MasterAddkrowhighlight(row_ID);

        var putTitle = "";
        putTitle = "Delete";

        $("#MasterAddkModalk").css("display", "block");
        $(".modal-contentk").css("width", "220px");   
        $("#MasterAddkmodalkTitle").text(putTitle);

        var Expandid = "ModalMasterAddkOverlayK";              //div in MasterAddk.cshtml
 
        var dialogHeight = "80";
        var Expandheightpx = dialogHeight + "px";
        document.getElementById(Expandid).style.height = Expandheightpx;
      
        $("#ModalMasterAddkOverlayK").empty();
        var strTextDel = "<div style='font-size:12px;color:black;padding-bottom: 9px;padding-top:6px;'>Do you want to Delete this record?</div>";
        var strSubmit = '<input style="font-size:11px;color:black;display:inline-block;font-weight:bold;margin-right:9px;" class="btn btn-sm" type="button" value="Yes" onclick="MasterAddkDelRecord(' + PKID + ');MasterAddkCloseK();" />';
        var strCancel = '<input style="font-size:10px;color:red;display:inline-block;" class="btn btn-xs" type="button" value="Cancel" onclick="MasterAddkCloseK();" />';
        $("#ModalMasterAddkOverlayK").html(strTextDel + strSubmit + strCancel);

    }



    /// MasterAddkDeleteALL
    /// <summary>Next function is to multi Delete selected record/s on Grid
    /// </summary>  
    function MasterAddkDeleteALL() {
        var pagsiz = $("#MasterAddkFormtopdiv [name=PageSizeNEW]").val();
        var contin = "No";
        for (var r = 0; r < pagsiz + 1; r++) {
            if (document.getElementById('MasterAddkChk' + r) != null) {
                if (document.getElementById('MasterAddkChk' + r).checked == true) {
                    contin = "Yes";
                    document.getElementById('MasterAddkCheckB' + r).value = "on";
                }
                else {
                    document.getElementById('MasterAddkCheckB' + r).value = "off";
                }
            }
        }

        var putTitle = "";
        putTitle = "Delete";

        $("#MasterAddkModalk").css("display", "block");
        $(".modal-contentk").css("width", "220px");   
        $("#MasterAddkmodalkTitle").text(putTitle);

        var Expandid = "ModalMasterAddkOverlayK";              //div in MasterAddk.cshtml
 
        var dialogHeight = "80";
        var Expandheightpx = dialogHeight + "px";
        document.getElementById(Expandid).style.height = Expandheightpx;
      
        $("#ModalMasterAddkOverlayK").empty();
        var strTextDel = "<div style='font-size:12px;color:black;padding-bottom: 9px;padding-top:6px;'>Do you want to Delete this record?</div>";
        var strSubmit = '<input style="font-size:11px;color:black;display:inline-block;font-weight:bold;margin-right:9px;" class="btn btn-sm" type="button" value="Yes" onclick="MasterAddkDeleteSelected();MasterAddkCloseK();" />';
        var strCancel = '<input style="font-size:10px;color:red;display:inline-block;" class="btn btn-xs" type="button" value="Cancel" onclick="MasterAddkCloseK();" />';
        $("#ModalMasterAddkOverlayK").html(strTextDel + strSubmit + strCancel);

    }






    /// MasterAddkXLS
    /// <summary>Next function is to Export all or filtered grid records to a spreadsheet (ie XLS or XLSX)
    /// </summary>  
    function MasterAddkXLS() {
        //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
        var PgSize = $("#MasterAddkFormtopdiv [name=PageSize]").val();
        var Sortt = $("#MasterAddkFormtopdiv [name=SortBy]").val();
        var DescAsc = $("#MasterAddkFormtopdiv [name=SortAscendingDescending]").val();
        var Criteria1 = $("#MasterAddkForm [name=GlobalSearchString]").val();

        var Criteria2 = $("#MasterAddkForm [name=Table_Name]").val();

        var Criteria3 = $("#MasterAddkForm [name=Field_Name]").val();

        var Criteria4 = $("#MasterAddkForm [name=Data_Type]").val();

        var Criteria5 = $("#MasterAddkForm [name=Length_Size]").val();

        //alert("Sortt " + Sortt);
        $("#MasterAddkRepXLS [name=SortBy2]").val(Sortt);
        $("#MasterAddkRepXLS [name=SortAscendingDescending2]").val(DescAsc);
        $("#MasterAddkRepXLS [name=PageSize2]").val(PgSize);
        $("#MasterAddkRepXLS [name=GlobalSearchString]").val(Criteria1);

         $("#MasterAddkRepXLS [name=Table_Name]").val(Criteria2);

         $("#MasterAddkRepXLS [name=Field_Name]").val(Criteria3);

         $("#MasterAddkRepXLS [name=Data_Type]").val(Criteria4);

        $("#MasterAddkRepXLS [name=Length_Size]").val(Criteria5);

        //LayoutShowProgressBar();  //found in _Layout.cshtml

        setTimeout(MasterAddkSubmitRepXLS, 150);
    }
    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    function MasterAddkfinishDownloadXLS() {
        //alert("in finishDownload");
        LayoutHideProgressBar();  //found in _Layout.cshtml
    }


    function MasterAddkSubmitRepXLS() {

     var token = new Date().getTime(); //use the current timestamp as the token value
     //alert("token is " + token);
     $("#MasterAddkRepXLS [name=download_token_value]").val(token);

     var FormtoDO = $('#MasterAddkRepXLS');

     $.ajax({
        type: 'POST',
        url: FormtoDO.attr('action'),
        data: FormtoDO.serialize(),
        success: function (response) {
            //alert("done " + response.filename);
            MasterAddkfinishDownloadXLS();
            //alert("done " + response.fileName);
            window.location.href = "MasterAddkDownloadXLSX?file=" + response.filename;  //works

            setTimeout(MasterAddkSubmitDelXLSX, 500, response.filename);  //Deletes XLSX file on Server, wait half a second

        },
        error: function (jqXhr, textStatus, errorMessage) {
            alert(" errorMessage is:- " + errorMessage + "\n Xhr.status is :- " + jqXhr.status + "\n Xhr.responseText is :- " + jqXhr.responseText + "\n textStatus is :- " + textStatus);
        }

      });

    }


    function MasterAddkSubmitDelXLSX(filenamee) {

     var GetDelURLL = '/MasterAddk/MasterAddkDownloadXLSXDel';
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
    function MasterAddkPDF() {

        var PgSize = $("#MasterAddkFormtopdiv [name=PageSize]").val();
        var Sortt = $("#MasterAddkFormtopdiv [name=SortBy]").val();
        var DescAsc = $("#MasterAddkFormtopdiv [name=SortAscendingDescending]").val();
        var Criteria1 = $("#MasterAddkForm [name=GlobalSearchString]").val();

        var Criteria2 = $("#MasterAddkForm [name=Table_Name]").val();

        var Criteria3 = $("#MasterAddkForm [name=Field_Name]").val();

        var Criteria4 = $("#MasterAddkForm [name=Data_Type]").val();

        var Criteria5 = $("#MasterAddkForm [name=Length_Size]").val();

        $("#MasterAddkRepPDF [name=SortBy2]").val(Sortt);
        $("#MasterAddkRepPDF [name=SortAscendingDescending2]").val(DescAsc);
        $("#MasterAddkRepPDF [name=PageSize2]").val(PgSize);
        $("#MasterAddkRepPDF [name=GlobalSearchString]").val(Criteria1);

         $("#MasterAddkRepPDF [name=Table_Name]").val(Criteria2);

         $("#MasterAddkRepPDF [name=Field_Name]").val(Criteria3);

         $("#MasterAddkRepPDF [name=Data_Type]").val(Criteria4);

        $("#MasterAddkRepPDF [name=Length_Size]").val(Criteria5);

        //LayoutShowProgressBar();  //found in _Layout.cshtml

        setTimeout(MasterAddkSubmitRepPDF, 150);
        //HideProgressBar();  //test only

    }
    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    function MasterAddkfinishDownload() {
        //alert("in finishDownload");
        LayoutHideProgressBar();  //found in _Layout.cshtml
    }


   function MasterAddkSubmitRepPDF() {

     var token = new Date().getTime(); //use the current timestamp as the token value
     //alert("token is " + token);
     $("#MasterAddkRepPDF [name=download_token_value]").val(token);

     var FormtoDO = $('#MasterAddkRepPDF');

     $.ajax({
        type: 'POST',
        url: FormtoDO.attr('action'),
        data: FormtoDO.serialize(),
        success: function (response) {
            //alert("done " + response.filename);
            MasterAddkfinishDownload();
            //alert("done " + response.fileName);
            window.location.href = "MasterAddkDownloadPDF?file=" + response.filename;  //works

            setTimeout(MasterAddkSubmitDelPDF, 500, response.filename);  //Deletes PDF file on Server
          
        },
        error: function (jqXhr, textStatus, errorMessage) {
            alert(" errorMessage is:- " + errorMessage + "\n Xhr.status is :- " + jqXhr.status + "\n Xhr.responseText is :- " + jqXhr.responseText + "\n textStatus is :- " + textStatus);
        }

     });

    }


    function MasterAddkSubmitDelPDF(filenamee) {

     var GetDelURLL = '/MasterAddk/MasterAddkDownloadPDFDel';
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
    function MasterAddkmyTimer() {
        //alert("in MasterAddkmyTimer");
        var scrola = $("#idDivMasterAddkTBody").scrollLeft();
        $("#idDivMasterAddkTBody2").scrollLeft(scrola);
        $("#idDivMasterAddkTFooter").scrollLeft(scrola);
    }

    // This part is for scrolling grid table and auto adjust when screen is resized
    AdjustDivWidthMasterAddk();

    function AdjustDivWidthMasterAddk() {

        if (document.getElementById("idDivMasterAddkTBody")) {
            var idDivMasterAddkTBodyNew = document.getElementById("idDivMasterAddkTBody").clientWidth;
            var idDivMasterAddkTBodyNewoff = document.getElementById("idDivMasterAddkTBody").offsetWidth;
            var idscrolWidth = idDivMasterAddkTBodyNewoff - idDivMasterAddkTBodyNew;
            //alert("Scroll bar width is " + (idDivMasterAddkTBodyNewoff - idDivMasterAddkTBodyNew));
            $("#MasterAddkFormtopdiv [name=ScrollWidthh]").val(idscrolWidth);
            $("#MasterAddkFormtopdiv [name=OrigScreenWidthh]").val(idDivMasterAddkTBodyNewoff);  //keep original table width

            var resetWidth = 0;
            var newwidthUse = $("#MasterAddkFormtopdiv").outerWidth();
            newwidthUse = Number(newwidthUse) - (Number(idscrolWidth) + 2);  //may need to change 2.
            resetWidth = newwidthUse;
 
            //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
            //Height adjusted for initial Grid. Change as needed.
            document.getElementById("idDivMasterAddkTBody").style.height = "400px";  
            //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
        }

        if (document.getElementById("idMasterAddkHeader")) {
            document.getElementById("idMasterAddkHeader").style.width = resetWidth + "px";
        }

        if (document.getElementById("idMasterAddkHeader2")) {
            document.getElementById("idMasterAddkHeader2").style.width = resetWidth + "px";
            document.getElementById("idDivMasterAddkTBody2").style.width = resetWidth + "px";
        }

        if (document.getElementById("idMasterAddkFooter")) {
            //document.getElementById("idMasterAddkFooter").style.width = resetWidth + "px";
            //document.getElementById("idDivMasterAddkTFooter").style.width = resetWidth + "px";
        }

    }
    // END part is for scrolling grid table and auto adjust when screen is resized
 

    function MasterAddkresetablebg() {
        var table = document.getElementById('MasterAddkTable');
        var rowsss = table.getElementsByTagName('tr');
        var rowidstr;
        var tr;
        var backgr = "#D3DCE5";
        if (table) {
            tr = $('#MasterAddkTable').find('tr');
            $.each(tr, function (index, item) {
                //alert("index is " + index);
                rowidstr = rowsss[index].id;
                //alert("row idd is " + rowidstr);
                if (rowidstr.indexOf("MasterAddkmaster") != -1) {    //only pickup rows with id of 'master' as prefix
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
    function MasterAddkrowhighlight(row_ID) {
        MasterAddkresetablebg();
        var table = document.getElementById('MasterAddkTable');
        if (table) {
            //alert("hightlight row");
            //table.rows[row_ID].style.backgroundColor = "#F3F3F3";
            $("#MasterAddkFormtopdiv [name=CurrentRowNumber]").val(row_ID);  //change form name to suit
        }

        row_ID = row_ID - 1;
        var imasterrowid = "MasterAddkmaster" + row_ID;
        document.getElementById(imasterrowid).style.backgroundColor = "silver";
    }


    //Used for Highlighting a Sorted Column
    function MasterAddkHighlightCol(colname) {
        //alert("colname is " + colname);
        if (document.getElementById('MasterAddkTable') != null) {
            var table = document.getElementById('MasterAddkTable');
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


    function MasterAddkCheckALLs() {
        //alert("in CheckALLs");
        if (document.getElementById('MasterAddkCheckALL').checked == false) {
            $("input[name^=MasterAddkChk]").prop("checked", false);
        }

        if (document.getElementById('MasterAddkCheckALL').checked == true) {
            $("input[name^=MasterAddkChk]").prop("checked", true);
        }

    }


    function MasterAddkShowColumn(row_ID, colnam) {
        MasterAddkHideColumnALL(colnam);

        var ik = Number(row_ID - 2);
        var tippp = colnam + "tipp" + ik;
        $("#MasterAddkFormtopdiv [name=" + tippp + "]").css("display", "none");

        var minusignid = "minusign" + colnam + row_ID;
        var plusignid = "plusign" + colnam + row_ID;
        $("#MasterAddkFormtopdiv [name=" + minusignid + "]").css("display", "inline-block");
        $("#MasterAddkFormtopdiv [name=" + plusignid + "]").css("display", "none");
    }

    function MasterAddkHideColumn(row_ID, colnam) {
        var ik = Number(row_ID - 2);
        var tippp = colnam + "tipp" + ik;
        $("#MasterAddkFormtopdiv [name=" + tippp + "]").css("display", "");

        var minusignid = "minusign" + colnam + row_ID;
        var plusignid = "plusign" + colnam + row_ID;
        $("#MasterAddkFormtopdiv [name=" + minusignid + "]").css("display", "none");
        $("#MasterAddkFormtopdiv [name=" + plusignid + "]").css("display", "inline-block");
    }

    function MasterAddkHideColumnALL(colnam) {
        var tippp = colnam + "tipp";
        //$("span[id^=" + tippp + "]").css("display", "");
        $("#MasterAddkFormtopdiv [name=" + tippp + "]").css("display", "");

        var minusignid = "minusign" + colnam;
        var plusignid = "plusign" + colnam;

        $("#MasterAddkFormtopdiv [name=" + minusignid + "]").css("display", "none");
        $("#MasterAddkFormtopdiv [name=" + plusignid + "]").css("display", "inline-block");
    }


    //Show row on page via traversing all grid rows
    function MasterAddknewrowhighlight() {
        //alert("in newrowhighlight");
        MasterAddkresetablebg();
        var table = document.getElementById('MasterAddkTable');
        var rowsss = table.getElementsByTagName('tr');
        var dValue;
        var addval;
        var IDId;
        var indx;
        var rowidstr;
        var tr;
        indx = 1;
        var rowCount = $('#MasterAddkTable tr').length;
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
                if (rowidstr.indexOf("MasterAddkmaster") != -1) {    //only pickup rows with id of 'master' as prefix
                    //alert("r is " + r);
                    dValue = document.getElementById('MasterAddkPK_IDD' + indx).value;
                    //alert("dValue is " + dValue);
                    if ($("#MasterAddkFormtopdiv [name=id]").val() == dValue) {
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
        var imasterrowid2 = "MasterAddkmaster" + row_ID2;
        var selectedPosy = 0;
        //selectedPosx = document.getElementById(imasterrowid2).offsetLeft;
        if (document.getElementById(imasterrowid2)) {
            selectedPosy = document.getElementById(imasterrowid2).offsetTop;
            //alert("selectedPosy is " + selectedPosy);
            if (Number(selectedPosy > 400))    //Note:- 400 is the Height of Grid Table (ie idDivMasterAddkTBody)
            {
                $("#idDivMasterAddkTBody").scrollTop(selectedPosy);
            }


            //$("#idDivMasterAddkTBody").scrollTop(selectedPosy);
        }
        //END new code, to auto scroll to row in scrollable DIV
    }


    function ScrollToTop() {
        //new code, to auto scroll to TOP row in scrollable DIV. Used in OpShow when doing Cancel Back.
        //var row_ID = document.getElementById('CurrentRowNumber').value;
        var row_ID = $("#MasterAddkFormtopdiv [name=CurrentRowNumber]").val();
        //alert("row_ID is " + row_ID);
        var row_ID2 = row_ID - 1;
        var imasterrowid = "MasterAddkmaster" + row_ID2;
        //var selectedPosx = 0;
        var selectedPosy = 0;
        //selectedPosx = document.getElementById(imasterrowid).offsetLeft;
        selectedPosy = document.getElementById(imasterrowid).offsetTop;

        var tablediv = document.getElementById('idDivMasterAddkTBody');
        //tablediv.style.overflow = "hidden";
        $("#idDivMasterAddkTBody").scrollTop(selectedPosy);
        //END new code, to auto scroll to row in scrollable DIV
    }


    //Used to Hide child Panel record on Grid
    function MasterAddkHideChild(PKID, row_ID, arrayname) {
        MasterAddkresetablebg();
        MasterAddkrowhighlight(row_ID);
        //alert("row_ID is " + row_ID);
        $("#expandRowdivMasterAddk" + row_ID).empty();

        //put scrolling back in
        var tablediv = document.getElementById('idDivMasterAddkTBody');
        tablediv.style.overflow = "scroll";
        $("#idDivMasterAddkTBody").scrollTop(2); //go back to top of page if scrolling
        //END put scrolling back in
     

        var ichildrowid = "MasterAddkchild" + row_ID;  //also hide div
        if (document.getElementById(ichildrowid) != null) {
            document.getElementById(ichildrowid).style.display = "none";
        }

        var minusignid = "MasterAddkminusign" + row_ID;
        var plusignid = "MasterAddkplusign" + row_ID;
        if (document.getElementById(minusignid) != null) {
            document.getElementById(minusignid).style.display = "none";
        }
        if (document.getElementById(plusignid) != null) {
            document.getElementById(plusignid).style.display = "block";
        }

    }

    //Used to hide all Child panels
    function MasterAddkHideChildALL() {
    
        try {

            MasterAddkresetablebg();
            //alert("MasterAddkHideChildALL");
            //put scrolling back in
            var tablediv = document.getElementById('idDivMasterAddkTBody');
             tablediv.style.overflow = "scroll";
             //END put scrolling back in

            var table = document.getElementById('MasterAddkTable');
            var rowsss = table.getElementsByTagName('tr');
            var tr;
            var indx;
            var rowidstr;
            indx = 3;   //start at 3, as in grid with index (i+2)
            if (table) {
                tr = $('#MasterAddkTable').find('tr');
                $.each(tr, function (index, item) {
                    try {
                        rowidstr = rowsss[index].id;   //??fix later
                    }
                    catch (err) {
                        //alert("err1 is " + err.message);
                    }
                    //alert("row id is " + rowidstr);
                    if (rowidstr.indexOf("MasterAddkmaster") != -1) {    //only pickup rows with id of 'master' as prefix
                        //alert("row id is " + rowidstr);
                        //alert("indx is " + indx);
                        $("#expandRowdivMasterAddk" + indx).empty();
                        var ichildrowid = "MasterAddkchild" + indx;  //also hide div
                        //alert("ichildrowid is " + ichildrowid);
                        if (document.getElementById(ichildrowid) != null) {
                            document.getElementById(ichildrowid).style.display = "none";
                            //alert("row id1 is " + rowidstr);
                        }
                        var minusignid = "MasterAddkminusign" + indx;
                        var plusignid = "MasterAddkplusign" + indx;
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
