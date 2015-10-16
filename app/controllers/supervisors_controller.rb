class SupervisorsController < ApplicationController
	def index
		@supervisor = Supervisor.all
	end
	def new
		@supervisor = Supervisor.new
	end
	def create
		@supervisor = Supervisor.create(supervisor_params)
		if @supervisor.save
			redirect_to 
	end
	def show
		@supervisor = Supervisor.find(supervisor_params)
	end
	def edit
		params[:id]
		@supervisor = Supervisor.find(params[:id])
	end
	def update

		@supervisor = Supervisor.find(params[:id])
		@supervisor.update(user_params)
		redirect_to edit_user_path @supervisor
	end
	def destroy
		@supervisor = Supervisor.find(params[:id])
		@supervisor.destroy
		redirect_to index_home_path
	end


	private

	def supervisor_params
		params.require(:supervisor).permit(:fname, :lname, :email,
			:address1, :address2, :city, :state)
	end
end
