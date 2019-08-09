class JobPostSerializer < ActiveModel::Serializer
  attributes :id, :post_type, :job_type, :description, :location, :salary, :creator_email, :creator_name

  has_many :reviews
end
