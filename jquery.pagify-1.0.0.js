/*
 Copyright (c) 2013 Turhan Coskun

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
  to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
   WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function($){
    $.fn.extend({
        pagify :function(options) {

            var defaults = {
                dataUrl: '',
                pageSize: 10,
                callBack: function() {
                },
                beforeSend: function() {
                },
                searchElement: $('#SearchString'),
                pageSizeElement: $('#PageSize'),
                throttleDelay: 500
            };

            var options = $.extend({}, defaults, options);
            var obj = $(this)[0];
            var model;
            //View Model
            var vm = function() {
                var self = this;
                self.Items = ko.observableArray([]); //List of items
                self.MetaData = ko.observable(); //Metadata of PagedList nuGet package

                self.NextPage = function() {
                    if (self.MetaData.HasNextPage()) {
                        loadPage(self.MetaData.PageNumber() + 1);
                    }
                };
                self.PreviousPage = function() {
                    if (self.MetaData.HasPreviousPage()) {
                        loadPage(self.MetaData.PageNumber() - 1);
                    }
                };
                self.FirstPage = function() {
                    if (self.MetaData.HasPreviousPage()) {
                        loadPage(1);
                    }
                };
                self.LastPage = function() {
                    if (self.MetaData.HasNextPage()) {
                        loadPage(self.MetaData.PageCount());
                    }
                };
            };
            var o = options;
            function loadPage(pageNumber, searchString) {

                $.ajax({
                    url: o.dataUrl,
                    type: 'GET',
                    dataType: 'JSON',
                    data: { page: pageNumber, pageSize: o.pageSize, searchString: searchString },
                    beforeSend: function() {
                        if (o.beforeSend && typeof(o.beforeSend) === 'function') {
                            o.beforeSend();
                        }
                    },
                    success: function(data) {
                        if (model == null) {
                            model = new vm();
                            model.Items(data.items);
                            model.MetaData = ko.mapping.fromJS(data.metaData);
                            ko.applyBindings(model, obj);
                        } else {
                            model.Items(data.items);
                            ko.mapping.fromJS(data.metaData, { }, model.MetaData);
                        }
                        // Arrange callback function
                        if (o.callBack && typeof(o.callBack) === 'function') {
                            o.callBack();
                        }
                    }
                });
            }

            function throttle(f, delay) {
                var timer = null;
                return function() {
                    var context = this, args = arguments;
                    clearTimeout(timer);
                    timer = window.setTimeout(function() {
                            f.apply(context, args);
                        },
                        delay || 500);
                };
            }

            //Bind Events

            $(function() {
                $(o.searchElement).keyup(throttle(function() {
                    loadPage(1, $(this).val());
                }, o.throttleDelay));
                $(o.pageSizeElement).change(function() {
                    o.pageSize = $(this).val();
                    loadPage(1);
                });
            });

            return this.each(function() {
                model = null;
                loadPage(1);
            });
        }
    });

})(JQuery);

        
