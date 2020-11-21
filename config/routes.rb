Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    
    resources :users 
    resources :games do
      resources :players
    end
    resources :boards do
      resources :board_tiles
    end
    resources :books
    resources :tile_groups
    resources :tiles

    get '/boards/:board_id/users' => 'boards#users'
    get '/games/:game_id/users' => 'games#users'
    get '/users/:user_id/games' => 'users#games'
    get '/boards/:board_id/player_tiles' => 'boards#player_tiles'
    get '/boards/:board_id/players/:player_id/player_tiles' => 'players#player_tiles'

  end

  get '*path', to: "static_pages#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

end
