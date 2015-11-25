require 'rails_helper'

RSpec.describe Supervisor, :type => :model do
  describe '#full_address' do
  	it "has the address qualities in schema" do
  		supervisor = Supervisor.new(
  			address1: "123 fun street", 
  			address2: "apt 3c",
  			city: "funtown",
  			state: "springfield",
  			zipcode: "123456"
  		)
  		expect(supervisor.full_address).to eq "123 fun street, apt 3c, funtown, springfield  123456"
  	end
  end

  describe '.coordinate' do 
  	let!(:supervisor_1) do
  		Supervisor.create(
  			email: "MarkRules@gmail.com",
  			longitude: "2.0",
  			latitude: "3.0"
  			)
  	end
  	let!(:supervisor_2) do
  		Supervisor.create(
  			email: "supercoolpartypeople@gmail.com",
  			longitude: "2345.003",
  			latitude: "867.5309"
  			)
  	end
  	let!(:supervisor_3) do
  		Supervisor.create(
  			email: "samandcharliearethebest@gmail.com",
  			longitude: "0.0",
  			latitude: "0.0"
  			)
  	end
  	let!(:supervisor_4) do
  		Supervisor.create(
  			email: "ilovecats@gmail.com"
  			)
  	end

  	it "returns all valid cordinates for teachers" do
  		expect(Supervisor.coordinate).to eq [[supervisor_1.latitude, supervisor_1.longitude], [supervisor_2.latitude, supervisor_2.longitude]]
  	end


  end
end
