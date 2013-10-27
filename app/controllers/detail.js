var args = arguments[0] || {}, model = args.model, myReview = null;
var user = Alloy.Models.instance("user");

if (model) {
    $.webView.url = model.get('website');
    $.getView().title = model.get('name');

    $.starwidget.init(function(num) {
        
        if(myReview){
            alert("리뷰를 업데이트 합니다! ");
            Cloud.Reviews.update({
                place_id: model.get("id"),
                review_id: myReview.id,
                rating: num,
                content: 'Very good!'
            }, function (e) {
                if (e.success) {
                    var review = e.reviews[0];
                    alert('리뷰를 다시 반영했습니다.');
                } else {
                    alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
                }
            });
            
        }else{
            alert("리뷰를 등록합니다.");
            Cloud.Reviews.create({
                place_id: model.get("id"),
                rating: num,
                content: 'Good'
            }, function (e) {
                if (e.success) {
                    var review = e.reviews[0];
                    alert('리뷰를 등록했습니다.');
                    var q1 = Alloy.Collections.instance('quest').at(1);
					var count = q1.get('reviewed');
					q1.set({'reviewed': count+1});
                } else {
                    alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
                }
            });   
        }
        
        
    });
}

Cloud.Reviews.query({
    page : 1,
    per_page : 20
}, function(e) {
    if (e.success) {
        var review = _.filter(e.reviews, function(review) {
            return (user.id === review.user.id) && (review.reviewed_object.id == model.get("id"));
        });

        // 내가 쓴 리뷰가 있는 경우
        if (review && review.length > 0) {
            myReview = review[0];
            $.starwidget.setRating(myReview.rating);
        }else{
            myReview = null
        }

    } else {
        alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
    }
}); 