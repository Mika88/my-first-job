$(() => {
  bindClickEvents()
});

const bindClickEvents = () => {
  $('#workers_link').on('click', event => {
    event.preventDefault()
    history.pushState(null, null, "employee_posts")
    getEmployeesPosts(posts)
  })
  
  $('#jobs_link').on('click', event => {
    event.preventDefault()
    history.pushState(null, null, "employer_posts")
    getEmployersPosts(posts)
  })
  
  $('#new_post_link').on('click', event => {
    event.preventDefault()
    history.pushState(null, null, "posts/new")
    newPostForm()
  })

  $(document).on('click', '.post_link', function(event) {
    event.preventDefault()
    $('.container').html('')
    let id = $(this).data("id")
    getJobPost(id)
  })

  $(document).on('submit', '#newPost', function(event){
    event.preventDefault()
    const values = $(this).serialize()
    postJobPost(values)
  })
}

const posts = posts => {
  $('.container').html('')
  posts.forEach(post => {
    let newPost = new JobPost(post)
    let postList = newPost.postIndex()
    $('.container').append(postList)
  })
}

const getEmployersPosts = callback => {
  $.get("/job_posts", function(jobPosts){
    let jobs = jobPosts.filter(function(post){
      return (post.post_type === "looking to hire")
    })
    callback(jobs)
  }) 
}

const getEmployeesPosts = callback => {
  $.get("/job_posts", function(jobPosts){
    let workers = jobPosts.filter(function(post){
      return (post.post_type === "looking for a job")
    })
    callback(workers)
  }) 
}

const getJobPost = postId => {
  $.get("/job_posts/" + postId, function(post){
    let newPost = new JobPost(post)
    let postHtml = newPost.postFormat() 
    $('.container').append(postHtml)
    newReviewForm(newPost.creatorName)
    getReviews(postId)
  });
}

function postJobPost(values) {
  $.post("/job_posts", values).done(function(data) {
    let newPost = new JobPost(data)
    let postHtml = newPost.postFormat()
    $('.container').append(postHtml)
  })
}

const getReviews = postId => {
  $.get("/job_posts" + postId + "/reviews", function(review){
    let newReview = new Review(review)
    let reviewList = newReview.reviewIndex()
    $('./container').append(reviewList)
  })
}

const newPostForm = () => {
  let formFormat = `
    <h4>New Job Post</h4>
    <form id="newPost">

      <b>I am...* </b><br>
      <input type="radio" name="post_type" value="looking for a job">Looking for a job<br>
      <input type="radio" name="post_type" value="looking to hire">Looking to hire<br></br>

      <b>Select a job type*:</b><br>
      <input type="checkbox" name="job_type[]" value="babysitting">Babysitting<br>
      <input type="checkbox" name="job_type[]" value="dogwalking">Dogwalking<br>
      <input type="checkbox" name="job_type[]" value="yard work">Yard Work<br>
      <input type="checkbox" name="job_type[]" value="pet care">Pet Care (feeding, checking in)<br>
      <input type="checkbox" name="job_type[]" value="tutoring">Tutoring<br>
      <input type="checkbox" name="job_type[]" value="other">other<br></br>

      <b>About Job/Me*</b><br>
      <textarea type="text" name="description" form="newPost" rows="10" cols="30" required></textarea><br></br>

      <b>Job Location (neighborhood, city): <b>
      <input type="text" name="location"><br>

      <b>Hourly salary: <b>
      $<input type="number" name="salary"><br>

      <b>Contact Info*:</b><br>
      Name: <input type="text" name="creator_name" required><br>
      Email: <input type="email" name="creator_email" required></br>
      <b>**required fields</b>
      <input type="submit" value="Submit">
    </form>
  `
  $('.container').html('')
  $('.container').append(formFormat)
}

const newReviewForm = name => {
  let reviewForm = `
    <h5>Add a Review About ${name}</h5>
    <form id="newReview">
      <b>Title*: </b>
      <input type="text" name="title" required></br>
      <b>Content: </b><br>
      <textarea type="text" name="content" rows="5" cols="20"></textarea><br>
      <b>Your Name*: </b> 
      <input type="text" name="reviewer_name" required><br>
      <b>**Required fields</b><br>
      <input type="submit" value="Submit">
    </form>
  `
  $('.container').append(reviewForm)
}

function JobPost(jobPost){
  this.id = jobPost.id
  this.postType = jobPost.post_type
  this.jobType = jobPost.job_type
  this.description = jobPost.description
  this.location = jobPost.location
  this.salary = jobPost.salary
  this.creatorName = jobPost.creator_name
  this.creatorEmail = jobPost.creator_email
}

function Review(review) {
  this.id = review.id
  this.title = review.title
  this.content = review.content
  this.reviewerName = review.reviewer_name
}

Review.prototype.reviewIndex = function() {
  let reviewList = `
    <h5>Title: ${this.title}</h5>
    ${this.content ? `<p>${this.content}</p>` : ''}
    <h6>Review by: ${this.reviewerName}</h6>
  `
}

JobPost.prototype.postFormat = function() {
  let postInfo = `
    <h5>Job Type</h5>
    <h6>${this.jobType}</h6>
    <h5>Job Description </h5>
    <p>${this.description}</p>
    <h5>Details</h5>
    <ul>
      ${this.location ? `<li>Location: ${this.location}</li>` : '' }
      ${this.salary ? `<li>Hourly Salary: $${this.salary}</li>` : '' }
    </ul>
    <h5>Contact Info</h5>
    <h6><b>Name:</b> ${this.creatorName}</h6>
    <h6><b>Email:</b> ${this.creatorEmail}</h6>
    <hr>
    <br></br>
  `
  return postInfo
}

JobPost.prototype.postIndex = function() {
  let postList = `
    <h4><a class="post_link" data-id="${this.id}" href="#">Post ${this.id}:</a></h4>
    <b>${this.postType}</b>
    <h5><b>Job Type</b> ${this.jobType}</h5>
    ${this.location ? `<h5><b>Location</b> ${this.location}</h5>` : ''}
    ${this.salary ? `<h5><b>Hourly Salary</b> $${this.salary}</h5>` : ''}
  `
  return postList
}

