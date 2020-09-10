using appBLL;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
//using iTextSharp.text;
//using iTextSharp.text.html.simpleparser;
//using iTextSharp.text.pdf;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
//using Microsoft.Data.SqlClient;

using TopGridMake;
using TopInnerMake;
using InnerMake;

namespace appAPP.Controllers
{

    //[Authorize]
    public class ENTITYTABLEController : Controller
    {

      
        //private IHostingEnvironment _EnvOLD;   //for asp.net 2
        private IWebHostEnvironment _Env;     //for 3.1 above
        private IHttpContextAccessor _Htp;
        IConfiguration _iconfiguration;


        public ENTITYTABLEController(IWebHostEnvironment envrtmnt, IHttpContextAccessor htp, IConfiguration iconfiguration)
        {
            _Env = envrtmnt;
            _Htp = htp;
            _iconfiguration = iconfiguration;
        }

        /// Display master Grid Page
        /// Initial start point of displaying the Grid
        public ActionResult DisplayENTITYTABLE()
        {


            Models.ENTITYTABLEViewModel ThisViewModel = new Models.ENTITYTABLEViewModel();

            ThisViewModel.TotalPages = 0;
            ThisViewModel.TotalRows = 0;
            ThisViewModel.CurrentPageNumber = 0;
            ThisViewModel.SortAscendingDescending = "DESC";  //default init setting

            ViewData.Model = ThisViewModel;

            return View("ENTITYTABLEGrid");   //must match View name
        }


        /// Display Tab Page
        public ActionResult ENTITYTABLETab()
        {
            Models.ENTITYTABLEViewModel ThisViewModel = new Models.ENTITYTABLEViewModel();
            ViewData.Model = ThisViewModel;

            return View();  //goes to ScriptTab View by default
        }


        /// Display other Detail Tab Page
        public ActionResult ENTITYTABLEShow()
        {
            Models.ENTITYTABLEViewModel ThisViewModel = new Models.ENTITYTABLEViewModel();
            ViewData.Model = ThisViewModel;

            return View();  //goes to ScriptTab View by default
        }



        private static Random random = new Random((int)DateTime.Now.Ticks);
        private string RandomString(int Size)
        {
            StringBuilder builder = new StringBuilder();
            char ch;
            for (int i = 0; i < Size; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }
            return builder.ToString();
        }
        private string RandomNumbersString(int size)
        {
            StringBuilder builder = new StringBuilder();
            int ch;
            for (int i = 0; i < size; i++)
            {
                ch = random.Next(9);
                builder.Append(ch);
            }

            return builder.ToString().Substring(0, size);
        }


        public JsonResult GenerateCodeCHILDEXIST()
        {
            bool returnStatus;
            string returnErrorMessage;
            //List<string> returnMessage;
            List<string> returnMessage = new List<string>();
            Models.ENTITYTABLEViewModel ThisViewModel = new Models.ENTITYTABLEViewModel();

            try
            {

                //this.TryUpdateModel(ThisViewModel);
                this.TryUpdateModelAsync(ThisViewModel);
                //string projstr = ThisViewModel.PHY_NAME;
                string projstr = "";
                //string strDBname = ThisViewModel.dbname;
                //string strServername = ThisViewModel.servername;
                //string strwebconcombo = ThisViewModel.webconfigcombo;   //Database type to use (ie local, express or full)
                //string strapsxrazor = ThisViewModel.aspxrazorcombo;   //ASPX or RAZOR pages to be used
                //string stradoefcombo = ThisViewModel.adoefcombo;   //ADO or EF(Entity Framework 6)
                //string strvscombo = ThisViewModel.vscombo;   //Visual Studio Version to use
                string stradoefcombo = "";
                string progstr = "";
                string childtable1str = "";  //TOPINNERGRID table name

                //string progstr = "";
                string strpkid = "";
                string childprog1str = "";  //TOPINNERGRID prog name
                string childchildprogstr = "";    //INNERGRID prog name
                string strchild1pkid = "";
                string child1column1str = "";
                string childcolumn1type = "";
                string child1column2str = "";
                string childcolumn2type = "";
                string child1column3str = "";
                string childcolumn3type = "";
                string child1column4str = "";
                string childcolumn4type = "";

                //tablestr = ThisViewModel.tablename;
                progstr = ThisViewModel.ParentProgName;   //Parent prog
                //strpkid = ThisViewModel.ParentPKID;    //parent PKID  number works
                strpkid = ThisViewModel.ParentProgPKID;    //parent PKID
                projstr = ThisViewModel.ChildNumber;    //Child Number

                //column1str = ThisViewModel.column1;
                //column1type = ThisViewModel.column1type;
                //column2str = ThisViewModel.column2;
                //column2type = ThisViewModel.column2type;
                //column3str = ThisViewModel.column3;
                //column3type = ThisViewModel.column3type;
                //column4str = ThisViewModel.column4;
                //column4type = ThisViewModel.column4type;

                //use below
                childtable1str = ThisViewModel.tablename;   //OK
                childprog1str = ThisViewModel.progname;
                strchild1pkid = ThisViewModel.primarykey;
                child1column1str = ThisViewModel.column1;
                childcolumn1type = ThisViewModel.column1type;
                child1column2str = ThisViewModel.column2;
                childcolumn2type = ThisViewModel.column2type;
                child1column3str = ThisViewModel.column3;
                childcolumn3type = ThisViewModel.column3type;
                child1column4str = ThisViewModel.column4;
                childcolumn4type = ThisViewModel.column4type;

                //First check for Duplicate program name
                string chk = "";
                //string infile = "~/appAPP.csproj";
                //var FileName = HttpContext.Server.MapPath(infile);
                //var FileName = Path.Combine(_Env.ContentRootPath, infile);
                //var FileName = Path.Combine(_Env.ContentRootPath, infile);

                string newline = childprog1str + "Controller.cs";

                string getContFolder = "Controllers/";
                string[] filescontfound = System.IO.Directory.GetFiles(Path.Combine(_Env.ContentRootPath, getContFolder));

                for (int i = 0; i < filescontfound.Length; i++)
                {
                    string ss = filescontfound[i];
                    if (ss.Contains(newline))
                    {
                        chk = "foundDuplicate";  //so found a duplicate
                    }
                }

                returnStatus = true;

                if (chk == "foundDuplicate")  //so found a duplicate, do not proceed
                {
                    returnStatus = false;
                    returnErrorMessage = "Program Name, is a Duplicate, Please rename it.";
                    returnMessage.Add(returnErrorMessage);

                }
                else
                {

                    //---------------------------------------------------------------------------------------------------------------------
                    //Create new View folder in this VS Solution - TOPINNER GRID  -  CHILD
                    //---------------------------------------------------------------------------------------------------------------------
                    string newViewFolder = "Views/" + childprog1str;
                    System.IO.Directory.CreateDirectory(Path.Combine(_Env.ContentRootPath, newViewFolder));

                    //next is new to external cs library
                    if (TopInnerMake.Class1.TopInnerGridGenerate(_Env.ContentRootPath, projstr, progstr, childprog1str, strchild1pkid, child1column1str, childcolumn1type, child1column2str, childcolumn2type, child1column3str, childcolumn3type, child1column4str, childcolumn4type, childchildprogstr, strpkid, stradoefcombo, childtable1str) == true)
                    {
                        returnStatus = true;
                        returnErrorMessage = "Done";
                        returnMessage.Add(returnErrorMessage);
                    }
                    else
                    {
                        returnStatus = false;
                        returnErrorMessage = "Child Generate Failed.";
                        returnMessage.Add(returnErrorMessage);
                    }


                    //returnStatus = true;
                    //returnErrorMessage = "Done";
                    //returnMessage.Add(returnErrorMessage);
                }



                ThisViewModel.ReturnMessage = returnMessage;
                ThisViewModel.ReturnStatus = returnStatus;

                return Json(ThisViewModel);

            }
            catch (Exception ex)
            {
                List<string> outputMessages = new List<string>();

                returnStatus = false;
                outputMessages.Add(ex.Message);

                ThisViewModel.ReturnMessage = outputMessages;
                ThisViewModel.ReturnStatus = returnStatus;

                return Json(ThisViewModel);

            }

        }

        public JsonResult GenerateCodeCHILD()
        {
            bool returnStatus;
            string returnErrorMessage;
            //List<string> returnMessage;
            List<string> returnMessage = new List<string>();
            Models.ENTITYTABLEViewModel ThisViewModel = new Models.ENTITYTABLEViewModel();

            try
            {

                //this.TryUpdateModel(ThisViewModel);
                this.TryUpdateModelAsync(ThisViewModel);
                //string projstr = ThisViewModel.PHY_NAME;
                string projstr = "";
                //string strDBname = ThisViewModel.dbname;
                //string strServername = ThisViewModel.servername;
                //string strwebconcombo = ThisViewModel.webconfigcombo;   //Database type to use (ie local, express or full)
                //string strapsxrazor = ThisViewModel.aspxrazorcombo;   //ASPX or RAZOR pages to be used
                //string stradoefcombo = ThisViewModel.adoefcombo;   //ADO or EF(Entity Framework 6)
                //string strvscombo = ThisViewModel.vscombo;   //Visual Studio Version to use
                string stradoefcombo = "";
                string progstr = "";
                string childtable1str = "";  //TOPINNERGRID table name

                //string progstr = "";
                string strpkid = "";
                string childprog1str = "";  //TOPINNERGRID prog name
                string childchildprogstr = "";    //INNERGRID prog name
                string strchild1pkid = "";
                string child1column1str = "";
                string childcolumn1type = "";
                string child1column2str = "";
                string childcolumn2type = "";
                string child1column3str = "";
                string childcolumn3type = "";
                string child1column4str = "";
                string childcolumn4type = "";

                //tablestr = ThisViewModel.tablename;
                progstr = ThisViewModel.ParentProgName;   //Parent prog
                //strpkid = ThisViewModel.ParentPKID;    //parent PKID  number works
                strpkid = ThisViewModel.ParentProgPKID;    //parent PKID
                projstr = ThisViewModel.ChildNumber;    //Child Number

                //column1str = ThisViewModel.column1;
                //column1type = ThisViewModel.column1type;
                //column2str = ThisViewModel.column2;
                //column2type = ThisViewModel.column2type;
                //column3str = ThisViewModel.column3;
                //column3type = ThisViewModel.column3type;
                //column4str = ThisViewModel.column4;
                //column4type = ThisViewModel.column4type;

                //use below
                childtable1str = ThisViewModel.tablename;   //OK
                childprog1str = ThisViewModel.progname;
                strchild1pkid = ThisViewModel.primarykey;
                child1column1str = ThisViewModel.column1;
                childcolumn1type = ThisViewModel.column1type;
                child1column2str = ThisViewModel.column2;
                childcolumn2type = ThisViewModel.column2type;
                child1column3str = ThisViewModel.column3;
                childcolumn3type = ThisViewModel.column3type;
                child1column4str = ThisViewModel.column4;
                childcolumn4type = ThisViewModel.column4type;

                //First check for Duplicate program name
                string chk = "";
                //string infile = "~/appAPP.csproj";
                //var FileName = HttpContext.Server.MapPath(infile);
                //var FileName = Path.Combine(_Env.ContentRootPath, infile);
                //var FileName = Path.Combine(_Env.ContentRootPath, infile);

                string newline = childprog1str + "Controller.cs";

                string getContFolder = "Controllers/";
                string[] filescontfound = System.IO.Directory.GetFiles(Path.Combine(_Env.ContentRootPath, getContFolder));

                for (int i = 0; i < filescontfound.Length; i++)
                {
                    string ss = filescontfound[i];
                    if (ss.Contains(newline))
                    {
                        chk = "foundDuplicate";  //so found a duplicate
                    }
                }


                //Also check for SQL Reserved Words
                string reswordchk = "";
                string reswordchkmsg = "";
                if (UtilitiesBLL.SQLKeyWordChk(childtable1str))   //found in reserved list, so error off
                {
                    reswordchk = "ResWordFound";
                    reswordchkmsg = "Table name is invalid.\nIs a Reserved Word, Please rename it.";
                }
                if (UtilitiesBLL.SQLKeyWordChk(child1column1str))   //found in reserved list, so error off
                {
                    reswordchk = "ResWordFound";
                    reswordchkmsg = "Column 1 name is invalid.\nIs a Reserved Word, Please rename it.";
                }
                if (UtilitiesBLL.SQLKeyWordChk(child1column2str))   //found in reserved list, so error off
                {
                    reswordchk = "ResWordFound";
                    reswordchkmsg = "Column 2 name is invalid.\nIs a Reserved Word, Please rename it.";
                }
                if (UtilitiesBLL.SQLKeyWordChk(child1column3str))   //found in reserved list, so error off
                {
                    reswordchk = "ResWordFound";
                    reswordchkmsg = "Column 3 name is invalid.\nIs a Reserved Word, Please rename it.";
                }
                if (UtilitiesBLL.SQLKeyWordChk(child1column4str))   //found in reserved list, so error off
                {
                    reswordchk = "ResWordFound";
                    reswordchkmsg = "Column 4 name is invalid.\nIs a Reserved Word, Please rename it.";
                }
                //END check for SQL Reserved Words

                returnStatus = true;
                if (chk == "foundDuplicate")  //so found a duplicate, do not proceed
                {
                    returnStatus = false;
                    returnErrorMessage = "Program Name, is a Duplicate, Please rename it.";
                    returnMessage.Add(returnErrorMessage);

                }
                else
                {


                    //Also check for SQL Reserved Words
                    if (reswordchk == "ResWordFound")
                    {
                        returnStatus = false;
                        returnErrorMessage = reswordchkmsg;
                        returnMessage.Add(returnErrorMessage);

                    }
                    else
                    {
                        //---------------------------------------------------------------------------------------------------------------------
                        // Attempt to CREATE Child Table now
                        //---------------------------------------------------------------------------------------------------------------------
                        CreateChildTable(projstr,
                            progstr,
                            childprog1str,
                            strchild1pkid,
                            child1column1str,
                            childcolumn1type,
                            child1column2str,
                            childcolumn2type,
                            child1column3str,
                            childcolumn3type,
                            child1column4str,
                            childcolumn4type,
                            childchildprogstr,
                            strpkid,
                            stradoefcombo,
                            childtable1str,
                            out returnStatus,
                            out returnErrorMessage);


                        if (returnStatus == false)  //failed to Create Table, so go back with error
                        {
                            //List<string> outputMessages = new List<string>();
                            //outputMessages.Add(returnErrorMessage);
                            List<string> outputMessages = new List<string>
                        {
                            returnErrorMessage
                        };

                            ThisViewModel.ReturnMessage = outputMessages;
                            ThisViewModel.ReturnStatus = returnStatus;

                            return Json(ThisViewModel);

                        }
                        //---------------------------------------------------------------------------------------------------------------------
                        // END to CREATE Child Table now
                        //---------------------------------------------------------------------------------------------------------------------


                        //---------------------------------------------------------------------------------------------------------------------
                        //Create new View folder in this VS Solution - TOPINNER GRID  -  CHILD
                        //---------------------------------------------------------------------------------------------------------------------
                        string newViewFolder = "Views/" + childprog1str;
                        System.IO.Directory.CreateDirectory(Path.Combine(_Env.ContentRootPath, newViewFolder));

                        //next is new to external cs library
                        if (TopInnerMake.Class1.TopInnerGridGenerate(_Env.ContentRootPath, projstr, progstr, childprog1str, strchild1pkid, child1column1str, childcolumn1type, child1column2str, childcolumn2type, child1column3str, childcolumn3type, child1column4str, childcolumn4type, childchildprogstr, strpkid, stradoefcombo, childtable1str) == true)
                        {
                            returnStatus = true;
                            returnErrorMessage = "Done";
                            returnMessage.Add(returnErrorMessage);
                        }
                        else
                        {
                            returnStatus = false;
                            returnErrorMessage = "Child Generate Failed.";
                            returnMessage.Add(returnErrorMessage);
                        }

                        //returnStatus = true;
                        //returnErrorMessage = "Done";
                        //returnMessage.Add(returnErrorMessage);

                    }

 
                }



                ThisViewModel.ReturnMessage = returnMessage;
                ThisViewModel.ReturnStatus = returnStatus;

                return Json(ThisViewModel);

            }
            catch (Exception ex)
            {
                List<string> outputMessages = new List<string>();

                returnStatus = false;
                outputMessages.Add(ex.Message);

                ThisViewModel.ReturnMessage = outputMessages;
                ThisViewModel.ReturnStatus = returnStatus;

                return Json(ThisViewModel);

            }

        }


        private void CreateChildTable(string projstr, string progstr, string childprog1str, string strchild1pkid, string child1column1str, string column1type, string child1column2str, string column2type, string child1column3str, string column3type, string child1column4str, string column4type, string childchildprogstr, string strpkid, string stradoefcombo, string childtable1str,
            out bool returnStatus,
            out string returnErrorMessage)
        {

            SqlConnection connection;
            connection = new SqlConnection();

            string DBConnectString = _iconfiguration.GetSection("Data").GetSection("ConnectString").Value;

            //string connectionString = "Server=localhost\\SQLEXPRESS;Database=appAPP;Trusted_Connection=True";
            //connection.ConnectionString = connectionString;

            connection.ConnectionString = DBConnectString;

            if (column1type == "Char")
            {
                column1type = "varchar(500)";
            }
            if (column2type == "Char")
            {
                column2type = "varchar(500)";
            }
            if (column3type == "Char")
            {
                column3type = "varchar(500)";
            }
            if (column4type == "Char")
            {
                column4type = "varchar(500)";
            }

            if (column1type == "Date")
            {
                column1type = "datetime";
            }
            if (column2type == "Date")
            {
                column2type = "datetime";
            }
            if (column3type == "Date")
            {
                column3type = "datetime";
            }
            if (column4type == "Date")
            {
                column4type = "datetime";
            }

            if (column1type == "Integer")
            {
                column1type = "int";
            }
            if (column2type == "Integer")
            {
                column2type = "int";
            }
            if (column3type == "Integer")
            {
                column3type = "int";
            }
            if (column4type == "Integer")
            {
                column4type = "int";
            }

            if (column1type == "Decimal")
            {
                column1type = "money";
            }
            if (column2type == "Decimal")
            {
                column2type = "money";
            }
            if (column3type == "Decimal")
            {
                column3type = "money";
            }
            if (column4type == "Decimal")
            {
                column4type = "money";
            }


            string query3 = "CREATE TABLE " + childtable1str +
                " (" + strchild1pkid + " bigint IDENTITY(1,1) NOT NULL, " +
                  strpkid + " bigint NULL, " +
                  child1column1str + " " + column1type + " NULL, " +
                  child1column2str + " " + column2type + " NULL, " +
                  child1column3str + " " + column3type + " NULL, " +
                  child1column4str + " " + column4type + " NULL, " +
                  "CONSTRAINT PK_" + childtable1str + " PRIMARY KEY (" + strchild1pkid + ")" +
               ");";


            SqlCommand cmd = new SqlCommand(query3, connection);
            try
            {
                connection.Open();
                cmd.ExecuteNonQuery();
            }
            catch (SqlException e)
            {
                string err = e.Message;
                returnErrorMessage = e.Message;
                returnStatus = false;
            }
            finally
            {
                connection.Close();

                returnErrorMessage = "";
                returnStatus = true;
            }

        }


        public JsonResult GenerateCodeGRANDCHILD()
        {
            bool returnStatus;
            string returnErrorMessage;
            //List<string> returnMessage;
            List<string> returnMessage = new List<string>();
            Models.ENTITYTABLEViewModel ThisViewModel = new Models.ENTITYTABLEViewModel();

            try
            {

                //this.TryUpdateModel(ThisViewModel);
                this.TryUpdateModelAsync(ThisViewModel);
                //string projstr = ThisViewModel.PHY_NAME;
                string projstr = "";
                //string strDBname = ThisViewModel.dbname;
                //string strServername = ThisViewModel.servername;
                //string strwebconcombo = ThisViewModel.webconfigcombo;   //Database type to use (ie local, express or full)
                //string strapsxrazor = ThisViewModel.aspxrazorcombo;   //ASPX or RAZOR pages to be used
                //string stradoefcombo = ThisViewModel.adoefcombo;   //ADO or EF(Entity Framework 6)
                //string strvscombo = ThisViewModel.vscombo;   //Visual Studio Version to use
                string stradoefcombo = "";
                string progstr = "";
                string childchildtablestr = "";   //INNERGRID table name

                //string progstr = "";
                string strpkid = "";
                string childprog1str = "";  //TOPINNERGRID prog name
                string childchildprogstr = "";    //INNERGRID prog name
                string strchild1pkid = "";
                string strchildchild1pkid = "";
                string childchild1column1str = "";
                string childchildcolumn1type = "";
                string childchild1column2str = "";
                string childchildcolumn2type = "";
                string childchild1column3str = "";
                string childchildcolumn3type = "";
                string childchild1column4str = "";
                string childchildcolumn4type = "";

                //tablestr = ThisViewModel.tablename;
                progstr = ThisViewModel.TopProgName;   //now top program name

                childprog1str = ThisViewModel.ParentProgName;   //Parent prog
                //strpkid = ThisViewModel.ParentPKID;    //parent PKID  number works
                strpkid = ThisViewModel.ParentProgPKID;    //parent PKID
                strchild1pkid = ThisViewModel.ParentProgPKID;    //parent PKID

                projstr = ThisViewModel.ChildNumber;    //Child Number

                childchildtablestr = ThisViewModel.tablename;
                childchildprogstr = ThisViewModel.progname;
                strchildchild1pkid = ThisViewModel.primarykey;
                childchild1column1str = ThisViewModel.column1;
                childchildcolumn1type = ThisViewModel.column1type;
                childchild1column2str = ThisViewModel.column2;
                childchildcolumn2type = ThisViewModel.column2type;
                childchild1column3str = ThisViewModel.column3;
                childchildcolumn3type = ThisViewModel.column3type;
                childchild1column4str = ThisViewModel.column4;
                childchildcolumn4type = ThisViewModel.column4type;


                //First check for Duplicate program name
                string chk = "";
                //string infile = "~/appAPP.csproj";
                //var FileName = HttpContext.Server.MapPath(infile);
                //var FileName = Path.Combine(_Env.ContentRootPath, infile);

                string newline = childchildprogstr + "Controller.cs";

                string getContFolder = "Controllers/";
                string[] filescontfound = System.IO.Directory.GetFiles(Path.Combine(_Env.ContentRootPath, getContFolder));

                for (int i = 0; i < filescontfound.Length; i++)
                {
                    string ss = filescontfound[i];
                    if (ss.Contains(newline))
                    {
                        chk = "foundDuplicate";  //so found a duplicate
                    }
                }


                //Also check for SQL Reserved Words
                string reswordchk = "";
                string reswordchkmsg = "";
                if (UtilitiesBLL.SQLKeyWordChk(childchildtablestr))   //found in reserved list, so error off
                {
                    reswordchk = "ResWordFound";
                    reswordchkmsg = "Table name is invalid.\nIs a Reserved Word, Please rename it.";
                }
                if (UtilitiesBLL.SQLKeyWordChk(childchild1column1str))   //found in reserved list, so error off
                {
                    reswordchk = "ResWordFound";
                    reswordchkmsg = "Column 1 name is invalid.\nIs a Reserved Word, Please rename it.";
                }
                if (UtilitiesBLL.SQLKeyWordChk(childchild1column2str))   //found in reserved list, so error off
                {
                    reswordchk = "ResWordFound";
                    reswordchkmsg = "Column 2 name is invalid.\nIs a Reserved Word, Please rename it.";
                }
                if (UtilitiesBLL.SQLKeyWordChk(childchild1column3str))   //found in reserved list, so error off
                {
                    reswordchk = "ResWordFound";
                    reswordchkmsg = "Column 3 name is invalid.\nIs a Reserved Word, Please rename it.";
                }
                if (UtilitiesBLL.SQLKeyWordChk(childchild1column4str))   //found in reserved list, so error off
                {
                    reswordchk = "ResWordFound";
                    reswordchkmsg = "Column 4 name is invalid.\nIs a Reserved Word, Please rename it.";
                }
                //END check for SQL Reserved Words

                returnStatus = true;
                if (chk == "foundDuplicate")  //so found a duplicate, do not proceed
                {
                    returnStatus = false;
                    returnErrorMessage = "Program Name, is a Duplicate, Please rename it.";
                    returnMessage.Add(returnErrorMessage);

                }
                else
                {

                    //Also check for SQL Reserved Words
                    if (reswordchk == "ResWordFound")
                    {
                        returnStatus = false;
                        returnErrorMessage = reswordchkmsg;
                        returnMessage.Add(returnErrorMessage);

                    }
                    else
                    {

                        //---------------------------------------------------------------------------------------------------------------------
                        // Attempt to CREATE Grand Child Table now
                        //---------------------------------------------------------------------------------------------------------------------
                        CreateGrandChildTable(projstr,
                            progstr,
                            childprog1str,
                            childchildprogstr,
                            strchildchild1pkid,
                            childchild1column1str,
                            childchildcolumn1type,
                            childchild1column2str,
                            childchildcolumn2type,
                            childchild1column3str,
                            childchildcolumn3type,
                            childchild1column4str,
                            childchildcolumn4type,
                            childchildprogstr,
                            strchild1pkid,
                            stradoefcombo,
                            childchildtablestr,
                            out returnStatus,
                            out returnErrorMessage);


                        if (returnStatus == false)  //failed to Create Table, so go back with error
                        {
                            //List<string> outputMessages = new List<string>();
                            //outputMessages.Add(returnErrorMessage);
                            List<string> outputMessages = new List<string>
                        {
                            returnErrorMessage
                        };

                            ThisViewModel.ReturnMessage = outputMessages;
                            ThisViewModel.ReturnStatus = returnStatus;

                            return Json(ThisViewModel);

                        }
                        //---------------------------------------------------------------------------------------------------------------------
                        // END to CREATE Grand Child Table now
                        //---------------------------------------------------------------------------------------------------------------------


                        //---------------------------------------------------------------------------------------------------------------------
                        //Create new View folder in this VS Solution - TOPINNER GRID  -  CHILD
                        //---------------------------------------------------------------------------------------------------------------------
                        //string newViewFolder = "Views/" + childprog1str;
                        string newViewFolder = "Views/" + childchildprogstr;

                        Directory.CreateDirectory(Path.Combine(_Env.ContentRootPath, newViewFolder));

                        //next is new to external cs library
                        if (InnerMake.Class1.InnerGridGenerate(_Env.ContentRootPath, projstr, progstr, childprog1str, childchildprogstr, strchildchild1pkid, childchild1column1str, childchildcolumn1type, childchild1column2str, childchildcolumn2type, childchild1column3str, childchildcolumn3type, childchild1column4str, childchildcolumn4type, childchildprogstr, strchild1pkid, stradoefcombo, childchildtablestr) == true)
                        {
                            returnStatus = true;
                            returnErrorMessage = "Done";
                            returnMessage.Add(returnErrorMessage);
                        }
                        else
                        {
                            returnStatus = false;
                            returnErrorMessage = "Grand Child Generate Failed.";
                            returnMessage.Add(returnErrorMessage);
                        }

                        // = true;
                        //returnErrorMessage = "Done";
                        //returnMessage.Add(returnErrorMessage);

                    }


                }



                ThisViewModel.ReturnMessage = returnMessage;
                ThisViewModel.ReturnStatus = returnStatus;

                return Json(ThisViewModel);

            }
            catch (Exception ex)
            {
                List<string> outputMessages = new List<string>();

                returnStatus = false;
                outputMessages.Add(ex.Message);

                ThisViewModel.ReturnMessage = outputMessages;
                ThisViewModel.ReturnStatus = returnStatus;

                return Json(ThisViewModel);

            }

        }

        public JsonResult GenerateCodeGRANDCHILDEXIST()
        {
            bool returnStatus;
            string returnErrorMessage;
            //List<string> returnMessage;
            List<string> returnMessage = new List<string>();
            Models.ENTITYTABLEViewModel ThisViewModel = new Models.ENTITYTABLEViewModel();

            try
            {

                //this.TryUpdateModel(ThisViewModel);
                this.TryUpdateModelAsync(ThisViewModel);
                //string projstr = ThisViewModel.PHY_NAME;
                string projstr = "";
                //string strDBname = ThisViewModel.dbname;
                //string strServername = ThisViewModel.servername;
                //string strwebconcombo = ThisViewModel.webconfigcombo;   //Database type to use (ie local, express or full)
                //string strapsxrazor = ThisViewModel.aspxrazorcombo;   //ASPX or RAZOR pages to be used
                //string stradoefcombo = ThisViewModel.adoefcombo;   //ADO or EF(Entity Framework 6)
                //string strvscombo = ThisViewModel.vscombo;   //Visual Studio Version to use
                string stradoefcombo = "";
                string progstr = "";
                string childchildtablestr = "";   //INNERGRID table name

                //string progstr = "";
                string strpkid = "";
                string childprog1str = "";  //TOPINNERGRID prog name
                string childchildprogstr = "";    //INNERGRID prog name
                string strchild1pkid = "";
                string strchildchild1pkid = "";
                string childchild1column1str = "";
                string childchildcolumn1type = "";
                string childchild1column2str = "";
                string childchildcolumn2type = "";
                string childchild1column3str = "";
                string childchildcolumn3type = "";
                string childchild1column4str = "";
                string childchildcolumn4type = "";

                //tablestr = ThisViewModel.tablename;
                progstr = ThisViewModel.TopProgName;   //now top program name

                childprog1str = ThisViewModel.ParentProgName;   //Parent prog
                //strpkid = ThisViewModel.ParentPKID;    //parent PKID  number works
                strpkid = ThisViewModel.ParentProgPKID;    //parent PKID
                strchild1pkid = ThisViewModel.ParentProgPKID;    //parent PKID

                projstr = ThisViewModel.ChildNumber;    //Child Number

                //column1str = ThisViewModel.column1;
                //column1type = ThisViewModel.column1type;
                //column2str = ThisViewModel.column2;
                //column2type = ThisViewModel.column2type;
                //column3str = ThisViewModel.column3;
                //column3type = ThisViewModel.column3type;
                //column4str = ThisViewModel.column4;
                //column4type = ThisViewModel.column4type;

                //use below
                //childtable1str = ThisViewModel.tablename;   //OK
                //childprog1str = ThisViewModel.progname;
                //strchild1pkid = ThisViewModel.primarykey;
                //child1column1str = ThisViewModel.column1;
                //childcolumn1type = ThisViewModel.column1type;
                //child1column2str = ThisViewModel.column2;
                //childcolumn2type = ThisViewModel.column2type;
                //child1column3str = ThisViewModel.column3;
                //childcolumn3type = ThisViewModel.column3type;
                //child1column4str = ThisViewModel.column4;
                //childcolumn4type = ThisViewModel.column4type;


                //##################
                childchildtablestr = ThisViewModel.tablename;
                childchildprogstr = ThisViewModel.progname;
                strchildchild1pkid = ThisViewModel.primarykey;
                childchild1column1str = ThisViewModel.column1;
                childchildcolumn1type = ThisViewModel.column1type;
                childchild1column2str = ThisViewModel.column2;
                childchildcolumn2type = ThisViewModel.column2type;
                childchild1column3str = ThisViewModel.column3;
                childchildcolumn3type = ThisViewModel.column3type;
                childchild1column4str = ThisViewModel.column4;
                childchildcolumn4type = ThisViewModel.column4type;


                //First check for Duplicate program name
                string chk = "";
                //string infile = "~/appAPP.csproj";
                //var FileName = HttpContext.Server.MapPath(infile);
                //var FileName = Path.Combine(_Env.ContentRootPath, infile);

                string newline = childchildprogstr + "Controller.cs";

                string getContFolder = "Controllers/";
                string[] filescontfound = System.IO.Directory.GetFiles(Path.Combine(_Env.ContentRootPath, getContFolder));

                for (int i = 0; i < filescontfound.Length; i++)
                {
                    string ss = filescontfound[i];
                    if (ss.Contains(newline))
                    {
                        chk = "foundDuplicate";  //so found a duplicate
                    }
                }

                returnStatus = true;
                if (chk == "foundDuplicate")  //so found a duplicate, do not proceed
                {
                    returnStatus = false;
                    returnErrorMessage = "Program Name, is a Duplicate, Please rename it.";
                    returnMessage.Add(returnErrorMessage);

                }
                else
                {


                    //---------------------------------------------------------------------------------------------------------------------
                    //Create new View folder in this VS Solution - TOPINNER GRID  -  CHILD
                    //---------------------------------------------------------------------------------------------------------------------
                    //string newViewFolder = "Views/" + childprog1str;
                    string newViewFolder = "Views/" + childchildprogstr;

                    Directory.CreateDirectory(Path.Combine(_Env.ContentRootPath, newViewFolder));


                    //next is new to external cs library
                    if (InnerMake.Class1.InnerGridGenerate(_Env.ContentRootPath, projstr, progstr, childprog1str, childchildprogstr, strchildchild1pkid, childchild1column1str, childchildcolumn1type, childchild1column2str, childchildcolumn2type, childchild1column3str, childchildcolumn3type, childchild1column4str, childchildcolumn4type, childchildprogstr, strchild1pkid, stradoefcombo, childchildtablestr) == true)
                    {
                        returnStatus = true;
                        returnErrorMessage = "Done";
                        returnMessage.Add(returnErrorMessage);
                    }
                    else
                    {
                        returnStatus = false;
                        returnErrorMessage = "Grand Child Generate Failed.";
                        returnMessage.Add(returnErrorMessage);
                    }


                    //returnStatus = true;
                    //returnErrorMessage = "Done";
                    //returnMessage.Add(returnErrorMessage);
                }



                ThisViewModel.ReturnMessage = returnMessage;
                ThisViewModel.ReturnStatus = returnStatus;

                return Json(ThisViewModel);

            }
            catch (Exception ex)
            {
                List<string> outputMessages = new List<string>();

                returnStatus = false;
                outputMessages.Add(ex.Message);

                ThisViewModel.ReturnMessage = outputMessages;
                ThisViewModel.ReturnStatus = returnStatus;

                return Json(ThisViewModel);

            }

        }


        private void CreateGrandChildTable(string projstr, string topprog, string progstr, string childprog1str, string strchild1pkid, string child1column1str, string column1type, string child1column2str, string column2type, string child1column3str, string column3type, string child1column4str, string column4type, string childchildprogstr, string strpkid, string stradoefcombo, string childchildtablestr,
            out bool returnStatus,
            out string returnErrorMessage)
        {

            SqlConnection connection;
            connection = new SqlConnection();

            string DBConnectString = _iconfiguration.GetSection("Data").GetSection("ConnectString").Value;

            //string connectionString = "Server=localhost\\SQLEXPRESS;Database=appAPP;Trusted_Connection=True";
            //connection.ConnectionString = connectionString;

            connection.ConnectionString = DBConnectString;

            if (column1type == "Char")
            {
                column1type = "varchar(500)";
            }
            if (column2type == "Char")
            {
                column2type = "varchar(500)";
            }
            if (column3type == "Char")
            {
                column3type = "varchar(500)";
            }
            if (column4type == "Char")
            {
                column4type = "varchar(500)";
            }

            if (column1type == "Date")
            {
                column1type = "datetime";
            }
            if (column2type == "Date")
            {
                column2type = "datetime";
            }
            if (column3type == "Date")
            {
                column3type = "datetime";
            }
            if (column4type == "Date")
            {
                column4type = "datetime";
            }

            if (column1type == "Integer")
            {
                column1type = "int";
            }
            if (column2type == "Integer")
            {
                column2type = "int";
            }
            if (column3type == "Integer")
            {
                column3type = "int";
            }
            if (column4type == "Integer")
            {
                column4type = "int";
            }

            if (column1type == "Decimal")
            {
                column1type = "money";
            }
            if (column2type == "Decimal")
            {
                column2type = "money";
            }
            if (column3type == "Decimal")
            {
                column3type = "money";
            }
            if (column4type == "Decimal")
            {
                column4type = "money";
            }


            string query3 = "CREATE TABLE " + childchildtablestr +
                " (" + strchild1pkid + " bigint IDENTITY(1,1) NOT NULL, " +
                  strpkid + " bigint NULL, " +
                  child1column1str + " " + column1type + " NULL, " +
                  child1column2str + " " + column2type + " NULL, " +
                  child1column3str + " " + column3type + " NULL, " +
                  child1column4str + " " + column4type + " NULL, " +
                  "CONSTRAINT PK_" + childchildtablestr + " PRIMARY KEY (" + strchild1pkid + ")" +
               ");";


            SqlCommand cmd = new SqlCommand(query3, connection);
            try
            {
                connection.Open();
                cmd.ExecuteNonQuery();
            }
            catch (SqlException e)
            {
                string err = e.Message;
                returnErrorMessage = e.Message;
                returnStatus = false;
            }
            finally
            {
                connection.Close();

                returnErrorMessage = "";
                returnStatus = true;
            }

        }



        //[ValidateAntiForgeryToken]
        public JsonResult GenerateCodePARENT()
        {
            bool returnStatus;
            string returnErrorMessage;
            //List<string> returnMessage;
            List<string> returnMessage = new List<string>();
            //PHYLUMBLL ThisBLL = new PHYLUMBLL();
            //Models.PHYLUMViewModel ThisViewModel = new Models.PHYLUMViewModel();
            Models.ENTITYTABLEViewModel ThisViewModel = new Models.ENTITYTABLEViewModel();

            try
            {
                //this.TryUpdateModel(ThisViewModel);
                this.TryUpdateModelAsync(ThisViewModel);
                //string projstr = ThisViewModel.PHY_NAME;
                string projstr = "";
                //string strDBname = ThisViewModel.dbname;
                //string strServername = ThisViewModel.servername;
                //string strwebconcombo = ThisViewModel.webconfigcombo;   //Database type to use (ie local, express or full)
                //string strapsxrazor = ThisViewModel.aspxrazorcombo;   //ASPX or RAZOR pages to be used
                //string stradoefcombo = ThisViewModel.adoefcombo;   //ADO or EF(Entity Framework 6)
                //string strvscombo = ThisViewModel.vscombo;   //Visual Studio Version to use
                string stradoefcombo = "";
                string progstr = "";
                string tablestr = "";   //new  TOPGRID table

                //string progstr = "";
                string strpkid = "";
                string column1str = "";
                string column1type = "";
                string column2str = "";
                string column2type = "";
                string column3str = "";
                string column3type = "";
                string column4str = "";
                string column4type = "";
                string childprog2str = "Child";  //another TOPINNERGRID table name
                string childprog1str = "";  //TOPINNERGRID prog name
                string comboprogstr = "";
                string strcomboclicked = "false"; //COMBOGRID flagged(checked) to be used - within TOPGRID Detail page
                string childchildprogstr = "";    //INNERGRID prog name
                string strchild1pkid = "";
                string strchildchild1pkid = "";

                tablestr = ThisViewModel.tablename;
                progstr = ThisViewModel.progname;
                //progstr = ThisViewModel.tablename + "7";
                strpkid = ThisViewModel.primarykey;
                column1str = ThisViewModel.column1;
                column1type = ThisViewModel.column1type;
                column2str = ThisViewModel.column2;
                column2type = ThisViewModel.column2type;
                column3str = ThisViewModel.column3;
                column3type = ThisViewModel.column3type;
                column4str = ThisViewModel.column4;
                column4type = ThisViewModel.column4type;

                //First check for Duplicate program name
                string chk = "";
                string infile = "appAPP.csproj";
                //var FileName = HttpContext.Server.MapPath(infile);
                var FileName = Path.Combine(_Env.ContentRootPath, infile);



                string newline = progstr + "Controller.cs";

                string getContFolder = "Controllers/";
                string[] filescontfound = System.IO.Directory.GetFiles(Path.Combine(_Env.ContentRootPath, getContFolder));

                for (int i = 0; i < filescontfound.Length; i++)
                {
                    string ss = filescontfound[i];
                    if (ss.Contains(newline))
                    //if (ss == newline)
                    {
                        chk = "foundDuplicate";  //so found a duplicate
                    }
                }


                //Also check for SQL Reserved Words
                string reswordchk = "";
                string reswordchkmsg = "";
                if (UtilitiesBLL.SQLKeyWordChk(tablestr))   //found in reserved list, so error off
                {
                    reswordchk = "ResWordFound";
                    reswordchkmsg = "Table name is invalid.\nIs a Reserved Word, Please rename it.";
                }
                if (UtilitiesBLL.SQLKeyWordChk(column1str))   //found in reserved list, so error off
                {
                    reswordchk = "ResWordFound";
                    reswordchkmsg = "Column 1 name is invalid.\nIs a Reserved Word, Please rename it.";
                }
                if (UtilitiesBLL.SQLKeyWordChk(column2str))   //found in reserved list, so error off
                {
                    reswordchk = "ResWordFound";
                    reswordchkmsg = "Column 2 name is invalid.\nIs a Reserved Word, Please rename it.";
                }
                if (UtilitiesBLL.SQLKeyWordChk(column3str))   //found in reserved list, so error off
                {
                    reswordchk = "ResWordFound";
                    reswordchkmsg = "Column 3 name is invalid.\nIs a Reserved Word, Please rename it.";
                }
                if (UtilitiesBLL.SQLKeyWordChk(column4str))   //found in reserved list, so error off
                {
                    reswordchk = "ResWordFound";
                    reswordchkmsg = "Column 4 name is invalid.\nIs a Reserved Word, Please rename it.";
                }
                //END check for SQL Reserved Words


                returnStatus = true;

                if (chk == "foundDuplicate")  //so found a duplicate, do not proceed
                {
                    returnStatus = false;
                    returnErrorMessage = "Program Name, is a Duplicate, Please rename it.";
                    returnMessage.Add(returnErrorMessage);

                }
                else
                {

                    //Also check for SQL Reserved Words
                    if (reswordchk == "ResWordFound")
                    {
                        returnStatus = false;
                        returnErrorMessage = reswordchkmsg;
                        returnMessage.Add(returnErrorMessage);
                       
                    }
                    else
                    {

                        //---------------------------------------------------------------------------------------------------------------------
                        // Attempt to CREATE Parent Table now
                        //---------------------------------------------------------------------------------------------------------------------
                        CreateParentTable(projstr,
                            progstr,
                            strpkid,
                            column1str,
                            column1type,
                            column2str,
                            column2type,
                            column3str,
                            column3type,
                            column4str,
                            column4type,
                            childprog1str,
                            childprog2str,
                            strcomboclicked,
                            comboprogstr,
                            stradoefcombo,
                            tablestr,
                            strchild1pkid,
                            childchildprogstr,
                            strchildchild1pkid,
                            out returnStatus,
                            out returnErrorMessage);

                        if (returnStatus == false)  //failed to Create Table, so go back with error
                        {
                            //List<string> outputMessages = new List<string>();
                            //outputMessages.Add(returnErrorMessage);
                            List<string> outputMessages = new List<string>
                        {
                            returnErrorMessage
                        };

                            ThisViewModel.ReturnMessage = outputMessages;
                            ThisViewModel.ReturnStatus = returnStatus;

                            return Json(ThisViewModel);

                        }
                        //---------------------------------------------------------------------------------------------------------------------
                        // END to CREATE Parent Table now
                        //---------------------------------------------------------------------------------------------------------------------



                        //---------------------------------------------------------------------------------------------------------------------
                        //Create new View folder in this VS Solution - TOPGRID - there always be a TOPGRID
                        //---------------------------------------------------------------------------------------------------------------------
                        string newViewFolder = "Views/" + progstr;
                        //new Microsoft.VisualBasic.Devices.Computer().FileSystem.CreateDirectory(HttpContext.Server.MapPath(newViewFolder));
                        //Directory.CreateDirectory(Path.Combine(_Env.ContentRootPath, newViewFolder));
                        System.IO.Directory.CreateDirectory(Path.Combine(_Env.ContentRootPath, newViewFolder));


                        //next is new to external cs library
                        if (TopGridMake.Class1.TopGridGenerate(_Env.ContentRootPath, projstr, progstr, strpkid, column1str, column1type, column2str, column2type, column3str, column3type, column4str, column4type, childprog1str, childprog2str, strcomboclicked, comboprogstr, stradoefcombo, tablestr, strchild1pkid, childchildprogstr, strchildchild1pkid) == true)
                        {
                            returnStatus = true;
                            returnErrorMessage = "Done";
                            returnMessage.Add(returnErrorMessage);
                        }
                        else
                        {
                            returnStatus = false;
                            returnErrorMessage = "Generate Failed.";
                            returnMessage.Add(returnErrorMessage);
                        }


                        //returnStatus = true;
                        //returnErrorMessage = "Done";
                        //returnMessage.Add(returnErrorMessage);


                    }

                }



                ThisViewModel.ReturnMessage = returnMessage;
                ThisViewModel.ReturnStatus = returnStatus;

                return Json(ThisViewModel);

            }
            catch (Exception ex)
            {
                List<string> outputMessages = new List<string>();

                returnStatus = false;
                outputMessages.Add(ex.Message);

                ThisViewModel.ReturnMessage = outputMessages;
                ThisViewModel.ReturnStatus = returnStatus;

                return Json(ThisViewModel);

            }

        }


        //[ValidateAntiForgeryToken]
        public JsonResult GenerateCodePAREXIST()
        {
            bool returnStatus;
            string returnErrorMessage;
            //List<string> returnMessage;
            List<string> returnMessage = new List<string>();
          
            Models.ENTITYTABLEViewModel ThisViewModel = new Models.ENTITYTABLEViewModel();

            try
            {

                this.TryUpdateModelAsync(ThisViewModel);
                //string projstr = ThisViewModel.PHY_NAME;
                string projstr = "";
                string stradoefcombo = "";
                string progstr = "";
                string tablestr = "";   //new  TOPGRID table

                //string progstr = "";
                string strpkid = "";
                string column1str = "";
                string column1type = "";
                string column2str = "";
                string column2type = "";
                string column3str = "";
                string column3type = "";
                string column4str = "";
                string column4type = "";
                string childprog2str = "Child";  //another TOPINNERGRID table name
                string childprog1str = "";  //TOPINNERGRID prog name
                string comboprogstr = "";
                string strcomboclicked = "false"; //COMBOGRID flagged(checked) to be used - within TOPGRID Detail page
                string childchildprogstr = "";    //INNERGRID prog name
                string strchild1pkid = "";
                string strchildchild1pkid = "";

                tablestr = ThisViewModel.tablename;
                progstr = ThisViewModel.progname;
                //progstr = ThisViewModel.tablename + "7";
                strpkid = ThisViewModel.primarykey;
                column1str = ThisViewModel.column1;
                column1type = ThisViewModel.column1type;
                column2str = ThisViewModel.column2;
                column2type = ThisViewModel.column2type;
                column3str = ThisViewModel.column3;
                column3type = ThisViewModel.column3type;
                column4str = ThisViewModel.column4;
                column4type = ThisViewModel.column4type;

                //First check for Duplicate program name
                string chk = "";
                string infile = "appAPP.csproj";
                //var FileName = HttpContext.Server.MapPath(infile);
                var FileName = Path.Combine(_Env.ContentRootPath, infile);


                string newline = progstr + "Controller.cs";

                string getContFolder = "Controllers/";
                string[] filescontfound = System.IO.Directory.GetFiles(Path.Combine(_Env.ContentRootPath, getContFolder));

                for (int i = 0; i < filescontfound.Length; i++)
                {
                    string ss = filescontfound[i];
                    if (ss.Contains(newline))
                    //if (ss == newline)
                    {
                        chk = "foundDuplicate";  //so found a duplicate
                    }
                }

                returnStatus = true;

                if (chk == "foundDuplicate")  //so found a duplicate, do not proceed
                {
                    returnStatus = false;
                    returnErrorMessage = "Program Name, is a Duplicate, Please rename it.";
                    returnMessage.Add(returnErrorMessage);

                }
                else
                {

                    //---------------------------------------------------------------------------------------------------------------------
                    //Create new View folder in this VS Solution - TOPGRID - there always be a TOPGRID
                    //---------------------------------------------------------------------------------------------------------------------
                    string newViewFolder = "Views/" + progstr;
                    //new Microsoft.VisualBasic.Devices.Computer().FileSystem.CreateDirectory(HttpContext.Server.MapPath(newViewFolder));
                    //Directory.CreateDirectory(Path.Combine(_Env.ContentRootPath, newViewFolder));
                    System.IO.Directory.CreateDirectory(Path.Combine(_Env.ContentRootPath, newViewFolder));

                    //next is new to external cs library
                    if (TopGridMake.Class1.TopGridGenerate(_Env.ContentRootPath, projstr, progstr, strpkid, column1str, column1type, column2str, column2type, column3str, column3type, column4str, column4type, childprog1str, childprog2str, strcomboclicked, comboprogstr, stradoefcombo, tablestr, strchild1pkid, childchildprogstr, strchildchild1pkid) == true)
                    {
                        returnStatus = true;
                        returnErrorMessage = "Done";
                        returnMessage.Add(returnErrorMessage);
                    }
                    else
                    {
                        returnStatus = false;
                        returnErrorMessage = "Generate Failed.";
                        returnMessage.Add(returnErrorMessage);
                    }


                    //returnStatus = true;
                    //returnErrorMessage = "Done";
                    //returnMessage.Add(returnErrorMessage);
                }



                ThisViewModel.ReturnMessage = returnMessage;
                ThisViewModel.ReturnStatus = returnStatus;

                return Json(ThisViewModel);

            }
            catch (Exception ex)
            {
                List<string> outputMessages = new List<string>();

                returnStatus = false;
                outputMessages.Add(ex.Message);

                ThisViewModel.ReturnMessage = outputMessages;
                ThisViewModel.ReturnStatus = returnStatus;

                return Json(ThisViewModel);

            }

        }



        private void CreateParentTable(string projstr, string progstr, string strpkid, string column1str, string column1type, string column2str, string column2type, string column3str, string column3type, string column4str, string column4type, string childprog1str, string childprog2str, string strcomboclicked, string comboprogstr, string stradoefcombo, string tablestr, string strchild1pkid, string childchildprogstr, string strchildchild1pkid, out bool returnStatus,
            out string returnErrorMessage)
        {

            SqlConnection connection;
            connection = new SqlConnection();

            string DBConnectString = _iconfiguration.GetSection("Data").GetSection("ConnectString").Value;

            //string connectionString = "Server=localhost\\SQLEXPRESS;Database=appAPP;Trusted_Connection=True";
            //connection.ConnectionString = connectionString;

            connection.ConnectionString = DBConnectString;

            if (column1type == "Char")
            {
                column1type = "varchar(500)";
            }
            if (column2type == "Char")
            {
                column2type = "varchar(500)";
            }
            if (column3type == "Char")
            {
                column3type = "varchar(500)";
            }
            if (column4type == "Char")
            {
                column4type = "varchar(500)";
            }

            if (column1type == "Date")
            {
                column1type = "datetime";
            }
            if (column2type == "Date")
            {
                column2type = "datetime";
            }
            if (column3type == "Date")
            {
                column3type = "datetime";
            }
            if (column4type == "Date")
            {
                column4type = "datetime";
            }

            if (column1type == "Integer")
            {
                column1type = "int";
            }
            if (column2type == "Integer")
            {
                column2type = "int";
            }
            if (column3type == "Integer")
            {
                column3type = "int";
            }
            if (column4type == "Integer")
            {
                column4type = "int";
            }

            if (column1type == "Decimal")
            {
                column1type = "money";
            }
            if (column2type == "Decimal")
            {
                column2type = "money";
            }
            if (column3type == "Decimal")
            {
                column3type = "money";
            }
            if (column4type == "Decimal")
            {
                column4type = "money";
            }


            string query3 = "CREATE TABLE " + tablestr +  
                " (" + strpkid + " bigint IDENTITY(1,1) NOT NULL, " + 
                  column1str + " " + column1type + " NULL, " +
                  column2str + " " + column2type + " NULL, " +
                  column3str + " " + column3type + " NULL, " +
                  column4str + " " + column4type + " NULL, " +
                  "CONSTRAINT PK_" + tablestr + " PRIMARY KEY (" + strpkid + ")" +
               ");";


            /*
            string query3 = "CREATE TABLE " + tablestr +
                " (" + strpkid + " bigint IDENTITY(1,1) NOT NULL, " +
                  column1str + " nvarchar(50) NULL, " +
                  column2str + " nvarchar(50) NULL, " +
                  column3str + " datetime NULL, " +
                  column4str + " datetime NULL, " +
                  "CONSTRAINT PK_" + tablestr + " PRIMARY KEY (" + strpkid + ")" +
               ");";
               */

            SqlCommand cmd = new SqlCommand(query3, connection);
                try
                {
                    connection.Open();
                    cmd.ExecuteNonQuery();
                }
                catch (SqlException e)
                {
                    string err = e.Message;
                    returnErrorMessage = e.Message;
                    returnStatus = false;
                }
                finally
                {
                    connection.Close();

                    returnErrorMessage = "";
                    returnStatus = true;
                }

        }



        public JsonResult GenerateCodeDEL()
        {
            bool returnStatus;
            string returnErrorMessage;
            //List<string> returnMessage;
            List<string> returnMessage = new List<string>();
            Models.ENTITYTABLEViewModel ThisViewModel = new Models.ENTITYTABLEViewModel();

            try
            {

                this.TryUpdateModelAsync(ThisViewModel);
                string progstr = "";
              
                string tablestr = ThisViewModel.tablename;
                progstr = ThisViewModel.progname;

                returnStatus = true;
                if (progstr == null || progstr == "")
                {
                    List<string> outputMessagesk = new List<string>();

                    returnStatus = false;
                    outputMessagesk.Add("Program Name invalid!");

                    ThisViewModel.ReturnMessage = outputMessagesk;
                    ThisViewModel.ReturnStatus = returnStatus;

                    //return Json(ThisViewModel);
                    return new JsonResult(ThisViewModel);

                }


                //---------------------------------------------------------------------------------------------------------------------
                // Attempt to DELETE Parent Table now
                //---------------------------------------------------------------------------------------------------------------------
                DeleteParentTable(
                    tablestr,
                    out returnStatus,
                    out returnErrorMessage);

                if (returnStatus == false)  //failed to Create Table, so go back with error
                {
                    //List<string> outputMessages = new List<string>();
                    //outputMessages.Add(returnErrorMessage);
                    List<string> outputMessages = new List<string>
                        {
                            returnErrorMessage
                        };

                    ThisViewModel.ReturnMessage = outputMessages;
                    ThisViewModel.ReturnStatus = returnStatus;

                    return Json(ThisViewModel);

                }
                //---------------------------------------------------------------------------------------------------------------------
                // END to DELETE Parent Table now
                //---------------------------------------------------------------------------------------------------------------------
               

                //next is new to external cs library
                if (TopGridMake.Class1.TopGridDelete(_Env.ContentRootPath, progstr) == true)
                {
                    returnStatus = true;
                    returnErrorMessage = "Done";
                    returnMessage.Add(returnErrorMessage);
                }
                else
                {
                    returnStatus = false;
                    returnErrorMessage = "Delete Failed.";
                    returnMessage.Add(returnErrorMessage);
                }


                //returnStatus = true;
                //returnErrorMessage = "Done";
                //returnMessage.Add(returnErrorMessage);

                ThisViewModel.ReturnMessage = returnMessage;
                ThisViewModel.ReturnStatus = returnStatus;

                //var modelJsonk = JsonSerializer.Deserialize<ThisViewModel>(jsonString, null);
                //return Json(ThisViewModel);
                return new JsonResult(ThisViewModel);
                //return modelJson;

            }
            catch (Exception ex)
            {
                List<string> outputMessages = new List<string>();

                returnStatus = false;
                outputMessages.Add(ex.Message);

                ThisViewModel.ReturnMessage = outputMessages;
                ThisViewModel.ReturnStatus = returnStatus;

                //return Json(ThisViewModel);
                return new JsonResult(ThisViewModel);

            }

        }


        public JsonResult GenerateCodeDELEXIST()
        {
            bool returnStatus;
            string returnErrorMessage;
            //List<string> returnMessage;
            List<string> returnMessage = new List<string>();
            Models.ENTITYTABLEViewModel ThisViewModel = new Models.ENTITYTABLEViewModel();

            try
            {


                this.TryUpdateModelAsync(ThisViewModel);
                string progstr = "";

                string tablestr = ThisViewModel.tablename;
                progstr = ThisViewModel.progname;

                returnStatus = true;
                if (progstr == null || progstr == "")
                {
                    List<string> outputMessagesk = new List<string>();

                    returnStatus = false;
                    outputMessagesk.Add("Program Name invalid!");

                    ThisViewModel.ReturnMessage = outputMessagesk;
                    ThisViewModel.ReturnStatus = returnStatus;

                    //return Json(ThisViewModel);
                    return new JsonResult(ThisViewModel);

                }

                //next is new to external cs library
                if (TopGridMake.Class1.TopGridDelete(_Env.ContentRootPath, progstr) == true)
                {
                    returnStatus = true;
                    returnErrorMessage = "Done";
                    returnMessage.Add(returnErrorMessage);
                }
                else
                {
                    returnStatus = false;
                    returnErrorMessage = "Delete Failed.";
                    returnMessage.Add(returnErrorMessage);
                }



                //returnStatus = true;
                //returnErrorMessage = "Done";
                //returnMessage.Add(returnErrorMessage);

                ThisViewModel.ReturnMessage = returnMessage;
                ThisViewModel.ReturnStatus = returnStatus;

                //var modelJsonk = JsonSerializer.Deserialize<ThisViewModel>(jsonString, null);
                //return Json(ThisViewModel);
                return new JsonResult(ThisViewModel);
                //return modelJson;

            }
            catch (Exception ex)
            {
                List<string> outputMessages = new List<string>();

                returnStatus = false;
                outputMessages.Add(ex.Message);

                ThisViewModel.ReturnMessage = outputMessages;
                ThisViewModel.ReturnStatus = returnStatus;

                //return Json(ThisViewModel);
                return new JsonResult(ThisViewModel);

            }

        }


        private void DeleteParentTable(string tablestr, out bool returnStatus,
            out string returnErrorMessage)
        {

            SqlConnection connection;
            connection = new SqlConnection();

            string DBConnectString = _iconfiguration.GetSection("Data").GetSection("ConnectString").Value;

            connection.ConnectionString = DBConnectString;
            //connection.Open();

            string query3 = "DROP TABLE " + tablestr + "";

            SqlCommand cmd = new SqlCommand(query3, connection);
            try
            {
                connection.Open();
                cmd.ExecuteNonQuery();
            }
            catch (SqlException e)
            {
                string err = e.Message;
                returnErrorMessage = e.Message;
                returnStatus = false;
            }
            finally
            {
                connection.Close();
                returnErrorMessage = "";
                returnStatus = true;
            }


        }


        public JsonResult GenerateCodeDELChildPOnly()
        {
            bool returnStatus;
            string returnErrorMessage;
            //List<string> returnMessage;
            List<string> returnMessage = new List<string>();
            Models.ENTITYTABLEViewModel ThisViewModel = new Models.ENTITYTABLEViewModel();

            try
            {

                this.TryUpdateModelAsync(ThisViewModel);
                string progstr = "";
                string currentChild = "";
                //int readcounter = 0;
                string parenterprogstr = "";

                string tablestr = ThisViewModel.ChildtableName;   //new
                //progstr = ThisViewModel.tablename + "7";
                progstr = ThisViewModel.CurrentProgName;
                currentChild = ThisViewModel.CurrentChildNo;
                parenterprogstr = ThisViewModel.ParenterProgName;

                returnStatus = true;
                //new
                if (progstr == null || progstr == "")
                {
                    List<string> outputMessagesk = new List<string>();

                    returnStatus = false;
                    outputMessagesk.Add("Program Name invalid!");

                    ThisViewModel.ReturnMessage = outputMessagesk;
                    ThisViewModel.ReturnStatus = returnStatus;

                    //return Json(ThisViewModel);
                    return new JsonResult(ThisViewModel);

                }

                //next is new to external cs library
                if (TopInnerMake.Class1.TopInnerGridDelete(_Env.ContentRootPath, progstr, parenterprogstr, currentChild) == true)
                {
                    returnStatus = true;
                    returnErrorMessage = "Done";
                    returnMessage.Add(returnErrorMessage);
                }
                else
                {
                    returnStatus = false;
                    returnErrorMessage = "Child Delete Failed.";
                    returnMessage.Add(returnErrorMessage);
                }



                //returnStatus = true;
                //returnErrorMessage = "Done";
                //returnMessage.Add(returnErrorMessage);

                ThisViewModel.ReturnMessage = returnMessage;
                ThisViewModel.ReturnStatus = returnStatus;

                return Json(ThisViewModel);

            }
            catch (Exception ex)
            {
                List<string> outputMessages = new List<string>();

                returnStatus = false;
                outputMessages.Add(ex.Message);

                ThisViewModel.ReturnMessage = outputMessages;
                ThisViewModel.ReturnStatus = returnStatus;

                return Json(ThisViewModel);

            }

        }


        public JsonResult GenerateCodeDELChild()
        {
            bool returnStatus;
            string returnErrorMessage;
            //List<string> returnMessage;
            List<string> returnMessage = new List<string>();
            Models.ENTITYTABLEViewModel ThisViewModel = new Models.ENTITYTABLEViewModel();

            try
            {

                this.TryUpdateModelAsync(ThisViewModel);
                string progstr = "";
                string currentChild = "";
                //int readcounter = 0;
                string parenterprogstr = "";

                string tablestr = ThisViewModel.ChildtableName;   //new
                //progstr = ThisViewModel.tablename + "7";
                progstr = ThisViewModel.CurrentProgName;
                currentChild = ThisViewModel.CurrentChildNo;
                parenterprogstr = ThisViewModel.ParenterProgName;

                returnStatus = true;
                //new
                if (progstr == null || progstr == "")
                {
                    List<string> outputMessagesk = new List<string>();

                    returnStatus = false;
                    outputMessagesk.Add("Program Name invalid!");

                    ThisViewModel.ReturnMessage = outputMessagesk;
                    ThisViewModel.ReturnStatus = returnStatus;

                    //return Json(ThisViewModel);
                    return new JsonResult(ThisViewModel);

                }



                //---------------------------------------------------------------------------------------------------------------------
                // Attempt to DELETE Child Table now
                //---------------------------------------------------------------------------------------------------------------------
                DeleteParentTable(
                    tablestr,
                    out returnStatus,
                    out returnErrorMessage);

                if (returnStatus == false)  //failed to Create Table, so go back with error
                {
                    //List<string> outputMessages = new List<string>();
                    //outputMessages.Add(returnErrorMessage);
                    List<string> outputMessages = new List<string>
                        {
                            returnErrorMessage
                        };

                    ThisViewModel.ReturnMessage = outputMessages;
                    ThisViewModel.ReturnStatus = returnStatus;

                    return Json(ThisViewModel);

                }
                //---------------------------------------------------------------------------------------------------------------------
                // END to DELETE Child Table now
                //---------------------------------------------------------------------------------------------------------------------
               

                //next is new to external cs library
                if (TopInnerMake.Class1.TopInnerGridDelete(_Env.ContentRootPath, progstr, parenterprogstr, currentChild) == true)
                {
                    returnStatus = true;
                    returnErrorMessage = "Done";
                    returnMessage.Add(returnErrorMessage);
                }
                else
                {
                    returnStatus = false;
                    returnErrorMessage = "Child Delete Failed.";
                    returnMessage.Add(returnErrorMessage);
                }



                //returnStatus = true;
                //returnErrorMessage = "Done";
                //returnMessage.Add(returnErrorMessage);

                ThisViewModel.ReturnMessage = returnMessage;
                ThisViewModel.ReturnStatus = returnStatus;

                return Json(ThisViewModel);

            }
            catch (Exception ex)
            {
                List<string> outputMessages = new List<string>();

                returnStatus = false;
                outputMessages.Add(ex.Message);

                ThisViewModel.ReturnMessage = outputMessages;
                ThisViewModel.ReturnStatus = returnStatus;

                return Json(ThisViewModel);

            }

        }


        public JsonResult GenerateCodeDELGrandChildPOnly()
        {
            bool returnStatus;
            string returnErrorMessage;
            //List<string> returnMessage;
            List<string> returnMessage = new List<string>();
            Models.ENTITYTABLEViewModel ThisViewModel = new Models.ENTITYTABLEViewModel();

            try
            {

                //this.TryUpdateModel(ThisViewModel);
                this.TryUpdateModelAsync(ThisViewModel);
                string progstr = "";
                string currentChild = "";
                //int readcounter = 0;
                string parenterprogstr = "";
                string toperprogstr = "";

                //tablestr = ThisViewModel.tablename;
                //progstr = ThisViewModel.tablename + "7";
                string tablestr = ThisViewModel.ChildtableName;   //new

                progstr = ThisViewModel.CurrentProgName;
                currentChild = ThisViewModel.CurrentChildNo;
                parenterprogstr = ThisViewModel.ParenterProgName;
                toperprogstr = ThisViewModel.ToperProgName;  //for Grand Child deletion ONLY

                returnStatus = true;
                //new
                if (progstr == null || progstr == "")
                {
                    List<string> outputMessagesk = new List<string>();

                    returnStatus = false;
                    outputMessagesk.Add("Program Name invalid!");

                    ThisViewModel.ReturnMessage = outputMessagesk;
                    ThisViewModel.ReturnStatus = returnStatus;

                    //return Json(ThisViewModel);
                    return new JsonResult(ThisViewModel);

                }


                //next is new to external cs library
                if (InnerMake.Class1.InnerGridDelete(_Env.ContentRootPath, progstr, parenterprogstr, currentChild, toperprogstr) == true)
                {
                    returnStatus = true;
                    returnErrorMessage = "Done";
                    returnMessage.Add(returnErrorMessage);
                }
                else
                {
                    returnStatus = false;
                    returnErrorMessage = "Grand Child Delete Failed.";
                    returnMessage.Add(returnErrorMessage);
                }


                //returnStatus = true;
                //returnErrorMessage = "Done";
                //returnMessage.Add(returnErrorMessage);

                ThisViewModel.ReturnMessage = returnMessage;
                ThisViewModel.ReturnStatus = returnStatus;

                return Json(ThisViewModel);

            }
            catch (Exception ex)
            {
                List<string> outputMessages = new List<string>();

                returnStatus = false;
                outputMessages.Add(ex.Message);

                ThisViewModel.ReturnMessage = outputMessages;
                ThisViewModel.ReturnStatus = returnStatus;

                return Json(ThisViewModel);

            }

        }

        public JsonResult GenerateCodeDELGrandChild()
        {
            bool returnStatus;
            string returnErrorMessage;
            //List<string> returnMessage;
            List<string> returnMessage = new List<string>();
            Models.ENTITYTABLEViewModel ThisViewModel = new Models.ENTITYTABLEViewModel();

            try
            {

                //this.TryUpdateModel(ThisViewModel);
                this.TryUpdateModelAsync(ThisViewModel);
                string progstr = "";
                string currentChild = "";
                //int readcounter = 0;
                string parenterprogstr = "";
                string toperprogstr = "";

                //tablestr = ThisViewModel.tablename;
                //progstr = ThisViewModel.tablename + "7";
                string tablestr = ThisViewModel.ChildtableName;   //new

                progstr = ThisViewModel.CurrentProgName;
                currentChild = ThisViewModel.CurrentChildNo;
                parenterprogstr = ThisViewModel.ParenterProgName;
                toperprogstr = ThisViewModel.ToperProgName;  //for Grand Child deletion ONLY

                returnStatus = true;
                //new
                if (progstr == null || progstr == "")
                {
                    List<string> outputMessagesk = new List<string>();

                    returnStatus = false;
                    outputMessagesk.Add("Program Name invalid!");

                    ThisViewModel.ReturnMessage = outputMessagesk;
                    ThisViewModel.ReturnStatus = returnStatus;

                    //return Json(ThisViewModel);
                    return new JsonResult(ThisViewModel);

                }


                //---------------------------------------------------------------------------------------------------------------------
                // Attempt to DELETE Grand Child Table now
                //---------------------------------------------------------------------------------------------------------------------
                DeleteParentTable(
                    tablestr,
                    out returnStatus,
                    out returnErrorMessage);

                if (returnStatus == false)  //failed to Create Table, so go back with error
                {
                    //List<string> outputMessages = new List<string>();
                    //outputMessages.Add(returnErrorMessage);
                    List<string> outputMessages = new List<string>
                        {
                            returnErrorMessage
                        };

                    ThisViewModel.ReturnMessage = outputMessages;
                    ThisViewModel.ReturnStatus = returnStatus;

                    return Json(ThisViewModel);

                }
              

                //next is new to external cs library
                if (InnerMake.Class1.InnerGridDelete(_Env.ContentRootPath, progstr, parenterprogstr, currentChild, toperprogstr) == true)
                {
                    returnStatus = true;
                    returnErrorMessage = "Done";
                    returnMessage.Add(returnErrorMessage);
                }
                else
                {
                    returnStatus = false;
                    returnErrorMessage = "Grand Child Delete Failed.";
                    returnMessage.Add(returnErrorMessage);
                }




                //returnStatus = true;
                //returnErrorMessage = "Done";
                //returnMessage.Add(returnErrorMessage);

                ThisViewModel.ReturnMessage = returnMessage;
                ThisViewModel.ReturnStatus = returnStatus;

                return Json(ThisViewModel);

            }
            catch (Exception ex)
            {
                List<string> outputMessages = new List<string>();

                returnStatus = false;
                outputMessages.Add(ex.Message);

                ThisViewModel.ReturnMessage = outputMessages;
                ThisViewModel.ReturnStatus = returnStatus;

                return Json(ThisViewModel);

            }

        }




        public bool CheckDupTableName(long PHYID, string sectorName, out bool returnStatus,
            out string returnErrorMessage)
        {

            try
            {
                bool chkname = false;

                StringBuilder sqlBuilder = new StringBuilder();

                string sqlString = "SELECT sector_name, COUNT(1) as CNT FROM ENTITYTABLE WHERE PHY_ID = @PK_ID AND sector_name = @SectName group by sector_name";

                UtilitiesBLL UtilitiesBLLget = new UtilitiesBLL();
                SqlConnection connection = UtilitiesBLLget.CreateConnectionRMSPROD(out returnStatus, out returnErrorMessage); //SQL Server

                SqlCommand sqlCommand = new SqlCommand();
                sqlCommand.CommandType = CommandType.Text;
                sqlCommand.Connection = connection;
                sqlCommand.CommandText = sqlString;

                SqlParameter param1 = new SqlParameter("@PK_ID", SqlDbType.BigInt);
                param1.Value = PHYID;
                //param1.Value = 312;
                sqlCommand.Parameters.Add(param1);

                SqlParameter param2 = new SqlParameter("@SectName", SqlDbType.Char);
                param2.Value = sectorName;
                sqlCommand.Parameters.Add(param2);


                SqlDataReader dataReader = sqlCommand.ExecuteReader();

                while (dataReader.Read() == true)
                {
                    if (Convert.ToInt32(dataReader["CNT"]) > 1)
                    {
                        chkname = true;
                    }

                }

                connection.Close();

                returnStatus = chkname;
                returnErrorMessage = "Error";

                return chkname;
                //return true;

            }
            catch (Exception ex)
            {
                returnStatus = false;
                returnErrorMessage = ex.Message;

                return false;

            }


        }



    }
}
