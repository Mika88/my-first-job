Rails.application.routes.draw do
  root 'home#index'
    resources :job_posts do
      resources :reviews
    end
end

