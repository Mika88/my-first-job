class ReviewsController < ApplicationController

  def index
    @reviews = JobPost.find(params[:job_post_id]).reviews
    render json: @reviews
  end

  def show
      @review = Review.find(params[:id])
      render json: @review
  end

  def create
      @review = Review.new(review_params)

      if @review.save
          render json: @review
      else
          render json: { errors: { message: "Review failed to save"}}
      end
  end
  
  def destroy
    @review = Review.find(params[:id]).destroy
    render json: @review
  end

  private

  def review_params
      params.permit(:title, :content, :reviewer_name, :job_post_id)
  end
end
