class Review < ApplicationRecord
    belongs_to :job_post

    validates :title, :reviewer_name, :presence => true
end
