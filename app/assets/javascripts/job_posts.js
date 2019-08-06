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