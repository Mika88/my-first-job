class ChangeJobTypeInJobPosts < ActiveRecord::Migration[5.2]
  def change
    change_column :job_posts, :job_type, :string, array: true
  end
end
