Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    
    resources :users 
    resources :games do
      resources :players do
        resources :player_tiles
      end
    end
    resources :boards do
      resources :board_tiles
    end
    resources :books
    resources :tile_groups
    resources :tiles

    get '/users/:user_id/games' => 'users#games'
    get '/games/:game_id/players' => 'games#players'
    get '/games/:game_id/users' => 'games#users'
    get '/games/:game_id/boards' => 'games#boards'
    get '/boards/:board_id/players' => 'boards#players'
    get '/boards/:board_id/users' => 'boards#users'

    get '/books/:book_id/goodreads' => 'books#goodreads'
    get '/books/:book_id/google' => 'books#google'
    post '/books/goodreads_search' => 'books#goodreads_search'
    post '/books/google_search' => 'books#google_search'

    get '/games/:game_id/free_colors' => 'games#free_colors'
    get '/games/:game_id/current_board' => 'games#current_board'

    get '/boards/:board_id/player_tiles' => 'boards#player_tiles'
    get '/boards/:board_id/current_tiles' => 'boards#current_tiles'
    get '/boards/:board_id/players/:player_id/player_tiles' => 'players#player_tiles'
    get '/boards/:board_id/players/:player_id/current_tile' => 'players#current_tile'

    get '/tile_groups/:tile_group_id/tiles' => 'tile_groups#tiles'

  end

  get '*path', to: "static_pages#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

end
