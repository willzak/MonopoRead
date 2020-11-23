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

    get '/users/:user_id/games' => 'users#games' # All games for a user
    get '/games/:game_id/users' => 'games#users' # All users for a game
    get '/games/:game_id/players' => 'games#players' # All players for a game
    get '/games/:game_id/boards' => 'games#boards' # All boards for a game
    get '/boards/:board_id/users' => 'boards#users' # All users for a board
    get '/boards/:board_id/players' => 'boards#players' # All players for a board

    get '/books/:book_id/goodreads' => 'books#goodreads' # Goodreads call for specific book with ISBN
    get '/books/:book_id/google' => 'books#google' # Google call for specific book with ISBN
    post '/books/goodreads_search' => 'books#goodreads_search' # Goodreads call for search term provided
    post '/books/google_search' => 'books#google_search' # Google call for search term provided

    get '/games/:game_id/free_colors' => 'games#free_colors' # All free colors for a game
    get '/games/:game_id/current_board' => 'games#current_board' # Current board for a game

    get '/boards/:board_id/player_tiles' => 'boards#player_tiles' # All player tiles for all players for a board
    get '/boards/:board_id/current_tiles' => 'boards#current_tiles' # Current tiles for all players for a board
    get '/boards/:board_id/player_stats' => 'boards#player_stats' # Books read and last play for all players for a board
    get '/boards/:board_id/players/:player_id/player_tiles' => 'players#player_tiles' # All player tiles for a player for a board
    get '/boards/:board_id/players/:player_id/current_tile' => 'players#current_tile' # Current tile for a player for a board

    get '/tile_groups/:tile_group_id/tiles' => 'tile_groups#tiles' # All games for a user

  end

  get '*path', to: "static_pages#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

end
