class HomeController < ApplicationController
	def index
	end
	def new
		@user = Teacher.new
	end
	def create
		@user = Teacher.create(user_signed_in)
		
		
	end
	def show
	end
	def user_signed_in
		@user = Teacher.find(params[:id])
		redirect_to bio_home_path @user
	end
end
