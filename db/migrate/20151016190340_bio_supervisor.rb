class BioSupervisor < ActiveRecord::Migration
  
def up
	add_column :supervisors, :grades_taught, :string
	add_column :supervisors, :subject_taught, :string
	add_column :supervisors, :years_experience, :string
end

def down
	remove_column :supervisors, :grades_taught
	remove_column :supervisors, :subject_taught
	remove_column :supervisors, :years_experience







  end
end
