module ApplicationCable
  class Channel < ActionCable::Channel::Base
    def subscribed
      stream_from 'channel'
    end
  end
end
