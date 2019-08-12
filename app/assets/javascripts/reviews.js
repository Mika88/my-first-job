$(() => {
  bindReviewsClickEvents()
});

const bindReviewsClickEvents = () => {
  $(document).on('submit', '#newReview', function(event){
    event.preventDefault()
    let id = $(this).data("id")
    const values = $(this).serialize()
    postReview(values, id)
    $('#newReview').remove()
  })

  $(document).on('click', '.review_form_link', function(event){
    if ($(this).hasClass("clicked")) {
      $('#newReview').remove()
    } else {
      let id = $(this).data("id")
      newReviewForm(id)
    }
    event.preventDefault()
    $(this).toggleClass("clicked");
  })
}

function postReview(values, postId) {

  const reviewsHeader = $('.reviews').children()[0]
  const reviewsLength = $('.reviews-list').children().length

  $.post("/job_posts/" + postId + "/reviews", values).done(function(data){
    let newReview = new Review(data)
    let reviewHtml = newReview.reviewIndex()
    reviewsHeader.textContent = `Reviews (${reviewsLength + 1})`
    $('.reviews-list').append(reviewHtml)
  })
}

function getReviews(postId) {
  $.get("/job_posts/" + postId + "/reviews", function(reviews){
    $('.reviews').prepend(`<h3>Reviews (${reviews.length})</h3>`)
    const ul = document.createElement("ul")
    ul.className = "reviews-list"
    $('.reviews').append(ul)

    reviews.forEach(review => {
      let newReview = new Review(review)
      let reviewList = newReview.reviewIndex()
      $(ul).append(reviewList)
     })
  })
}

function Review(review) {
  this.id = review.id
  this.title = review.title
  this.content = review.content
  this.reviewerName = review.reviewer_name
}

Review.prototype.reviewIndex = function() {
  let reviewsList = `
    <li>
      <h5><b>Title: </b>${this.title}</h5>
      ${this.content ? `<p>${this.content}</p>` : ''}
      <h6><b>Review by:</b> ${this.reviewerName}</h6>
    </li>
    <br>
  `
  return reviewsList
}

const newReviewForm = postId => {
  let reviewForm = `
    <form id="newReview" data-id="${postId}">
      <b>Title*: </b>
      <input type="text" name="title" required></br>
      <b>Content: </b><br>
      <textarea type="text" name="content" rows="5" cols="20"></textarea><br>
      <b>Your Name*: </b> 
      <input type="text" name="reviewer_name" required><br>
      <b>**Required fields</b><br>
      <input type="submit" value="Submit" >
      <hr>
    </form>
  `
  $('.job-post').append(reviewForm)
}