class School < ActiveRecord::Base
	has_many	:supervisors
	has_many	:teachers
end
