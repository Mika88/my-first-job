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
    let id = $(this).data("id")
    getJobPost(id)
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
    $('.container').html('')
    $('.container').append(postHtml)
  });
}

const newPostForm = () => {
  let formFormat = `
    <h4>New Job Post</h4>
    <form method="post" action="/job_posts" id="newPost">

      <b>I am...* </b><br>
      <input type="radio" name="postType" value="looking for a job">Looking for a job<br>
      <input type="radio" name="postType" value="looking for a job">Looking to hire<br></br>

      <b>Select a job type*:</b><br>
      <input type="checkbox" name="jobType[]" value="babysitting">Babysitting<br>
      <input type="checkbox" name="jobType[]" value="dogwalking">Dogwalking<br>
      <input type="checkbox" name="jobType[]" value="yard work">Yard Work<br>
      <input type="checkbox" name="jobType[]" value="pet care">Pet Care (feeding, checking in)<br>
      <input type="checkbox" name="jobType[]" value="tutoring">Tutoring<br>
      <input type="checkbox" name="jobType[]" value="other">other<br></br>

      <b>About Job/Me</b><br>
      <textarea type="text" name="description" form="newPost" rows="10" cols="30"></textarea><br></br>

      <b>Job Location (neighborhood, city): <b>
      <input type="text" name="location"><br>

      <b>Hourly salary: <b>
      $<input type="number" name="salary"><br>

      <b>Contact Info*:</b><br>
      Name: <input type="text" name="name" required><br>
      Email: <input type="email" name="email" required></br>
      <b>**required fields</b>
      <input type="submit" value="Submit">
    </form>
  `
  $('.container').html('')
  $('.container').append(formFormat)
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

