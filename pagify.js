function Pagify(element, url, pageSize, callBack, beforeSend) {

    var elem = $('#' + element)[0]; //Root Node Element
    var model;
    var _pageSize;

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

    $(function() {

        $('#SearchString').keyup(throttle(function() {
            loadPage(1, $(this).val());
        }));

        $('#pagelength').change(function() {
            _pageSize = $(this).val();
            loadPage(1);
        });

        model = null;

        loadPage(1);
        $(elem).show();
    });

    function loadPage(pageNumber, searchString) {

        if (_pageSize == null) {
            _pageSize = 10;
        }

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'JSON',
            data: { page: pageNumber, pageSize: _pageSize, searchString: searchString },
            beforeSend: function() {
                if (beforeSend && typeof(beforeSend) === 'function') {
                    beforeSend();
                }
            },
            success: function(data) {

                if (model == null) {
                    model = new vm();
                    //model.Items = ko.mapping.fromJS(data.items);
                    model.Items(data.items);
                    model.MetaData = ko.mapping.fromJS(data.metaData);
                    ko.applyBindings(model, elem);
                } else {
                    model.Items(data.items);
                    ko.mapping.fromJS(data.metaData, { }, model.MetaData);
                }

                // Arrange callback function
                if (callBack && typeof(callBack) === 'function') {
                    callBack();
                }
            }
        });
    }
}
