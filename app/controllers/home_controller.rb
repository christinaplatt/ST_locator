class HomeController < ApplicationController
	def index
	end
	def new
		@user = User.new
	end
	def create
		@user = User.create(user_signed_in)
		redirect_to bio_home_path @user
	end
	def user_signed_in
		@user = User.find(params[:id])
		redirect_to bio_home_path @user
	end
end
