using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Security.Cryptography;

using Microsoft.Extensions.Logging;
using System.Net.Http;
using System.Text.Json;
using System.Text.Encodings.Web;
using appAPP.Models;
using appMODEL;


namespace appAPP.Controllers
{
    public class HomeController : Controller
    {
       
        private IWebHostEnvironment _Env;
        private IHttpContextAccessor _Htp;
        IConfiguration _iconfiguration;


        public HomeController(IWebHostEnvironment envrtmnt, IHttpContextAccessor htp, IConfiguration iconfiguration)
        {
            _Env = envrtmnt;
            _Htp = htp;
            _iconfiguration = iconfiguration;
        }

        public IActionResult Index()
        {

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            //ViewData["Message"] = "Your contact page.";


            return View();
        }

        public IActionResult ReloadAdd()
        {
            ViewBag.Message = "Added a New GRID.";

            return View();
        }

        public IActionResult ReloadDel()
        {
            ViewBag.Message = "GRID Deleted.";

            return View();
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
