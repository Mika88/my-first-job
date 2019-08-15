Rails.application.routes.draw do
  root 'home#index'
    resources :job_posts, only: [:index, :show, :create, :destroy] do
      resources :reviews, only: [:index, :show, :create, :destroy]
    end
end

