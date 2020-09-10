
        //Code between these comments can be changed-  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
        //NOTE:- If columns are added or removed, then need to change most functions.

        $(MasterAddkDetailpageReady);

        function MasterAddkDetailpageReady() {
            //alert("MasterAddkShowDetail");
            if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {   //for Apple Device
                //$("#divIdCombo").css("overflow", "scroll");
            }
            else {
                $("#MasterAddkDetailtopdiv #MasterAddkDetailCombo1Div").css("overflow", "hidden");
                $("#MasterAddkDetailtopdiv #MasterAddkDetailCombo2Div").css("overflow", "hidden");
            }
          
            GetMasterAddkDetail();  //so as to get record via Primary Key

            $.ajaxSetup({ cache: false });   //stop caching, as querying current database data everytime of a POST, not what has been cached
          
        }   //END function pageReady()
     

        var formMasterAddkDetailData;
        function GetMasterAddkDetail() {
            //alert("in detail");
            LayoutShowProgressBar();  //found in _Layout.cshtml
    
            //Size the page height properly
            var deviceHeight = (typeof window.outerHeight != 'undefined') ? Math.max(window.outerHeight, $(window).height()) : $(window).height();
            if (isBreakpointGet('xs')) {   //in Mobile device. Getting this from Names2.cshtml now
                dialogHeight = Number(deviceHeight) / 1.65;
            }
            else {
                dialogHeight = Number(deviceHeight) / 1.75;
            }
            //END Size the page height properly

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
            if (document.getElementById("MasterAddkShowShowtabs")) {     //From OpenDetail link in Grid
                //alert("in showtabs");
                document.getElementById("MasterAddkDetailFormData").style.height = "150px";   //make it smaller to fit Detail & List at bottom - was 120
                //$("#MasterAddkDetailFormData").css("display", "");
            }
            else  //normal edit modal page
            {
                document.getElementById("MasterAddkDetailtopdiv").style.height = dialogHeight + "px";
            }
            //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
          
            var PKIDget = $("#MasterAddkForm [name=id]").val();   //Is in MasterAddk.cshtml
            formMasterAddkDetailData = "id=" + PKIDget;   //Change to suit Primary Key
            //alert("formData is " + formMasterAddkDetailData);

            if (PKIDget != -1) {    //Not in ADD mode, so get record details from DB
                //alert("in display");

                //----------------------------------------------------------------------------------------------------------------------
                //For Combo Normal processing
                //----------------------------------------------------------------------------------------------------------------------
                //Make combo have a value, so as to pass client side Jquery validation, in EDIT Mode
                var itemsoptype = "<option value='-1'>dummy</option>";  //put in dummy value in, to pass ADD jquery validation
                $("#MasterAddkDetailValForm [name=MasterAddknormcomboADDCombo]").html(itemsoptype);
                //END Make combo have a value
                //----------------------------------------------------------------------------------------------------------------------
                //END For Combo Normal processing
                //----------------------------------------------------------------------------------------------------------------------

                setTimeout(MasterAddkDetailGoToServer, 30);
           }
           else {
                //in Add Mode
                LayoutHideProgressBar();  //found in _Layout.cshtml
                MasterAddkDetailEditForm('ADD');
                //setTimeout(MasterAddkDetailGoToServerAdd, 30);    //invoke if using normal combo reference
            }

        }

        //Get record details from normal combo and then display on form
        function MasterAddkDetailGoToServerAdd() {
            //alert("in display");
            $.post(MasterAddkDetailGetAddURL, formMasterAddkDetailData, function (data, textStatus) {
                MasterAddkDetailDisplayRecordAdd(data);
            }, "json")
        }
        function MasterAddkDetailDisplayRecordAdd(jsonScript) {
            //alert("in displaycomboAdd");
            //MasterAddkDetailHideProgressBar();
            //alert("in display2");
            if (jsonScript.ReturnStatus == true) {
                MasterAddkDetailDisplayWorkerTypesADD(jsonScript.MasterAddknormcomboList);  //get Combo List and display in ADD Mode
            }

            var returnMessage = "";
            var i = 0;
            for (i = 0; i < jsonScript.ReturnMessage.length; i++) {
                //returnMessage = returnMessage + jsonScript.ReturnMessage[i] + "<br>";
                returnMessage = returnMessage + jsonScript.ReturnMessage[i] + "\n";
            }

            if (jsonScript.ReturnStatus == true) {
                //nothing
            }
            else {
                alert("" + returnMessage);
            }

        }



        //Get record details from Database and then display on form
        function MasterAddkDetailGoToServer() {
            //alert("in display");
           
            $.ajax(MasterAddkDetailGetURL, {
                type: 'GET',
                data: formMasterAddkDetailData,
                success: function (data, status, xhr) {
                   MasterAddkDetailDisplayRecord(data);
                },
                error: function (jqXhr, textStatus, errorMessage) {
                    alert(" errorMessage is:- " + errorMessage + "\n Xhr.status is :- " + jqXhr.status + "\n Xhr.responseText is :- " + jqXhr.responseText + "\n textStatus is :- " + textStatus);
                }
          
            });


        }

      function MasterAddkShowit()
      {
          $("#MasterAddkShowit").val("showit");  //for when showing in Detail overlay
          //LayoutHideProgressBar();  //found in _Layout.cshtml
      }
      function MasterAddkDetailDisplayRecord(jsonScript) {
           //alert("in DisplayRecord");
       
          //--------------------------------------------------------------------------------------------------------------------
          //If coming from OpenDetail (ie is in NamesShow.cshtml), then do not do at all, as is done in child grid
          try {
              if (document.getElementById("MasterAddkShowShowtabs")) {     //From OpenDetail option in Grid row
                  //do nothing
                  //setTimeout(LayoutHideProgressBar, 3000);   //wait 3 secs, just in case. CAN Take out, optional, if CHILD Exists
                  //LayoutHideProgressBar();  //found in _Layout.cshtml. NOTE:- Use this if NO CHILD exists
              }
              else
              {
                  LayoutHideProgressBar();  //found in _Layout.cshtml
              }
          }
          catch (err) {
              //alert("err message " + err.message);
          }
          //--------------------------------------------------------------------------------------------------------------------

            if (jsonScript.ReturnStatus == true) {
                //Store Keys within Form
                $("#MasterAddkDetailForm [name=id]").val(jsonScript.id);
                //END Store keys within Form

                //$("#MasterAddkShowit").val("showit");  //for when showing in Detail overlay
                //setTimeout(MasterAddkShowit, 500);  //wait half second

                $("#MasterAddkDetailValForm [name=Table_Name_in]").val(jsonScript.Table_Name);  
                $("#MasterAddkDetailValForm [name=Table_Name_inCopy]").val(jsonScript.Table_Name);
                $('#MasterAddkDetailValForm [name=Table_Name_in]').attr('readonly', true);
                $("#MasterAddkDetailValForm [name=Table_Name_in]").css("background-color", "#ebeff2");  //make backgound colour back

                $("#MasterAddkDetailValForm [name=Field_Name_in]").val(jsonScript.Field_Name);  
                $("#MasterAddkDetailValForm [name=Field_Name_inCopy]").val(jsonScript.Field_Name);
                $('#MasterAddkDetailValForm [name=Field_Name_in]').attr('readonly', true);
                $("#MasterAddkDetailValForm [name=Field_Name_in]").css("background-color", "#ebeff2");  //make backgound colour back

                $("#MasterAddkDetailValForm [name=Data_Type_in]").val(jsonScript.Data_Type);  
                $("#MasterAddkDetailValForm [name=Data_Type_inCopy]").val(jsonScript.Data_Type);
                $('#MasterAddkDetailValForm [name=Data_Type_in]').attr('readonly', true);
                $("#MasterAddkDetailValForm [name=Data_Type_in]").css("background-color", "#ebeff2");  //make backgound colour back
                //$("#MasterAddkDetailValForm [name=Data_Type_in]").datepicker("destroy");

                $("#MasterAddkDetailValForm [name=Length_Size_in]").val(jsonScript.Length_Size);   
                $("#MasterAddkDetailValForm [name=Length_Size_inCopy]").val(jsonScript.Length_Size);
                $('#MasterAddkDetailValForm [name=Length_Size_in]').attr('readonly', true);
                $("#MasterAddkDetailValForm [name=Length_Size_in]").css("background-color", "#ebeff2");  //make backgound colour back

                //----------------------------------------------------------------------------------------------------------------------
                //For Combo Normal processing
                //----------------------------------------------------------------------------------------------------------------------
                //$("#MasterAddkDetailValForm [name=WorkerType_in]").val(jsonScript.Worker_Type);   //Do not need to qualify with form name if unique name
                //$("#MasterAddkDetailValForm [name=WorkerType_inCopy]").val(jsonScript.Worker_Type);
                //$('#MasterAddkDetailValForm [name=WorkerType_in]').attr('readonly', true);
                //$("#MasterAddkDetailValForm [name=WorkerType_in]").css("background-color", "#ebeff2");  //make backgound colour back
                //$("#MasterAddkDetailForm [name=normcombopkid]").val(jsonScript.normcombopkid);   //to ID , for ID option 
                //$("#MasterAddkDetailValForm [name=MasterAddknormcomboEDITCombo]").css("display", "none");
                //MasterAddkDetailDisplayWorkerTypes(jsonScript.MasterAddknormcomboList);  //get Combo List and display in EDIT Mode
                //----------------------------------------------------------------------------------------------------------------------
                //END For Combo Normal processing
                //----------------------------------------------------------------------------------------------------------------------


                //----------------------------------------------------------------------------------------------------------------------
                //For Checkbox processing
                //----------------------------------------------------------------------------------------------------------------------
                //if (jsonScript.Private_Cover == 1) {          //Private_Cover is bit field here, can be different
                    //$('#MasterAddkDetailValForm [name=Private_Cover_in]').attr('checked', true);     //can use attr instead of prop.
                    //$('#MasterAddkDetailValForm [name=Private_Cover_inCopy]').attr('checked', true);
                //}
                //else {
                    //$('#MasterAddkDetailValForm [name=Private_Cover_in]').attr('checked', false);    //can use attr instead of prop.
                    //$('#MasterAddkDetailValForm [name=Private_Cover_inCopy]').attr('checked', false);
                //}
                //----------------------------------------------------------------------------------------------------------------------
                //END For Checkbox processing
                //----------------------------------------------------------------------------------------------------------------------

                //----------------------------------------------------------------------------------------------------------------------
                //For Radio Button processing
                //----------------------------------------------------------------------------------------------------------------------
                $("#MasterAddkDetailValForm #MasterAddkradio3").attr("checked", false);
                $("#MasterAddkDetailValForm #MasterAddkradio1").attr("checked", false);
                $("#MasterAddkDetailValForm #MasterAddkradio2").attr("checked", false);
                if (jsonScript.Sex == "M")     //Sex is char field here, can be different
                {
                    $("#MasterAddkDetailValForm #MasterAddkradio1").attr("checked", true);
                    $('#MasterAddkDetailValForm #MasterAddkRadio1_inCopy').attr('checked', true);
                }
                if (jsonScript.Sex == "F")     //Sex is char field here, can be different
                {
                    //alert("F");
                    $("#MasterAddkDetailValForm #MasterAddkradio2").attr("checked", true);
                    $('#MasterAddkDetailValForm #MasterAddkRadio2_inCopy').attr('checked', true);
                }
                if (jsonScript.Sex == "O")     //Sex is char field here, can be different
                {
                    $("#MasterAddkDetailValForm #MasterAddkradio3").attr("checked", true);
                    $('#MasterAddkDetailValForm #MasterAddkRadio3_inCopy').attr('checked', true);
                }
                //----------------------------------------------------------------------------------------------------------------------
                //END Radio Button processing
                //----------------------------------------------------------------------------------------------------------------------

                //alert("start");
                MasterAddkDetailFormatFields();
                //alert("start2");

                $("#btnMasterAddkDetailCancel").css("visibility", "visible");
                $("#btnMasterAddkDetailCancel").css("display", "");
                $("#btnMasterAddkDetailEdit").css("visibility", "visible");
                $("#btnMasterAddkDetailEdit").css("display", "");
                //alert("start2");
                //document.getElementById('MasterAddkDetailcomboCheckit').value = "False";  //do show auto combo
                $('#MasterAddkDetailtopdiv [name=comboCheckit]').val("False");
             
            }

            var returnMessage = "";

            var i = 0;
            for (i = 0; i < jsonScript.ReturnMessage.length; i++) {
                //returnMessage = returnMessage + jsonScript.ReturnMessage[i] + "<br>";
                returnMessage = returnMessage + jsonScript.ReturnMessage[i] + "\n";
            }

            if (jsonScript.ReturnStatus == true) {
               //nothing
            }
            else {
                alert("" + returnMessage);
            }

        }


        //----------------------------------------------------------------------------------------------------------------------
        //For Combo Normal processing
        //----------------------------------------------------------------------------------------------------------------------
        function MasterAddkDetailDisplayWorkerTypesADD(SList) {
          //alert("in SList " + SList);
          var defaulte = "";
          var defaulteID = "";
          var items = "<option value='" + defaulteID + "'>" + defaulte + "</option>";     //put in already existing value
          $.each(SList, function (i, item) {
                  items += "<option value='" + item.normcombopkid + "'>" + item.normcombocol1 + "</option>";
          });

          $("#MasterAddkDetailValForm [name=MasterAddknormcomboADDCombo]").html(items);
       }

        function MasterAddkDetailDisplayWorkerTypes(SList) {
          //alert("in SList " + SList);
          var defaulte;
          var defaulteID;
          defaulte = $("#MasterAddkDetailValForm [name=WorkerType_in]").val();
          defaulteID = $("#MasterAddkDetailForm [name=normcombopkid]").val();
          var items = "<option value='" + defaulteID + "'>" + defaulte + "</option>";  //put in already existing value
          $.each(SList, function (i, item) {
              if (item.Worker_Type_ID != defaulteID) {
                  items += "<option value='" + item.normcombopkid + "'>" + item.normcombocol1 + "</option>";
              }
          });

          $("#MasterAddkDetailValForm [name=MasterAddknormcomboEDITCombo]").html(items);
          //$("#MasterAddkDetailValForm [name=MasterAddknormcomboEDITCombo]").css("display", "block");
        }

        //by TEXT only
        function MasterAddkDetailDisplayWorkerTypesTEXT(SList) {
            //alert("in SList " + SList);
            var defaulte;
            defaulte = $("#MasterAddkDetailValForm [name=WorkerType_in]").val();
            var items = "<option value='" + defaulte + "'>" + defaulte + "</option>";  //put in already existing value
            $.each(SList, function (i, item) {
                if (item.Worker_Type != defaulte) {
                    items += "<option value='" + item.normcombocol1 + "'>" + item.normcombocol1 + "</option>";
                }
            });

            $("#MasterAddkDetailValForm [name=MasterAddknormcomboEDITCombo]").html(items);
            //$("#MasterAddkDetailValForm [name=MasterAddknormcomboEDITCombo]").css("display", "block");
        }
        //----------------------------------------------------------------------------------------------------------------------
        //END For Combo Normal processing
        //----------------------------------------------------------------------------------------------------------------------


        function MasterAddkDetailFormatFields() {

            $("#MasterAddkDetailValForm [name=Table_Name_in]").css("width", "100%");
            $("#MasterAddkDetailValForm [name=Table_Name_in]").css("text-align", "left");

            $("#MasterAddkDetailValForm [name=Field_Name_in]").css("width", "100%");
            $("#MasterAddkDetailValForm [name=Field_Name_in]").css("text-align", "left");

            $("#MasterAddkDetailValForm [name=Data_Type_in]").css("width", "100%");
            $("#MasterAddkDetailValForm [name=Data_Type_in]").css("text-align", "left");

            $("#MasterAddkDetailValForm [name=Length_Size_in]").css("width", "80px");
            $("#MasterAddkDetailValForm [name=Length_Size_in]").css("text-align", "right");

            $("#MasterAddkDetailValForm [name=WorkerType_in]").css("width", "150px");    //this is for normal combo. If not needed, go down in form and display none.
            $("#MasterAddkDetailValForm [name=WorkerType_in]").css("text-align", "left");
        }


        function MasterAddkDetailEditForm(opt) {
          
            $('#MasterAddkDetailtopdiv [name=comboCheckit]').val("True");
            //document.getElementById('MasterAddkDetailcomboCheckit').value = "True";    //show auto combo

            $("#btnMasterAddkDetailSave").css("visibility", "visible");
            $("#btnMasterAddkDetailSave").css("display", "");
            $("#btnMasterAddkDetailEdit").css("visibility", "hidden");
            $("#btnMasterAddkDetailEdit").css("display", "none");
            $("#btnMasterAddkDetailCancel").css("visibility", "hidden");
            $("#btnMasterAddkDetailCancel").css("display", "none");

            if (opt != "ADD") {
                $("#btnMasterAddkDetailCancelEDIT").css("visibility", "visible");
                $("#btnMasterAddkDetailCancelEDIT").css("display", "");
            }
            else {
                $("#MasterAddkDetailFormData").css("display", "");
                $("#btnMasterAddkDetailCancelADD").css("visibility", "visible");
                $("#btnMasterAddkDetailCancelADD").css("display", "");
            }


            $('#MasterAddkDetailValForm [name=Table_Name_in]').removeAttr('readonly');   //Allow Editing
            $('#MasterAddkDetailValForm [name=Table_Name_in]').removeAttr('disabled');
            $("#MasterAddkDetailValForm [name=Table_Name_in]").css("background-color", "#ffffff");  //make backgound colour White, ready for Edit
            $("#MasterAddkDetailValForm [name=Table_Name_in]").val($("#MasterAddkDetailValForm [name=Table_Name_inCopy]").val());   //always set input to original



            

            $('#MasterAddkDetailValForm [name=Field_Name_in]').removeAttr('readonly');   //Allow Editing
            $('#MasterAddkDetailValForm [name=Field_Name_in]').removeAttr('disabled');
            $("#MasterAddkDetailValForm [name=Field_Name_in]").css("background-color", "#ffffff");  //make backgound colour White, ready for Edit
            $("#MasterAddkDetailValForm [name=Field_Name_in]").val($("#MasterAddkDetailValForm [name=Field_Name_inCopy]").val());   //always set input to original



            

            $('#MasterAddkDetailValForm [name=Data_Type_in]').removeAttr('readonly');   //Allow Editing
            $('#MasterAddkDetailValForm [name=Data_Type_in]').removeAttr('disabled');
            $("#MasterAddkDetailValForm [name=Data_Type_in]").css("background-color", "#ffffff");  //make backgound colour White, ready for Edit
            $("#MasterAddkDetailValForm [name=Data_Type_in]").val($("#MasterAddkDetailValForm [name=Data_Type_inCopy]").val());   //always set input to original



            


            $('#MasterAddkDetailValForm [name=Length_Size_in]').removeAttr('readonly');   //Allow Editing
            $('#MasterAddkDetailValForm [name=Length_Size_in]').removeAttr('disabled');
            $("#MasterAddkDetailValForm [name=Length_Size_in]").css("background-color", "#ffffff");  //make backgound colour White, ready for Edit
            $("#MasterAddkDetailValForm [name=Length_Size_in]").val($("#MasterAddkDetailValForm [name=Length_Size_inCopy]").val());   //always set input to original


            

            if (opt == "ADD") {
                //$("#MasterAddkDetailValForm [name=Data_Type_in]").datepicker('setDate', '+0d');   //set now as default date
            }
            //if ($("#MasterAddkDetailValForm [name=Data_Type_in]").length != 0) {     
                //$('#MasterAddkDetailValForm [name=Data_Type_in]').focus();
                //setTimeout(function () { $('#MasterAddkDetailValForm [name=Data_Type_in]').focus(); }, 10);  //for IE
            //}

      
            //----------------------------------------------------------------------------------------------------------------------
            //For Combo Normal processing
            //----------------------------------------------------------------------------------------------------------------------
            //$('#MasterAddkDetailValForm [name=WorkerType_in]').removeAttr('readonly');   //Allow Editing
            //$('#MasterAddkDetailValForm [name=WorkerType_in]').removeAttr('disabled');
            //$("#MasterAddkDetailValForm [name=WorkerType_in]").css("background-color", "#ffffff");  //make backgound colour White, ready for Edit
            //$("#MasterAddkDetailValForm [name=WorkerType_in]").val($("#MasterAddkDetailValForm [name=WorkerType_inCopy]").val());   //always set input to original
            //$("#MasterAddkDetailValForm [name=WorkerType_in]").css("display", "none");
         
            if (opt == "ADD") {
                //$("#MasterAddkDetailValForm [name=MasterAddknormcomboADDCombo]").css("display", "block");   //Show default List for ADD
                //$("#MasterAddkDetailValForm [name=MasterAddknormcomboEDITCombo]").css("display", "none");
            }
            else {
                //$("#MasterAddkDetailValForm [name=MasterAddknormcomboADDCombo]").css("display", "none");   
                //$("#MasterAddkDetailValForm [name=MasterAddknormcomboEDITCombo]").css("display", "block");
            }
            //----------------------------------------------------------------------------------------------------------------------
            //END For Combo Normal processing
            //----------------------------------------------------------------------------------------------------------------------

            //$("#MasterAddkDetailValForm [name=Table_NamePic]").css("display", "block");  //show autocomplete combo pic
            
            MasterAddkDetailFormatFields();

     
            //------------------------------------------------------------------------------------------
            //for Checkbox processing
            //------------------------------------------------------------------------------------------
            //$('#MasterAddkDetailValForm [name=Private_Cover_in]').removeAttr("disabled");
            //------------------------------------------------------------------------------------------
            //END Checkbox processing
            //------------------------------------------------------------------------------------------


            //-------------------------------------------------------------------------------
            //for Radio button processing
            //-------------------------------------------------------------------------------
            $("#MasterAddkDetailValForm #MasterAddkradio1").removeAttr("disabled");
            $("#MasterAddkDetailValForm #MasterAddkradio2").removeAttr("disabled");
            $("#MasterAddkDetailValForm #MasterAddkradio3").removeAttr("disabled");
            //-------------------------------------------------------------------------------
            //END Radio button processing
            //-------------------------------------------------------------------------------

            //MasterAddkHideProgressBar();   //taken out, as is done in Child grid code child.cshtml
        }



      function MasterAddkDetailCancelForm() {

          $("#DivErrMasterAddkDetailField_Name_in").css("display", "none");
          $("#DivErrMasterAddkDetailTable_Name_in").css("display", "none");
          $("#DivErrMasterAddkDetailLength_Size_in").css("display", "none");
          $("#DivErrMasterAddkDetailData_Type_in").css("display", "none");


            //document.getElementById('MasterAddkDetailcomboCheckit').value = "False";  //do show auto combo
            $('#MasterAddkDetailtopdiv [name=comboCheckit]').val("False");
            $("#DivErrorMasterAddkDetail").css("display", "none");

            var datecopy = "";
            var datecopy2 = "";
            $("#btnMasterAddkDetailSave").css("visibility", "hidden");
            $("#btnMasterAddkDetailSave").css("display", "none");
            $("#btnMasterAddkDetailCancelEDIT").css("visibility", "hidden");
            $("#btnMasterAddkDetailCancelEDIT").css("display", "none");

            $("#btnMasterAddkDetailEdit").css("visibility", "visible");
            $("#btnMasterAddkDetailEdit").css("display", "");
            $("#btnMasterAddkDetailCancel").css("visibility", "visible");
            $("#btnMasterAddkDetailCancel").css("display", "");

            $('#MasterAddkDetailValForm [name=Table_Name_in]').attr('readonly', true);
            $("#MasterAddkDetailValForm [name=Table_Name_in]").css("background-color", "#ebeff2");  //make backgound colour back
            $("#MasterAddkDetailValForm [name=Table_Name_in]").val($("#MasterAddkDetailValForm [name=Table_Name_inCopy]").val());





            $('#MasterAddkDetailValForm [name=Field_Name_in]').attr('readonly', true);
            $("#MasterAddkDetailValForm [name=Field_Name_in]").css("background-color", "#ebeff2");  //make backgound colour back
            $("#MasterAddkDetailValForm [name=Field_Name_in]").val($("#MasterAddkDetailValForm [name=Field_Name_inCopy]").val());





            $('#MasterAddkDetailValForm [name=Data_Type_in]').attr('readonly', true);
            $("#MasterAddkDetailValForm [name=Data_Type_in]").css("background-color", "#ebeff2");  //make backgound colour back
            $("#MasterAddkDetailValForm [name=Data_Type_in]").val($("#MasterAddkDetailValForm [name=Data_Type_inCopy]").val());






            $('#MasterAddkDetailValForm [name=Length_Size_in]').attr('readonly', true);
            $("#MasterAddkDetailValForm [name=Length_Size_in]").css("background-color", "#ebeff2");  //make backgound colour back
            $("#MasterAddkDetailValForm [name=Length_Size_in]").val($("#MasterAddkDetailValForm [name=Length_Size_inCopy]").val());




            //----------------------------------------------------------------------------------------------------------------------
            //For Combo Normal processing
            //----------------------------------------------------------------------------------------------------------------------
            //$('#MasterAddkDetailValForm [name=WorkerType_in]').attr('readonly', true);
            //$("#MasterAddkDetailValForm [name=WorkerType_in]").css("background-color", "#ebeff2");  //make backgound colour back
            //$("#MasterAddkDetailValForm [name=WorkerType_in]").val($("#MasterAddkDetailValForm [name=WorkerType_inCopy]").val());
            //$("#MasterAddkDetailValForm [name=WorkerType_in]").css("display", "block");  //NB
            //$("#MasterAddkDetailValForm [name=MasterAddknormcomboEDITCombo]").css("display", "none");
            //----------------------------------------------------------------------------------------------------------------------
            //END For Combo Normal processing
            //----------------------------------------------------------------------------------------------------------------------


            //----------------------------------------------------------------------------------------------------------------------
            //For Checkbox processing
            //----------------------------------------------------------------------------------------------------------------------
            //if ($('#MasterAddkDetailValForm [name=Private_Cover_inCopy]').is(":checked")) {
                //$('#MasterAddkDetailValForm [name=Private_Cover_in]').attr('checked', true);
            //}
           // else
            //{
                //$('#MasterAddkDetailValForm [name=Private_Cover_in]').attr('checked', false);
            //}
            //$('#MasterAddkDetailValForm [name=Private_Cover_in]').attr("disabled", "disabled");
           //----------------------------------------------------------------------------------------------------------------------
           //END For Checkbox processing
          //----------------------------------------------------------------------------------------------------------------------


          //-------------------------------------------------------------------------------
          //for Radio button processing
          //-------------------------------------------------------------------------------
            if ($('#MasterAddkDetailValForm #MasterAddkRadio1_inCopy').is(":checked")) {
                $('#MasterAddkDetailValForm #MasterAddkradio1').attr('checked', true);
            }
            if ($('#MasterAddkDetailValForm #MasterAddkRadio2_inCopy').is(":checked")) {
                //alert("2");
                $('#MasterAddkDetailValForm #MasterAddkradio2').attr('checked', true);
            }
            if ($('#MasterAddkDetailValForm #MasterAddkRadio3_inCopy').is(":checked")) {
                //alert("3");
                $('#MasterAddkDetailValForm #MasterAddkradio3').attr('checked', true);
            }
            $("#MasterAddkDetailValForm #MasterAddkradio3").attr("disabled", "disabled");
            $("#MasterAddkDetailValForm #MasterAddkradio1").attr("disabled", "disabled");
            $("#MasterAddkDetailValForm #MasterAddkradio2").attr("disabled", "disabled");
          //-------------------------------------------------------------------------------
          //END Radio button processing
          //-------------------------------------------------------------------------------

            //$("#MasterAddkDetailValForm [name=Table_NamePic]").css("display", "none");  //show autocomplete combo pic

        }

      var MasterAddkDetailValidChk = "";
      function MasterAddkDetailFieldValidate()
      {

          $("#DivErrMasterAddkDetailField_Name_in").html("&nbsp;");
          $("#DivErrMasterAddkDetailTable_Name_in").html("&nbsp;");
          $("#DivErrMasterAddkDetailData_Type_in").html("&nbsp;");
          $("#DivErrMasterAddkDetailLength_Size_in").html("&nbsp;");

          $("#MasterAddkDetailField_NameOK").css("display", "inline-block");    //display green tick at start
          $("#MasterAddkDetailTable_NameOK").css("display", "inline-block");    //display green tick at start
          $("#MasterAddkDetailData_TypeOK").css("display", "inline-block");    //display green tick at start
          $("#MasterAddkDetailLength_SizeOK").css("display", "inline-block");    //display green tick at start

          MasterAddkDetailValidChk = "true";
          var returnErrMessage = "";

          var Table_Name_inVal = $("#MasterAddkDetailValForm [name=Table_Name_in]").val();
          Table_Name_inVal = Table_Name_inVal.trim();
          if (Table_Name_inVal.length < 3) {
              returnErrMessage = "Table_Name must consist of at least 2 characters";
              $("#DivErrMasterAddkDetailTable_Name_in").html(returnErrMessage);
              $("#MasterAddkDetailTable_NameOK").css("display", "none");    //hide green tick
              MasterAddkDetailValidChk = "false";
          }
          if (Table_Name_inVal == "") {
              returnErrMessage = "Please enter a Table_Name";
              $("#DivErrMasterAddkDetailTable_Name_in").html(returnErrMessage);
              $("#MasterAddkDetailTable_NameOK").css("display", "none");    //hide green tick
              MasterAddkDetailValidChk = "false";
          }
 
  
 
 

          var Field_Name_inVal = $("#MasterAddkDetailValForm [name=Field_Name_in]").val();
          Field_Name_inVal = Field_Name_inVal.trim();
          if (Field_Name_inVal.length < 3) {
              returnErrMessage = "Field_Name must consist of at least 2 characters";
              $("#DivErrMasterAddkDetailField_Name_in").html(returnErrMessage);
              $("#MasterAddkDetailField_NameOK").css("display", "none");    //hide green tick
              MasterAddkDetailValidChk = "false";
          }
          if (Field_Name_inVal == "") {
              returnErrMessage = "Please enter a Field_Name";
              $("#DivErrMasterAddkDetailField_Name_in").html(returnErrMessage);
              $("#MasterAddkDetailField_NameOK").css("display", "none");    //hide green tick
              MasterAddkDetailValidChk = "false";
          }
 
  
 
 

          var Data_Type_inVal = $("#MasterAddkDetailValForm [name=Data_Type_in]").val();
          Data_Type_inVal = Data_Type_inVal.trim();
          if (Data_Type_inVal.length < 3) {
              returnErrMessage = "Data_Type must consist of at least 2 characters";
              $("#DivErrMasterAddkDetailData_Type_in").html(returnErrMessage);
              $("#MasterAddkDetailData_TypeOK").css("display", "none");    //hide green tick
              MasterAddkDetailValidChk = "false";
          }
          if (Data_Type_inVal == "") {
              returnErrMessage = "Please enter a Data_Type";
              $("#DivErrMasterAddkDetailData_Type_in").html(returnErrMessage);
              $("#MasterAddkDetailData_TypeOK").css("display", "none");    //hide green tick
              MasterAddkDetailValidChk = "false";
          }
 
  
 


 
          var Length_Size_inVal = $("#MasterAddkDetailValForm [name=Length_Size_in]").val();
          Length_Size_inVal = Length_Size_inVal.trim();
          if (isNaN(Length_Size_inVal)) {
              returnErrMessage = "Length_Size must be a number";
              $("#DivErrMasterAddkDetailLength_Size_in").html(returnErrMessage);
              $("#MasterAddkDetailLength_SizeOK").css("display", "none");    //hide green tick
              MasterAddkDetailValidChk = "false";
          }
  
 
          //next date validation is done on Server side
 


          //x = document.getElementById("numb").value;
          // If x is Not a Number or less than one or greater than 10
          //if (isNaN(x) || x < 1 || x > 10) {
             // text = "Input not valid";
          //} else {
             // text = "Input OK";
         // }


//var now = new Date();
//var today = new Date(now.getFullYear(), now.getMonth(), now.getDay());
//var idate = new Date('09/02/2014');

      }


     var MasterAddkDetailDateValidChk = "";
      function MasterAddkDetailvaliddateaud(inputText) {
          //alert("inputdate " + inputText);
          MasterAddkDetailDateValidChk = "true";
          try {
              var res = inputText.split("-");
              var mon = res[1];
              var dayy = res[0];
              var yyy = res[2];
              //var ListofMons = ["01", "02", "03", "04", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              if (mon == "Jan") {
                  mon = "01";
              }
              if (mon == "Feb") {
                  mon = "02";
              }
              if (mon == "Mar") {
                  mon = "03";
              }
              if (mon == "Apr") {
                  mon = "04";
              }
              if (mon == "May") {
                  mon = "05";
              }
              if (mon == "Jun") {
                  mon = "06";
              }
              if (mon == "Jul") {
                  mon = "07";
              }
              if (mon == "Aug") {
                  mon = "08";
              }
              if (mon == "Sep") {
                  mon = "09";
              }
              if (mon == "Oct") {
                  mon = "10";
              }
              if (mon == "Nov") {
                  mon = "11";
              }
              if (mon == "Dec") {
                  mon = "12";
              }

                  //Find Browser used
                  var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
                  var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
                  var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
                  var is_safari = navigator.userAgent.indexOf("Safari") > -1;
                  var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
                  if ((is_chrome) && (is_safari)) { is_safari = false; }
                  if ((is_chrome) && (is_opera)) { is_chrome = false; }

                  if (is_safari) {
                      //alert('Safari');
                  }
                  if (is_safari) {
                      var inputDates = new Date(mon + "/" + dayy + "/" + yyy);  //mm/dd/yyyy format
                      //alert("inputDates is " + inputDates);
                      //alert("inputDates2 is " + inputDates.toUTCString());
                      var timestamps = Date.parse(inputDates.toUTCString());
                      //alert("timestamp1 is " + timestamps)
                      if (isNaN(timestamps) == true) {
                          MasterAddkDetailDateValidChk = "false";
                      }
                  }
                  else
                  {
                      var inputDate = new Date(yyy + "-" + mon + "-" + dayy);  //yyyy-mm-dd universal format
                      //alert("inputDate is " + inputDate);
                      var timestamp = Date.parse(inputDate);
                      //alert("timestamp1 is " + timestamp)
                      if (isNaN(timestamp) == true) {
                       MasterAddkDetailDateValidChk = "false";
                      }
                  }
                 

              //if (inputDate == "Invalid Date")
              //{
                  //MasterAddkDetailDateValidChk = "false";
              //}

          }
          catch (err) {
              MasterAddkDetailDateValidChk = "false";
              //alert("err is " + err.message);
          }

      }


      var MasterAddkDetailformData;
      function MasterAddkDetailSaveScript() {
          //alert("in MasterAddkDetailSaveScript");
     
          //$("#DivErrMasterAddkDetailField_Name_in").css("display", "none");
          //$("#DivErrMasterAddkDetailTable_Name_in").css("display", "none");
          //$("#DivErrMasterAddkDetailData_Type_in").css("display", "none");
          //$("#DivErrMasterAddkDetailLength_Size_in").css("display", "none");

          MasterAddkDetailFieldValidate();
          if (MasterAddkDetailValidChk == "false")
          {
              return false;
          }

            LayoutShowProgressBar();  //found in _Layout.cshtml

            $("#MasterAddkDetailForm [name=Table_Name]").val($("#MasterAddkDetailValForm [name=Table_Name_in]").val());

            $("#MasterAddkDetailForm [name=Field_Name]").val($("#MasterAddkDetailValForm [name=Field_Name_in]").val());

            $("#MasterAddkDetailForm [name=Data_Type]").val($("#MasterAddkDetailValForm [name=Data_Type_in]").val());

            $("#MasterAddkDetailForm [name=Length_Size]").val($("#MasterAddkDetailValForm [name=Length_Size_in]").val());
  
            //----------------------------------------------------------------------------------------------------------------------
            //For Combo Normal processing
            //----------------------------------------------------------------------------------------------------------------------
            var CheckADDget = $("#MasterAddkForm [name=id]").val();   //Is in MasterAddk.cshtml, if -1 then ADDing new record
            if (CheckADDget == "-1") {    //ADD
                ////$("#MasterAddkDetailForm [name=normcombocol1]").val($("#MasterAddkDetailValForm [name=MasterAddknormcomboADDCombo]").val());  //combo by Text only
                //$("#MasterAddkDetailForm [name=normcombopkid]").val($("#MasterAddkDetailValForm [name=MasterAddknormcomboADDCombo]").val());   //combo by Value only
            }
            else
            {
                ////$("#MasterAddkDetailForm [name=normcombocol1]").val($("#MasterAddkDetailValForm [name=MasterAddknormcomboEDITCombo]").val());  //combo by Text only
                //$("#MasterAddkDetailForm [name=normcombopkid]").val($("#MasterAddkDetailValForm [name=MasterAddknormcomboEDITCombo]").val());   //combo by Value only
            }
            //----------------------------------------------------------------------------------------------------------------------
            //END For Combo Normal processing
            //----------------------------------------------------------------------------------------------------------------------


            //----------------------------------------------------------------------------------------------------------------------
            //For Checkbox processing
            //----------------------------------------------------------------------------------------------------------------------
            //var Checkbox_inchk = $("input[name='Private_Cover_in']:checkbox");
            //if (Checkbox_inchk.is(":checked")) {
                //alert("jquery Check is true");
                //$("#MasterAddkDetailForm [name=Private_Cover]").val("1");
            //}
            //else
            //{
                //alert("jquery Check is false");
                //$("#MasterAddkDetailForm [name=Private_Cover]").val("0");
            //}
            //----------------------------------------------------------------------------------------------------------------------
            //END For Checkbox processing
            //----------------------------------------------------------------------------------------------------------------------


            //----------------------------------------------------------------------------------------------------------------------
            //For Radio button processing
           //----------------------------------------------------------------------------------------------------------------------
            //var RadioButton_inchk = $("#MasterAddkradio2").is(":checked");
            //alert("jquery CheckM2k is true " + RadioButton_inchk);

            var RadioButton_inchk1 = $("#MasterAddkradio1").is(":checked");
            //alert("jquery CheckM2 is true " + RadioButton_inchk1);
            if (RadioButton_inchk1 == true) {
                $("#MasterAddkDetailForm [name=Sex]").val("M");
            }
            var RadioButton_inchk2 = $("#MasterAddkradio2").is(":checked");
            if (RadioButton_inchk2 == true) {
                //alert("jquery Check is true");
                $("#MasterAddkDetailForm [name=Sex]").val("F");
            }
            var RadioButton_inchk3 = $("#MasterAddkradio3").is(":checked");
            if (RadioButton_inchk3 == true) {
                //alert("jquery Check is true");
                $("#MasterAddkDetailForm [name=Sex]").val("O");
            }
            //----------------------------------------------------------------------------------------------------------------------
            //END Radio button processing
            //----------------------------------------------------------------------------------------------------------------------


            MasterAddkDetailformData = $("#MasterAddkDetailForm").serialize();   //sets up Primary Key 
            //alert("formData is " + MasterAddkDetailformData);

            setTimeout(MasterAddkDetailSaveToServer, 40);
      }


        //See Html.AntiForgeryToken() in this page
        var MasterAddkDetailAntiForgeryToken = function (data) {
          data.__RequestVerificationToken = $("[name='__RequestVerificationToken']").val();
          //alert("dataedit is " + data);
          return data;
        };

        function MasterAddkDetailSaveToServer() {

            var PKIDget = $("#MasterAddkForm [name=id]").val();    //Is in MasterAddk.cshtml, if -1 then ADDing new record
           
            if (PKIDget == "-1") {
                //alert("Add");

                var headersadd = {};
                headersadd['MY-XSRF-TOKEN'] = $("[name='__RequestVerificationToken']").val();
                //headersadd['MY-XSRF-TOKEN'] = "tets1234";  //to Test it, makes it fail, as token not matching with one in Controller.

                //alert("gettoken is : " + $("[name='__RequestVerificationToken']").val() );

                $.ajax(MasterAddkDetailAddURL, {
                    type: 'POST',
                    data: MasterAddkDetailformData,
                    datatype: 'json',
                    headers: headersadd,
                    success: function (data, status, xhr) {
                        MasterAddkDetailSaveComplete(data);
                    },
                    error: function (jqXhr, textStatus, errorMessage) {
                        alert(" errorMessage is:- " + errorMessage + "\n Xhr.status is :- " + jqXhr.status + "\n Xhr.responseText is :- " + jqXhr.responseText + "\n textStatus is :- " + textStatus);
                    }

                });


                $("#MasterAddkFormtopdiv [name=CurrentPageNumber]").val("1");   //always set Page to 1 for an ADD of new record
            }
            else {
                //alert("Update");
                var headersupd = {};
                headersupd['MY-XSRF-TOKEN'] = $("[name='__RequestVerificationToken']").val();
                //headersupd['MY-XSRF-TOKEN'] = "tets1234";  //to Test it, makes it fail, as token not matching with one in Controller.

                //alert("gettoken is : " + $("[name='__RequestVerificationToken']").val() );

                $.ajax(MasterAddkDetailUpdateURL, {
                    type: 'POST',
                    data: MasterAddkDetailformData,
                    datatype: 'json',
                    headers: headersupd,
                    success: function (data, status, xhr) {
                        MasterAddkDetailSaveComplete(data);
                        //setTimeout(MasterAddkDetailSaveComplete, 50, data);
                    },
                    error: function (jqXhr, textStatus, errorMessage) {
                        alert(" errorMessage is:- " + errorMessage + "\n Xhr.status is :- " + jqXhr.status + "\n Xhr.responseText is :- " + jqXhr.responseText + "\n textStatus is :- " + textStatus);
                    }

                });


            }

        }


      function MasterAddkDetailSaveComplete(jsonScript) {
            //alert("in SaveComplete");
            LayoutHideProgressBar();  //found in _Layout.cshtml

            $("#MasterAddkForm [name=id]").val(jsonScript.id);  
         
            var returnMessage = "";
            var i = 0;
            for (i = 0; i < jsonScript.ReturnMessage.length; i++) {
                //returnMessage = returnMessage + jsonScript.ReturnMessage[i] + "<br>";
                returnMessage = returnMessage + jsonScript.ReturnMessage[i] + "\n";
            }

            if (jsonScript.ReturnStatus == true) {    //no validation errors found
                MasterAddkPostSearchForm();
                MasterAddkDetailClosePopup();  //close dialog modal popup
            }
            else {
                //alert("" + returnMessage);
                var returnMessage2 = "";
                var i = 0;
                for (i = 0; i < jsonScript.ReturnMessage.length; i++) {
                        returnMessage2 = returnMessage2 + jsonScript.ReturnMessage[i] + "\n";
                }
                //$("#DivErrorMasterAddkDetail").html(returnMessage2);
                //$("#DivErrorMasterAddkDetail").css("display", "");

                //-------------------------------------------------------------------------------------------------------
                //Show Error in correct field err div
                //-------------------------------------------------------------------------------------------------------
                var MasterAddkFieldIndex = 0;
                var MasterAddkField = "";
                var MasterAddkFielderrMsg = "";
                var ik = 0;
                try {
                 for (ik = 0; ik < jsonScript.ReturnMessage.length; ik++) {
                    if (jsonScript.ReturnMessage[ik].length) {
                        MasterAddkFieldLen = jsonScript.ReturnMessage[ik].length;
                        //alert("length is " + MasterAddkFieldLen);
                        if (MasterAddkFieldLen > 0) {
                            MasterAddkFieldIndex = jsonScript.ReturnMessage[ik].indexOf("~");
                            //alert("index is " + MasterAddkFieldIndex);
                            if (MasterAddkFieldIndex > 0) {
                                MasterAddkFielderrMsg = jsonScript.ReturnMessage[ik].substring(0, MasterAddkFieldIndex);
                                //alert("err msg is " + MasterAddkFielderrMsg);
                                MasterAddkField = jsonScript.ReturnMessage[ik].substr(MasterAddkFieldIndex + 1, MasterAddkFieldLen - (MasterAddkFieldIndex + 1));
                                //alert("MasterAddkField is " + MasterAddkField);
                            }
                        }
                        $("#DivErrMasterAddkDetail" + MasterAddkField + "_in").html(MasterAddkFielderrMsg);
                        $("#DivErrMasterAddkDetail" + MasterAddkField + "_in").css("display", "");
                        $("#MasterAddkDetail" + MasterAddkField + "OK").css("display", "none");     //delete green tick, as errored

                    }    // if (jsonScript.ReturnMessage[ik].length)
                 }   // for (ik = 0
                }
                catch (err) {
                    alert("Client Error is " + err.message);
                    alert("Server Error is " + returnMessage);
                }

                if (MasterAddkFielderrMsg == "")  //normal server validation error, NOT Found
                {
                    alert("Server Error is:- " + "\n\n" + returnMessage);
                }
                //-------------------------------------------------------------------------------------------------------
                //END Show Error in correct field err div
                //-------------------------------------------------------------------------------------------------------


            }

        }


            //-----------------------------------------------------------------------------------------------------------
            // AUTOCOMPLETE COMBO Code 
            //-----------------------------------------------------------------------------------------------------------
            function MasterAddkDetailCombo1(txtbox, docombo) {
                //alert("in MasterAddkDetailCombo1 ");

                //uncomment next line, if you want autocomplete combo to work
                if (docombo != "true") {
                    return false;
                }

                $("#MasterAddkDetailtopdiv [name=overlayprogressNEW]").css("visibility", "visible");
                $("#MasterAddkDetailtopdiv [name=overlayprogressNEW]").css("display", "block");

                var pagesrc = "";
                pagesrc = MasterAddkDetailCombo1URL + '?txtbox=replace';
                //alert("pagesrc is " + pagesrc);
                pagesrc = pagesrc.replace("replace", txtbox);   //always use textbox as key, target
                //alert("pagesrc is " + pagesrc);

                var iframeid = "MasterAddkDetailCombo1Div";             
                var iframdiv = document.getElementById(iframeid);

                var dialogWidth = 0;
                //dialogWidth = $("#MasterAddkDetailValForm [name=Table_Name_in]").width();
                dialogWidth = $("#MasterAddkDetailValForm [name=Table_Name_in]").outerWidth();
                //dialogWidth = Number(dialogWidth) - 20;
                document.getElementById(iframeid).style.width = dialogWidth + "px";
                document.getElementById(iframeid).style.height = "130px";

                if ($("#MasterAddkDetailCombo1Div").length == 0) {   //check if load destination div exists, first
                    //it doesn't exist
                    alert("Div not found, for load. Check load statement. ");
                }
                else {

                    $('#MasterAddkDetailCombo1Div').load(pagesrc, '', function (response, status, xhr) {
                        //alert("status is " + status);   //can be ("success", "notmodified", "error", "timeout", or "parsererror")
                        if (status == 'success') {
                            //alert("status text is: " + xhr.statusText);
                            //alert("response text is: " + xhr.responseText);
                           $("#MasterAddkDetailCombo1Div").css("display", "block");
                           var p = $("#MasterAddkDetailValForm [name=Table_Name_in]");
                           var position = p.position();
                           $("#MasterAddkDetailCombo1Div").position({
                               my: "left top",
                              at: "left top",
                              of: $('#MasterAddkDetailValForm [name=Table_Name_in]'),
                              collision: "flip"
                           });

                        }
                        else  //error or timeout, etc..
                        {
                            alert("Combo load problem is: " + xhr.statusText);
                            alert("Combo load problem text is: " + xhr.responseText);
                        }

                    });

                }


            }

            function MasterAddkDetailPopulateCombo1(strinsert) {
                $('#MasterAddkDetailValForm [name=Table_Name_in]').val(strinsert);
            }

            function MasterAddkDetailCloseCombo1() {
                $('#MasterAddkDetailtopdiv [name=comboCheckit]').val("Close");
                $("#MasterAddkDetailCombo1Div").css("display", "none");
                $("#MasterAddkDetailCombo1Div").css("bottom", "10px");
                $("#MasterAddkDetailCombo1Div").empty();  //erase Details in case

                $("#MasterAddkDetailtopdiv [name=overlayprogressNEW]").css("visibility", "hidden");
                $("#MasterAddkDetailtopdiv [name=overlayprogressNEW]").css("display", "none");

            }
            //-----------------------------------------------------------------------------------------------------------
            // END AUTOCOMPLETE COMBO Code 
            //-----------------------------------------------------------------------------------------------------------


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/// START of Code from here down is fixed, which does not need any changing
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

      function MasterAddkDetailClosePopup() {
             //alert("Close");
             if (document.getElementById("MasterAddkShowShowtabs")) {     //From OpenDetail link in Grid
                //alert("tabs found");
                $("#OverlayMasterAddkDetail").empty();
                var Expandid = "OverlayMasterAddkDetail";              //div in MasterAddk.cshtml
                document.getElementById(Expandid).style.display = "none";
            }
            else {    //using normal Modal Popup
                //alert("close popup");
                MasterAddkCloseK();
            }

        }

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/// END of fixed code, which does not need any changing
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



