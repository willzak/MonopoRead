class AuthController < ApplicationController
  def login
    if params['email'] && params['password']
      user = User.find_by(email: params['email'])
      if user && user.authenticate(params['password'])
        token = payload(user)
        render :json => token
      else
        render json: { message: 'Wrong login or password' }, status: 403
      end
    else
      render json: { message: 'No login or password' }, status: 401
    end
  end

  private

  def payload(user)
    return nil unless user and user.id
    {
      auth_token: JsonWebToken.encode({user_id: user.id}),
      user: {id: user.id, email: user.email, name: user.name}
    }
  end
end