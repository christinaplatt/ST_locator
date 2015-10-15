class Supervisor < ActiveRecord::Base
	belongs_to	:school
	has_many	:teachers
end
