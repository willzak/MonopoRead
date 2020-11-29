module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private
      def find_verified_user
        unless user_id_in_token? 
          reject_unauthorized_connection
          return
        end
        current_user = User.find(auth_token[:user_id])
        if current_user
          return current_user
        else
          reject_unauthorized_connection
        end
      end

      def http_token
        @http_token = request.params[:token]
      end
    
      def auth_token
        @auth_token ||= JsonWebToken.decode(http_token)
      end
    
      def user_id_in_token?
        http_token && auth_token && auth_token[:user_id].to_i
      end
  end
end
