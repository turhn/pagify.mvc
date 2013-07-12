pagify.mvc
==========

Bringing together ASP.NET MVC PagedList and Knockoutjs Library For Fast Grids


In order to use this javascript function. We need to prepare our MVC Action. 
<pre><code>
        public ActionResult UserList(string currentFilter, string searchString, int? page, int pageSize = 10)
        {
            ViewBag.CurrentFilter = searchString;

            var userprofiles = (from u in db.UserProfiles
                                join m in db.webpages_Membership on u.UserId equals m.UserId
                                select new UserIndex
                                           {
                                               UserID = u.UserId,
                                               UserName = u.UserName,
                                               FirstName = u.FirstName,
                                               LastName = u.LastName

                                           }).AsEnumerable();

            if (!String.IsNullOrEmpty(searchString))
            {
                userprofiles =
                    userprofiles.Where(
                        u =>  u.UserName.ToUpper().Contains(searchString.ToUpper()
                        ).AsEnumerable();
            }


            int pageNumber = (page ?? 1);

            var itemList = new PagedList<UserIndex>(userprofiles.OrderByDescending(x => x.UserID), pageNumber,
                                                    pageSize);

            return Json(new {items = itemList, metaData = itemList.GetMetaData()}, JsonRequestBehavior.AllowGet);
        }
</code></pre>
Our View should call the function 'Pagify'
```javascript
   <script type="text/javascript">
    $(function() {
            Pagify('users',   //ID of the element which you want to apply bindings
            '/User/UserList', //Url of the JSON which you want to get data
            25,
            function() {
                // Ajax remove preloader and some other callbacks              
            },
            function() {
                // Ajax show preloader and some other function before start
            }
        );
    }
    </script>
```     
If you wish you can freely use pagify as JQuery Plugin
```javascript
   <script src="/Scripts/jquery.pagify-1.0.0.js"></script>
   <script type="text/javascript">
    $(function() {
        $('#users').pagify({
            dataUrl: '/User/UserLisr',
            callBack: function(){
               // Ajax remove preloader and some other callbacks  
            },
            beforeSend: function(){
               // Ajax show preloader and some other function before start
            }
        });
    }
    </script>
```  
Html for model bindings
```html
<div>
   <select id="pagelength" name="pagelength" size="1" aria-controls="users">
      <option value="10" selected="selected">10</option>
      <option value="25">25</option>
      <option value="50">50</option>
      <option value="100">100</option>
  </select> per page
</div>
<div>
  <input type="text" id="SearchString" placeholder="Search..."/>
</div>
<table id="users">
  <thead>
    <th>UserID</th>
    <th>UserName</th>
    <th>FirstName</th>
    <th>LastName</th>
  </thead>
  <tbody>
    <td data-bind="text: UserID"></td>
    <td data-bind="text: UserName"></td>
    <td data-bind="text: FirstName"></td>
    <td data-bind="text: LastName"></td>
  </tbody>
  <tfoot>
    <td colspan="4">
      <div> Page <span data-bind="text: MetaData.PageNumber"></span> of <span data-bind="text: MetaData.PageCount"></span></div>
        <div>
            <ul>
                <li><a style="display: none;" data-bind="click: FirstPage, visible: MetaData.HasPreviousPage" href="javascript:void(0);">First</a></li>
                <li><a style="display: none;" data-bind="click: PreviousPage, visible: MetaData.HasPreviousPage" href="javascript:void(0);">← Prev</a></li>
                <li><a style="display: none;" data-bind="click: NextPage, visible: MetaData.HasNextPage" href="javascript:void(0);">Next →</a></li>
                <li><a style="display: none;" data-bind="click: LastPage, visible: MetaData.HasNextPage" href="javascript:void(0);">Last</a></li>
            </ul>
        </div>
    </td>
  </tfoot>
</table>
``` 
That's all! 
