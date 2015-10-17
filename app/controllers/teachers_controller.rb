class TeachersController < ApplicationController
	
	def index
		@teacher = Teacher.all
	end
	def new
		@user = Teacher.new
	end
	def create
		@teacher = Teacher.create(teacher_params)
		redirect_to edit_teacher_path @teacher
	end
	def show
		@teacher = Teacher.find(teacher_params)
	end
	def edit
		params[:id]
		@teacher = Teacher.find(params[:id])
		
	end
	def update
		
		
		@teacher = Teacher.find(params[:id])
		@teacher.update(user_params)
		redirect_to index_dashboard_path @teacher
	end
	def login
		params[:id]
		@teacher = Teacher.find(params[:id])
		redirect_to index_user_path @teacher
	end
	def destroy
		@teacher = Teacher.find(params[:id])
		@teacher.destroy
		redirect_to new_user_path
	end

	
	
	private

	def teacher_params
		params.require(:teacher).permit(:fname, :lname, :email,
			:address1, :address2, :city, :state)
	end
end


