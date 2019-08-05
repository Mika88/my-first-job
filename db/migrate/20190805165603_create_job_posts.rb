class CreateJobPosts < ActiveRecord::Migration[5.2]
  def change
    create_table :job_posts do |t|
      t.string :post_type
      t.string :job_type
      t.string :description
      t.string :location
      t.integer :salary
      t.string :creator_name
      t.string :creator_email

      t.timestamps
    end
  end
end
