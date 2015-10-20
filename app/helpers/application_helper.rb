module ApplicationHelper
	def current_supervisor
		if session[:supervisor_id]
			@current_supervisor = Supervisor.find session[:supervisor_id]
		end
	end
	
end
