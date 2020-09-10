using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;


namespace appMODEL
{

    public class ChildAddk
    {

        public string DBConnectString { get; set; }

        public long id { get; set; }

         public string Table_Name { get; set; }

        public string Field_Name { get; set; }

        public string Data_Type { get; set; }

        public int Length_Size { get; set; }

        public string GlobalSearchString { get; set; }
        public double TimeDiff { get; set; }                   //for getting real time anywhere in the world, for Offset Date

        public string Table_Name_Str { get; set; }
        public string Field_Name_Str { get; set; }
        public string Data_Type_Str { get; set; }
        public string Length_Size_Str { get; set; }


        public string Date_Bought_From { get; set; }
        public string Date_Bought_To { get; set; }
        public string Created_By { get; set; }

        public List<long> PK_IDD { get; set; }
        public List<string> CheckBoxx { get; set; }

        public string Logoimg { get; set; }

        //-----------------------------------------------------------------------------
        //For normal combo  -  Change normcombo with Table/View using
        //-----------------------------------------------------------------------------
        public long normcombopkid { get; set; }    
        public string normcombocol1 { get; set; }   //Field to show on form
        public List<ChildAddknormcombo> ChildAddknormcomboList { get; set; }
        //-----------------------------------------------------------------------------
        //END For normal combo
        //-----------------------------------------------------------------------------
        //public long ChildAddk_Type_ID { get; set; }
        public string ChildAddkTypeName { get; set; }
        public List<ChildAddkType> ChildAddkTypes { get; set; }   //for inner dropdown list within grid column

        public long Document_ID { get; set; }    //for Upload of a Document
        public string Risk_Level { get; set; }
        public long Risk_Level_ID { get; set; }
        public List<ChildAddkRiskLevelList> RiskTypess { get; set; }


        //Next line is for Checkbox processing
        public int Private_Cover { get; set; }

        //Next line is for Radio processing
        public string Sex { get; set; }

    }


    //----------------------------------------------------------------------------------------------------
    // List for normal Combo -  Change normcombopkid & normcombocol1 with Reference Table/View definition
    //----------------------------------------------------------------------------------------------------
    public class ChildAddknormcombo
    {
        public long normcombopkid { get; set; }     //PK_ID of Reference Table
        public string normcombocol1 { get; set; }   //Field to show in combo, as well as on form
    }
    //----------------------------------------------------------------------------------------------------
    // END List for normal Combo
    //----------------------------------------------------------------------------------------------------


    /// <summary>
    /// List of Type
    /// </summary>
    public class ChildAddkType
    {
        //public long ChildAddk_Type_ID { get; set; }
        public string ChildAddkTypeName { get; set; }
    }


    /// <summary>
    /// List of Risk Level List for combo
    /// </summary>
    public class ChildAddkRiskLevelList
    {
        public long RiskLevelID { get; set; }
        public string RiskLevelName { get; set; }
    }



}
