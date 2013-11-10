using System.Linq;
using System.Threading;
using PagedList;
using System.Web.Mvc;
using Pagify.Mvc.Extensions;
using Pagify.Mvc.Models;

namespace Pagify.Mvc.Controllers
{
    
    public class HomeController : Controller
    {
        public SampleModelsRepository Repository = new SampleModelsRepository();
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult UserList(int? page, int pageSize = 10, string sortBy=null, string sortType=null)
        {          
            Thread.Sleep(1000); //To demonstrate latency

            var pageNumber = page ?? 1;
            sortBy = string.IsNullOrEmpty(sortBy) ? "UserId" : sortBy;
            sortType = string.IsNullOrEmpty(sortType) ? "OrderBy" : sortType;

            var itemList = new PagedList<SampleModelsRepository.User>(Repository.GetUsers().AsQueryable().OrderByField(sortBy, sortType), pageNumber, pageSize);
            return Json(new {items = itemList, metaData = itemList.GetMetaData()}, JsonRequestBehavior.AllowGet);
        }

        
    }
}
