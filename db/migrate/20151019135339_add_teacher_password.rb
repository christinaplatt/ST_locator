class AddTeacherPassword < ActiveRecord::Migration
  def up
  	add_column :teachers, :password, :string
  end
  def down
  	remove_column :teachers, :password
  end
end
