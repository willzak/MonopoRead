# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_11_27_013822) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "badges", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "tier"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "board_tiles", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "board_id"
    t.bigint "tile_id"
    t.index ["board_id"], name: "index_board_tiles_on_board_id"
    t.index ["tile_id"], name: "index_board_tiles_on_tile_id"
  end

  create_table "boards", force: :cascade do |t|
    t.string "win_requirement"
    t.integer "win_points"
    t.boolean "isbn_trust"
    t.boolean "isbn_master"
    t.boolean "isbn_vote"
    t.integer "turn_delay"
    t.integer "turn_reminder"
    t.datetime "ended_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "game_id"
    t.index ["game_id"], name: "index_boards_on_game_id"
  end

  create_table "books", force: :cascade do |t|
    t.string "name"
    t.string "author"
    t.text "cover_image"
    t.string "genre"
    t.string "isbn"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cards", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "effect"
    t.integer "outcome"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "colors", force: :cascade do |t|
    t.string "name"
    t.string "hexcode"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "games", force: :cascade do |t|
    t.string "name"
    t.string "password_digest"
    t.integer "max_players"
    t.datetime "ended_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_games_on_user_id"
  end

  create_table "player_badges", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "player_id"
    t.bigint "board_id"
    t.bigint "badge_id"
    t.index ["badge_id"], name: "index_player_badges_on_badge_id"
    t.index ["board_id"], name: "index_player_badges_on_board_id"
    t.index ["player_id"], name: "index_player_badges_on_player_id"
  end

  create_table "player_cards", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "player_id"
    t.bigint "board_id"
    t.bigint "card_id"
    t.index ["board_id"], name: "index_player_cards_on_board_id"
    t.index ["card_id"], name: "index_player_cards_on_card_id"
    t.index ["player_id"], name: "index_player_cards_on_player_id"
  end

  create_table "player_tiles", force: :cascade do |t|
    t.datetime "ended_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "player_id"
    t.bigint "board_tile_id"
    t.bigint "book_id"
    t.bigint "review_id"
    t.index ["board_tile_id"], name: "index_player_tiles_on_board_tile_id"
    t.index ["book_id"], name: "index_player_tiles_on_book_id"
    t.index ["player_id"], name: "index_player_tiles_on_player_id"
    t.index ["review_id"], name: "index_player_tiles_on_review_id"
  end

  create_table "players", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "game_id"
    t.bigint "color_id"
    t.bigint "token_id"
    t.integer "position"
    t.integer "score"
    t.index ["color_id"], name: "index_players_on_color_id"
    t.index ["game_id"], name: "index_players_on_game_id"
    t.index ["token_id"], name: "index_players_on_token_id"
    t.index ["user_id"], name: "index_players_on_user_id"
  end

  create_table "recommendations", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "book_id"
    t.bigint "tile_id"
    t.index ["book_id"], name: "index_recommendations_on_book_id"
    t.index ["tile_id"], name: "index_recommendations_on_tile_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.text "review_text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "book_id"
    t.bigint "user_id"
    t.index ["book_id"], name: "index_reviews_on_book_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "tile_groups", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "color_id"
    t.index ["color_id"], name: "index_tile_groups_on_color_id"
  end

  create_table "tiles", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "tile_group_id"
    t.index ["tile_group_id"], name: "index_tiles_on_tile_group_id"
  end

  create_table "tokens", force: :cascade do |t|
    t.string "name"
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "board_tiles", "boards"
  add_foreign_key "board_tiles", "tiles"
  add_foreign_key "boards", "games"
  add_foreign_key "games", "users"
  add_foreign_key "player_badges", "badges"
  add_foreign_key "player_badges", "boards"
  add_foreign_key "player_badges", "players"
  add_foreign_key "player_cards", "boards"
  add_foreign_key "player_cards", "cards"
  add_foreign_key "player_cards", "players"
  add_foreign_key "player_tiles", "board_tiles"
  add_foreign_key "player_tiles", "books"
  add_foreign_key "player_tiles", "players"
  add_foreign_key "player_tiles", "reviews"
  add_foreign_key "players", "colors"
  add_foreign_key "players", "games"
  add_foreign_key "players", "tokens"
  add_foreign_key "players", "users"
  add_foreign_key "recommendations", "books"
  add_foreign_key "recommendations", "tiles"
  add_foreign_key "reviews", "books"
  add_foreign_key "reviews", "users"
  add_foreign_key "tile_groups", "colors"
  add_foreign_key "tiles", "tile_groups"
end
