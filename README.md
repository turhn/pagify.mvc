pagify.mvc
==========

Use pagify.mvc For Faster and Simpler Data Tables

I use KnockoutJs library in my Web Projects as a solution for MVVM pattern. It is so simple and well documented. In ASP.NET MVC, it is really hard to create a simple paged ajax datatable. Thus I decided to share this simple plugin with the others. I included a fully working ASP.NET MVC 4 project which shows the plugin in action.

The MVC4 project contains a sample which shows how to create an ajax paged data table by using knockoutjs and papify.mvc in ASP.NET MVC. 

##Goal For Now
- Adding OrderBy feature

##Goals For Future
- Removing all dependencies 
- Making pagify.mvc more flexible and compatible

##Can I contribute?
Please feel free for any kind of contribution. 
You can;
- give your valuable opinion about anything,
- report a bug,
- request editing source code 
- join the development process.

In order to use this javascript function. We need to prepare our MVC Action. 
<pre><code>
        public ActionResult UserList(int? page, int pageSize = 10)
        {          
            var items = SampleRepository.GetUsers();
            var pageNumber = page ?? 1;
            var itemList = new PagedList<SampleModelsRepository.User>(items, pageNumber, pageSize);
            return Json(new {items = itemList, metaData = itemList.GetMetaData()}, JsonRequestBehavior.AllowGet);
        }
</code></pre>
When the document is ready, we are calling our Jquery plugin
```javascript
    $(function() {
        $('#users').pagify({
            dataUrl: '/Home/UserList', //The URL where we get our JSON data
            callBack: function() {
                // Ajax remove preloader and some other callbacks  
            },
            beforeSend: function() {
                // Ajax show preloader and some other function before start
            }
        });
    });
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
<table id="users" data-bind="foreach: Items">
  <thead>
  <tr>
    <th>UserID</th>
    <th>UserName</th>
    <th>FirstName</th>
    <th>LastName</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td data-bind="text: UserId"></td>
    <td data-bind="text: UserName"></td>
    <td data-bind="text: FirstName"></td>
    <td data-bind="text: LastName"></td>
  </tr>
  </tbody>
  <tfoot>
    <tr>
    <td colspan="4">
      <div> Page <span data-bind="text: MetaData.PageNumber"></span> of <span data-bind="text: MetaData.PageCount"></span></div>
        <div>
            <ul class="pagination">
                <li><a style="display: none;" data-bind="click: FirstPage, visible: MetaData.HasPreviousPage" href="javascript:void(0);">First</a></li>
                <li><a style="display: none;" data-bind="click: PreviousPage, visible: MetaData.HasPreviousPage" href="javascript:void(0);">← Prev</a></li>
                <li><a style="display: none;" data-bind="click: NextPage, visible: MetaData.HasNextPage" href="javascript:void(0);">Next →</a></li>
                <li><a style="display: none;" data-bind="click: LastPage, visible: MetaData.HasNextPage" href="javascript:void(0);">Last</a></li>
            </ul>
        </div>
    </td>
  </tr>
  </tfoot>
</table>
``` 
Follow me on Twitter @turhancoskun 

That's all! 
