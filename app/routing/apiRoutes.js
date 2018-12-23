var friends = require("../data/friends");

module.exports = function(app){
    // When the /api/friends URL is visited, return the friends array to the page
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
                // Calculate difference between friend and incoming data
                totalDiff += compare;
            };


            // Add to difference mapped array
            diffs.push(totalDiff);
        };
        // Find the smallest number in the diffs array
        var least = Math.min(...diffs);
        for (var i=0;i<diffs.length;i++){
            // Scan through the diffs array
            if(diffs[i]===least){
                // When a match is found, set it to the same "i" in friends
                match=friends[i];
            };
        };
        // Push the incoming data to the friends array
        friends.push(newFriend);
        // Send the match back when requested
        res.json(match);
    });
};