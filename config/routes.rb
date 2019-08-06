Rails.application.routes.draw do
  root 'home#index'
  resources :reviews
  resources :job_posts
end
