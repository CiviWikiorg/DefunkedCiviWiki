var AccountBaseView = Backbone.View.extend({

    el: '#account-base',

    baseTemplate: _.template($('#base-template').html()),

    initialize: function (options) {
        var _this = this;

        options = options || {};
        _this.userModel = options.userModel;
        _this.render();

        this.friendsTab = new FriendsListView({
            userModel : _this.userModel,
            friends: _this.userModel.toJSON().friend_requests,
            user_id: _this.userModel.toJSON().user_id, 
        });
        
        this.friendRequestView = new FriendRequestView({
            friend_requests: _this.userModel.toJSON().friend_requests
        });
        this.friendRequestView.render();

    },

    render: function () {
        var _this = this;

        _this.$el.empty().append(_this.baseTemplate({
            user: _this.userModel.toJSON(), 
        }));

    },
    events: {
    }
});
