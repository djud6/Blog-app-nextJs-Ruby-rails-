Rails.application.routes.draw do
  # Regular resources for non-API routes
  resources :posts

  # API namespace
  namespace :api do
    # Define API routes for posts with specific actions only
    resources :posts, only: [:index, :show, :create, :update, :destroy]
  end
end
