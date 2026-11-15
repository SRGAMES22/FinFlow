Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "auth/login", to: "auth#login"
      post "auth/register", to: "auth#register"
      get "auth/me", to: "auth#me"

      resources :transactions, only: [:index, :create, :show, :update, :destroy]
      resources :categories, only: [:index, :create]
      resources :goals, only: [:index, :create, :update, :destroy]

      get "dashboard/summary", to: "dashboard#summary"
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
