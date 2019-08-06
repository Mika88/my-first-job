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