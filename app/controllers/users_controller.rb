class UsersController < ApplicationController
	class UsersController < ApplicationController
	def index
		@user = User.new
	end
	def new
		# @user = User.new
	end
	def create
		@user = User.create(user_params)
		redirect_to edit_user_path @user
	end
	def show
		@user = User.find(user_params)
	end
	def edit
		params[:id]
		@user = User.find(params[:id])
		# @user = User.find(user_params)
	end
	def update
		# puts "LOOOOKING"
		# puts temp = params[:user]
		
		@user = User.find(params[:id])
		@user.update(user_params)
		redirect_to edit_user_path @user
	end
	def login
		params[:id]
		@user = User.find(params[:id])
		redirect_to index_user_path @user
	end
	def destroy
		@user = User.find(params[:id])
		@user.destroy
		redirect_to new_user_path
	end

	
	
	private

	def user_params
		params.require(:user).permit(:name, :email, :age)
	end
end

end
