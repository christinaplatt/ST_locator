class SessionsController < ApplicationController
	
	def create
		email = params[:email]
		password = params[:password]
		@supervisor = Supervisor.where(email: email).first
		@teacher = Teacher.where(email: email).first


		if @supervisor.nil? || @teacher.nil?
			redirect_to root_path
		
		elsif @supervisor.password == password
				session[:supervisor_id] = @supervisor.supervisor_id
				redirect_to map_path
		elsif @teacher.password == password
			session[:teacher_id] = @teacher.teacher_id
			redirect_to map_path
		else 
			redirect_to root_path
		end
	end

	def destroy
		session[:supervisor_id] = nil
		redirect_to root_path
	end
end
