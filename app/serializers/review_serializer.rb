class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :reviewer_name, :rating
end
