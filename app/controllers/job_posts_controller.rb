class JobPostsController < ApplicationController
    def index
      @job_posts = JobPost.all
      render json: @job_posts
    end

    def show
        @job_post = JobPost.find(params[:id])
        render json: @job_post
    end

    def new
        @job_post = JobPost.new
    end

    private

    def job_post_params
        params.require(:job_post).permit(:post_type, :job_type, :description, :location, :salary, :creator_email, :creator_name)
    end
end
