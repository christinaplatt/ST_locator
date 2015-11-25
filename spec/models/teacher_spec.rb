require 'rails_helper'

RSpec.describe Teacher, :type => :model do
  describe '#full_address' do
  	it "has the address qualities in schema" do
  		teacher = Teacher.new(
  			address1: "123 fun street", 
  			address2: "apt 3c",
  			city: "funtown",
  			state: "springfield",
  			zipcode: "123456"
  		)
  		expect(teacher.full_address).to eq "123 fun street, apt 3c, funtown, springfield  123456"
  	end
  end

  describe '.coordinate' do 
  	let!(:teacher_1) do
  		Teacher.create(
  			email: "MarkRules@gmail.com",
  			longitude: "2.0",
  			latitude: "3.0"
  			)
  	end
  	let!(:teacher_2) do
  		Teacher.create(
  			email: "supercoolpartypeople@gmail.com",
  			longitude: "2345.003",
  			latitude: "867.5309"
  			)
  	end
  	let!(:teacher_3) do
  		Teacher.create(
  			email: "samandcharliearethebest@gmail.com",
  			longitude: "0.0",
  			latitude: "0.0"
  			)
  	end
  	let!(:teacher_4) do
  		Teacher.create(
  			email: "ilovecats@gmail.com"
  			)
  	end

  	it "returns all valid cordinates for teachers" do
  		expect(Teacher.coordinate).to eq [[teacher_1.latitude, teacher_1.longitude], [teacher_2.latitude, teacher_2.longitude]]
  	end


  end
end
