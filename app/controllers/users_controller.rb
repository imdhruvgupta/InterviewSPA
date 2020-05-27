class UsersController < ApplicationController
    def index
        @users = User.all
        render :json => @users
    end

    def new
    end

    def create
        @user = User.new(user_params)
        @user.save
        redirect_to users_path
    end

    def edit
        @user = User.find(params[:id])
    end

    private
    def user_params
        params.require(:user).permit(:username, :email)
    end

end
