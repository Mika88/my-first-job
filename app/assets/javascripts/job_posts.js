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

  $(document).on('click', '.post_link', function(event) {
    event.preventDefault()
    let id = $(this).data("id")
    history.pushState(null, null, `/job_posts/${id}`)
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

function getJobPost(postId){
  $.get("/job_posts/" + postId, function(post){
    let newPost = new JobPost(post)
    let postHtml = newPost.postFormat() 
    $('.container').html('')
    $('.container').append(postHtml)
  });
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
    <h4>${this.postType}</h4>
    <h3>${this.jobType}</h3>
    <h4>Description</h4>
    <p>${this.description}</p>
    <h4>${this.location ? `Location: ${this.location}` : `` }</h4>
    <h4>${this.salary ? `Charge: $${this.salary} per hour` : '' }</h4>
    <h4>contact info</h4>
    <h4>Name: ${this.creatorName}</h4>
    <h4>Email: ${this.creatorEmail}</h4>
  `
  return postInfo
}

JobPost.prototype.postIndex = function() {
  let postList = `
    <h4><a class="post_link" data-id="${this.id}" href="#">Post ${this.id}:</a></h4>
    <b>${this.postType}</b><br>
    <b>${this.jobType}</b><br>
    <b>${this.location ? `Location: ${this.location}` : ''}</b><br>
  `
  return postList
}