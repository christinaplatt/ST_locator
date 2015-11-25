class Supervisor < ActiveRecord::Base
	validates :email, presence: true,  uniqueness: true
	belongs_to	:school
	has_many	:teachers

# below copied from supervisor,teacher.rb
	geocoded_by :full_address  # or with a method below
 
	# the callback to set longitude and latitude
	after_validation :geocode



	def full_address
		"#{self.address1}, #{self.address2}, #{self.city}, #{self.state}  #{self.zipcode}" 
	end
	
	def self.coordinate
		latitude = Supervisor.pluck(:latitude)
		longitude = Supervisor.pluck(:longitude)
		coordinates = latitude.zip(longitude)
		coordinates.delete_if{|array| array.include?(0.0)}
		coordinates.delete_if{|array| array.include?(nil)}
		coordinates
	end



end
