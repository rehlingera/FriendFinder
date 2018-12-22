var friends = require("../data/friends");

module.exports = function(app){
    app.get("/api/friends", function(req,res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req,res) {
        // potential new friend request
        var newFriend = req.body;
        var match = friends[0];
        var diffs = [];
        // Search all friends
        for(var i=0;i<friends.length;i++){
            // Declare new difference for this friend
            var totalDiff = 0;
            for (var x=0;x<friends[i].scores.length;x++){
                var compare = Math.abs(newFriend.scores[x] - friends[i].scores[x]);
                // Calculate difference between friend and I
                totalDiff += compare;
            };


            // Add to difference mapped array
            diffs.push(totalDiff);
        };
        var least = Math.min(...diffs);
        for (var i=0;i<diffs.length;i++){
            if(diffs[i]===least){
                match=friends[i];
            };
        };

        friends.push(newFriend);

        res.json(match);
    });
};