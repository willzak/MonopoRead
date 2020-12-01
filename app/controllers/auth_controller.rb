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

  def logged_in
    unless user_id_in_token?
      render json: { message: 'Not authenticated' }, status: :unauthorized
      return
    end
    @current_user = User.find(auth_token[:user_id])
    if @current_user.present? && @current_user.is_a?(User)
      @current_user = { id: @current_user.id, email: @current_user.email, name: @current_user.name }
      render :json => @current_user
    else
      render json: { message: 'No user' }, status: 401
    end
  rescue JWT::VerificationError, JWT::DecodeError
    render json: { message: 'Not authenticated' }, status: :unauthorized
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