class AddBio < ActiveRecord::Migration
 
def up
	add_column :teachers, :grade, :string
	add_column :teachers, :subject, :string
end

def down
	remove_column :teacher, :grade
	remove_column :teacher, :subject
end




  

  		
  	
end
