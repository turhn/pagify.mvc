using System.Threading;
using PagedList;
using System.Web.Mvc;
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

        public ActionResult UserList(int? page, int pageSize = 10)
        {          
            Thread.Sleep(1000); //To demonstrate latency

            var pageNumber = page ?? 1;
            var itemList = new PagedList<SampleModelsRepository.User>(Repository.GetUsers(), pageNumber, pageSize);
            return Json(new {items = itemList, metaData = itemList.GetMetaData()}, JsonRequestBehavior.AllowGet);
        }

        
    }
}
