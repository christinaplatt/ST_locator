class SupervisorsController < ApplicationController
	def index
		@supervisor = Supervisor.new
	end

	def show
		@supervisor = Supervisor.find(user_params)
	end

	def new
	end

	def create
		@supervisor = Supervisor.create(supervisor_params)
		redirect_to edit_user_path @supervisor
	end

	def edit
		params[:id]
		@user = Supervisor.find(params[:id])
	end

	def update
		@supervisor = Supervisor.find(params[:id])
		@supervisor.update(user_params)
		redirect_to edit_user_path@supervisor
	end

	def login
		params[:id]
		@supervisor = Supervisor.find(params[:id])
		redirect_to edit_user_path@supervisor
	end
	def destroy
		@supervisor = Supervisor.find(params[:id])
		@user.destroy
		redirect_to new_user_path

	end


	private

	def supervisor_params
		params.require(:supervisor).permit(:fname, :lname)
	end

	def account_update_params
		params.require(:supervisor).permit(:fname, :lname)
	end
end
