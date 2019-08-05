class JobPostsController < ApplicationController
    def index
      @job_posts = JobPost.all
      render json: @job_posts
    end
end
