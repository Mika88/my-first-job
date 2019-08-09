class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :reviewer_name, :rating

  belongs_to :job_post
end
