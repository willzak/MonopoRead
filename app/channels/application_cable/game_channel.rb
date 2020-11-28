module ApplicationCable
  class GameChannel < ActionCable::Channel::Base
    def subscribed
      stream_from "game#{params[:game_id]}_channel"
    end
  end
end
