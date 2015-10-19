class SessionsController < ApplicationController
	def new
		@supervisor = Supervisor.new
		@teacher = Teacher.new
	end
	def create
		eamil = params[:email]
		password = params[:password]
		@supervisor = Supervisor.where(email: email).first
		@teacher = Teacher.where(eamil: email).first
		if @supervisor.nil?
			redirect_to root_path
		else
			if @supervisor.passowrd == password
				session[:supervisor_id] = @supervisor.supervisor_id
				redirect_to map_path
			else
				redirect_to root_path
			end
		end
	end
	def destroy
		session[:supervisor_id] = nil
		redirect_to root_path
	end
end
