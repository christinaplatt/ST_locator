class SessionsController < ApplicationController
	
	def create
		email = params[:email]
		password = params[:password]
		@supervisor = Supervisor.where(email: email).last
		@teacher = Teacher.where(email: email).last

		
		
		if @supervisor.present? && @supervisor.password == password
			session[:supervisor_id] = @supervisor.id
			
			redirect_to map_path

		elsif @teacher.present? && @teacher.password == password
			session[:teacher_id] = @teacher.id

			redirect_to map_path
		else 
			
			redirect_to root_path
		end
	end

	def destroy
		session[:supervisor_id] = nil
		session[:teacher_id] = nil
		redirect_to root_path
	end
end
