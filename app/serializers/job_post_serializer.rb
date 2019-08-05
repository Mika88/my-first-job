class JobPostSerializer < ActiveModel::Serializer
  attributes :id, :post_type, :job_type, :description, :location, :salary, :creator_email, :creator_name
end
