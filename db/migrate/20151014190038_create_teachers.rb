class CreateTeachers < ActiveRecord::Migration
  def change
    create_table :teachers do |t|
		t.string	:fname
    	t.string	:lname
		t.string	:email
		t.string	:cellphone
    	t.string	:address1
    	t.string	:address2
    	t.string	:city
    	t.string	:state
    	t.string	:zipcode
    	t.string	:country
    	t.string	:latitude
    	t.string	:longitude
    	t.string	:old_latitude
    	t.string	:old_longitude
      t.timestamps null: false
    end
  end
end
