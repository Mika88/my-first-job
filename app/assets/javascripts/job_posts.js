$(() => {
  bindPostsClickEvents()
});

const bindPostsClickEvents = () => {
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
    $('.container').html('')
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
    $('#newPost').remove()
  })
}

const posts = posts => {
  $('.container').html('')
  $('.container').append(`<ul class="posts-list"></ul>`)
  posts.forEach(post => {
    let newPost = new JobPost(post)
    let postList = newPost.postIndex()
    $('.posts-list').append(postList)
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
  sectionTags()
  $.get("/job_posts/" + postId, function(post){
    let newPost = new JobPost(post)
    let postHtml = newPost.postFormat() 
    $('.job-post').append(postHtml)
    getReviews(postId)
  });
}

function postJobPost(values) {
  sectionTags()
  $.post("/job_posts", values).done(function(data) {
    let newPost = new JobPost(data)
    let postHtml = newPost.postFormat()
    $('.job-post').append(postHtml)
    getReviews(newPost.id)
  })
}

const sectionTags= () => {
  $('.container').append("<section class='job-post'>");
  $('.container').append("<section class='reviews'>");
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

JobPost.prototype.postFormat = function() {
  let postInfo = `
    <h4>Job Type</h4>
    <h5>${this.jobType}</h5>
    <h4>Job Description </h4>
    <p>${this.description}</p>
    <h4>Details</h4>
    <ul>
      ${this.location ? `<li>Location: ${this.location}</li>` : '' }
      ${this.salary ? `<li>Hourly Rate: $${this.salary}</li>` : '' }
    </ul>
    <h4>Contact Info</h4>
    <h6><b>Name:</b> ${this.creatorName}</h6>
    <h6><b>Email:</b> ${this.creatorEmail}</h6>
    <a href="#" class="review_form_link" data-id="${this.id}"><h5>Add a Review About ${this.creatorName}</h5></a>
    <hr>
  </section>
  `
  return postInfo
}

JobPost.prototype.postIndex = function() {
  let postList = `
    <li>
      <h4><a class="post_link" data-id="${this.id}" href="#">Post ${this.id}:</a></h4>
      <b>${this.postType}</b>
      <h5><b>Job Type</b> ${this.jobType}</h5>
      ${this.location ? `<h5><b>Location</b> ${this.location}</h5>` : ''}
      ${this.salary ? `<h5><b>Hourly Rate</b> $${this.salary}</h5>` : ''}
    </li>
  `
  return postList
}

const newPostForm = () => {
  let formFormat = `
    <form id="newPost">
      <h4>New Job Post</h4>
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

      <b>Hourly Rate: <b>
      $<input type="number" name="salary"><br>

      <b>Contact Info*:</b><br>
      Name: <input type="text" name="creator_name" required><br>
      Email: <input type="email" name="creator_email" required></br>
      <b>**required fields</b>
      <input type="submit" value="Submit">
    </form>
  `
  $('.container').append(formFormat)
}

