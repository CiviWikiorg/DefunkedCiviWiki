var FriendsListView = Backbone.View.extend({
    el: '#friends', 

    friendsTemplate: _.template($('#friends-template').html()),

    initialize: function(options){
      var _this = this; 

      options = options || {}; 

      _this.user_id = options.user_id;
      _this.userModel = options.userModel; 
      _this.friend_requests = options.friend_requests;
      _this.friends = _this.userModel.toJSON().friends;
      console.log(_this.userModel);
      _this.listenTo(_this.userModel, 'change', _this.render); //supposed to listen for a change in the friend_requests attribute of the model and rerender the view accordingly


    }, 

    render: function(){
      var _this = this; 
       _this.$el.empty().append(_this.friendsTemplate({
            friends: _this.friends,
            friend_requests: _this.friend_requests 
        }));      
    }, 
     events: {
      "click #add_friend": "addFriend",
      "click .accept" : "acceptFriend", 
      "click .reject" : "rejectFriend", 
      "click .remove" :"removeFriend"
    },

    addFriend: function(){
      var _this = this; 
      var friend_request = this.$el.find('#friend_request').val(); 

      if(friend_request){
        $.ajax({
          type: 'POST', 
          url: 'api/useridbyusername',
          data: {
            username: friend_request
          },
          success: function(data){
            $.ajax({
              type: 'POST', 
              url: 'api/requestfriend', 
              data: {
                friend: data.result
              },
              success: function(data){
                Materialize.toast("Your friend request has been sent!", 3000);
              }, 
              error: function(data){
                Materialize.toast("Could not successfully send friend request", 3000);
              }
            });

          },
          error: function(data){
            Materialize.toast("Sorry, this username doesn't exist!", 3000);
          }
        });
      }
    }, 
    acceptFriend: function(event){
      var _this = this; 

      //this should all occur when a friend is successfully added but then it gets really choppy/is quite slow 

      var class_name = $(event.target).parent().attr('class'); //gets the ID of rejected friend
      var accepted_id = class_name.slice(class_name.lastIndexOf(' ') + 1);     

      var f_requests = _this.userModel.toJSON().friend_requests; 
      var accept_index = $.grep(f_requests, function(e) {return e.id == accepted_id; });
      var friend_info = this.$el.find('#friend_info').text();

      var friend_img = this.$el.find('#friend_img').attr('src');

      //friend that will be added to friends list 
      var new_friend = '<li class="collection-item avatar"><img class="circle" src="'+friend_img+'"><span class="title">'+friend_info+'</span><a href="#!" class="secondary-content remove '+accepted_id+'"><i class="material-icons">delete</i></a></li>';
      _this.userModel.set({
          friend_requests: _this.userModel.toJSON().friend_requests.splice(accept_index, 1) //deletes user from friend_requests list on clientside userModel
      }); 

      this.$el.find('.friends').append(new_friend);
      
      $.ajax({
        type: 'POST', 
        url: 'api/acceptfriend', 
        data:{
          friend: accepted_id
        }, 
        success:function(data){
          Materialize.toast('Friend successfully accepted', 3000);
        }, 
        error: function(data){
          Materialize.toast('Friend not successfully accepted', 3000);
        }
      });

    }, 
    rejectFriend: function(event){
      var _this = this; 

     
      var class_name = $(event.target).parent().attr('class'); 
      var rejected_id = class_name.slice(class_name.lastIndexOf(' ') + 1); //grabs ID of rejected friend_request

      var f_requests = _this.userModel.toJSON().friend_requests;
      var friend_index = _this.getIndex(f_requests, rejected_id);

      $.ajax({
        type:'POST', 
        url:'api/rejectfriend',
        data:{
          friend: rejected_id, 
        }, 
        success: function(data){
          _this.userModel.set({
            friend_requests: _this.userModel.toJSON().friend_requests.splice(friend_index, 1) //removes friend from friend_requests from the userModel on the client side
          });

          Materialize.toast('Friend successfully rejected', 3000); 
        }, 
        error: function(data){
          Materialize.toast('Friend not rejected', 3000);
        }
      });
    }, 
    removeFriend: function(event){
      var _this = this; 

      var class_name = $(event.target).parent().attr('class'); //gets the ID of removed friend
      var removed_id = class_name.slice(class_name.lastIndexOf(' ') + 1); 

      var friends = _this.userModel.toJSON().friends;
      var friend_index = _this.getIndex(friends, removed_id);

      $.ajax({
        type: 'POST', 
        url:'api/removefriend', 
        data:{
          friend: removed_id
        },
        success: function(data){
          _this.userModel.set({
            friends: _this.userModel.toJSON().friends.splice(friend_index, 1) //removes friend from friend_requests from the userModel on the client side
          });

          Materialize.toast('Friend successfully removed', 3000);
        }, 
        error: function(data){
          Materialize.toast('Friend not successfully removed', 3000);
        }
      });
    }, 
    getIndex: function(attr, id){ //returns the index of which the friend or friend_request id is in the userModel attributes 
      var index =  $.grep(attr, function(e){return e.id == id});
      return index;
    }

});



