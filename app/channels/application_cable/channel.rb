module ApplicationCable
  class Channel < ActionCable::Channel::Base
    def subscribed
      stream_from 'channel'
      puts 
    end
  end
end
