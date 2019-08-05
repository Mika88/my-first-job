class JobPostsController < ApplicationController
    def index
      @job_posts = JobPost.all
    end
end
