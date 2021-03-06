$(() => {
  bindReviewsClickEvents()
});

const bindReviewsClickEvents = () => {
  $(document).on('submit', '#newReview', function(event){
    event.preventDefault()
    let id = $(this).data("id")
    const values = $(this).serialize()
    postReview(values, id)
    $('.review_form_link').removeClass("clicked");
    $('#newReview').remove()
  })

  $(document).on('click', '.review_form_link', function(event){
    event.preventDefault()
    let id = $(this).data("id")
    if ($(this).hasClass("clicked")) {
      $('#newReview').remove()
    } else {
      newReviewForm(id)
    }
    $(this).toggleClass("clicked");
  })

  $(document).on('click', '.show-more', function(event){
    event.preventDefault()
    const id = $(this).data("id")
    if($(this).hasClass("show-content")) {
      document.getElementsByClassName(`review-${id}`)[0].style.height = '1.5em'
      $(this).text("show more") 
    }else{
      document.getElementsByClassName(`review-${id}`)[0].style.height = 'auto'
      $(this).text("show less") 
    }
    $(this).toggleClass("show-content");
  })
  
  $(document).on('click', '.delete-review', function(event){
    event.preventDefault()
    const reviewId = $(this).data("id")
    const urlString = window.location.href
    const postId = Number(urlString.split("=")[1])
    if(window.confirm('Are you sure you wish to delete this review?')){
      deleteReview(postId, reviewId)
    }
  })

}

const postReview = (values, postId) => {
  const reviewsHeader = $('.reviews').children()[0]
  const reviewsLength = $('.reviews-list').children().length
  $.post("/job_posts/" + postId + "/reviews", values).done(function(data){
    let newReview = new Review(data)
    let reviewHtml = newReview.reviewIndex()
    reviewsHeader.textContent = `Reviews (${reviewsLength + 1})`
    $('.reviews-list').append(reviewHtml)
  })
  .fail(function(response) {
    alert('Error: all required fields must be filled');
   });
}

const getReviews = postId => {
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

const deleteReview = (postId, reviewId) => {
  const reviewsHeader = $('.reviews').children()[0]
  const reviewsLength = $('.reviews-list').children().length
  let url = `/job_posts/${postId}/reviews/${reviewId}`
  fetch(url, { method: 'DELETE'})
  .then(res => res.json())
  .then(res => {
    $(`#review-${res.id}`).remove()
    reviewsHeader.textContent = `Reviews (${reviewsLength - 1})`
  })
}

const reviewCount = (action) => {
  const reviewsHeader = $('.reviews').children()[0]
  const reviewsLength = $('.reviews-list').children().length
  reviewsHeader.textContent = `Reviews (${action})`
}

function Review(review) {
  this.id = review.id
  this.title = review.title
  this.content = review.content
  this.reviewerName = review.reviewer_name
}

Review.prototype.reviewIndex = function() {
  let reviewsList = `
    <li id="review-${this.id}">
      <h5>
        <b>Title: </b>${this.title}
        <a href="#" class="delete-review" data-id="${this.id}">X</a>
      </h5>
      ${this.content ? `<div class="content review-${this.id}"><p>${this.content}</p></div><a href="#" data-id="${this.id}" class="show-more">show more</a><br>` : ''}
      <h6><b>Review by:</b> ${this.reviewerName}</h6>
    </li>
  `
  return reviewsList
}

const newReviewForm = postId => {
  let reviewForm = `
    <form id="newReview" data-id="${postId}">
      <b>Title*: </b>
      <input type="text" name="title" required></br>
      <b>Content: </b><br>
      <textarea type="text" name="content" rows="4" cols="30"></textarea><br>
      <b>Your Name*: </b> 
      <input type="text" name="reviewer_name" required><br>
      <b>**Required fields</b><br>
      <input type="submit" value="Submit" >
      <hr>
    </form>
  `
  $('.job-post').append(reviewForm)
}