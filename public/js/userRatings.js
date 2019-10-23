$(document).ready(function() {
function getRatings(user) {
    userId = user || "";
    if (userId) {
      userId = "/?user_id=" + userId;
    }
    $.get("/api/ratings" + userId, function(data) {
      console.log("Ratings", data);
      ratings = data;
      if (!ratings || !ratings.length) {
        displayEmpty(user);
      }
      else {
        initializeRows();
      }
    });
  }
})
