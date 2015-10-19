class Teacher < ActiveRecord::Base
	belongs_to	:school
	belongs_to	:supervisor

# below copied from supervisor,teacher.rb
	geocoded_by :full_address  # or with a method below
 
	# the callback to set longitude and latitude
	after_validation :geocode



	def full_address
		"#{self.address1}, #{self.address2}, #{self.city}, #{self.state}  #{self.zipcode}" 
	end
	
	def self.coordinate
		latitude = Teacher.pluck(:latitude)
		longitude = Teacher.pluck(:longitude)
		coodinates = latitude.zip(longitude)
		coordinates.delete_if{|array| array.include?("0.0")}
		coodinates.delete_if{|array| array.include?(nil)}
		coordinates
	end


end
