// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require_tree .
//=job_posts
//=reviews

$(() => {
  homePage()
  $('#home_link').on('click', event => {
    event.preventDefault()
    history.pushState(null, null, "/")
    $('.container').html('')
    homePage()
  })
})

const homePage = () => {
  let intro = `
  <div class="home_page">
    <h2>My-First-Job</h2>
    <h5>Creating a strong community by connecting local youth</h5>
    <h5>in search for their first job, and home owners who need some help</h5>
  </div>
  `
  $('.container').append(intro)
}