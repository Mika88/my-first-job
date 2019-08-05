class JobPost < ApplicationRecord
    has_many :reviews

    validates :post_type, :job_type, :description, :creator_name, :creator_email presence: true
end
