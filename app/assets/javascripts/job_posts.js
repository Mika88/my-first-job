$(() => {
  bindClickEvents()
});

const bindClickEvents = () => {
  $('#posts_link').on('click', event => {
    event.preventDefault()
    history.pushState(null, null, "job_posts")
    getJobPosts()
  })
}

const getJobPosts = () => {
  $('#container').html('')
  $.get("/job_posts", function(jobPosts){
    jobPosts.forEach(post => {
      console.log(post)
    });
  })
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
    <h4>${this.salary ? `Charge: $${this.salary} per hour` : `` }</h4>
    <h4>contact info</h4>
    <h4>Name: ${this.creatorName}</h4>
    <h4>Email: ${this.creatorEmail}</h4>
  `
  return postInfo
}

JobPost.prototype.postIndex = function() {
  let postList = `
    <b>${this.postType}</b>
    <b>${this.jobType}</b>
    <b>${this.location} </b>
  `
  return this.postList
}