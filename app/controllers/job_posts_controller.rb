class JobPostsController < ApplicationController

    def index
      @job_posts = JobPost.all
      render json: @job_posts
    end

    def show
        @job_post = JobPost.find(params[:id])
        render json: @job_post
    end

    def create
        @job_post = JobPost.new(job_post_params)
        @job_post.job_type = JSON.parse( @job_post.job_type.tr("'", '"') ).join(", ")

        if @job_post.save
            render json: @job_post
        else
            render json: { errors: { message: "Post failed to save"}}
        end
    end
    
    def destroy
        @job_post = JobPost.find(params[:id]).destroy
        render json: @job_post
    end

    private

    def job_post_params
        params.permit(:post_type, :description, :location, :salary, :creator_email, :creator_name, :job_type => [])
    end
end
