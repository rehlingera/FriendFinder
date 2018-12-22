var friends = require("../data/friends");

module.exports = function(app){
    app.get("/api/friends", function(req,res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req,res) {
        var newFriend = req.body;
        var match = friends[0];
        var diffs = [];
        for(var i=0;i<friends.length;i++){
            var totalDiff = 0;
            for (var x=0;x<friends[i].scores.length;x++){
                var compare = Math.abs(newFriend.scores[x] - friends[i].scores[x]);
                totalDiff += compare;
            };
            diffs.push(totalDiff);
        };
        var least = Math.min(...diffs);
        for (var i=0;i<diffs.length;i++){
            if(diffs[i]===least){
                match=friends[i];
                return(match);
            };
            return(match);
        };

        friends.push(newFriend);

        res.json(match);
    });
};