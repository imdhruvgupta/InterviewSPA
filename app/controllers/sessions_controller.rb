class SessionsController < ApplicationController
    skip_before_action :verify_authenticity_token


    def index
        @sessions = Session.all
        render :json => @sessions
    end
    
    def new
    end

    def update
        @session = Session.find(params[:id])
        
        if @session.update(session_params)
            render :json => @session
        else
            render 'edit'
        end
    end

    def create
        
        
        @session = Session.new(session_params)
        @session.save
        redirect_to sessions_path
        
    end
    
    
    def edit
        @session = Session.find(params[:id])
        render :json => @session
    end
    
    def destroy
        @session = Session.find(params[:id])
        @session.destroy
        redirect_to sessions_path
    end
    
    private
    def session_params
        params.require(:session).permit(:start, :end, :user_id)
    end
end
