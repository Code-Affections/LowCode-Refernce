using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//using System.Web.Mvc;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using System.Text;
using System.IO;
using System.Net.Mail;
//using System.Media;
using System.ComponentModel;
using System.Threading.Tasks;
using appBLL;
using appMODEL;
using System.Security.AccessControl;
using System.Security.Principal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.AspNetCore.Mvc.Filters;


using iText.Html2pdf;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas;
using iText.Kernel.Pdf.Xobject;
using iText.Kernel.Events;
using iText.Kernel.Geom;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using iText.Layout.Font;
using iText.Kernel.Font;
using iText.IO.Font.Constants;
using iText.IO;
using iText.Kernel.Utils;


namespace appAPP.Controllers
{

    //[Authorize(Roles = "Admin")]
    //[Authorize(Users = "kalvin,umesh")]
    //[Authorize]
    public class ChildAddkController : Controller
    {
      
        private IMemoryCache _Cache;
        private IWebHostEnvironment _Env;
        private IHttpContextAccessor _Htp;
        IConfiguration _iconfiguration;

        public ChildAddkController(IWebHostEnvironment envrtmnt, IHttpContextAccessor htp, IConfiguration iconfiguration, IMemoryCache imemoryCache)
        {
            _Env = envrtmnt;
            _Htp = htp;
            _iconfiguration = iconfiguration;
            _Cache = imemoryCache;

        }


        /// <summary>
        /// Initial start point of displaying the Grid
        /// </summary>
        public IActionResult DisplayChildAddk()
        {

            Models.ChildAddkViewModel ThisViewModel = new Models.ChildAddkViewModel();
          
            ThisViewModel.TotalPages = 0;
            ThisViewModel.TotalRows = 0;
            ThisViewModel.CurrentPageNumber = 0;
            //ThisViewModel.SortAscendingDescending = "DESC";  //default init setting, can change to ASC. NOT NEEDED now

            ViewData.Model = ThisViewModel;



            ChildAddkBLL ThisBLL = new ChildAddkBLL();
            bool returnStatus;
            string returnErrorMessage;

            ThisViewModel.DBConnectString = _iconfiguration.GetSection("Data").GetSection("ConnectString").Value;

            //---------------------------------------------------------------------------------------------------
            //Reading Reference table
            //---------------------------------------------------------------------------------------------------
            ChildAddk scriptTABLE = new ChildAddk();
            List<ChildAddkType> TABLEnormcomboList = new List<ChildAddkType>();
            TABLEnormcomboList = ThisBLL.GetChildAddknormcombo(ThisViewModel, out returnStatus, out returnErrorMessage);
            scriptTABLE.ChildAddkTypes = TABLEnormcomboList;
            ViewData["TABLEListin2"] = TABLEnormcomboList;
            //---------------------------------------------------------------------------------------------------
            //END get Table Combo list
            //---------------------------------------------------------------------------------------------------

            return View("ChildAddkGrid");   //must match View name
        }

        /// <summary>
        /// Get actual records from Database
        /// </summary>
        [HttpGet]
        public async Task<PartialViewResult> ChildAddkSearch()
        {
            long totalRows;
            long totalPages;
            long pageRows;
            bool returnStatus;
            string returnErrorMessage;
            long totalRowspdf;
            long totalPagespdf;
            long pageRowspdf;
            bool returnStatuspdf;
            string returnErrorMessagepdf;

            ChildAddkBLL ThisBLL = new ChildAddkBLL();
            Models.ChildAddkViewModel ThisViewModel = new Models.ChildAddkViewModel();
        
            await this.TryUpdateModelAsync(ThisViewModel);    //get search criteria form input

            ThisViewModel.DBConnectString = _iconfiguration.GetSection("Data").GetSection("ConnectString").Value;

            List<ChildAddk> scripts = ThisBLL.ChildAddkSearch(
                ThisViewModel,
                ThisViewModel.CurrentPageNumber,
                ThisViewModel.PageSize,
                ThisViewModel.SortBy,
                ThisViewModel.SortAscendingDescending,
                out totalRows,
                out totalPages,
                out pageRows,
                out returnStatus,
                out returnErrorMessage);

            ViewData["scripts"] = scripts;  //give back list array to View(ie ...Results) for processing(reading)
      
            ThisViewModel.TotalPages = totalPages;
            ThisViewModel.TotalRows = totalRows;

            ViewData.Model = ThisViewModel;

            return PartialView("ChildAddkResults");  //must match View name
        
        }




    }
}
