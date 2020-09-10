using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using System;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Reflection;
using System.Text;
//using NPOI.HSSF.UserModel;
//using NPOI.HSSF.Util;
//using NPOI.HPSF;
//using NPOI.POIFS.FileSystem;
//using NPOI.XSSF.Util;
//using NPOI.XSSF.Model;
using System.Text.RegularExpressions;
//using Microsoft.Data.SqlClient;
using System.Collections.Generic;

namespace appBLL
{
    public class UtilitiesBLL
    {

        /// <summary>
        /// Create SQL Server Database Connection
        /// </summary>
        /// <returns></returns>
        public SqlConnection CreateConnection(out bool returnStatus, out string returnErrorMessage)
        {

            string connectionString;
            SqlConnection connection;

            try
            {
                //connectionString = System.Configuration.ConfigurationManager.AppSettings["ScriptDatabase"];
                //connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["ScriptDatabase"].ToString();
                connectionString = "";
                connection = new SqlConnection();
                connection.ConnectionString = connectionString;
                connection.Open();

                returnErrorMessage = "";
                returnStatus = true;

                return connection;
            }
            catch (Exception ex)
            {
                returnErrorMessage = ex.Message;
                returnStatus = false;
                connection = new SqlConnection();

                return connection;
            }

        }


        /// <summary>
        /// Create SQL Server Database Connection
        /// </summary>
        /// <returns></returns>
        public SqlConnection CreateConnectionRMSPROD(out bool returnStatus, out string returnErrorMessage)
        {

            string connectionString;
            SqlConnection connection;

            try
            {
                //connectionString = System.Configuration.ConfigurationManager.AppSettings["ScriptDatabase"];
                //connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["RMS-PROD"].ToString();
                connectionString = "";
                connection = new SqlConnection();
                connection.ConnectionString = connectionString;
                connection.Open();

                returnErrorMessage = "";
                returnStatus = true;

                return connection;
            }
            catch (Exception ex)
            {
                returnErrorMessage = ex.Message;
                returnStatus = false;
                connection = new SqlConnection();

                return connection;
            }

        }

        /*
        /// <summary>
        /// Create ORACLE Database Connection
        /// </summary>
        /// <returns></returns>
        public SqlConnection CreateConnectionOracle(out bool returnStatus, out string returnErrorMessage)
        {

            string connectionString;
            SqlConnection connection;

            try
            {

                connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["ReefPermitsDev2"].ToString();

                connection = new SqlConnection();
                connection.ConnectionString = connectionString;
                connection.Open();

                returnErrorMessage = "";
                returnStatus = true;

                return connection;
            }
            catch (Exception ex)
            {
                returnErrorMessage = ex.Message;
                returnStatus = false;
                connection = new OracleConnection();

                return connection;
            }

        }
        
		*/

        /// <remarks></remarks>
        //XLSX spreadsheet
        public MemoryStream TableToXLSXms(DataTable SourceData, string[] SourceColOrder, string[] SourceColText, bool IncludeHeader, string FileToSave)
        {

            string ErrorMessage;
            //bool returnEmptyOnError;
            XSSFWorkbook xlWorkbook;
            XSSFSheet xlSheet;
            XSSFRow xlRow;
            XSSFCell xlCell;
            int CurrentRow, CurrentColumn;

            MemoryStream ms = new MemoryStream();

            try
            {

                FileInfo fiSave = new FileInfo(FileToSave);
                string SheetName = fiSave.Name.Substring(0, fiSave.Name.IndexOf("."));
                SheetName = Regex.Replace(SheetName, "[^A-Z]", String.Empty, RegexOptions.IgnoreCase);
                //bool blnNoError = true;

                xlWorkbook = new XSSFWorkbook();

                //DocumentSummaryInformation dsi = PropertySetFactory.CreateDocumentSummaryInformation();
                //dsi.Company = "{company name here}";
                //xlWorkbook.DocumentSummaryInformation = dsi;
                //SummaryInformation si = PropertySetFactory.CreateSummaryInformation();
                //si.Title = SheetName;
                //si.Author = "{user name here}";
                //si.ApplicationName = "{application's name}";
                //xlWorkbook.SummaryInformation = si;

                xlSheet = (XSSFSheet)xlWorkbook.CreateSheet(SheetName);
                xlSheet.DisplayGridlines = false;
                XSSFCellStyle xlStyle;
                //int[] aryWidths = new int[SourceData.Columns.Count - 1];   //old code. Seems to work for Oracle?
                int[] aryWidths = new int[SourceData.Columns.Count];
                CurrentRow = 0;
                CurrentColumn = 0;

                //Write header
                if (IncludeHeader)
                {
                    xlRow = (XSSFRow)xlSheet.CreateRow(CurrentRow);
                    if (SourceColText == null)
                    {
                        //Auto names. Does not work
                        /*
                        SourceColOrder = new string[SourceData.Columns.Count - 1];
                        foreach (DataColumn dcCol in SourceData.Columns)
                        {
                            SourceColOrder[CurrentColumn] = dcCol.ColumnName;
                            xlCell = (HSSFCell)xlRow.CreateCell(CurrentColumn);
                            //xlStyle = xlWorkbook.CreateCellStyle();
                            //HSSFFont xlFont = xlWorkbook.CreateFont();
                            xlStyle = (HSSFCellStyle)xlWorkbook.CreateCellStyle();
                            HSSFFont xlFont = (HSSFFont)xlWorkbook.CreateFont();
                            xlFont.Color = NPOI.HSSF.Util.HSSFColor.WHITE.index;
                            //xlFont.Boldweight = HSSFFont.FONT_ARIAL;
                            xlStyle.SetFont(xlFont);
                            xlStyle.FillForegroundColor = NPOI.HSSF.Util.HSSFColor.ROYAL_BLUE.index;
                            //xlStyle.FillPattern = CellFillPattern.SOLID_FOREGROUND;
                            xlCell.SetCellValue(dcCol.ColumnName.Replace("_", " "));
                            xlCell.CellStyle = xlStyle;
                            if (dcCol.ColumnName.Length + 1 > aryWidths[CurrentColumn])
                            {
                                aryWidths[CurrentColumn] = dcCol.ColumnName.Length + 1;
                            }
                            CurrentColumn += 1;
                        }
                        */
                    }
                    else
                    {
                        //Specified names
                        foreach (string strName in SourceColText)
                        {
                            xlCell = (XSSFCell)xlRow.CreateCell(CurrentColumn);
                            xlStyle = (XSSFCellStyle)xlWorkbook.CreateCellStyle();
                            xlStyle.BorderLeft = BorderStyle.Medium;
                            xlStyle.BorderRight = BorderStyle.Thin;
                            xlStyle.BorderBottom = BorderStyle.Medium;
                            xlStyle.BorderTop = BorderStyle.Medium;
                            XSSFFont xlFont = (XSSFFont)xlWorkbook.CreateFont();
                            //xlFont.Color = NPOI.XSSF.Util.XSSFColor.Blue.Index;
                            //xlFont.Color = (short)NPOI.SS.UserModel.FontColor.Red;
                            xlFont.Color = IndexedColors.Blue.Index;
                            xlFont.Boldweight = (short)NPOI.SS.UserModel.FontBoldWeight.Bold;
                            xlStyle.SetFont(xlFont);
                            //xlStyle.FillForegroundColor = NPOI.HSSF.Util.HSSFColor.ROYAL_BLUE.index;
                            //xlStyle.FillPattern = CellFillPattern.SOLID_FOREGROUND;
                            xlCell.SetCellValue(strName);
                            xlCell.CellStyle = xlStyle;
                            //if (strName.Length + 1 > aryWidths[CurrentColumn])
                            //{
                            //aryWidths[CurrentColumn] = strName.Length + 1;
                            //}
                            CurrentColumn += 1;
                        }
                    }
                }


                xlStyle = (XSSFCellStyle)xlWorkbook.CreateCellStyle();
                xlStyle.BorderLeft = BorderStyle.Thin;
                xlStyle.BorderRight = BorderStyle.Thin;
                xlStyle.BorderBottom = BorderStyle.Thin;
                //Write data rows
                Object SourceDataCell;
                DateTime TripDate7;
                string TripDatestr = "";

                foreach (DataRow drvRow in SourceData.Rows)
                {
                    CurrentRow += 1;
                    CurrentColumn = 0;
                    xlRow = (XSSFRow)xlSheet.CreateRow(CurrentRow);
                    foreach (string strColName in SourceColOrder) //For CurrentColumn = 0 To SourceData.Columns.Count - 1
                    {
                        SourceDataCell = drvRow[strColName];
                        xlCell = (XSSFCell)xlRow.CreateCell(CurrentColumn);
                        //xlStyle = (HSSFCellStyle)xlWorkbook.CreateCellStyle();
                        //xlStyle.BorderLeft = CellBorderType.THIN;
                        //xlStyle.BorderRight = CellBorderType.THIN;
                        //xlStyle.BorderBottom = CellBorderType.THIN;
                        xlCell.CellStyle = xlStyle;
                        if (SourceDataCell.GetType() == typeof(System.Int32) || SourceDataCell.GetType() == typeof(System.Int64))
                        {
                            xlCell.SetCellType(NPOI.SS.UserModel.CellType.Numeric);
                            if (SourceDataCell != null)  //IsDBNull
                            {
                                //xlCell.SetCellValue((Double)SourceDataCell);
                                xlCell.SetCellValue(SourceDataCell.ToString());
                            }
                        }
                        else if (SourceDataCell.GetType() == typeof(System.DateTime))
                        {
                            xlCell.SetCellType(NPOI.SS.UserModel.CellType.String);
                            if (SourceDataCell != null)  //IsDBNull
                            {
                                TripDate7 = DateTime.Parse(SourceDataCell.ToString());
                                TripDatestr = UtilitiesBLL.FormatDate(TripDate7);
                                xlCell.SetCellValue(TripDatestr);
                                //xlCell.SetCellValue((DateTime)TripDate7);
                                //xlCell.SetCellValue((DateTime)SourceDataCell);
                                //xlCell.SetCellValue(SourceDataCell.ToString());

                            }
                        }
                        else if (SourceDataCell.GetType() == typeof(System.Double) || SourceDataCell.GetType() == typeof(System.Decimal))
                        {
                            xlCell.SetCellType(NPOI.SS.UserModel.CellType.Numeric);
                            if (SourceDataCell != null)  //IsDBNull
                            {
                                //xlCell.SetCellValue((Double)SourceDataCell);
                                xlCell.SetCellValue(SourceDataCell.ToString());
                            }
                        }
                        else
                        {
                            xlCell.SetCellValue(SourceDataCell.ToString());
                        }
                        //if (SourceDataCell.ToString().Length > aryWidths[CurrentColumn])
                        //{
                        //aryWidths[CurrentColumn] = SourceDataCell.ToString().Length;
                        //}
                        CurrentColumn += 1;
                    }
                }

                //Set column widths
                for (CurrentColumn = 0; CurrentColumn <= aryWidths.GetUpperBound(0); CurrentColumn++)
                {
                    if (aryWidths[CurrentColumn] > 50)
                    {
                        xlSheet.SetColumnWidth(CurrentColumn, 50 * 256);
                    }
                    else if (aryWidths[CurrentColumn] < 10)
                    {
                        xlSheet.SetColumnWidth(CurrentColumn, 10 * 256);
                    }
                    else
                    {
                        xlSheet.SetColumnWidth(CurrentColumn, (aryWidths[CurrentColumn] + 1) * 256);
                    }
                }


                //MemoryStream ms = new MemoryStream();
                xlWorkbook.Write(ms);

                ms.Flush();
                ms.Close();

            }
            catch (Exception ex)
            {
                //blnNoError = false;
                ErrorMessage = ex.Message;
                //HttpContext.Current.Trace.Warn(ex.ToString());
                MemoryStream mserr = new MemoryStream();
                //byte[] BLOBbyterr;
                //mserr.Write(BLOBbyterr, 0, BLOBbyterr.Length);
                return mserr;
            }

            return ms;
        }

        public static bool SQLKeyWordChk(string input)
        {
            bool Result = true;
            var keywordss = new List<string>();
            keywordss.Add("TRAN");
            keywordss.Add("TRANSACTION");
            keywordss.Add("ADD");
            keywordss.Add("FETCH");

            keywordss.Add("EXTERNAL");
            keywordss.Add("PROCEDURE");
            keywordss.Add("ALL");
            keywordss.Add("PUBLIC");
            keywordss.Add("ALTER");
            keywordss.Add("FILE");
            keywordss.Add("RAISERROR");
            keywordss.Add("AND");
            keywordss.Add("FILLFACTOR");
            keywordss.Add("READ");
            keywordss.Add("ANY");
            keywordss.Add("FOR");
            keywordss.Add("READTEXT");
            keywordss.Add("AS");
            keywordss.Add("FOREIGN");
            keywordss.Add("RECONFIGURE");
            keywordss.Add("ASC");
            keywordss.Add("FREETEXT");
            keywordss.Add("REFERENCES");
            keywordss.Add("AUTHORIZATION");
            keywordss.Add("FREETEXTTABLE");
            keywordss.Add("REPLICATION");
            keywordss.Add("BACKUP");
            keywordss.Add("FROM");
            keywordss.Add("RESTORE");
            keywordss.Add("BEGIN");
            keywordss.Add("FULL");
            keywordss.Add("RESTRICT");
            keywordss.Add("BETWEEN");
            keywordss.Add("FUNCTION");
            keywordss.Add("RETURN");
            keywordss.Add("BREAK");
            keywordss.Add("GOTO");
            keywordss.Add("REVERT");
            keywordss.Add("BROWSE");
            keywordss.Add("GRANT");
            keywordss.Add("REVOKE");
            keywordss.Add("BULK");
            keywordss.Add("GROUP");
            keywordss.Add("RIGHT");
            keywordss.Add("BY");
            keywordss.Add("HAVING");
            keywordss.Add("ROLLBACK");
            keywordss.Add("CASCADE");
            keywordss.Add("HOLDLOCK");
            keywordss.Add("ROWCOUNT");
            keywordss.Add("CASE");
            keywordss.Add("IDENTITY");
            keywordss.Add("ROWGUIDCOL");
            keywordss.Add("CHECK");
            keywordss.Add("IDENTITY_INSERT");
            keywordss.Add("RULE");
            keywordss.Add("CHECKPOINT");
            keywordss.Add("IDENTITYCOL");
            keywordss.Add("SAVE");
            keywordss.Add("CLOSE");
            keywordss.Add("IF");
            keywordss.Add("SCHEMA");
            keywordss.Add("CLUSTERED");
            keywordss.Add("IN");
            keywordss.Add("SECURITYAUDIT");
            keywordss.Add("COALESCE");
            keywordss.Add("INDEX");
            keywordss.Add("SELECT");
            keywordss.Add("INNER");
            keywordss.Add("SEMANTICKEYPHRASETABLE");
            keywordss.Add("COLUMN");
            keywordss.Add("INSERT");
            keywordss.Add("SEMANTICSIMILARITYDETAILSTABLE");
            keywordss.Add("COMMIT");
            keywordss.Add("INTERSECT");
            keywordss.Add("SEMANTICSIMILARITYTABLE");
            keywordss.Add("COMPUTE");
            keywordss.Add("INTO");
            keywordss.Add("SESSION_USER");
            keywordss.Add("CONSTRAINT");
            keywordss.Add("IS");
            keywordss.Add("SET");
            keywordss.Add("CONTAINS");
            keywordss.Add("JOIN");
            keywordss.Add("SETUSER");
            keywordss.Add("CONTAINSTABLE");
            keywordss.Add("KEY");
            keywordss.Add("SHUTDOWN");
            keywordss.Add("CONTINUE");
            keywordss.Add("KILL");
            keywordss.Add("SOME");
            keywordss.Add("CONVERT");
            keywordss.Add("LEFT");
            keywordss.Add("STATISTICS");
            keywordss.Add("CREATE");
            keywordss.Add("LIKE");
            keywordss.Add("SYSTEM_USER");
            keywordss.Add("CROSS");
            keywordss.Add("LINENO");
            keywordss.Add("TABLE");
            keywordss.Add("CURRENT");
            keywordss.Add("LOAD");
            keywordss.Add("TABLESAMPLE");
            keywordss.Add("CURRENT_DATE");
            keywordss.Add("MERGE");
            keywordss.Add("TEXTSIZE");
            keywordss.Add("CURRENT_TIME");
            keywordss.Add("NATIONAL");
            keywordss.Add("THEN");
            keywordss.Add("CURRENT_TIMESTAMP");
            keywordss.Add("NOCHECK");
            keywordss.Add("TO");
            keywordss.Add("CURRENT_USER");
            keywordss.Add("NONCLUSTERED");
            keywordss.Add("TOP");
            keywordss.Add("CURSOR");
            keywordss.Add("NOT");
            keywordss.Add("DATABASE");
            keywordss.Add("NULL");
            keywordss.Add("DBCC");
            keywordss.Add("NULLIF");
            keywordss.Add("TRIGGER");
            keywordss.Add("DEALLOCATE");
            keywordss.Add("OF");
            keywordss.Add("TRUNCATE");
            keywordss.Add("DECLARE");
            keywordss.Add("OFF");
            keywordss.Add("TRY_CONVERT");
            keywordss.Add("DEFAULT");
            keywordss.Add("OFFSETS");
            keywordss.Add("TSEQUAL");
            keywordss.Add("DELETE");
            keywordss.Add("ON");
            keywordss.Add("UNION");
            keywordss.Add("DENY");
            keywordss.Add("OPEN");
            keywordss.Add("UNIQUE");
            keywordss.Add("DESC");
            keywordss.Add("OPENDATASOURCE");
            keywordss.Add("UNPIVOT");
            keywordss.Add("DISK");
            keywordss.Add("OPENQUERY");
            keywordss.Add("UPDATE");
            keywordss.Add("DISTINCT");
            keywordss.Add("OPENROWSET");
            keywordss.Add("UPDATETEXT");
            keywordss.Add("DISTRIBUTED");
            keywordss.Add("OPENXML");
            keywordss.Add("USE");
            keywordss.Add("DOUBLE");
            keywordss.Add("OPTION");
            keywordss.Add("USER");
            keywordss.Add("DROP");
            keywordss.Add("OR");
            keywordss.Add("VALUES");
            keywordss.Add("DUMP");
            keywordss.Add("ORDER");
            keywordss.Add("VARYING");
            keywordss.Add("ELSE");
            keywordss.Add("OUTER");
            keywordss.Add("VIEW");
            keywordss.Add("END");
            keywordss.Add("OVER");
            keywordss.Add("WAITFOR");
            keywordss.Add("ERRLVL");
            keywordss.Add("PERCENT");
            keywordss.Add("WHEN");
            keywordss.Add("ESCAPE");
            keywordss.Add("PIVOT");
            keywordss.Add("WHERE");
            keywordss.Add("EXCEPT");
            keywordss.Add("PLAN");
            keywordss.Add("WHILE");
            keywordss.Add("EXEC");
            keywordss.Add("PRECISION");
            keywordss.Add("WITH");
            keywordss.Add("EXECUTE");
            keywordss.Add("PRIMARY");
            keywordss.Add("WITHIN GROUP");
            keywordss.Add("EXISTS");
            keywordss.Add("PRINT");
            keywordss.Add("WRITETEXT");
            keywordss.Add("EXIT");
            keywordss.Add("PROC");

            string inputin = input.ToUpper().Trim();

            int index = keywordss.IndexOf(inputin);
            if (index == -1)   //not exist
            {
                Result = false;
            }


            return Result;
        }


        public bool IsNumeric(object value)
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


        /// <summary>
        /// Convert To String
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public static string ConvertToString(object input)
        {
            if (input == null)
                return String.Empty;

            string newString = Convert.ToString(input);

            return newString;

        }


        /// <summary>
        /// Encode Email Address
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public static string EncodeMailAdres(string input)
        {
            StringBuilder returnString = new StringBuilder();
            byte strChar;

            for (int index = 0; index < input.Length; index++)
            {
                returnString.Append("&#");
                strChar = Convert.ToByte(input[index]);
                returnString.Append(strChar);
                returnString.Append(";");
            }


            //object sb = System.Text.StringBuilder(input * 6);

            //if (input == null)
            //    return String.Empty;

            //string newString = Convert.ToString(input);
            //string newString = "";

            String strFields = returnString.ToString();
            return strFields;

        }


        /// <summary>
        /// Convert Date to Formatted Date
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public static string FormatDate(DateTime inDate)
        {

            DateTime dateResult;
            string dateString = UtilitiesBLL.ConvertToString(inDate);

            if (DateTime.TryParse(dateString, out dateResult) == false)
                return String.Empty;

            if (inDate == DateTime.MinValue)
                return String.Empty;

            //dateString = inDate.ToString("MM/dd/yyyy");
            dateString = inDate.ToString("dd-MMM-yyyy");

            return dateString;

        }

        /// <summary>
        /// Is Valid Date
        /// </summary>
        /// <param name="dateString"></param>
        /// <returns></returns>
        public static bool IsValidDate(string dateString)
        {
            DateTime dateResult;

            if (dateString == null || dateString == "")
                return true;

            if (DateTime.TryParse(dateString, out dateResult) == false)
                return false;

            return true;

        }

        /// <summary>
        /// Is Date Suppled
        /// </summary>
        /// <param name="dateString"></param>
        /// <returns></returns>
        public static bool IsDateSupplied(string dateString)
        {
            if (dateString == null || dateString == "")
                return false;

            return true;

        }


        /// <summary>
        /// Set Properties
        /// </summary>
        /// <param name="fromFields"></param>
        /// <param name="fromRecord"></param>
        /// <param name="toRecord"></param>
        public static void SetProperties(PropertyInfo[] fromFields, object fromRecord, object toRecord)
        {

            PropertyInfo fromField = null;
            try
            {
                if (fromFields == null) return;

                for (int f = 0; f < fromFields.Length; f++)
                {
                    fromField = (PropertyInfo)fromFields[f];
                    fromField.SetValue(toRecord, fromField.GetValue(fromRecord, null), null);
                }
            }
            catch (Exception)
            {
                throw;
            }

        }






    }
}
