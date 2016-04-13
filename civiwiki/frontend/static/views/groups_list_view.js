var GroupsListView = Backbone.View.extend({

    el: '#groups',
    groupsTemplate: _.template($('#groups-template').html()),

    initialize: function (options) {
        var _this = this;
        options = options || {};

        _this.groups = options.groups;
        _this.render();
    },

    render: function () {
        var _this = this;
        _this.$el.empty().append(_this.groupsTemplate({
            groups: _this.sampleGroups()
            //groups: _this.groups;        // TODO: Use this when groups are available
        }));
    },

    events: {
        'click .groups-item': 'clickGroup'
    },

    // Redirects User to selected group page
    clickGroup: function(event) {
        var _this = this;
        // TODO: Link to Groups Pages once they are implemented
    },

    // Sample Data As a Placeholder
    sampleGroups: function(){
        // Assumes that each group has an id, name, and an image. Description is just added detail.
        var sample_data = [
            {id: 1, name: 'Group to protect Wild Life in Missouri Parks', description: 'We must protect nature!', image:'/static/img/team_profile/team_default.png'},
            {id: 2, name: 'WashU CompSci', description: '010101000101010101010101000010101', image:'/static/img/team_profile/team_default.png'},
            {id: 3, name: 'CiviWiki Dev Team', description: 'We love working on civiwiki!', image:'/static/img/team_profile/team_default.png'},
            {id: 4, name: 'We Complain About Everything', description: 'We hate everything!', image:'/static/img/team_profile/team_default.png'}
        ];
        return sample_data;
    }
});
