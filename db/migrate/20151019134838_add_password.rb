class AddPassword < ActiveRecord::Migration
 def up
 	add_column :supervisors, :password, :string
 end
 def down
 	remove_column :supervisors, :password
 end
end
