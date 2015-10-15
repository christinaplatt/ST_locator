class CreateSchools < ActiveRecord::Migration
  def change
    create_table :schools do |t|
	t.string	:name
	t.string	:campus_name
	t.string	:admin_name
	t.string	:admin_phone
	t.string	:admin_email
	t.string	:schladdress1
	t.string	:schladdress2
	t.string	:city
	t.string	:state
	t.string	:zip
	t.float    	:latitude
   	t.float    	:longitude
    t.float    	:old_latitude
    t.float    	:old_longitude

    t.timestamps null: false
    end
  end
end
