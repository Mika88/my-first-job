class AddJobPostIdToReviews < ActiveRecord::Migration[5.2]
  def change
    add_column :reviews, :job_post_id, :integer
  end
end
