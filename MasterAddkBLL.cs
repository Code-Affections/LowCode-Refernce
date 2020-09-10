using System;
using System.Collections.Generic;
using System.Reflection;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
//using System.Linq.Dynamic;
using System.Threading.Tasks;
//using Microsoft.Office.Interop;
using appMODEL;
//using appBLL;
//using System.Data.OracleClient;  //Microsoft Oracle Client (not used anymore)
//using Oracle.DataAccess.Client;
//using Oracle.DataAccess.Types;
using System.IO;
using Microsoft.VisualBasic;
using System.Data.OleDb;
using System.Xml;
using System.Runtime.InteropServices;
//using NPOI.HSSF.UserModel;
//using NPOI.HSSF.Util;
//using NPOI.SS.UserModel;
//using NPOI.HPSF;
//using NPOI.POIFS.FileSystem;
//using NPOI.XSSF.UserModel;
//using NPOI.XSSF.Util;
//using NPOI.XSSF.Model;
using System.Web;

namespace appBLL
{
    /// <summary>
    /// GLOBAL Business Logic Layer
    /// </summary>
    public class MasterAddkBLL
    {

        /// <summary>
        /// Uses PAGING GRID Query to get 1 page at a time.
        /// By internal SQL statement
        /// </summary>
        public List<MasterAddk> MasterAddkSearch(
            MasterAddk SearchValues,
            long currentPageNumber,
            long pageSize,
            string sortBy,
            string sortAscendingDescending,
            out long totalRows,
            out long totalPages,
            out long pageRows,
            out bool returnStatus,
            out string returnErrorMessage)
        {

            long currentRow;
            long result;

            try
            {
                totalPages = 0;
                totalRows = 0;
               pageRows = 0;
               double timediff = SearchValues.TimeDiff;     //getting local time difference from UTC, from javascript on client

                List<MasterAddk> GridList = new List<MasterAddk>();
                
                DataTable scriptDataTable = GetMasterAddk(SearchValues,
                    currentPageNumber,
                    pageSize,
                    sortBy,
                    sortAscendingDescending,
                    out totalRows,
                    out returnStatus,
                    out returnErrorMessage);

                if (returnStatus == false)
                {
                    return GridList;
                }

                //totalRows = scriptDataTable.Rows.Count;
                totalPages = 0;

                Math.DivRem(totalRows, pageSize, out result);
                if (result > 0)
                    totalPages = Convert.ToInt64(totalRows / pageSize) + 1;
                else
                    totalPages = Convert.ToInt64(totalRows / pageSize);

                currentRow = 0;

                for (int i = 0; i < scriptDataTable.Rows.Count; i++)
                {
                        currentRow++;

                        MasterAddk recList = new MasterAddk();

                        recList.id = scriptDataTable.Rows[i]["id"] != DBNull.Value ? Convert.ToInt64(scriptDataTable.Rows[i]["id"]) : 0;

                        recList.Table_Name = scriptDataTable.Rows[i]["Table_Name"] != DBNull.Value ? scriptDataTable.Rows[i]["Table_Name"].ToString() : "";



                        recList.Field_Name = scriptDataTable.Rows[i]["Field_Name"] != DBNull.Value ? scriptDataTable.Rows[i]["Field_Name"].ToString() : "";



                        recList.Data_Type = scriptDataTable.Rows[i]["Data_Type"] != DBNull.Value ? scriptDataTable.Rows[i]["Data_Type"].ToString() : "";
           



                        recList.Length_Size = scriptDataTable.Rows[i]["Length_Size"] != DBNull.Value ? Convert.ToInt32(scriptDataTable.Rows[i]["Length_Size"]) : 0;



                        GridList.Add(recList);

                }
                
                pageRows = currentRow;

                returnErrorMessage = "";
                returnStatus = true;
                return GridList;

            }
            catch (Exception ex)
            {
                returnErrorMessage = ex.Message;
                returnStatus = false;
                totalPages = 0;
                totalRows = 0;
                pageRows = 0;

                List<MasterAddk> GridList = new List<MasterAddk>();
             
                return GridList;
            }

        }


        /// <summary>
        /// Get Scripts -  SQL SERVER ONLY
        /// Uses PAGING GRID Query to get 1 page at a time.
        /// By internal SQL statements
        /// </summary>
        public DataTable GetMasterAddk(
            MasterAddk scriptSearchValues,
            long currentPageNumber,
            long pageSize,
            string sortBy,
            string sortAscendingDescending,
            out long TotalRecords,
            out bool returnStatus,
            out string returnErrorMessage)
        {

            //UtilitiesBLL UtilitiesBLL = new UtilitiesBLL();
            //SqlConnection connection = UtilitiesBLL.CreateConnectionRMSPROD(out returnStatus, out returnErrorMessage); //SQL Server
            //OracleConnection connection = CreateConnectionOracle(out returnStatus, out returnErrorMessage);  //Oracle
            SqlConnection connection;
            connection = new SqlConnection();

            try
            {
                long StartPoint;
                long EndPoint;
                String strfilter = "";
                bool GlobalSearchSQL = false;

                DataSet scriptData = new DataSet();

                //SqlConnection connection;                                                                                                        //connectionString = System.Configuration.ConfigurationManager.AppSettings["ScriptDatabase"];
                //String connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["RMS-PROD"].ToString();
                //String connectionString = "Server=(localdb)\\mssqllocaldb;Database=AHIM;Trusted_Connection=True;";
                //String connectString = "Data Source=(localdb)\\mssqllocaldb;Database=AHIM;Trusted_Connection=True;MultipleActiveResultSets=true";

                String connectionString = scriptSearchValues.DBConnectString;

                //connection = new SqlConnection();
                connection.ConnectionString = connectionString;
                connection.Open();

                SqlCommand scriptCommand = new SqlCommand();
                scriptCommand.CommandType = CommandType.Text;
                scriptCommand.Connection = connection;


                String strFields = "id, Table_Name, Field_Name, ";
                strFields = strFields + "Data_Type, Length_Size ";

                String strTableold = "viewTables ";

                String strTable = " (SELECT TOP (100) PERCENT ROW_NUMBER() OVER (ORDER BY o.name) AS id, ";
                strTable = strTable + "OBJECT_SCHEMA_NAME(c.object_id) AS SchemaName, o.name AS Table_Name, c.name AS Field_Name, ";
                strTable = strTable + "t.name AS Data_Type, t.max_length AS Length_Size, t.precision ";
                strTable = strTable + "FROM sys.columns AS c INNER JOIN ";
                strTable = strTable + "sys.objects AS o ON o.object_id = c.object_id LEFT OUTER JOIN ";
                strTable = strTable + "sys.types AS t ON t.user_type_id = c.user_type_id ";
                strTable = strTable + "WHERE (o.type = 'U') ORDER BY Table_Name, Field_Name ) as KLE";
               

                strfilter = " WHERE 1=1 ";


                //Next code will have to be done manually, depending if any columns are Char
                //if (scriptSearchValues.GlobalSearchString != null)
                //{
                    //GlobalSearchSQL = true;
                    //strfilter = strfilter + " AND ( ";

                    //strfilter = strfilter + " UPPER(Table_Name) LIKE @ppt1 OR  ";
                    //SqlParameter param1 = new SqlParameter("@ppt1", SqlDbType.VarChar);
                    //param1.Value = "%" + scriptSearchValues.GlobalSearchString.ToUpper().Trim() + "%";
                    //scriptCommand.Parameters.Add(param1);

                    //strfilter = strfilter + " UPPER(Field_Name) LIKE @ppt2  ";
                    //SqlParameter param2 = new SqlParameter("@ppt2", SqlDbType.VarChar);
                    //param2.Value = "%" + scriptSearchValues.GlobalSearchString.ToUpper().Trim() + "%";
                    //scriptCommand.Parameters.Add(param2);

                    //strfilter = strfilter + " ) ";
                //}


                if (GlobalSearchSQL == false)  //OK use normal individual Search strings
                {
                    if (scriptSearchValues.Table_Name != null)
                    {
                        strfilter = strfilter + " AND UPPER(Table_Name) = @ppt1 ";
                        SqlParameter param1 = new SqlParameter("@ppt1", SqlDbType.VarChar);
                        param1.Value = "" + scriptSearchValues.Table_Name.ToUpper().Trim() + "";
                        scriptCommand.Parameters.Add(param1);
                    }





                    if (scriptSearchValues.Field_Name != null)
                    {
                        strfilter = strfilter + " AND UPPER(Field_Name) LIKE @ppt2 ";
                        SqlParameter param2 = new SqlParameter("@ppt2", SqlDbType.VarChar);
                        param2.Value = "%" + scriptSearchValues.Field_Name.ToUpper().Trim() + "%";
                        scriptCommand.Parameters.Add(param2);
                    }





                    if (scriptSearchValues.Data_Type != null)
                    {
                        strfilter = strfilter + " AND UPPER(Data_Type) LIKE @ppt3 ";
                        SqlParameter param3 = new SqlParameter("@ppt3", SqlDbType.VarChar);
                        param3.Value = "%" + scriptSearchValues.Data_Type.ToUpper().Trim() + "%";
                        scriptCommand.Parameters.Add(param3);
                    }






                    if (scriptSearchValues.Length_Size != 0)
                    {
                        strfilter = strfilter + " AND Length_Size = @ppt4 ";
                        SqlParameter param4 = new SqlParameter("@ppt4", SqlDbType.Int);
                        param4.Value = scriptSearchValues.Length_Size;
                        scriptCommand.Parameters.Add(param4);
                    }



                    //if (scriptSearchValues.Data_Type_Str != null)
                    //{
                        //SqlParameter param11 = new SqlParameter("@ppt3", SqlDbType.DateTime);
                        //param11.Value = "" + scriptSearchValues.Data_Type_Str.ToUpper().Trim() + "";
                        //scriptCommand.Parameters.Add(param11);

                       // if (scriptSearchValues.Length_Size_Str != null)
                       // {
                           // sqlWhereClause.Append(" AND Data_Type BETWEEN @ppt3 AND @ppt4 ");
                            //SqlParameter param12 = new SqlParameter("@ppt4", SqlDbType.DateTime);
                            //param12.Value = "" + scriptSearchValues.Length_Size_Str.ToUpper().Trim() + "";
                            //scriptCommand.Parameters.Add(param12);
                        //}
                    //}


                }


                String strWherePK = "WHERE id = @PKID ";
                SqlParameter parampk = new SqlParameter("@PKID", SqlDbType.BigInt);
                parampk.Value = scriptSearchValues.id;
                scriptCommand.Parameters.Add(parampk);


                String strsort = "";
                if (sortBy == "MasterAddkFirstCol")
                {
                    strsort = strsort + " ORDER BY id ";
                }
                else if (sortBy == "MasterAddkSecondCol")
                {
                    strsort = strsort + " ORDER BY Table_Name ";
                }
                else if (sortBy == "MasterAddkThirdCol")
                {
                    strsort = strsort + " ORDER BY Field_Name ";
                }
                else if (sortBy == "MasterAddkFourthColkkkk")
                {
                    strsort = strsort + " ORDER BY Data_Type ";
                }
                else if (sortBy == "MasterAddkFifthCol")
                {
                    strsort = strsort + " ORDER BY Length_Size ";
                }
                else if (sortBy == "MasterAddkSixthCol")
                {
                    //strsort = strsort + " ORDER BY Length_Size ";
                }
                else
                {
                    strsort = strsort + " ORDER BY Table_Name ";
                }

                if (sortAscendingDescending == "DESC")
                {
                    strsort = strsort + " DESC ";
                }
               
                

                if (currentPageNumber == 1)
                {
                    StartPoint = 1;
                }
                else
                {
                    StartPoint = ((currentPageNumber - 1) * pageSize) + 1;
                }
                EndPoint = currentPageNumber * pageSize;

                String strSQL = "";

                TotalRecords = 0;
                //strSQL = "SELECT count(*) FROM " + strTable + strfilter;
                strSQL = "SELECT count(*) FROM " + strTable + strfilter;
                scriptCommand.CommandText = strSQL;
                TotalRecords = Convert.ToInt64(scriptCommand.ExecuteScalar());


                //if PageSize = -1, then creating PDF Report instead, so get all records.
                if (pageSize == -1)
                { 
                    EndPoint = TotalRecords;
                }


                //Check if PK_ID exists, that means coming back from Update/Add popup. PK_ID is 0 for normal grid paging
                strSQL = "";
                if (scriptSearchValues.id != 0)
                {
                    strSQL = "SELECT  " + strFields + " FROM " + strTable + strWherePK;
                    strSQL = strSQL + " UNION ";
                    if (TotalRecords == 0)   //going to show only 1 record
                    {
                        TotalRecords = 1;  //so as to show the one record in grid at least
                    }
                }

                strSQL = strSQL + "SELECT  " + strFields + " FROM ";
                strSQL = strSQL + " (SELECT TOP (@Endit) ROW_NUMBER() OVER (" + strsort + ") ";
                //strSQL = strSQL + " (SELECT TOP " + EndPoint + " ROW_NUMBER() OVER (" + strsort + ") ";
                strSQL = strSQL + " AS Row, " + strFields + " FROM " + strTable + strfilter + ") ";
                strSQL = strSQL + " AS LogWithRowNumbers ";
                strSQL = strSQL + " WHERE Row >= @Startit AND Row <= @Endit " + " ";
                //strSQL = strSQL + " WHERE Row >= " + StartPoint + " AND Row <= " + EndPoint + " ";
                strSQL = strSQL + strsort + " ";



                strSQL = "SELECT " + strFields + " FROM " + strTable + strfilter;

                scriptCommand.CommandText = strSQL;

                scriptCommand.Parameters.AddWithValue("Startit", StartPoint);
                scriptCommand.Parameters.AddWithValue("Endit", EndPoint);

                SqlDataAdapter sqlAdapter = new SqlDataAdapter(scriptCommand);

                sqlAdapter.Fill(scriptData);

               
                //strSQL = "SELECT count(*) FROM " + strTable + strfilter;
                //scriptCommand.CommandText = strSQL;
                //TotalRecords = Convert.ToInt64(scriptCommand.ExecuteScalar());

                //connection.Close();
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                    connection.Dispose();
                }

                returnErrorMessage = "";
                returnStatus = true;

                return scriptData.Tables[0];
            }
            catch (Exception ex)
            {
                TotalRecords = 0;
                returnStatus = false;
                returnErrorMessage = ex.Message;
                //print ("error message is: " + returnErrorMessage);
                //Console.WriteLine("error message is: " + returnErrorMessage);

                DataTable scriptData = new DataTable();
                return scriptData;
            }
            finally
            {
                //connection.Close();
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                    connection.Dispose();
                }
               
            }


        }



        //Replace normcombo with Combo Reference Table/View
        public List<MasterAddkType> GetMasterAddknormcombo(MasterAddk SearchValues, out bool returnStatus,
            out string returnErrorMessage)
        {


           UtilitiesBLL UtilitiesBLLget = new UtilitiesBLL();

           SqlConnection connection;
           connection = new SqlConnection();

            //qlConnection connection = UtilitiesBLLget.CreateConnectionRMSPROD(out returnStatus, out returnErrorMessage); //SQL Server
  
            try
            {

                String connectionString = SearchValues.DBConnectString;

                //connection = new SqlConnection();
                connection.ConnectionString = connectionString;
                connection.Open();

                SqlCommand scriptCommand = new SqlCommand();
                scriptCommand.CommandType = CommandType.Text;
                scriptCommand.Connection = connection;

                //StringBuilder sqlBuilder = new StringBuilder();

                //string sqlString = "SELECT distinct Table_Name FROM viewTables ORDER BY Table_Name ";


                String strTable = " (SELECT TOP (100) PERCENT ROW_NUMBER() OVER (ORDER BY o.name) AS id, ";
                strTable = strTable + "OBJECT_SCHEMA_NAME(c.object_id) AS SchemaName, o.name AS Table_Name, c.name AS Field_Name, ";
                strTable = strTable + "t.name AS Data_Type, t.max_length AS Length_Size, t.precision ";
                strTable = strTable + "FROM sys.columns AS c INNER JOIN ";
                strTable = strTable + "sys.objects AS o ON o.object_id = c.object_id LEFT OUTER JOIN ";
                strTable = strTable + "sys.types AS t ON t.user_type_id = c.user_type_id ";
                strTable = strTable + "WHERE (o.type = 'U') ORDER BY Table_Name, Field_Name ) as KLE";

                string sqlString = "SELECT distinct Table_Name FROM " + strTable;

                //sqlBuilder.Append("SELECT normcombopkid, normcombocol1 FROM normcombo ORDER BY normcombocol1 ");

                //string sqlString = sqlBuilder.ToString();

                //SqlCommand sqlCommand = new SqlCommand();
                //sqlCommand.CommandType = CommandType.Text;
                //sqlCommand.Connection = connection;
                scriptCommand.CommandText = sqlString;

                MasterAddkType vtype;

                List<MasterAddkType> vtypeList = new List<MasterAddkType>();

                SqlDataReader dataReader = scriptCommand.ExecuteReader();

                while (dataReader.Read() == true)
                //if (dataReader.Read())   //for first record only
                {
                    vtype = new MasterAddkType();

                    //vtype.normcombopkid = dataReader["normcombopkid"] != DBNull.Value ? Convert.ToInt64(dataReader["normcombopkid"]) : 0;
                    vtype.MasterAddkTypeName = dataReader["Table_Name"] != DBNull.Value ? dataReader["Table_Name"].ToString() : "";
                   
                    vtypeList.Add(vtype);

                }

                //connection.Close();
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                    connection.Dispose();
                }
               
                returnStatus = true;
                returnErrorMessage = "";

                return vtypeList;

            }
            catch (Exception ex)
            {
                List<MasterAddkType> vtypeList = new List<MasterAddkType>();
                returnStatus = false;
                returnErrorMessage = ex.Message;

                return vtypeList;
            }
            finally
            {
                //connection.Close();
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                    connection.Dispose();
                }
               
            }


        }



        private bool IsNumeric(object value)
        {
            bool Result = false;

            try
            {
                long i = Convert.ToInt64(value);
                Result = true;
            }
            catch
            {
                // Ignore errors 
            }
            return Result;
        }


        private bool IsDouble(object value)
        {
            bool Result = false;

            try
            {
                double i = Convert.ToDouble(value);
                Result = true;
            }
            catch
            {
                // Ignore errors 
            }
            return Result;
        }


        private bool IsDecimal(object value)
        {
            bool Result = false;

            try
            {
                decimal i = Convert.ToDecimal(value);
                Result = true;
            }
            catch
            {
                // Ignore errors 
            }
            return Result;
        }



        public DataSet CreateDataSet<T>(List<T> list)
        {
            //list is nothing or has nothing, return nothing (or add exception handling)
            if (list == null || list.Count == 0) { return null; }

            //get the type of the first obj in the list
            var obj = list[0].GetType();

            //now grab all properties
            var properties = obj.GetProperties();

            //make sure the obj has properties, return nothing (or add exception handling)
            if (properties.Length == 0) { return null; }

            //it does so create the dataset and table
            var dataSet = new DataSet();
            var dataTable = new DataTable();

            //now build the columns from the properties
            var columns = new DataColumn[properties.Length];
            for (int i = 0; i < properties.Length; i++)
            {
                columns[i] = new DataColumn(properties[i].Name, properties[i].PropertyType);
            }

            //add columns to table
            dataTable.Columns.AddRange(columns);

            //now add the list values to the table
            foreach (var item in list)
            {
                //create a new row from table
                var dataRow = dataTable.NewRow();

                //now we have to iterate thru each property of the item and retrieve it's value for the corresponding row's cell
                var itemProperties = item.GetType().GetProperties();

                for (int i = 0; i < itemProperties.Length; i++)
                {
                    dataRow[i] = itemProperties[i].GetValue(item, null);
                }

                //now add the populated row to the table
                dataTable.Rows.Add(dataRow);
            }

            //add table to dataset
            dataSet.Tables.Add(dataTable);

            return dataSet;
        }

        public DataTable CreateDataTable<T>(List<T> list)
        {
            //list is nothing or has nothing, return nothing (or add exception handling)
            if (list == null || list.Count == 0) { return null; }

            //get the type of the first obj in the list
            var obj = list[0].GetType();

            //now grab all properties
            var properties = obj.GetProperties();

            //make sure the obj has properties, return nothing (or add exception handling)
            if (properties.Length == 0) { return null; }

            //it does so create the dataset and table
            var dataSet = new DataSet();
            var dataTable = new DataTable();

            //now build the columns from the properties
            var columns = new DataColumn[properties.Length];
            for (int i = 0; i < properties.Length; i++)
            {
                columns[i] = new DataColumn(properties[i].Name, properties[i].PropertyType);
            }

            //add columns to table
            dataTable.Columns.AddRange(columns);

            //now add the list values to the table
            foreach (var item in list)
            {
                //create a new row from table
                var dataRow = dataTable.NewRow();

                //now we have to iterate thru each property of the item and retrieve it's value for the corresponding row's cell
                var itemProperties = item.GetType().GetProperties();

                for (int i = 0; i < itemProperties.Length; i++)
                {
                    dataRow[i] = itemProperties[i].GetValue(item, null);
                }

                //now add the populated row to the table
                dataTable.Rows.Add(dataRow);
            }

            //add table to dataset
            //dataSet.Tables.Add(dataTable);

            //return dataset
            return dataTable;
        }






    }

}
