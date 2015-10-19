class HomeController < ApplicationController
	def index
	end
	def new
		@user = Teacher.new
	end
	def create
		@user = Teacher.create(user_signed_in)
		redirect_to bio_home_path @user
	end
	def user_signed_in
		@user = Teacher.find(params[:id])
		redirect_to bio_home_path @user
	end

	def map
		@supervisor = Supervisor.all
		@hash = Gmaps4rails.build_markers(@supervisors) do |supervisor, marker|
		  marker.lat supervisor.latitude
		  marker.lng supervisor.longitude
	
		  gon.lat_long_array = supervisor.full_address
			end
		end

end
